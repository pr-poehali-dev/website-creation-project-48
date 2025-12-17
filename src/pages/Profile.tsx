
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileDialogs from "@/components/profile/ProfileDialogs";
import ProfileChat from "@/components/profile/ProfileChat";
import FriendsDialog from "@/components/profile/FriendsDialog";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SpaceBackground from "@/components/SpaceBackground";
import Fireworks from "@/components/Fireworks";
import Snowflakes from "@/components/Snowflakes";

const Profile = () => {
  const { user: authUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !authUser) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/6c6ea4a5-9ef6-465d-9005-8da6bf34e9d3', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': authUser.id.toString()
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authUser, isAuthenticated]);

  const getProfileKey = (key: string) => {
    const username = authUser?.username || 'Player123';
    return `${username}_${key}`;
  };

  const loadProfileData = () => {
    const username = authUser?.username || 'Player123';
    
    let userId = localStorage.getItem(getProfileKey('userId'));
    
    if (!userId) {
      const globalUserCount = parseInt(localStorage.getItem('global_user_count') || '0');
      const newUserId = globalUserCount + 1;
      localStorage.setItem('global_user_count', newUserId.toString());
      userId = newUserId.toString().padStart(6, '0');
      localStorage.setItem(getProfileKey('userId'), userId);
    }
    
    const level = userId === '000011' ? 100 : parseInt(localStorage.getItem(getProfileKey('level')) || '0');
    const gems = userId === '000011' ? 1000000 : parseInt(localStorage.getItem(getProfileKey('gems')) || '0');
    
    return {
      username,
      userId,
      level,
      exp: parseInt(localStorage.getItem(getProfileKey('exp')) || '0'),
      gems,
      joinDate: localStorage.getItem(getProfileKey('joinDate')) || new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      playTime: localStorage.getItem(getProfileKey('playTime')) || '0',
      avatar: localStorage.getItem(getProfileKey('avatar')) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      bio: localStorage.getItem(getProfileKey('bio')) || '',
      selectedServer: localStorage.getItem(getProfileKey('selectedServer')) || '1'
    };
  };

  const [user, setUser] = useState(() => {
    if (profileData) return profileData;
    return loadProfileData();
  });

  useEffect(() => {
    if (profileData) {
      setUser(profileData);
    }
  }, [profileData]);

  const saveProfileData = async (updates: any) => {
    if (!authUser) return;
    
    try {
      const response = await fetch('https://functions.poehali.dev/dd58dbc7-c964-49c3-9170-3eaa7ca04eb0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': authUser.id.toString()
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        setUser((prev: any) => ({ ...prev, ...updates }));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const [stats, setStats] = useState({
    kills: profileData?.kills || 0,
    deaths: profileData?.deaths || 0,
    quests: profileData?.quests || 0,
    achievements: profileData?.achievements || 0
  });

  useEffect(() => {
    if (profileData) {
      setStats({
        kills: profileData.kills || 0,
        deaths: profileData.deaths || 0,
        quests: profileData.quests || 0,
        achievements: profileData.achievements || 0
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (!authUser) return;
    
    const interval = setInterval(async () => {
      const currentMinutes = user.playTime ? 
        parseInt(user.playTime.split(' ')[0]) * 60 + parseInt(user.playTime.split(' ')[2] || '0') : 0;
      const newTime = currentMinutes + 1;
      
      const hours = Math.floor(newTime / 60);
      const minutes = newTime % 60;
      const timeString = hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
      
      await saveProfileData({ playTimeMinutes: newTime });
      setUser((prev: any) => ({ ...prev, playTime: timeString }));
    }, 60000);

    return () => clearInterval(interval);
  }, [authUser, user.playTime]);

  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [showRewardsDialog, setShowRewardsDialog] = useState(false);
  const [showBioDialog, setShowBioDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showFriendsDialog, setShowFriendsDialog] = useState(false);
  const [bioText, setBioText] = useState(user.bio);
  const [selectedServer, setSelectedServer] = useState(() => {
    return parseInt(user.selectedServer);
  });
  const [showServerNotification, setShowServerNotification] = useState(false);
  const [serverNotificationText, setServerNotificationText] = useState('');
  const [settingsData, setSettingsData] = useState({
    username: user.username,
    email: localStorage.getItem(getProfileKey('email')) || '',
    password: '',
    birthdate: localStorage.getItem(getProfileKey('birthdate')) || '',
    bio: user.bio
  });

  const maxLevel = 100;
  const expToNextLevel = 1000;
  const currentLevelExp = user.exp % expToNextLevel;
  const expProgress = (currentLevelExp / expToNextLevel) * 100;

  const deleteProfile = () => {
    const username = localStorage.getItem('username') || 'Player123';
    const keysToDelete = ['level', 'exp', 'gems', 'joinDate', 'playTime', 'avatar', 'bio', 'selectedServer', 'userId', 'kills', 'deaths', 'quests', 'achievements', 'playTimeMinutes'];
    
    keysToDelete.forEach(key => {
      localStorage.removeItem(getProfileKey(key));
    });
    
    window.location.href = '/';
  };

  const avatarStyles = [
    { name: "Аватаарс", seed: user.username, style: "avataaars", url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}` },
    { name: "Ботты", seed: user.username, style: "bottts", url: `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}` },
    { name: "Пикселька", seed: user.username, style: "pixel-art", url: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.username}` },
    { name: "Личности", seed: user.username, style: "personas", url: `https://api.dicebear.com/7.x/personas/svg?seed=${user.username}` },
    { name: "Весёлый", seed: user.username, style: "fun-emoji", url: `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${user.username}` },
    { name: "Инициалы", seed: user.username, style: "initials", url: `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}&backgroundColor=a855f7,9333ea,7c3aed` },
    { name: "Большие уши", seed: user.username, style: "big-ears", url: `https://api.dicebear.com/7.x/big-ears/svg?seed=${user.username}` },
    { name: "Улыбки", seed: user.username, style: "adventurer", url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}` },
  ];

  const getLevelRewards = (level: number) => {
    if (level % 25 === 0) return { gems: 500, exp: 0, title: "Легендарная награда" };
    if (level % 10 === 0) return { gems: 200, exp: 0, title: "Эпическая награда" };
    if (level % 5 === 0) return { gems: 100, exp: 0, title: "Редкая награда" };
    return { gems: 50, exp: 0, title: "Обычная награда" };
  };

  const allLevelRewards = Array.from({ length: maxLevel }, (_, i) => i + 1)
    .map(lvl => ({
      level: lvl,
      ...getLevelRewards(lvl)
    }));

  const handleAvatarChange = async (style: string, url: string) => {
    await saveProfileData({ avatar: url });
    setShowAvatarDialog(false);
  };

  const handleBioSave = async () => {
    await saveProfileData({ bio: bioText });
    setShowBioDialog(false);
  };

  const handleSettingsDataChange = (field: string, value: string) => {
    setSettingsData(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingsSave = async () => {
    await saveProfileData({ bio: settingsData.bio });
    
    setShowSettingsDialog(false);
    setServerNotificationText('Настройки сохранены');
    setShowServerNotification(true);
    setTimeout(() => setShowServerNotification(false), 2000);
  };

  const playMinecraftDoorSound = () => {
    const audio = new Audio('https://minecraft.wiki/images/Wooden_Door_open3.ogg?57bae');
    audio.volume = 0.5;
    audio.play().catch(err => console.log('Audio play failed:', err));
  };

  const handleServerChange = (serverNum: number) => {
    setSelectedServer(serverNum);
    setUser((prev: any) => ({ ...prev, selectedServer: serverNum.toString() }));
    setServerNotificationText(`Выбран Сервер #${serverNum}`);
    setShowServerNotification(true);
    setTimeout(() => setShowServerNotification(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900/60 via-purple-800/40 to-indigo-900/60">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Войдите в аккаунт</h2>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900/60 via-purple-800/40 to-indigo-900/60">
      <div className="text-white text-xl">Загрузка профиля...</div>
    </div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900/60 via-purple-800/40 to-indigo-900/60">
      <div className="text-white text-xl">Профиль не найден</div>
    </div>;
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-900/60 via-purple-800/40 to-indigo-900/60" onClick={(e) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
        playMinecraftDoorSound();
      }
    }}>
      <SpaceBackground />
      <Fireworks />
      <Snowflakes />
      
      <ProfileHeader 
        showServerNotification={showServerNotification}
        serverNotificationText={serverNotificationText}
      />

      <main className="container mx-auto px-4 py-8 space-y-6 relative z-10">
        <ProfileInfo 
          user={user}
          expProgress={expProgress}
          maxLevel={maxLevel}
          onEditAvatar={() => setShowAvatarDialog(true)}
          onEditBio={() => {
            setBioText(user.bio);
            setShowBioDialog(true);
          }}
          onShowRewards={() => setShowRewardsDialog(true)}
          onDeleteProfile={() => setShowDeleteDialog(true)}
          onShowSettings={() => {
            setSettingsData({
              username: user.username,
              email: authUser?.email || '',
              password: '',
              birthdate: '',
              bio: user.bio
            });
            setShowSettingsDialog(true);
          }}
          onShowFriends={() => setShowFriendsDialog(true)}
        />

        <ProfileStats 
          selectedServer={selectedServer}
          onServerChange={handleServerChange}
        />

        <ProfileChat 
          currentUserId={user.userId}
          currentUsername={user.username}
          currentAvatar={user.avatar}
        />
      </main>

      <ProfileDialogs 
        showAvatarDialog={showAvatarDialog}
        showRewardsDialog={showRewardsDialog}
        showBioDialog={showBioDialog}
        showDeleteDialog={showDeleteDialog}
        showSettingsDialog={showSettingsDialog}
        user={user}
        avatarStyles={avatarStyles}
        allLevelRewards={allLevelRewards}
        bioText={bioText}
        settingsData={settingsData}
        onCloseAvatarDialog={() => setShowAvatarDialog(false)}
        onCloseRewardsDialog={() => setShowRewardsDialog(false)}
        onCloseBioDialog={() => setShowBioDialog(false)}
        onCloseDeleteDialog={() => setShowDeleteDialog(false)}
        onCloseSettingsDialog={() => setShowSettingsDialog(false)}
        onAvatarChange={handleAvatarChange}
        onBioTextChange={setBioText}
        onBioSave={handleBioSave}
        onDeleteProfile={deleteProfile}
        onSettingsDataChange={handleSettingsDataChange}
        onSettingsSave={handleSettingsSave}
      />

      <FriendsDialog
        open={showFriendsDialog}
        onClose={() => setShowFriendsDialog(false)}
        userId={user.userId}
      />
    </div>
  );
};

export default Profile;