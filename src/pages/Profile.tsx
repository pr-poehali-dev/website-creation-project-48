import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Profile = () => {
  const [user, setUser] = useState({
    username: localStorage.getItem('username') || "Player123",
    email: localStorage.getItem('userEmail') || "player@example.com",
    level: 0,
    exp: 0,
    gems: 0,
    joinDate: "15 января 2025",
    playTime: "0 часов",
    avatar: localStorage.getItem('userAvatar') || "https://api.dicebear.com/7.x/avataaars/svg?seed=Player123"
  });

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedEmail = localStorage.getItem('userEmail');
    const savedAvatar = localStorage.getItem('userAvatar');
    
    setUser(prev => ({
      ...prev,
      username: savedUsername || "Player123",
      email: savedEmail || "player@example.com",
      avatar: savedAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${savedUsername || 'Player123'}`
    }));
  }, []);

  const [stats] = useState({
    kills: 0,
    deaths: 0,
    quests: 0,
    achievements: 0
  });

  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [showRewardsDialog, setShowRewardsDialog] = useState(false);
  const [selectedServer, setSelectedServer] = useState(() => {
    const saved = localStorage.getItem('selectedServer');
    return saved ? parseInt(saved) : 1;
  });
  const [showServerNotification, setShowServerNotification] = useState(false);
  const [serverNotificationText, setServerNotificationText] = useState('');

  const maxLevel = 100;
  const expToNextLevel = 1000;
  const currentLevelExp = user.exp % expToNextLevel;
  const expProgress = (currentLevelExp / expToNextLevel) * 100;

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
    localStorage.setItem('userAvatar', url);
    setShowAvatarDialog(false);
  };

  const handleServerChange = (serverNum: number) => {
    setSelectedServer(serverNum);
    localStorage.setItem('selectedServer', serverNum.toString());
    setServerNotificationText(`Выбран Сервер #${serverNum}`);
    setShowServerNotification(true);
    setTimeout(() => setShowServerNotification(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30 animate-gradient relative">
      <ParticlesBackground />
      
      {showServerNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-primary/90 backdrop-blur text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <Icon name="CheckCircle2" size={20} />
            <span className="font-semibold">{serverNotificationText}</span>
          </div>
        </div>
      )}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Imunns RolePlay
            </span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/profile" className="text-primary font-bold transition-colors">Профиль</a>
            <a href="/forum" className="font-bold text-purple-300 hover:text-primary transition-colors">Форум</a>
            <a href="/stats" className="font-bold text-purple-300 hover:text-primary transition-colors">Топ игроков</a>
            <a href="/admin" className="font-bold text-purple-300 hover:text-primary transition-colors">Администрация</a>
          </div>
          <Button 
            variant="outline" 
            className="border-primary/50 hover:bg-primary/10"
            onClick={() => window.location.href = '/'}
          >
            <Icon name="LogOut" className="mr-2" size={18} />
            Выход
          </Button>
        </div>
      </nav>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary via-accent to-primary"></div>
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-background bg-card overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                    <img src={user.avatar} alt="Avatar" className="w-full h-full" />
                  </div>
                  <button
                    onClick={() => setShowAvatarDialog(true)}
                    className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <Icon name="Camera" className="text-white" size={32} />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-1">{user.username}</h1>
                      <p className="text-foreground/60">{user.email}</p>
                      <p className="text-sm text-foreground/50">Играет с {user.joinDate}</p>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      onClick={() => window.location.href = '/settings'}
                    >
                      <Icon name="Settings" className="mr-2" size={18} />
                      Настройки
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 mb-8">
                <Card className="lg:col-span-2 p-3 bg-gradient-to-br from-card/50 to-primary/10 backdrop-blur border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="TrendingUp" className="text-primary" size={18} />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{user.level}</p>
                        <p className="text-xs text-foreground/60">Уровень</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowRewardsDialog(true)}
                      className="h-7 px-1.5"
                    >
                      <Icon name="Gift" className="text-primary" size={14} />
                    </Button>
                  </div>
                  <div className="w-full bg-background rounded-full h-1.5 overflow-hidden mb-1">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${expProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-foreground/50">
                    {currentLevelExp} / {expToNextLevel} опыта
                  </p>
                </Card>

                <Card className="lg:col-span-4 p-3 bg-card/30 backdrop-blur border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Server" className="text-primary" size={16} />
                    <h3 className="text-sm font-bold">Выбор сервера</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    <button 
                      onClick={() => handleServerChange(1)}
                      className={`p-1.5 rounded-lg transition-all ${
                        selectedServer === 1 
                          ? 'border-2 border-primary bg-primary/10' 
                          : 'border border-border/50 hover:border-primary/50 hover:bg-card/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <Icon name="Zap" className="text-primary" size={16} />
                        <p className="text-xs font-bold">Сервер #1</p>
                        <p className="text-xs text-green-500 flex items-center gap-0.5">
                          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                          245
                        </p>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleServerChange(2)}
                      className={`p-1.5 rounded-lg transition-all ${
                        selectedServer === 2 
                          ? 'border-2 border-primary bg-primary/10' 
                          : 'border border-border/50 hover:border-primary/50 hover:bg-card/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <Icon name="Flame" className="text-orange-500" size={16} />
                        <p className="text-xs font-bold">Сервер #2</p>
                        <p className="text-xs text-green-500 flex items-center gap-0.5">
                          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                          189
                        </p>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleServerChange(3)}
                      className={`p-1.5 rounded-lg transition-all ${
                        selectedServer === 3 
                          ? 'border-2 border-primary bg-primary/10' 
                          : 'border border-border/50 hover:border-primary/50 hover:bg-card/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <Icon name="Trophy" className="text-yellow-500" size={16} />
                        <p className="text-xs font-bold">Сервер #3</p>
                        <p className="text-xs text-yellow-500 flex items-center gap-0.5">
                          <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                          312
                        </p>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleServerChange(4)}
                      className={`p-1.5 rounded-lg transition-all ${
                        selectedServer === 4 
                          ? 'border-2 border-primary bg-primary/10' 
                          : 'border border-border/50 hover:border-primary/50 hover:bg-card/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <Icon name="Star" className="text-purple-500" size={16} />
                        <p className="text-xs font-bold">Сервер #4</p>
                        <p className="text-xs text-red-500 flex items-center gap-0.5">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          456
                        </p>
                      </div>
                    </button>
                  </div>
                </Card>

                <Card className="lg:col-span-2 p-3 bg-gradient-to-br from-card/50 to-primary/10 backdrop-blur border-border/50">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-3 border-b border-border/30">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="Gem" className="text-primary" size={18} />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{user.gems}</p>
                        <p className="text-xs text-foreground/60">Кристаллы</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Icon name="Clock" className="text-accent" size={18} />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{user.playTime}</p>
                        <p className="text-xs text-foreground/60">Игровое время</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-card/30 backdrop-blur border-border/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="BarChart3" className="text-primary" size={24} />
                    Статистика
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">Убийств</span>
                      <span className="font-bold text-lg">{stats.kills}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">Смертей</span>
                      <span className="font-bold text-lg">{stats.deaths}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">K/D Ratio</span>
                      <span className="font-bold text-lg text-primary">
                        {stats.deaths > 0 ? (stats.kills / stats.deaths).toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">Квестов выполнено</span>
                      <span className="font-bold text-lg">{stats.quests}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card/30 backdrop-blur border-border/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Trophy" className="text-accent" size={24} />
                    Достижения
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-primary/30">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="Sword" className="text-primary" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Первая кровь</p>
                        <p className="text-sm text-foreground/60">Убей первого игрока</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-accent/30">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Icon name="Star" className="text-accent" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Новичок</p>
                        <p className="text-sm text-foreground/60">Достигни 10 уровня</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-primary/30">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="Users" className="text-primary" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Командный игрок</p>
                        <p className="text-sm text-foreground/60">Вступи в гильдию</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={() => window.location.href = '/achievements'}
                  >
                    <Icon name="Trophy" className="mr-2" size={18} />
                    Все достижения ({stats.achievements}/50)
                  </Button>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
        <DialogContent className="bg-card/95 backdrop-blur border-primary/50 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Сменить аватар
            </DialogTitle>
            <DialogDescription>
              Выберите стиль для своего аватара
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            {avatarStyles.map((style) => (
              <button
                key={style.style}
                onClick={() => handleAvatarChange(style.style, style.url)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card/50 hover:bg-primary/10 border border-border/50 hover:border-primary/50 transition-all"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden bg-background">
                  <img
                    src={style.url}
                    alt={style.name}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-xs text-foreground/70">{style.name}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRewardsDialog} onOpenChange={setShowRewardsDialog}>
        <DialogContent className="bg-card/95 backdrop-blur border-primary/50 max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Награды за уровни
            </DialogTitle>
            <DialogDescription>
              Получайте награды за каждый достигнутый уровень
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {allLevelRewards.map((reward) => {
              const isUnlocked = user.level >= reward.level;
              const rewardType = reward.level % 25 === 0 ? 'legendary' : reward.level % 10 === 0 ? 'epic' : reward.level % 5 === 0 ? 'rare' : 'common';
              const borderColor = rewardType === 'legendary' ? 'border-accent' : rewardType === 'epic' ? 'border-primary' : rewardType === 'rare' ? 'border-primary/50' : 'border-border/50';
              
              return (
                <Card
                  key={reward.level}
                  className={`p-4 bg-card/50 backdrop-blur transition-all ${
                    isUnlocked 
                      ? `${borderColor} shadow-[0_0_20px_rgba(168,85,247,0.3)]` 
                      : 'border-border/30 opacity-50 grayscale'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        rewardType === 'legendary' ? 'bg-accent/20' : rewardType === 'epic' ? 'bg-primary/20' : rewardType === 'rare' ? 'bg-primary/10' : 'bg-card/50'
                      }`}>
                        <Icon 
                          name={rewardType === 'legendary' ? 'Crown' : rewardType === 'epic' ? 'Award' : rewardType === 'rare' ? 'Star' : 'Gift'} 
                          className={rewardType === 'legendary' ? 'text-accent' : 'text-primary'} 
                          size={24} 
                        />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Уровень {reward.level}</p>
                        <p className="text-sm text-foreground/60">{reward.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                        <Icon name="Gem" className="text-primary" size={18} />
                        <span className="font-bold">+{reward.gems}</span>
                      </div>
                      {isUnlocked && (
                        <Icon name="CheckCircle" className="text-green-500" size={24} />
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;