import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

import AnimatedCard from "@/components/AnimatedCard";
import SpaceBackground from "@/components/SpaceBackground";
import Fireworks from "@/components/Fireworks";
import Snowflakes from "@/components/Snowflakes";
import NewYearTimer from "@/components/NewYearTimer";

const Rules = () => {
  const rulesCategories = [
    {
      title: "Правила проекта Imunns",
      icon: "BookOpen",
      color: "primary",
      link: "/rules/general",
      rules: [
        "Уважайте других игроков и администрацию",
        "Запрещены оскорбления, мат и токсичное поведение",
        "Не распространяйте личную информацию других игроков",
        "Следуйте указаниям администрации",
        "Запрещено использование читов и багов"
      ]
    },
    {
      title: "Правила РП",
      icon: "Users",
      color: "accent",
      link: "/rules/rp",
      rules: [
        "Соблюдайте роль своего персонажа",
        "Не используйте мета-информацию (MetaGaming)",
        "Запрещен PowerGaming (игнорирование действий других)",
        "Уважайте чужую РП-ситуацию",
        "Не убивайте без ролевой причины (RDM запрещен)"
      ]
    },
    {
      title: "Игровой чат",
      icon: "MessageSquare",
      color: "primary",
      link: "/rules/communication",
      rules: [
        "Используйте голосовой чат для РП",
        "Не спамьте в чате",
        "Запрещена реклама других серверов",
        "Не флудите и не троллите",
        "Общайтесь на русском языке"
      ]
    },
    {
      title: "Игровой процесс",
      icon: "Gamepad2",
      color: "accent",
      link: "/rules/gameplay",
      rules: [
        "Не создавайте лаги намеренно",
        "Запрещено гриферство",
        "Уважайте чужую собственность",
        "Не злоупотребляйте игровыми механиками",
        "Сообщайте о багах администрации"
      ]
    }
  ];

  const punishments = [
    { offense: "Первое нарушение", punishment: "Предупреждение", icon: "AlertTriangle", color: "yellow" },
    { offense: "Повторное нарушение", punishment: "Мут/Кик", icon: "Volume2", color: "orange" },
    { offense: "Серьезное нарушение", punishment: "Бан на срок", icon: "Ban", color: "red" },
    { offense: "Критическое нарушение", punishment: "Перманентный бан", icon: "ShieldX", color: "red" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/60 via-purple-800/40 to-indigo-900/60 animate-gradient relative">
      <SpaceBackground />
      <Fireworks />
      <Snowflakes />

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
            <a href="/rules" className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 border border-primary/40 text-foreground hover:bg-primary/15 transition-all">Правила</a>
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
          <AnimatedCard delay={0}>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Icon name="Scale" className="text-primary" size={64} />
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Правила сервера
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Ознакомьтесь с правилами перед началом игры. Незнание правил не освобождает от ответственности.
              </p>
            </div>
          </AnimatedCard>

          <div className="max-w-4xl mx-auto mb-12">
            <NewYearTimer />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {rulesCategories.map((category, index) => (
              <AnimatedCard key={index} delay={100 + index * 100}>
                <Card 
                  className={`p-8 bg-card/50 backdrop-blur border-border/50 hover:border-${category.color}/50 hover:shadow-[0_0_30px_rgba(${category.color === 'primary' ? '168,85,247' : '236,72,153'},0.4)] transition-all h-full cursor-pointer group`}
                  onClick={() => window.location.href = category.link}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 bg-${category.color}/20 rounded-lg flex items-center justify-center`}>
                        <Icon name={category.icon as any} className={`text-${category.color}`} size={28} />
                      </div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                    </div>
                    <Icon name="ChevronRight" className={`text-${category.color} group-hover:translate-x-1 transition-transform`} size={24} />
                  </div>
                  <ul className="space-y-3">
                    {category.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Icon name="Check" className={`text-${category.color} flex-shrink-0 mt-1`} size={20} />
                        <span className="text-foreground/80 leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-border/30">
                    <span className={`text-${category.color} text-sm font-semibold flex items-center gap-2`}>
                      Читать подробнее
                      <Icon name="ArrowRight" size={16} />
                    </span>
                  </div>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedCard delay={500}>
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <Icon name="Gavel" className="text-accent" size={32} />
                  <h2 className="text-3xl font-bold">Система наказаний</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {punishments.map((item, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-background/50 to-card/30 rounded-lg border border-border/50">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name={item.icon as any} className="text-accent" size={24} />
                        <h3 className="font-bold text-lg">{item.offense}</h3>
                      </div>
                      <p className="text-foreground/70 pl-9">{item.punishment}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
                  <p className="text-foreground/80 flex items-start gap-2">
                    <Icon name="Info" className="text-accent flex-shrink-0 mt-0.5" size={20} />
                    <span>Администрация оставляет за собой право изменять меру наказания в зависимости от тяжести нарушения.</span>
                  </p>
                </div>
              </Card>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={600}>
            <div className="max-w-2xl mx-auto text-center">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
                <Icon name="Handshake" className="text-primary mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-3">Играйте честно!</h3>
                <p className="text-foreground/70 mb-6">
                  Соблюдение правил делает игру комфортной для всех. Уважайте других игроков и наслаждайтесь игрой!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/admin">
                    <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                      <Icon name="MessageCircle" className="mr-2" size={18} />
                      Связаться с администрацией
                    </Button>
                  </a>
                  <a href="/">
                    <Button className="bg-gradient-to-r from-primary to-accent">
                      <Icon name="Home" className="mr-2" size={18} />
                      На главную
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </AnimatedCard>
        </div>
      </section>
      <SpaceBackground />
    </div>
  );
};

export default Rules;