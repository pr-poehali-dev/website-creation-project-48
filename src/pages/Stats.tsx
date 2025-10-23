import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCard from "@/components/AnimatedCard";
import MobileMenu from "@/components/MobileMenu";

const Stats = () => {
  const topPlayers = [
    { rank: 1, name: "Artemon228", playerKills: 2847, mobKills: 45230, deaths: 892, playtime: "520ч 15м" },
    { rank: 2, name: "JloM", playerKills: 2156, mobKills: 38940, deaths: 743, playtime: "492ч 40м" },
    { rank: 3, name: "Gitilu", playerKills: 1923, mobKills: 35680, deaths: 658, playtime: "438ч 22м" },
    { rank: 4, name: "demidbrins", playerKills: 1764, mobKills: 32450, deaths: 612, playtime: "408ч 55м" },
    { rank: 5, name: "den_master", playerKills: 1598, mobKills: 29870, deaths: 581, playtime: "384ч 18м" },
    { rank: 6, name: "StormBringer", playerKills: 1432, mobKills: 27340, deaths: 554, playtime: "354ч 33м" },
    { rank: 7, name: "FireMage", playerKills: 1289, mobKills: 25120, deaths: 523, playtime: "333ч 47м" },
    { rank: 8, name: "IceQueen", playerKills: 1156, mobKills: 22890, deaths: 498, playtime: "317ч 29м" },
    { rank: 9, name: "ThunderGod", playerKills: 1045, mobKills: 20650, deaths: 472, playtime: "300ч 14м" },
    { rank: 10, name: "WindWalker", playerKills: 942, mobKills: 18420, deaths: 448, playtime: "284ч 52м" },
  ].map(player => ({
    ...player,
    kd: (player.playerKills / player.deaths).toFixed(2)
  }));

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
            <a href="/stats" className="text-primary font-bold transition-colors">Топ игроков</a>
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
              Топ игроков
            </h1>
            <p className="text-foreground/70 text-lg mb-4">
              Лучшие игроки сервера по статистике
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm text-foreground/70">Обновляется каждую неделю</span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="space-y-4">
              {topPlayers.map((player, index) => (
                <AnimatedCard key={index} delay={index * 30}>
                  <Card className={`p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all ${
                    player.rank <= 3 ? 'bg-gradient-to-r from-card/50 to-primary/10' : ''
                  }`}>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 flex items-center justify-center rounded-full font-bold text-2xl flex-shrink-0 ${
                          player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg shadow-yellow-500/50' :
                          player.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg shadow-gray-400/50' :
                          player.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/50' :
                          'bg-primary/20 text-primary'
                        }`}>
                          #{player.rank}
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-bold mb-1">{player.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-foreground/60">
                            <Icon name="Clock" size={14} />
                            <span>{player.playtime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 w-full lg:w-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon name="Sword" size={14} className="text-primary" />
                              <span className="text-xs text-foreground/60">Убийств игроков</span>
                            </div>
                            <div className="text-lg font-bold">{player.playerKills.toLocaleString()}</div>
                          </div>
                          
                          <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon name="Target" size={14} className="text-accent" />
                              <span className="text-xs text-foreground/60">Убийств мобов</span>
                            </div>
                            <div className="text-lg font-bold">{player.mobKills.toLocaleString()}</div>
                          </div>
                          
                          <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon name="Skull" size={14} className="text-red-400" />
                              <span className="text-xs text-foreground/60">Смертей</span>
                            </div>
                            <div className="text-lg font-bold">{player.deaths.toLocaleString()}</div>
                          </div>
                          
                          <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon name="Trophy" size={14} className="text-yellow-400" />
                              <span className="text-xs text-foreground/60">K/D</span>
                            </div>
                            <div className="text-lg font-bold">{player.kd}</div>
                          </div>
                        </div>
                      </div>

                      {player.rank <= 3 && (
                        <Icon 
                          name="Crown" 
                          className={`flex-shrink-0 ${
                            player.rank === 1 ? 'text-yellow-400' :
                            player.rank === 2 ? 'text-gray-400' :
                            'text-orange-400'
                          }`}
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