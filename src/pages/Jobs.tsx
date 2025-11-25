import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

import AnimatedCard from "@/components/AnimatedCard";
import MobileMenu from "@/components/MobileMenu";
import SpaceBackground from "@/components/SpaceBackground";

const Jobs = () => {
  const openPositions = [
    {
      title: "Модератор",
      type: "Волонтёр",
      icon: "Shield",
      color: "primary",
      requirements: [
        "Возраст от 16 лет",
        "Активность минимум 4 часа в день",
        "Знание правил сервера",
        "Опыт игры от 1 месяца",
      ],
      responsibilities: [
        "Модерация чата и форума",
        "Помощь новым игрокам",
        "Контроль соблюдения правил",
        "Обработка жалоб",
      ],
    },
    {
      title: "Ивент-мейкер",
      type: "Волонтёр",
      icon: "Sparkles",
      color: "accent",
      requirements: [
        "Креативность и фантазия",
        "Опыт проведения мероприятий",
        "Активность минимум 3 часа в день",
        "Умение работать в команде",
      ],
      responsibilities: [
        "Создание и проведение ивентов",
        "Разработка сюжетных квестов",
        "Организация турниров",
        "Развлечение игроков",
      ],
    },
    {
      title: "Строитель",
      type: "Волонтёр",
      icon: "Hammer",
      color: "primary",
      requirements: [
        "Опыт строительства в Minecraft",
        "Портфолио работ",
        "Знание WorldEdit и других плагинов",
        "Креативное мышление",
      ],
      responsibilities: [
        "Создание построек для сервера",
        "Разработка новых локаций",
        "Улучшение существующих зон",
        "Помощь в оформлении ивентов",
      ],
    },
    {
      title: "Разработчик",
      type: "Оплачиваемая",
      icon: "Code",
      color: "accent",
      requirements: [
        "Знание Java/Kotlin",
        "Опыт разработки плагинов",
        "Знание Spigot/Paper API",
        "Портфолио проектов",
      ],
      responsibilities: [
        "Разработка плагинов",
        "Исправление багов",
        "Оптимизация сервера",
        "Внедрение новых механик",
      ],
    },
  ];

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
            <a href="/jobs" className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 border border-primary/40 text-foreground hover:bg-primary/15 transition-all">Работа</a>
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

      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Присоединяйся к команде
            </h1>
            <p className="text-foreground/70 text-lg">
              Открытые вакансии и возможности для развития
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <AnimatedCard delay={0}>
              <Card className="p-8 bg-gradient-to-br from-card/50 to-primary/10 backdrop-blur border-primary/30 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Users" className="text-white" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Почему стоит присоединиться?</h2>
                    <div className="grid md:grid-cols-2 gap-4 text-foreground/80">
                      <div className="flex items-center gap-2">
                        <Icon name="Check" className="text-primary" size={20} />
                        <span>Дружная команда профессионалов</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Check" className="text-primary" size={20} />
                        <span>Возможность карьерного роста</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Check" className="text-accent" size={20} />
                        <span>Уникальные привилегии</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Check" className="text-accent" size={20} />
                        <span>Опыт и новые навыки</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedCard>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {openPositions.map((position, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <Card className={`p-8 bg-card/50 backdrop-blur border-border/50 hover:border-${position.color}/50 hover:shadow-[0_0_30px_rgba(${position.color === 'primary' ? '168,85,247' : '236,72,153'},0.4)] transition-all h-full flex flex-col`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-${position.color}/20 rounded-lg flex items-center justify-center`}>
                        <Icon name={position.icon as any} className={`text-${position.color}`} size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{position.title}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          position.type === 'Оплачиваемая' 
                            ? 'bg-accent/20 text-accent' 
                            : 'bg-primary/20 text-primary'
                        }`}>
                          {position.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 flex-1">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="ClipboardList" size={18} />
                      Требования:
                    </h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground/70 text-sm">
                          <Icon name="ChevronRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Briefcase" size={18} />
                      Обязанности:
                    </h4>
                    <ul className="space-y-2">
                      {position.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground/70 text-sm">
                          <Icon name="ChevronRight" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <Icon name="Send" className="mr-2" size={18} />
                    Подать заявку
                  </Button>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <AnimatedCard delay={400}>
              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 text-center">
                <Icon name="MessageCircle" className="text-primary mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-3">Есть вопросы?</h3>
                <p className="text-foreground/70 mb-6">
                  Свяжись с нами в Telegram для получения дополнительной информации
                </p>
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10" asChild>
                  <a href="https://t.me/imunns" target="_blank" rel="noopener noreferrer">
                    <Icon name="MessageSquare" className="mr-2" size={20} />
                    Написать в Telegram
                  </a>
                </Button>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>
      <SpaceBackground />
    </div>
  );
};

export default Jobs;