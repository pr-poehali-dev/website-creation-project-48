import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface User {
  username: string;
  avatar: string;
  bio: string;
}

interface AvatarStyle {
  name: string;
  seed: string;
  style: string;
  url: string;
}

interface LevelReward {
  level: number;
  gems: number;
  exp: number;
  title: string;
}

interface ProfileDialogsProps {
  showAvatarDialog: boolean;
  showRewardsDialog: boolean;
  showBioDialog: boolean;
  showDeleteDialog: boolean;
  showSettingsDialog: boolean;
  user: User;
  avatarStyles: AvatarStyle[];
  allLevelRewards: LevelReward[];
  bioText: string;
  settingsData: {
    username: string;
    email: string;
    password: string;
    birthdate: string;
    bio: string;
  };
  onCloseAvatarDialog: () => void;
  onCloseRewardsDialog: () => void;
  onCloseBioDialog: () => void;
  onCloseDeleteDialog: () => void;
  onCloseSettingsDialog: () => void;
  onAvatarChange: (style: string, url: string) => void;
  onBioTextChange: (text: string) => void;
  onBioSave: () => void;
  onDeleteProfile: () => void;
  onSettingsDataChange: (field: string, value: string) => void;
  onSettingsSave: () => void;
}

const ProfileDialogs = ({
  showAvatarDialog,
  showRewardsDialog,
  showBioDialog,
  showDeleteDialog,
  showSettingsDialog,
  user,
  avatarStyles,
  allLevelRewards,
  bioText,
  settingsData,
  onCloseAvatarDialog,
  onCloseRewardsDialog,
  onCloseBioDialog,
  onCloseDeleteDialog,
  onCloseSettingsDialog,
  onAvatarChange,
  onBioTextChange,
  onBioSave,
  onDeleteProfile,
  onSettingsDataChange,
  onSettingsSave,
}: ProfileDialogsProps) => {
  return (
    <>
      <Dialog open={showAvatarDialog} onOpenChange={onCloseAvatarDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Выберите стиль аватара</DialogTitle>
            <DialogDescription>
              Выберите один из доступных стилей для вашего аватара
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {avatarStyles.map((style) => (
              <button
                key={style.style}
                onClick={() => onAvatarChange(style.style, style.url)}
                className={`p-4 rounded-lg border-2 transition-all hover:border-primary ${
                  user.avatar === style.url ? "border-primary bg-primary/10" : "border-border"
                }`}
              >
                <img src={style.url} alt={style.name} className="w-full aspect-square rounded-lg mb-2" />
                <p className="text-sm font-medium text-center">{style.name}</p>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRewardsDialog} onOpenChange={onCloseRewardsDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Награды за уровни</DialogTitle>
            <DialogDescription>
              Вознаграждения, которые вы получите за достижение каждого уровня
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 mt-4">
            {allLevelRewards.map((reward) => (
              <div
                key={reward.level}
                className={`p-4 rounded-lg border flex items-center justify-between ${
                  reward.level % 25 === 0
                    ? "bg-yellow-500/10 border-yellow-500"
                    : reward.level % 10 === 0
                    ? "bg-purple-500/10 border-purple-500"
                    : reward.level % 5 === 0
                    ? "bg-blue-500/10 border-blue-500"
                    : "bg-muted/50 border-border"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-lg">
                    {reward.level}
                  </div>
                  <div>
                    <p className="font-semibold">{reward.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Gem" size={14} />
                      <span>{reward.gems} кристаллов</span>
                    </div>
                  </div>
                </div>
                {reward.level % 25 === 0 && (
                  <Icon name="Crown" size={24} className="text-yellow-500" />
                )}
                {reward.level % 10 === 0 && reward.level % 25 !== 0 && (
                  <Icon name="Star" size={24} className="text-purple-500" />
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBioDialog} onOpenChange={onCloseBioDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать информацию о себе</DialogTitle>
            <DialogDescription>
              Расскажите о себе другим игрокам
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <textarea
              value={bioText}
              onChange={(e) => onBioTextChange(e.target.value)}
              className="w-full min-h-[120px] p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Расскажите о себе..."
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{bioText.length}/500</span>
              <div className="flex gap-2">
                <Button onClick={onCloseBioDialog} variant="outline">
                  Отмена
                </Button>
                <Button onClick={onBioSave}>
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={onCloseDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить профиль?</DialogTitle>
            <DialogDescription>
              Это действие нельзя отменить. Все данные профиля будут удалены навсегда.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button onClick={onCloseDeleteDialog} variant="outline" className="flex-1">
              Отмена
            </Button>
            <Button onClick={onDeleteProfile} variant="destructive" className="flex-1">
              Удалить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSettingsDialog} onOpenChange={onCloseSettingsDialog}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Настройки профиля</DialogTitle>
            <DialogDescription>
              Измените информацию о вашем аккаунте
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                value={settingsData.username}
                onChange={(e) => onSettingsDataChange('username', e.target.value)}
                placeholder="Ваше имя"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Электронная почта</Label>
              <Input
                id="email"
                type="email"
                value={settingsData.email}
                onChange={(e) => onSettingsDataChange('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Новый пароль</Label>
              <Input
                id="password"
                type="password"
                value={settingsData.password}
                onChange={(e) => onSettingsDataChange('password', e.target.value)}
                placeholder="Оставьте пустым, чтобы не менять"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthdate">Дата рождения</Label>
              <Input
                id="birthdate"
                type="date"
                value={settingsData.birthdate}
                onChange={(e) => onSettingsDataChange('birthdate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-bio">Описание аккаунта</Label>
              <textarea
                id="settings-bio"
                value={settingsData.bio}
                onChange={(e) => onSettingsDataChange('bio', e.target.value)}
                className="w-full min-h-[100px] p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Расскажите о себе..."
                maxLength={500}
              />
              <span className="text-xs text-muted-foreground">{settingsData.bio.length}/500</span>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={onCloseSettingsDialog} variant="outline" className="flex-1">
                Отмена
              </Button>
              <Button onClick={onSettingsSave} className="flex-1">
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileDialogs;