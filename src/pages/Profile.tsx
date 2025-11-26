
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileDialogs from "@/components/profile/ProfileDialogs";
import ProfileChat from "@/components/profile/ProfileChat";
import FriendsDialog from "@/components/profile/FriendsDialog";
import { useState, useEffect } from "react";
import SpaceBackground from "@/components/SpaceBackground";

const Profile = () => {
  const getProfileKey = (key: string) => {
    const username = localStorage.getItem('username') || 'Player123';
    return `${username}_${key}`;
  };

  const loadProfileData = () => {
    const username = localStorage.getItem('username') || 'Player123';
    
    let userId = localStorage.getItem(getProfileKey('userId'));
    
    if (!userId) {
      const globalUserCount = parseInt(localStorage.getItem('global_user_count') || '0');
      const newUserId = globalUserCount + 1;
      localStorage.setItem('global_user_count', newUserId.toString());
      userId = newUserId.toString().padStart(6, '0');
      localStorage.setItem(getProfileKey('userId'), userId);
    }
    
    return {
      username,
      userId,
      level: parseInt(localStorage.getItem(getProfileKey('level')) || '0'),
      exp: parseInt(localStorage.getItem(getProfileKey('exp')) || '0'),
      gems: parseInt(localStorage.getItem(getProfileKey('gems')) || '0'),
      joinDate: localStorage.getItem(getProfileKey('joinDate')) || new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      playTime: localStorage.getItem(getProfileKey('playTime')) || '0',
      avatar: localStorage.getItem(getProfileKey('avatar')) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      bio: localStorage.getItem(getProfileKey('bio')) || '',
      selectedServer: localStorage.getItem(getProfileKey('selectedServer')) || '1'
    };
  };

  const [user, setUser] = useState(loadProfileData());

  useEffect(() => {
    localStorage.setItem(`profile_${user.userId}`, JSON.stringify({
      username: user.username,
      avatar: user.avatar,
      userId: user.userId
    }));
  }, [user.username, user.avatar, user.userId]);

  useEffect(() => {
    setUser(loadProfileData());
  }, []);

  const saveProfileData = (key: string, value: string | number) => {
    localStorage.setItem(getProfileKey(key), value.toString());
  };

  const [stats, setStats] = useState({
    kills: parseInt(localStorage.getItem(getProfileKey('kills')) || '0'),
    deaths: parseInt(localStorage.getItem(getProfileKey('deaths')) || '0'),
    quests: parseInt(localStorage.getItem(getProfileKey('quests')) || '0'),
    achievements: parseInt(localStorage.getItem(getProfileKey('achievements')) || '0')
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = parseInt(localStorage.getItem(getProfileKey('playTimeMinutes')) || '0');
      const newTime = currentTime + 1;
      saveProfileData('playTimeMinutes', newTime);
      
      const hours = Math.floor(newTime / 60);
      const minutes = newTime % 60;
      const timeString = hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
      
      setUser(prev => ({ ...prev, playTime: timeString }));
      saveProfileData('playTime', timeString);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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

  const handleAvatarChange = (style: string, url: string) => {
    setUser({ ...user, avatar: url });
    saveProfileData('avatar', url);
    setShowAvatarDialog(false);
  };

  const handleBioSave = () => {
    setUser({ ...user, bio: bioText });
    saveProfileData('bio', bioText);
    setShowBioDialog(false);
  };

  const handleSettingsDataChange = (field: string, value: string) => {
    setSettingsData(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingsSave = () => {
    if (settingsData.username !== user.username) {
      const oldUsername = user.username;
      localStorage.setItem('username', settingsData.username);
      
      const keysToMigrate = ['level', 'exp', 'gems', 'joinDate', 'playTime', 'avatar', 'bio', 'selectedServer', 'userId', 'email', 'birthdate', 'playTimeMinutes'];
      keysToMigrate.forEach(key => {
        const value = localStorage.getItem(`${oldUsername}_${key}`);
        if (value) {
          localStorage.setItem(`${settingsData.username}_${key}`, value);
          localStorage.removeItem(`${oldUsername}_${key}`);
        }
      });
      
      setUser(prev => ({ ...prev, username: settingsData.username }));
    }
    
    saveProfileData('email', settingsData.email);
    saveProfileData('birthdate', settingsData.birthdate);
    saveProfileData('bio', settingsData.bio);
    setUser(prev => ({ ...prev, bio: settingsData.bio }));
    
    if (settingsData.password) {
      saveProfileData('password', settingsData.password);
    }
    
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
    saveProfileData('selectedServer', serverNum);
    setUser(prev => ({ ...prev, selectedServer: serverNum.toString() }));
    setServerNotificationText(`Выбран Сервер #${serverNum}`);
    setShowServerNotification(true);
    setTimeout(() => setShowServerNotification(false), 2000);
  };

  return (
    <div className="min-h-screen relative" onClick={(e) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
        playMinecraftDoorSound();
      }
    }}>
      <SpaceBackground />
      
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
              email: localStorage.getItem(getProfileKey('email')) || '',
              password: '',
              birthdate: localStorage.getItem(getProfileKey('birthdate')) || '',
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