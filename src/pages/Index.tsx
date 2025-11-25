import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCard from "@/components/AnimatedCard";
import VirtualAssistant from "@/components/VirtualAssistant";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

const Index = () => {
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [serverStatus, setServerStatus] = useState<'loading' | 'online' | 'offline'>('loading');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/97b19ffd-bf8c-421a-9ae5-ee754557f899');
        const data = await response.json();
        
        if (data.status === 'online') {
          setOnlinePlayers(data.online);
          setServerStatus('online');
        } else {
          setServerStatus('offline');
        }
      } catch (error) {
        console.error('Failed to fetch server status:', error);
        setServerStatus('offline');
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30 animate-gradient relative">
      <ParticlesBackground />
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Imunns RolePlay
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="/forum" className="font-bold text-purple-300 hover:text-primary transition-colors">Форум</a>
            <a href="/stats" className="font-bold text-purple-300 hover:text-primary transition-colors">Топ игроков</a>
            <a href="/jobs" className="font-bold text-purple-300 hover:text-primary transition-colors">Работа</a>
            <a href="/admin" className="font-bold text-purple-300 hover:text-primary transition-colors">Администрация</a>
            <a href="/rules" className="font-bold text-purple-300 hover:text-primary transition-colors">Правила</a>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Button variant="outline" className="border-primary/50 hover:bg-primary/10" onClick={() => window.location.href = '/profile'}>
                  <Icon name="User" className="mr-2" size={18} />
                  Личный кабинет
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
              </>
            ) : (
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90" onClick={() => window.location.href = '/login'}>
                Вход
              </Button>
            )}
          </div>
        </div>
      </nav>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/dcf1cba3-9e07-46fe-b42b-0c4da2f135f9.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Imunns RolePlay
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90">
              Погрузись в мир ролевой игры с уникальными квестами и персонажами
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur border border-primary/30 rounded-full">
                {serverStatus === 'loading' && (
                  <>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-foreground/90">Проверка сервера...</span>
                  </>
                )}
                {serverStatus === 'online' && (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-foreground/90">
                      <span className="font-bold text-primary">{onlinePlayers}</span> игроков онлайн
                    </span>
                  </>
                )}
                {serverStatus === 'offline' && (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-foreground/90">Сервер оффлайн</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8" onClick={() => window.location.href = '/login'}>
                <Icon name="LogIn" className="mr-2" size={20} />
                Вход
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 text-lg px-8" asChild>
                <a href="https://t.me/imunns" target="_blank" rel="noopener noreferrer">
                  <Icon name="Users" className="mr-2" size={20} />
                  Сообщество
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Наши Сервера
            </h2>
            <p className="text-foreground/70 text-lg">
              Выбери свой сервер и начни приключение
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <AnimatedCard delay={0}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card 
                      className="p-6 bg-gradient-to-br from-card/50 to-primary/10 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all h-full cursor-pointer"
                      onClick={() => window.location.href = '/login'}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon name="Server" className="text-primary" size={32} />
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Imunns rolep play</h3>
                      <p className="text-foreground/70 mb-4">Добро пожаловать на наш уникальный Minecraft-сервер с роле-плей системой! </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Users" size={16} className="text-primary" />
                        <span className="text-foreground/80">Онлайн: 247</span>
                      </div>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-sm bg-card/95 backdrop-blur border-primary/50 shadow-[0_0_20px_rgba(168,85,247,0.4)] p-4">
                    <p className="font-semibold mb-2 text-base">🎮 Основной сервер</p>
                    <p className="text-sm text-foreground/90 mb-3">Добро пожаловать на наш уникальный Minecraft-сервер с роле-плей системой! Здесь у вас есть возможность стать кем угодно — будь то могущественный маг, отважный воин, талантливый фермер или бизнесмен. </p>
                    <div className="space-y-1 border-t border-border/30 pt-2">
                      <p className="text-sm text-foreground/80"><span className="font-semibold">IP:</span> play.imunns.ru</p>
                      <p className="text-sm text-foreground/80"><span className="font-semibold">Версия:</span> 1.20.1</p>
                      <p className="text-sm text-foreground/80"><span className="font-semibold">Режим:</span> RolePlay</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AnimatedCard>
            <AnimatedCard delay={100}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card 
                      className="p-6 bg-gradient-to-br from-card/50 to-accent/10 backdrop-blur border-border/50 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] transition-all h-full cursor-pointer"
                      onClick={() => window.location.href = '/login'}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon name="Server" className="text-accent" size={32} />
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">ISWAR</h3>
                      <p className="text-foreground/70 mb-4">PvP арена и турниры</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Users" size={16} className="text-accent" />
                        <span className="text-foreground/80">Онлайн: 189</span>
                      </div>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs bg-card/95 backdrop-blur border-accent/50 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                    <p className="font-semibold mb-1">⚔️ PvP Сервер</p>
                    <p className="text-sm text-foreground/80">IP: pvp.imunns.ru</p>
                    <p className="text-sm text-foreground/80">Версия: 1.20.1</p>
                    <p className="text-sm text-foreground/80">Режим: PvP Arena</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AnimatedCard>
            <AnimatedCard delay={200}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card 
                      className="p-6 bg-gradient-to-br from-card/50 to-primary/10 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all h-full cursor-pointer"
                      onClick={() => window.location.href = '/login'}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon name="Server" className="text-primary" size={32} />
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Сервер #3</h3>
                      <p className="text-foreground/70 mb-4">Ролевой сервер</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Users" size={16} className="text-primary" />
                        <span className="text-foreground/80">Онлайн: 156</span>
                      </div>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs bg-card/95 backdrop-blur border-primary/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    <p className="font-semibold mb-1">🎭 Ролевой Сервер</p>
                    <p className="text-sm text-foreground/80">IP: rp.imunns.ru</p>
                    <p className="text-sm text-foreground/80">Версия: 1.19.4</p>
                    <p className="text-sm text-foreground/80">Режим: Hardcore RP</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AnimatedCard>
            <AnimatedCard delay={300}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card 
                      className="p-6 bg-gradient-to-br from-card/50 to-accent/10 backdrop-blur border-border/50 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] transition-all h-full cursor-pointer"
                      onClick={() => window.location.href = '/login'}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon name="Server" className="text-accent" size={32} />
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Сервер #4</h3>
                      <p className="text-foreground/70 mb-4">Тестовый сервер</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Users" size={16} className="text-accent" />
                        <span className="text-foreground/80">Онлайн: 43</span>
                      </div>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs bg-card/95 backdrop-blur border-accent/50 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                    <p className="font-semibold mb-1">🧪 Тестовый Сервер</p>
                    <p className="text-sm text-foreground/80">IP: test.imunns.ru</p>
                    <p className="text-sm text-foreground/80">Версия: 1.21-snapshot</p>
                    <p className="text-sm text-foreground/80">Режим: Experimental</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AnimatedCard>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Форум
            </h2>
            <p className="text-foreground/70 text-lg">
              Общайся с игроками, делись опытом и находи новых друзей
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <AnimatedCard delay={0}>
              <Card 
                className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all h-full cursor-pointer"
                onClick={() => window.location.href = '/forum'}
              >
                <Icon name="MessageSquare" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Обсуждения</h3>
                <p className="text-foreground/70">Последние темы и горячие обсуждения сообщества</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={100}>
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all h-full">
                <Icon name="HelpCircle" className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Помощь</h3>
                <p className="text-foreground/70">Получи ответы на вопросы от опытных игроков</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={200}>
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all h-full">
                <Icon name="Trophy" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Достижения</h3>
                <p className="text-foreground/70">Делись своими успехами и историями</p>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <section id="wiki" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Вики
            </h2>
            <p className="text-foreground/70 text-lg">
              База знаний о мире, персонажах и механиках сервера
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCard delay={0}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-primary/5 backdrop-blur border-border/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all h-full">
                <Icon name="Book" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Квесты</h3>
                <p className="text-foreground/70">Гайды по прохождению сюжетных заданий</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={100}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-accent/5 backdrop-blur border-border/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all h-full">
                <Icon name="Users" className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Персонажи</h3>
                <p className="text-foreground/70">Информация о героях и их историях</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={200}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-primary/5 backdrop-blur border-border/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all h-full">
                <Icon name="Map" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Мир</h3>
                <p className="text-foreground/70">Карты локаций и описание территорий</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={300}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-accent/5 backdrop-blur border-border/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all h-full">
                <Icon name="Sword" className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Механики</h3>
                <p className="text-foreground/70">Правила и особенности геймплея</p>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <section id="discord" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <AnimatedCard>
            <Card className="p-12 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 backdrop-blur border-primary/30">
              <div className="text-center space-y-6">
                <Icon name="MessageCircle" className="text-primary mx-auto" size={64} />
                <h2 className="text-4xl font-bold">Присоединяйся к Discord</h2>
                <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
                  Общайся с игроками в реальном времени, участвуй в событиях и получай актуальную информацию
                </p>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8">
                  <Icon name="ExternalLink" className="mr-2" size={20} />
                  Открыть Discord
                </Button>
              </div>
            </Card>
          </AnimatedCard>
        </div>
      </section>

      <section id="admin" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Администрация
            </h2>
            <p className="text-foreground/70 text-lg">
              Команда, которая делает сервер лучше каждый день
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8">
            {[
              { name: "Artemon228", role: "Администратор", icon: "Shield", badge: "ADMIN", color: "primary", link: "/admin/Artemon228" },
              { name: "JloM", role: "Администратор", icon: "Shield", badge: "ADMIN", color: "primary", link: "/admin/JloM" },
              { name: "Gitilu", role: "Спонсор", icon: "Heart", badge: "SPONSOR", color: "accent", link: "/admin/Gitilu" },
              { name: "demidbrins", role: "Спонсор", icon: "Heart", badge: "SPONSOR", color: "accent", link: "/admin/demidbrins" }
            ].map((member, i) => (
              <AnimatedCard key={i} delay={i * 100}>
                <a href={member.link}>
                  <Card className={`p-6 bg-card/50 backdrop-blur border-border/50 hover:border-${member.color}/50 hover:shadow-[0_0_30px_rgba(${member.color === 'primary' ? '168,85,247' : '236,72,153'},0.4)] transition-all text-center h-full cursor-pointer`}>
                    <div className={`w-20 h-20 mx-auto mb-4 bg-${member.color}/20 rounded-full flex items-center justify-center`}>
                      <Icon name={member.icon as any} className={`text-${member.color}`} size={36} />
                    </div>
                    <span className={`inline-block px-3 py-1 bg-${member.color}/20 text-${member.color} text-xs font-bold rounded-full mb-2`}>
                      {member.badge}
                    </span>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-foreground/70 text-sm">{member.role}</p>
                  </Card>
                </a>
              </AnimatedCard>
            ))}
          </div>
          <div className="text-center">
            <a href="/admin">
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                <Icon name="Users" className="mr-2" size={20} />
                Вся команда
              </Button>
            </a>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" className="text-white" size={16} />
                </div>
                <span className="text-xl font-bold">Imunns RolePlay</span>
              </div>
              <p className="text-foreground/70">
                Лучший Minecraft RolePlay сервер с уникальными квестами и дружным сообществом
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <div className="space-y-2">
                <a href="#forum" className="block text-foreground/70 hover:text-primary transition-colors">Форум</a>
                <a href="#wiki" className="block text-foreground/70 hover:text-primary transition-colors">Вики</a>
                <a href="#discord" className="block text-foreground/70 hover:text-primary transition-colors">Discord</a>
                <a href="#updates" className="block text-foreground/70 hover:text-primary transition-colors">Обнова</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2">
                <p className="text-foreground/70">Email: imunns@yandex.ru</p>
                <p className="text-foreground/70">Discord: imunns.gg</p>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-border/50">
            <p className="text-foreground/50">
              © 2025 Imunns RolePlay. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
      <VirtualAssistant />
    </div>
  );
};

export default Index;