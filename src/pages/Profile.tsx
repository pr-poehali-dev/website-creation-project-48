import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useState } from "react";

const Profile = () => {
  const [user] = useState({
    username: "Player123",
    email: "player@example.com",
    level: 0,
    exp: 0,
    gems: 0,
    joinDate: "15 января 2025",
    playTime: "0 часов",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player123"
  });

  const [stats] = useState({
    kills: 0,
    deaths: 0,
    quests: 0,
    achievements: 0
  });

  const expToNextLevel = 1000;
  const currentLevelExp = user.exp % expToNextLevel;
  const expProgress = (currentLevelExp / expToNextLevel) * 100;

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
            <a href="/profile" className="text-primary font-bold transition-colors">Профиль</a>
            <a href="/forum" className="font-bold text-purple-300 hover:text-primary transition-colors">Форум</a>
            <a href="/stats" className="font-bold text-purple-300 hover:text-primary transition-colors">Топ игроков</a>
            <a href="/admin" className="font-bold text-purple-300 hover:text-primary transition-colors">Администрация</a>
          </div>
          <Button 
            variant="outline" 
            className="border-primary/50 hover:bg-primary/10"
            onClick={() => window.location.href = '/'}
          >
            <Icon name="LogOut" className="mr-2" size={18} />
            Выход
          </Button>
        </div>
      </nav>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary via-accent to-primary"></div>
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8">
                <div className="w-32 h-32 rounded-full border-4 border-background bg-card overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                  <img src={user.avatar} alt="Avatar" className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-1">{user.username}</h1>
                      <p className="text-foreground/60">{user.email}</p>
                      <p className="text-sm text-foreground/50">Играет с {user.joinDate}</p>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      onClick={() => window.location.href = '/settings'}
                    >
                      <Icon name="Settings" className="mr-2" size={18} />
                      Настройки
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card className="p-4 bg-gradient-to-br from-card/50 to-primary/10 backdrop-blur border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name="TrendingUp" className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.level}</p>
                      <p className="text-sm text-foreground/60">Уровень</p>
                    </div>
                  </div>
                  <div className="w-full bg-background rounded-full h-2 overflow-hidden mb-1">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${expProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-foreground/50">
                    {currentLevelExp} / {expToNextLevel} опыта
                  </p>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-card/50 to-primary/10 backdrop-blur border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name="Gem" className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.gems}</p>
                      <p className="text-sm text-foreground/60">Кристаллы</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-card/50 to-accent/10 backdrop-blur border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" className="text-accent" size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.playTime}</p>
                      <p className="text-sm text-foreground/60">Игровое время</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-card/30 backdrop-blur border-border/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="BarChart3" className="text-primary" size={24} />
                    Статистика
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">Убийств</span>
                      <span className="font-bold text-lg">{stats.kills}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">Смертей</span>
                      <span className="font-bold text-lg">{stats.deaths}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">K/D Ratio</span>
                      <span className="font-bold text-lg text-primary">
                        {stats.deaths > 0 ? (stats.kills / stats.deaths).toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/70">Квестов выполнено</span>
                      <span className="font-bold text-lg">{stats.quests}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card/30 backdrop-blur border-border/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Trophy" className="text-accent" size={24} />
                    Достижения
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-primary/30">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="Sword" className="text-primary" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Первая кровь</p>
                        <p className="text-sm text-foreground/60">Убей первого игрока</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-accent/30">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Icon name="Star" className="text-accent" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Новичок</p>
                        <p className="text-sm text-foreground/60">Достигни 10 уровня</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-primary/30">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="Users" className="text-primary" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Командный игрок</p>
                        <p className="text-sm text-foreground/60">Вступи в гильдию</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={() => window.location.href = '/achievements'}
                  >
                    <Icon name="Trophy" className="mr-2" size={18} />
                    Все достижения ({stats.achievements}/50)
                  </Button>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Profile;