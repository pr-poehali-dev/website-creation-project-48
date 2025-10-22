import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCard from "@/components/AnimatedCard";
import { useEffect, useState } from "react";

const Index = () => {
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [serverStatus, setServerStatus] = useState<'loading' | 'online' | 'offline'>('loading');

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900/30 via-background to-purple-600/20 animate-gradient relative">
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
            <a href="#forum" className="text-foreground/80 hover:text-primary transition-colors">Форум</a>
            <a href="#wiki" className="text-foreground/80 hover:text-primary transition-colors">Вики</a>
            <a href="#discord" className="text-foreground/80 hover:text-primary transition-colors">Discord</a>
            <a href="#updates" className="text-foreground/80 hover:text-primary transition-colors">Обнова</a>
            <a href="#admin" className="text-foreground/80 hover:text-primary transition-colors">Администрация</a>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Играть
          </Button>
        </div>
      </nav>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/2a3f79be-1eab-41e2-9ccc-cd6a91bd48aa.jpg')] bg-cover bg-center opacity-20"></div>
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
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8">
                <Icon name="Play" className="mr-2" size={20} />
                Начать игру
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

      <section id="forum" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
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
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all h-full">
                <Icon name="MessageSquare" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Обсуждения</h3>
                <p className="text-foreground/70">Последние темы и горячие обсуждения сообщества</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={100}>
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all h-full">
                <Icon name="HelpCircle" className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Помощь</h3>
                <p className="text-foreground/70">Получи ответы на вопросы от опытных игроков</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={200}>
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all h-full">
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
              <Card className="p-6 bg-gradient-to-br from-card/50 to-primary/5 backdrop-blur border-border/50 hover:scale-105 transition-transform h-full">
                <Icon name="Book" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Квесты</h3>
                <p className="text-foreground/70">Гайды по прохождению сюжетных заданий</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={100}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-accent/5 backdrop-blur border-border/50 hover:scale-105 transition-transform h-full">
                <Icon name="Users" className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Персонажи</h3>
                <p className="text-foreground/70">Информация о героях и их историях</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={200}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-primary/5 backdrop-blur border-border/50 hover:scale-105 transition-transform h-full">
                <Icon name="Map" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Мир</h3>
                <p className="text-foreground/70">Карты локаций и описание территорий</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={300}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-accent/5 backdrop-blur border-border/50 hover:scale-105 transition-transform h-full">
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

      <section id="updates" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Обнова
            </h2>
            <p className="text-foreground/70 text-lg">
              Следи за новыми функциями и улучшениями сервера
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatedCard delay={0}>
              <Card className="p-6 bg-card/50 backdrop-blur border-l-4 border-l-primary hover:bg-card/70 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Icon name="Sparkles" className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">Новый сюжетный квест</h3>
                      <span className="text-sm text-primary bg-primary/20 px-2 py-1 rounded">Новое</span>
                    </div>
                    <p className="text-foreground/70 mb-2">
                      Открыта новая цепочка заданий "Тайны древних" с уникальными наградами
                    </p>
                    <span className="text-sm text-foreground/50">15 октября 2025</span>
                  </div>
                </div>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={100}>
              <Card className="p-6 bg-card/50 backdrop-blur border-l-4 border-l-accent hover:bg-card/70 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <Icon name="Settings" className="text-accent" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Обновление механик</h3>
                    <p className="text-foreground/70 mb-2">
                      Улучшена система прокачки навыков и добавлены новые возможности для персонажей
                    </p>
                    <span className="text-sm text-foreground/50">10 октября 2025</span>
                  </div>
                </div>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={200}>
              <Card className="p-6 bg-card/50 backdrop-blur border-l-4 border-l-primary hover:bg-card/70 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Icon name="Zap" className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Оптимизация производительности</h3>
                    <p className="text-foreground/70 mb-2">
                      Улучшена стабильность сервера и снижена задержка
                    </p>
                    <span className="text-sm text-foreground/50">5 октября 2025</span>
                  </div>
                </div>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <section id="admin" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Администрация
            </h2>
            <p className="text-foreground/70 text-lg">
              Команда, которая делает сервер лучше каждый день
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "ShadowMaster", role: "Главный администратор", icon: "Crown" },
              { name: "MysticWizard", role: "Разработчик квестов", icon: "Wand2" },
              { name: "DragonSlayer", role: "Модератор", icon: "Shield" },
              { name: "LunarGuard", role: "Модератор", icon: "Shield" }
            ].map((admin, i) => (
              <AnimatedCard key={i} delay={i * 100}>
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all text-center h-full">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Icon name={admin.icon as any} className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-1">{admin.name}</h3>
                <p className="text-foreground/70 text-sm">{admin.role}</p>
              </Card>
              </AnimatedCard>
            ))}
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
                <p className="text-foreground/70">Email: admin@imunns.ru</p>
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
    </div>
  );
};

export default Index;