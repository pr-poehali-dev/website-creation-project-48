import { Button } from "@/components/ui/button";
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
  user: User;
  avatarStyles: AvatarStyle[];
  allLevelRewards: LevelReward[];
  bioText: string;
  onCloseAvatarDialog: () => void;
  onCloseRewardsDialog: () => void;
  onCloseBioDialog: () => void;
  onCloseDeleteDialog: () => void;
  onAvatarChange: (style: string, url: string) => void;
  onBioTextChange: (text: string) => void;
  onBioSave: () => void;
  onDeleteProfile: () => void;
}

const ProfileDialogs = ({
  showAvatarDialog,
  showRewardsDialog,
  showBioDialog,
  showDeleteDialog,
  user,
  avatarStyles,
  allLevelRewards,
  bioText,
  onCloseAvatarDialog,
  onCloseRewardsDialog,
  onCloseBioDialog,
  onCloseDeleteDialog,
  onAvatarChange,
  onBioTextChange,
  onBioSave,
  onDeleteProfile,
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
    </>
  );
};

export default ProfileDialogs;
