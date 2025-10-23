import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCard from "@/components/AnimatedCard";
import MobileMenu from "@/components/MobileMenu";

const Stats = () => {
  const topPlayers = [
    { rank: 1, name: "ProGamer2024", level: 95, points: 15420, hours: 1250 },
    { rank: 2, name: "MegaWarrior", level: 92, points: 14890, hours: 1180 },
    { rank: 3, name: "ShadowHunter", level: 89, points: 13560, hours: 1050 },
    { rank: 4, name: "DragonSlayer", level: 87, points: 12340, hours: 980 },
    { rank: 5, name: "NightRider", level: 85, points: 11920, hours: 920 },
    { rank: 6, name: "StormBringer", level: 82, points: 10850, hours: 850 },
    { rank: 7, name: "FireMage", level: 80, points: 10230, hours: 800 },
    { rank: 8, name: "IceQueen", level: 78, points: 9640, hours: 760 },
    { rank: 9, name: "ThunderGod", level: 76, points: 9120, hours: 720 },
    { rank: 10, name: "WindWalker", level: 74, points: 8590, hours: 680 },
  ];

  const serverStats = [
    { label: "Всего игроков", value: "12,847", icon: "Users", color: "primary" },
    { label: "Активных сегодня", value: "3,421", icon: "Activity", color: "accent" },
    { label: "Квестов завершено", value: "45,829", icon: "CheckCircle", color: "primary" },
    { label: "Часов наиграно", value: "287,942", icon: "Clock", color: "accent" },
  ];

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
            <a href="/forum" className="font-bold text-purple-300 hover:text-primary transition-colors">Форум</a>
            <a href="/wiki" className="font-bold text-purple-300 hover:text-primary transition-colors">Вики</a>
            <a href="/stats" className="text-primary font-bold transition-colors">Статистика</a>
            <a href="/jobs" className="font-bold text-purple-300 hover:text-primary transition-colors">Работа</a>
            <a href="/admin" className="font-bold text-purple-300 hover:text-primary transition-colors">Администрация</a>
          </div>
          <MobileMenu currentPath="/stats" />
          <Button className="hidden md:block bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Играть
          </Button>
        </div>
      </nav>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Статистика сервера
            </h1>
            <p className="text-foreground/70 text-lg">
              Рейтинги игроков и достижения сообщества
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {serverStats.map((stat, index) => (
              <AnimatedCard key={index} delay={index * 50}>
                <Card className={`p-6 bg-card/50 backdrop-blur border-border/50 hover:border-${stat.color}/50 hover:shadow-[0_0_30px_rgba(${stat.color === 'primary' ? '168,85,247' : '236,72,153'},0.4)] transition-all`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-${stat.color}/20 rounded-full flex items-center justify-center`}>
                      <Icon name={stat.icon as any} className={`text-${stat.color}`} size={28} />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <div className="text-foreground/60 text-sm">{stat.label}</div>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Топ-10 игроков</h2>
            <div className="space-y-4">
              {topPlayers.map((player, index) => (
                <AnimatedCard key={index} delay={index * 30}>
                  <Card className={`p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all ${
                    player.rank <= 3 ? 'bg-gradient-to-r from-card/50 to-primary/10' : ''
                  }`}>
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 flex items-center justify-center rounded-full font-bold text-2xl ${
                        player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg shadow-yellow-500/50' :
                        player.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg shadow-gray-400/50' :
                        player.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/50' :
                        'bg-primary/20 text-primary'
                      }`}>
                        #{player.rank}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{player.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-foreground/60">
                          <span className="flex items-center gap-1">
                            <Icon name="Trophy" size={14} />
                            Уровень {player.level}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Star" size={14} />
                            {player.points.toLocaleString()} очков
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {player.hours}ч
                          </span>
                        </div>
                      </div>

                      {player.rank <= 3 && (
                        <Icon 
                          name="Crown" 
                          className={
                            player.rank === 1 ? 'text-yellow-400' :
                            player.rank === 2 ? 'text-gray-400' :
                            'text-orange-400'
                          }
                          size={32}
                        />
                      )}
                    </div>
                  </Card>
                </AnimatedCard>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Icon name="Award" className="mr-2" size={20} />
                Посмотреть полный рейтинг
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stats;
