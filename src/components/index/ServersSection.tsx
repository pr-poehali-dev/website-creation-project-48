import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ServersSection = () => {
  return (
    <>
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Наш Сервер
            </h2>
            <p className="text-foreground/70 text-base md:text-lg">
              Присоединяйся к приключению
            </p>
          </div>
          <div className="max-w-md mx-auto mb-20">
            <AnimatedCard delay={0}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card 
                      className="p-6 bg-gradient-to-br from-card/50 to-primary/10 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all h-full cursor-pointer"
                      onClick={() => window.location.href = '/buy'}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon name="Server" className="text-primary" size={32} />
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Imunns role play</h3>
                      <p className="text-foreground/70 mb-4">Добро пожаловать на наш уникальный Minecraft-сервер с роле-плей системой! </p>
                      
                      <div className="flex items-center gap-2 mb-4 p-3 bg-background/30 rounded-lg border border-primary/20">
                        <Icon name="Globe" size={18} className="text-primary" />
                        <div className="flex-1">
                          <p className="text-xs text-foreground/60 mb-0.5">IP адрес сервера</p>
                          <p className="text-sm font-mono font-semibold text-foreground">imunnsrp.my-craft.cc</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText('imunnsrp.my-craft.cc');
                          }}
                        >
                          <Icon name="Copy" size={14} />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Users" size={16} className="text-primary" />
                          <span className="text-foreground/80">Онлайн: 247</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open('https://boosty.to/imunnsrp', '_blank');
                          }}
                        >
                          <Icon name="ShoppingCart" size={14} className="mr-1" />
                          Boosty
                        </Button>
                      </div>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-sm bg-card/95 backdrop-blur border-primary/50 shadow-[0_0_20px_rgba(168,85,247,0.4)] p-4">
                    <p className="font-semibold mb-2 text-base">🎮 Основной сервер</p>
                    <p className="text-sm text-foreground/90 mb-3">Добро пожаловать на наш уникальный Minecraft-сервер с роле-плей системой! Здесь у вас есть возможность стать кем угодно — будь то могущественный маг, отважный воин, талантливый фермер или бизнесмен. </p>
                    <div className="space-y-1 border-t border-border/30 pt-2">
                      <p className="text-sm text-foreground/80"><span className="font-semibold">Версия:</span> 1.20.1</p>
                      <p className="text-sm text-foreground/80"><span className="font-semibold">Режим:</span> RolePlay</p>
                    </div>
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

      <section id="wiki" className="py-20 relative z-10">
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
              <Card 
                className="p-6 bg-gradient-to-br from-card/50 to-primary/5 backdrop-blur border-border/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all h-full cursor-pointer"
                onClick={() => window.open('https://disk.yandex.ru/d/3CuMT2_cBmxMZA', '_blank')}
              >
                <Icon name="Download" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Моды</h3>
                <p className="text-foreground/70">Скачать сборку модов (35.9 MB)</p>
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
    </>
  );
};

export default ServersSection;