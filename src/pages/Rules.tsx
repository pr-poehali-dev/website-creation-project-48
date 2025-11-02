import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCard from "@/components/AnimatedCard";

const Rules = () => {
  const rulesCategories = [
    {
      title: "Общие правила",
      icon: "BookOpen",
      color: "primary",
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
      rules: [
        "Соблюдайте роль своего персонажа",
        "Не используйте мета-информацию (MetaGaming)",
        "Запрещен PowerGaming (игнорирование действий других)",
        "Уважайте чужую РП-ситуацию",
        "Не убивайте без ролевой причины (RDM запрещен)"
      ]
    },
    {
      title: "Правила общения",
      icon: "MessageSquare",
      color: "primary",
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
            <a href="/stats" className="font-bold text-purple-300 hover:text-primary transition-colors">Топ игроков</a>
            <a href="/jobs" className="font-bold text-purple-300 hover:text-primary transition-colors">Работа</a>
            <a href="/admin" className="font-bold text-purple-300 hover:text-primary transition-colors">Администрация</a>
            <a href="/rules" className="text-primary font-bold transition-colors">Правила</a>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Играть
          </Button>
        </div>
      </nav>

      <section className="py-20">
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

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {rulesCategories.map((category, index) => (
              <AnimatedCard key={index} delay={100 + index * 100}>
                <Card className={`p-8 bg-card/50 backdrop-blur border-border/50 hover:border-${category.color}/50 hover:shadow-[0_0_30px_rgba(${category.color === 'primary' ? '168,85,247' : '236,72,153'},0.4)] transition-all h-full`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-14 h-14 bg-${category.color}/20 rounded-lg flex items-center justify-center`}>
                      <Icon name={category.icon as any} className={`text-${category.color}`} size={28} />
                    </div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {category.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Icon name="Check" className={`text-${category.color} flex-shrink-0 mt-1`} size={20} />
                        <span className="text-foreground/80 leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
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
    </div>
  );
};

export default Rules;