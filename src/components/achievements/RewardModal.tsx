import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress: number;
  category: string;
  reward: { gems: number; exp: number; coins?: number };
  claimed: boolean;
}

interface RewardModalProps {
  show: boolean;
  reward: Achievement | null;
  onClose: () => void;
}

const RewardModal = ({ show, reward, onClose }: RewardModalProps) => {
  if (!show || !reward) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <Card className="max-w-md w-full p-8 bg-gradient-to-br from-yellow-500/20 to-purple-500/20 border-4 border-yellow-400/80 animate-scale-in">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-purple-300 bg-clip-text text-transparent">
            Награда получена!
          </h2>
          <p className="text-lg mb-6 text-foreground/80">{reward.name}</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center gap-3 text-2xl font-bold">
              <Icon name="Gem" size={32} className="text-purple-400" />
              <span className="text-purple-300">+{reward.reward.gems} гемов</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-2xl font-bold">
              <Icon name="Zap" size={32} className="text-blue-400" />
              <span className="text-blue-300">+{reward.reward.exp} опыта</span>
            </div>
            {reward.reward.coins && (
              <div className="flex items-center justify-center gap-3 text-2xl font-bold">
                <Icon name="Coins" size={32} className="text-yellow-400" />
                <span className="text-yellow-300">+{reward.reward.coins} монет</span>
              </div>
            )}
          </div>
          
          <Button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg font-bold py-6"
          >
            Отлично!
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RewardModal;
