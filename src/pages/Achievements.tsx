import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCard from "@/components/AnimatedCard";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      name: "Первая кровь",
      description: "Убей первого игрока",
      icon: "Sword",
      color: "primary",
      unlocked: false,
      progress: 0,
      category: "PvP",
      reward: { gems: 5, exp: 50 }
    },
    {
      id: 2,
      name: "Новичок",
      description: "Достигни 10 уровня",
      icon: "Star",
      color: "accent",
      unlocked: false,
      progress: 0,
      category: "Прогресс",
      reward: { gems: 10, exp: 100 }
    },
    {
      id: 3,
      name: "Командный игрок",
      description: "Вступи в гильдию",
      icon: "Users",
      color: "primary",
      unlocked: false,
      progress: 0,
      category: "Социальное",
      reward: { gems: 8, exp: 75 }
    },
    {
      id: 4,
      name: "Ветеран",
      description: "Достигни 50 уровня",
      icon: "Award",
      color: "accent",
      unlocked: false,
      progress: 0,
      category: "Прогресс",
      reward: { gems: 25, exp: 250 }
    },
    {
      id: 5,
      name: "Убийца",
      description: "Убей 100 игроков",
      icon: "Skull",
      color: "primary",
      unlocked: false,
      progress: 0,
      category: "PvP",
      reward: { gems: 15, exp: 150 }
    },
    {
      id: 6,
      name: "Торговец",
      description: "Заработай 10000 монет",
      icon: "Coins",
      color: "accent",
      unlocked: false,
      progress: 0,
      category: "Экономика",
      reward: { gems: 20, exp: 200 }
    },
    {
      id: 7,
      name: "Исследователь",
      description: "Посети все локации",
      icon: "Map",
      color: "primary",
      unlocked: false,
      progress: 0,
      category: "Исследование",
      reward: { gems: 18, exp: 180 }
    },
    {
      id: 8,
      name: "Квестовый мастер",
      description: "Выполни 100 квестов",
      icon: "CheckCircle",
      color: "accent",
      unlocked: false,
      progress: 0,
      category: "Квесты",
      reward: { gems: 30, exp: 300 }
    },
    {
      id: 9,
      name: "Миллионер",
      description: "Заработай 1000000 монет",
      icon: "DollarSign",
      color: "primary",
      unlocked: false,
      progress: 0,
      category: "Экономика",
      reward: { gems: 100, exp: 500 }
    },
    {
      id: 10,
      name: "Легенда",
      description: "Достигни 100 уровня",
      icon: "Crown",
      color: "accent",
      unlocked: false,
      progress: 0,
      category: "Прогресс",
      reward: { gems: 200, exp: 1000 }
    },
    {
      id: 11,
      name: "Неуязвимый",
      description: "Убей 10 игроков подряд без смерти",
      icon: "Shield",
      color: "primary",
      unlocked: false,
      progress: 0,
      category: "PvP",
      reward: { gems: 22, exp: 220 }
    },
    {
      id: 12,
      name: "Коллекционер",
      description: "Собери все редкие предметы",
      icon: "Package",
      color: "accent",
      unlocked: false,
      progress: 0,
      category: "Коллекции",
      reward: { gems: 40, exp: 400 }
    },
    {
      id: 13,
      name: "Друг народа",
      description: "Пригласи 10 друзей",
      icon: "Heart",
      color: "primary",
      unlocked: false,
      progress: 0,
      category: "Социальное",
      reward: { gems: 12, exp: 120 }
    },
    {
      id: 14,
      name: "Строитель",
      description: "Построй 50 зданий",
      icon: "Home",
      color: "accent",
      unlocked: false,
      progress: 0,
      category: "Строительство",
      reward: { gems: 28, exp: 280 }
    },
    {
      id: 15,
      name: "Мастер крафта",
      description: "Создай 500 предметов",
      icon: "Wrench",
      color: "primary",
      unlocked: false,
      progress: 0,
      category: "Крафт",
      reward: { gems: 35, exp: 350 }
    }
  ];

  const categories = ["Все", "PvP", "Прогресс", "Социальное", "Экономика", "Квесты", "Исследование", "Коллекции", "Строительство", "Крафт"];
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30 animate-gradient relative">
      <ParticlesBackground />
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
            <a href="/profile" className="font-bold text-purple-300 hover:text-primary transition-colors">Профиль</a>
            <a href="/achievements" className="text-primary font-bold transition-colors">Достижения</a>
            <a href="/forum" className="font-bold text-purple-300 hover:text-primary transition-colors">Форум</a>
            <a href="/stats" className="font-bold text-purple-300 hover:text-primary transition-colors">Топ игроков</a>
          </div>
          <Button 
            variant="outline" 
            className="border-primary/50 hover:bg-primary/10"
            onClick={() => window.location.href = '/profile'}
          >
            <Icon name="User" className="mr-2" size={18} />
            Профиль
          </Button>
        </div>
      </nav>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Достижения
            </h1>
            <p className="text-foreground/70 text-lg">
              Открыто {unlockedCount} из {totalCount} достижений
            </p>
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
                className="border-primary/50 hover:bg-primary/10 whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AnimatedCard key={achievement.id} delay={index * 50}>
                <Card 
                  className={`p-6 bg-card/50 backdrop-blur border-border/50 transition-all h-full ${
                    achievement.unlocked 
                      ? `border-${achievement.color}/50 hover:shadow-[0_0_30px_rgba(${achievement.color === 'primary' ? '168,85,247' : '236,72,153'},0.4)]`
                      : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 bg-${achievement.color}/20 rounded-lg flex items-center justify-center flex-shrink-0 ${!achievement.unlocked && 'opacity-50'}`}>
                      <Icon 
                        name={achievement.icon as any} 
                        className={`text-${achievement.color}`} 
                        size={32} 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-xl font-bold">{achievement.name}</h3>
                        {achievement.unlocked && (
                          <Icon name="Check" className="text-green-500" size={20} />
                        )}
                      </div>
                      <p className="text-sm text-foreground/70 mb-2">{achievement.description}</p>
                      <span className={`inline-block px-2 py-1 bg-${achievement.color}/20 text-${achievement.color} text-xs font-semibold rounded-full`}>
                        {achievement.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground/70">Награда:</span>
                      </div>
                      <div className="flex items-center justify-between bg-primary/10 px-3 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon name="Zap" className="text-accent" size={16} />
                          <span className="text-sm">Опыт</span>
                        </div>
                        <span className="font-semibold text-sm">+{achievement.reward.exp}</span>
                      </div>
                      <div className="flex items-center justify-between bg-primary/10 px-3 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon name="Gem" className="text-primary" size={16} />
                          <span className="text-sm">Кристаллы</span>
                        </div>
                        <span className="font-semibold text-sm">+{achievement.reward.gems}</span>
                      </div>
                    </div>
                  </div>

                  {!achievement.unlocked && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-foreground/60">Прогресс</span>
                        <span className="font-semibold">{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r from-${achievement.color} to-accent transition-all duration-500`}
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;