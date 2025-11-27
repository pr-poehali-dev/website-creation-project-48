import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  level: number;
  maxLevel: number;
  effect: string;
}

interface UpgradeShopProps {
  upgrades: Upgrade[];
  money: number;
  onBuyUpgrade: (upgradeId: string) => void;
  onClose: () => void;
}

const UpgradeShop = ({ upgrades, money, onBuyUpgrade, onClose }: UpgradeShopProps) => {
  return (
    <Card className="p-6 bg-purple-500/10 backdrop-blur border-purple-500/30 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Icon name="ShoppingCart" size={24} />
          Магазин улучшений
        </h2>
        <Button onClick={onClose} variant="outline" size="sm">
          <Icon name="X" size={16} />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upgrades.map(upgrade => {
          const cost = upgrade.cost * (upgrade.level + 1);
          const canAfford = money >= cost;
          const maxed = upgrade.level >= upgrade.maxLevel;
          
          return (
            <Card key={upgrade.id} className="p-4 bg-white/5 backdrop-blur border-white/20">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Icon name={upgrade.icon} size={24} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{upgrade.name}</h3>
                  <p className="text-sm text-white/60">{upgrade.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1">
                  {Array.from({ length: upgrade.maxLevel }).map((_, i) => (
                    <div key={i} className={`w-8 h-2 rounded-full ${i < upgrade.level ? 'bg-purple-500' : 'bg-white/10'}`} />
                  ))}
                </div>
                <span className="text-xs text-white/60">
                  {upgrade.level}/{upgrade.maxLevel}
                </span>
              </div>
              
              <Button 
                onClick={() => onBuyUpgrade(upgrade.id)}
                disabled={!canAfford || maxed}
                className="w-full"
                variant={maxed ? "outline" : canAfford ? "default" : "outline"}
              >
                {maxed ? (
                  <>
                    <Icon name="CheckCircle" size={16} className="mr-2" />
                    Максимум
                  </>
                ) : (
                  <>
                    <Icon name="Coins" size={16} className="mr-2" />
                    {cost} ₽
                  </>
                )}
              </Button>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default UpgradeShop;
