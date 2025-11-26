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
}

const ProfileInfo = ({ user, expProgress, maxLevel, onEditAvatar, onEditBio, onShowRewards, onDeleteProfile, onShowSettings, onShowFriends }: ProfileInfoProps) => {
  return (
    <Card className="p-8 bg-card/80 backdrop-blur border-primary/20 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex flex-col items-center gap-3">
          <div className="relative group cursor-pointer" onClick={onEditAvatar}>
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg group-hover:scale-105 transition-transform">
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="Camera" size={32} className="text-white" />
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

        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-foreground">{user.username}</h2>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                ID: {user.userId}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>Присоединился {user.joinDate}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Icon name="Clock" size={16} />
              <span>Время в игре: {user.playTime}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-muted-foreground">Уровень {user.level}</span>
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

            <div className="flex gap-3">
              <div className="flex-1 bg-primary/10 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon name="Gem" size={20} className="text-primary" />
                  <span className="text-2xl font-bold text-foreground">{user.gems}</span>
                </div>
                <p className="text-sm text-muted-foreground">Кристаллов</p>
              </div>
              <div className="flex-1 bg-accent/10 rounded-lg p-4 text-center cursor-pointer hover:bg-accent/20 transition-colors" onClick={() => window.location.href = '/achievements'}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon name="Trophy" size={20} className="text-accent" />
                  <span className="text-2xl font-bold text-foreground">0</span>
                </div>
                <p className="text-sm text-muted-foreground">Достижения</p>
              </div>
              <div className="flex-1 bg-purple-600/10 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-600/20 transition-colors" onClick={onShowFriends}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon name="Users" size={20} className="text-purple-400" />
                  <span className="text-2xl font-bold text-foreground">{JSON.parse(localStorage.getItem(`${user.userId}_friends`) || '[]').filter((f: any) => f.status === 'accepted').length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Друзья</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-muted-foreground">О себе</label>
              <Button onClick={onEditBio} variant="ghost" size="sm">
                <Icon name="Pencil" size={14} className="mr-1" />
                Изменить
              </Button>
            </div>
            <p className="text-foreground bg-muted/50 rounded-lg p-3 min-h-[60px]">
              {user.bio || "Расскажите о себе..."}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileInfo;