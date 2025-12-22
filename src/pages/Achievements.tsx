import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

import AnimatedCard from "@/components/AnimatedCard";
import SpaceBackground from "@/components/SpaceBackground";

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

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [currentReward, setCurrentReward] = useState<Achievement | null>(null);
  const [totalGems, setTotalGems] = useState(0);
  const [totalExp, setTotalExp] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [claimedCount, setClaimedCount] = useState(0);

  const initialAchievements: Achievement[] = [
    {
      id: 1,
      name: "Первая кровь",
      description: "Убей первого игрока",
      icon: "Sword",
      color: "red",
      unlocked: true,
      progress: 100,
      category: "PvP",
      reward: { gems: 5, exp: 50, coins: 100 },
      claimed: false
    },
    {
      id: 2,
      name: "Новичок",
      description: "Достигни 10 уровня",
      icon: "Star",
      color: "yellow",
      unlocked: true,
      progress: 100,
      category: "Прогресс",
      reward: { gems: 10, exp: 100, coins: 250 },
      claimed: false
    },
    {
      id: 3,
      name: "Командный игрок",
      description: "Вступи в гильдию",
      icon: "Users",
      color: "blue",
      unlocked: true,
      progress: 100,
      category: "Социальное",
      reward: { gems: 8, exp: 75, coins: 150 },
      claimed: false
    },
    {
      id: 4,
      name: "Ветеран",
      description: "Достигни 50 уровня",
      icon: "Award",
      color: "purple",
      unlocked: false,
      progress: 45,
      category: "Прогресс",
      reward: { gems: 25, exp: 250, coins: 500 },
      claimed: false
    },
    {
      id: 5,
      name: "Убийца",
      description: "Убей 100 игроков",
      icon: "Skull",
      color: "red",
      unlocked: false,
      progress: 67,
      category: "PvP",
      reward: { gems: 15, exp: 150, coins: 300 },
      claimed: false
    },
    {
      id: 6,
      name: "Торговец",
      description: "Заработай 10000 монет",
      icon: "Coins",
      color: "yellow",
      unlocked: true,
      progress: 100,
      category: "Экономика",
      reward: { gems: 20, exp: 200, coins: 1000 },
      claimed: false
    },
    {
      id: 7,
      name: "Исследователь",
      description: "Посети все локации",
      icon: "Map",
      color: "green",
      unlocked: false,
      progress: 80,
      category: "Исследование",
      reward: { gems: 18, exp: 180, coins: 400 },
      claimed: false
    },
    {
      id: 8,
      name: "Квестовый мастер",
      description: "Выполни 100 квестов",
      icon: "CheckCircle",
      color: "blue",
      unlocked: false,
      progress: 92,
      category: "Квесты",
      reward: { gems: 30, exp: 300, coins: 600 },
      claimed: false
    },
    {
      id: 9,
      name: "Миллионер",
      description: "Заработай 1000000 монет",
      icon: "DollarSign",
      color: "yellow",
      unlocked: false,
      progress: 34,
      category: "Экономика",
      reward: { gems: 100, exp: 500, coins: 5000 },
      claimed: false
    },
    {
      id: 10,
      name: "Легенда",
      description: "Достигни 100 уровня",
      icon: "Crown",
      color: "purple",
      unlocked: false,
      progress: 15,
      category: "Прогресс",
      reward: { gems: 200, exp: 1000, coins: 10000 },
      claimed: false
    },
    {
      id: 11,
      name: "Неуязвимый",
      description: "Убей 10 игроков подряд без смерти",
      icon: "Shield",
      color: "blue",
      unlocked: false,
      progress: 60,
      category: "PvP",
      reward: { gems: 22, exp: 220, coins: 450 },
      claimed: false
    },
    {
      id: 12,
      name: "Коллекционер",
      description: "Собери все редкие предметы",
      icon: "Package",
      color: "purple",
      unlocked: false,
      progress: 55,
      category: "Коллекции",
      reward: { gems: 40, exp: 400, coins: 800 },
      claimed: false
    },
    {
      id: 13,
      name: "Друг народа",
      description: "Пригласи 10 друзей",
      icon: "Heart",
      color: "red",
      unlocked: true,
      progress: 100,
      category: "Социальное",
      reward: { gems: 12, exp: 120, coins: 200 },
      claimed: false
    },
    {
      id: 14,
      name: "Строитель",
      description: "Построй 50 зданий",
      icon: "Home",
      color: "green",
      unlocked: false,
      progress: 72,
      category: "Строительство",
      reward: { gems: 28, exp: 280, coins: 550 },
      claimed: false
    },
    {
      id: 15,
      name: "Мастер крафта",
      description: "Создай 500 предметов",
      icon: "Wrench",
      color: "yellow",
      unlocked: false,
      progress: 88,
      category: "Крафт",
      reward: { gems: 35, exp: 350, coins: 700 },
      claimed: false
    }
  ];

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
    
    const claimed = achievements.filter(a => a.claimed).length;
    setClaimedCount(claimed);
    
    const gems = achievements.filter(a => a.claimed).reduce((sum, a) => sum + a.reward.gems, 0);
    const exp = achievements.filter(a => a.claimed).reduce((sum, a) => sum + a.reward.exp, 0);
    const coins = achievements.filter(a => a.claimed).reduce((sum, a) => sum + (a.reward.coins || 0), 0);
    
    setTotalGems(gems);
    setTotalExp(exp);
    setTotalCoins(coins);
  }, [achievements]);

  const categories = ["Все", "PvP", "Прогресс", "Социальное", "Экономика", "Квесты", "Исследование", "Коллекции", "Строительство", "Крафт"];
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  const claimReward = (achievement: Achievement) => {
    if (!achievement.unlocked || achievement.claimed) return;
    
    setCurrentReward(achievement);
    setShowRewardModal(true);
    
    setAchievements(prev => 
      prev.map(a => 
        a.id === achievement.id ? { ...a, claimed: true } : a
      )
    );
  };

  const getColorClasses = (color: string, unlocked: boolean, claimed: boolean) => {
    if (!unlocked) return 'bg-gray-500/20 border-gray-500/30 text-gray-500';
    if (claimed) return 'bg-green-500/20 border-green-500/50 text-green-400';
    
    const colors: Record<string, string> = {
      red: 'bg-red-500/30 border-red-400 text-red-300 shadow-red-500/50',
      yellow: 'bg-yellow-500/30 border-yellow-400 text-yellow-300 shadow-yellow-500/50',
      blue: 'bg-blue-500/30 border-blue-400 text-blue-300 shadow-blue-500/50',
      purple: 'bg-purple-500/30 border-purple-400 text-purple-300 shadow-purple-500/50',
      green: 'bg-green-500/30 border-green-400 text-green-300 shadow-green-500/50',
    };
    
    return colors[color] || 'bg-primary/30 border-primary text-primary shadow-primary/50';
  };

  const filteredAchievements = selectedCategory === "Все" 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30 animate-gradient relative">
      <SpaceBackground />

      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Crown" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Imunns RolePlay
            </span>
          </a>
          <div className="hidden md:flex items-center gap-2">
            <a href="/forum" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Форум</a>
            <a href="/stats" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Топ игроков</a>
            <a href="/jobs" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Работа</a>
            <a href="/admin" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Администрация</a>
            <a href="/rules" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Правила</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10 rounded-full h-9 w-9" onClick={() => window.location.href = '/profile'}>
              <Icon name="User" size={18} />
            </Button>
            <Button 
              variant="outline" 
              className="border-destructive/50 hover:bg-destructive/10" 
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.location.reload();
              }}
            >
              <Icon name="LogOut" className="mr-2" size={18} />
              Выход
            </Button>
          </div>
        </div>
      </nav>

      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Достижения
            </h1>
            <p className="text-foreground/70 text-lg">
              Открыто {unlockedCount} из {totalCount} достижений · Получено наград: {claimedCount}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-400/50">
                <div className="flex items-center gap-3">
                  <Icon name="Gem" size={32} className="text-purple-400" />
                  <div>
                    <div className="text-2xl font-bold text-purple-300">{totalGems}</div>
                    <div className="text-sm text-purple-400/70">Гемов заработано</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-400/50">
                <div className="flex items-center gap-3">
                  <Icon name="Zap" size={32} className="text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-blue-300">{totalExp}</div>
                    <div className="text-sm text-blue-400/70">Опыта получено</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-400/50">
                <div className="flex items-center gap-3">
                  <Icon name="Coins" size={32} className="text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold text-yellow-300">{totalCoins}</div>
                    <div className="text-sm text-yellow-400/70">Монет заработано</div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="mt-4 w-full bg-card/30 rounded-full h-3 overflow-hidden border border-border/50">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`border-primary/50 hover:bg-primary/10 whitespace-nowrap transition-all ${
                  selectedCategory === category ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          onClick={() => claimReward(achievement)}
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
      </section>

      {showRewardModal && currentReward && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
          <Card className="max-w-md w-full p-8 bg-gradient-to-br from-yellow-500/20 to-purple-500/20 border-4 border-yellow-400/80 animate-scale-in">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-purple-300 bg-clip-text text-transparent">
                Награда получена!
              </h2>
              <p className="text-lg mb-6 text-foreground/80">{currentReward.name}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-3 text-2xl font-bold">
                  <Icon name="Gem" size={32} className="text-purple-400" />
                  <span className="text-purple-300">+{currentReward.reward.gems} гемов</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-2xl font-bold">
                  <Icon name="Zap" size={32} className="text-blue-400" />
                  <span className="text-blue-300">+{currentReward.reward.exp} опыта</span>
                </div>
                {currentReward.reward.coins && (
                  <div className="flex items-center justify-center gap-3 text-2xl font-bold">
                    <Icon name="Coins" size={32} className="text-yellow-400" />
                    <span className="text-yellow-300">+{currentReward.reward.coins} монет</span>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={() => setShowRewardModal(false)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg font-bold py-6"
              >
                Отлично!
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Achievements;
