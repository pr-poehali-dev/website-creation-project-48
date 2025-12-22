import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface User {
  username: string;
  userId: string;
  level: number;
  exp: number;
  gems: number;
  joinDate: string;
  playTime: string;
  avatar: string;
  bio: string;
  selectedServer: string;
  minecraft_nickname?: string | null;
  minecraftStats?: {
    kills: number;
    deaths: number;
    balance: number;
    playtime_hours: number;
  } | null;
}

interface ProfileInfoProps {
  user: User;
  expProgress: number;
  maxLevel: number;
  onEditAvatar: () => void;
  onEditBio: () => void;
  onShowRewards: () => void;
  onDeleteProfile: () => void;
  onShowSettings: () => void;
  onShowFriends: () => void;
  onLinkMinecraft: () => void;
}

const ProfileInfo = ({ user, expProgress, maxLevel, onEditAvatar, onEditBio, onShowRewards, onDeleteProfile, onShowSettings, onShowFriends, onLinkMinecraft }: ProfileInfoProps) => {
  return (
    <Card className="p-4 md:p-8 bg-card/80 backdrop-blur border-primary/20 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
        <div className="flex flex-col items-center gap-2 md:gap-3 w-full md:w-auto">
          <div className="relative group cursor-pointer" onClick={onEditAvatar}>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg group-hover:scale-105 transition-transform">
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="Camera" size={24} className="text-white md:hidden" />
              <Icon name="Camera" size={32} className="text-white hidden md:block" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={onShowSettings} 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 hover:bg-primary/10"
            >
              <Icon name="Settings" size={16} />
            </Button>
            <Button 
              onClick={onEditAvatar} 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 hover:bg-primary/10"
            >
              <Icon name="Camera" size={16} />
            </Button>
            <Button 
              onClick={onDeleteProfile} 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-4 md:space-y-6 w-full">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {user.username}
                {user.userId === '000012' && (
                  <span className="ml-2 text-base md:text-lg text-red-500 font-semibold">(Admin)</span>
                )}
              </h2>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs md:text-sm font-semibold w-fit">
                ID: {user.userId}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm md:text-base">
              <Icon name="Calendar" size={16} />
              <span>Присоединился {user.joinDate}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm md:text-base">
              <Icon name="Clock" size={16} />
              <span>Время в игре: {user.playTime}</span>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs md:text-sm font-medium text-muted-foreground">Уровень {user.level}</span>
                  <span className="text-xs text-muted-foreground">{user.exp % 1000} / 1000 XP</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${expProgress}%` }}
                  />
                </div>
              </div>
              <Button onClick={onShowRewards} variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                <Icon name="Gift" size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <div className="bg-primary/10 rounded-lg p-2 md:p-4 text-center">
                <div className="flex items-center justify-center gap-1 md:gap-2 mb-1">
                  <Icon name="Gem" size={16} className="text-primary md:hidden" />
                  <Icon name="Gem" size={20} className="text-primary hidden md:block" />
                  <span className="text-lg md:text-2xl font-bold text-foreground">{user.gems}</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Кристаллов</p>
              </div>
              <div className="bg-accent/10 rounded-lg p-2 md:p-4 text-center cursor-pointer hover:bg-accent/20 transition-colors" onClick={() => window.location.href = '/achievements'}>
                <div className="flex items-center justify-center gap-1 md:gap-2 mb-1">
                  <Icon name="Trophy" size={16} className="text-accent md:hidden" />
                  <Icon name="Trophy" size={20} className="text-accent hidden md:block" />
                  <span className="text-lg md:text-2xl font-bold text-foreground">0</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Достижения</p>
              </div>
              <div className="bg-purple-600/10 rounded-lg p-2 md:p-4 text-center cursor-pointer hover:bg-purple-600/20 transition-colors" onClick={onShowFriends}>
                <div className="flex items-center justify-center gap-1 md:gap-2 mb-1">
                  <Icon name="Users" size={16} className="text-purple-400 md:hidden" />
                  <Icon name="Users" size={20} className="text-purple-400 hidden md:block" />
                  <span className="text-lg md:text-2xl font-bold text-foreground">{JSON.parse(localStorage.getItem(`${user.userId}_friends`) || '[]').filter((f: any) => f.status === 'accepted').length}</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Друзья</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs md:text-sm font-medium text-muted-foreground">Minecraft никнейм</label>
                {!user.minecraft_nickname && (
                  <Button onClick={onLinkMinecraft} variant="ghost" size="sm" className="h-8">
                    <Icon name="Link" size={14} className="mr-1" />
                    <span className="hidden sm:inline">Привязать</span>
                  </Button>
                )}
              </div>
              <p className="text-sm md:text-base text-foreground bg-muted/50 rounded-lg p-2 md:p-3">
                {user.minecraft_nickname || "Никнейм не привязан"}
              </p>
            </div>

            {user.minecraftStats && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs md:text-sm font-medium text-muted-foreground">Статистика с сервера</label>
                  <div className="flex items-center gap-1 text-xs text-green-500">
                    <Icon name="RefreshCw" size={12} className="animate-spin-slow" />
                    <span>Обновляется</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="bg-red-500/10 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon name="Skull" size={16} className="text-red-400" />
                    <span className="text-lg font-bold">{user.minecraftStats.kills}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Убийств</p>
                </div>
                <div className="bg-gray-500/10 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon name="X" size={16} className="text-gray-400" />
                    <span className="text-lg font-bold">{user.minecraftStats.deaths}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Смертей</p>
                </div>
                <div className="bg-yellow-500/10 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon name="Coins" size={16} className="text-yellow-400" />
                    <span className="text-lg font-bold">{user.minecraftStats.balance.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Деньги</p>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon name="Clock" size={16} className="text-blue-400" />
                    <span className="text-lg font-bold">{user.minecraftStats.playtime_hours}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Часов</p>
                </div>
              </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs md:text-sm font-medium text-muted-foreground">О себе</label>
                <Button onClick={onEditBio} variant="ghost" size="sm" className="h-8">
                  <Icon name="Pencil" size={14} className="mr-1" />
                  <span className="hidden sm:inline">Изменить</span>
                </Button>
              </div>
              <p className="text-sm md:text-base text-foreground bg-muted/50 rounded-lg p-2 md:p-3 min-h-[50px] md:min-h-[60px]">
                {user.bio || "Расскажите о себе..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileInfo;