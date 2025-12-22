import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";

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

interface AchievementsListProps {
  achievements: Achievement[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClaimReward: (achievement: Achievement) => void;
  getColorClasses: (color: string, unlocked: boolean, claimed: boolean) => string;
}

const AchievementsList = ({
  achievements,
  categories,
  selectedCategory,
  onCategoryChange,
  onClaimReward,
  getColorClasses
}: AchievementsListProps) => {
  const filteredAchievements = selectedCategory === "Все" 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={`border-primary/50 hover:bg-primary/10 whitespace-nowrap transition-all ${
              selectedCategory === category ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {filteredAchievements.map((achievement) => (
          <AnimatedCard key={achievement.id} delay={0.1 * (achievement.id % 6)}>
            <Card 
              className={`p-6 border-2 transition-all duration-300 ${
                getColorClasses(achievement.color, achievement.unlocked, achievement.claimed)
              } ${achievement.unlocked && !achievement.claimed ? 'shadow-2xl animate-pulse-slow' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  !achievement.unlocked ? 'bg-gray-500/30' :
                  achievement.claimed ? 'bg-green-500/30' :
                  'bg-gradient-to-br from-white/20 to-white/5'
                }`}>
                  <Icon name={achievement.icon as any} size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{achievement.name}</h3>
                  <p className="text-sm opacity-80 mb-3">{achievement.description}</p>
                  
                  {achievement.unlocked && !achievement.claimed && (
                    <div className="mb-3 p-2 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 rounded border border-yellow-400/50">
                      <div className="text-xs font-bold text-yellow-300 mb-1">🎁 Награда:</div>
                      <div className="flex gap-3 text-xs">
                        <span className="flex items-center gap-1">
                          <Icon name="Gem" size={14} className="text-purple-400" />
                          +{achievement.reward.gems}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Zap" size={14} className="text-blue-400" />
                          +{achievement.reward.exp}
                        </span>
                        {achievement.reward.coins && (
                          <span className="flex items-center gap-1">
                            <Icon name="Coins" size={14} className="text-yellow-400" />
                            +{achievement.reward.coins}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {!achievement.unlocked && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1 opacity-70">
                        <span>Прогресс</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-card/30 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {achievement.unlocked && !achievement.claimed && (
                    <Button 
                      onClick={() => onClaimReward(achievement)}
                      className="w-full bg-gradient-to-r from-yellow-500 to-purple-500 hover:from-yellow-600 hover:to-purple-600 font-bold shadow-lg"
                    >
                      <Icon name="Gift" className="mr-2" size={18} />
                      Получить награду
                    </Button>
                  )}
                  
                  {achievement.claimed && (
                    <div className="flex items-center justify-center gap-2 text-green-400 font-bold">
                      <Icon name="CheckCircle" size={20} />
                      <span>Награда получена</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;
