import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";
import SpaceBackground from "@/components/SpaceBackground";
import Fireworks from "@/components/Fireworks";
import Snowflakes from "@/components/Snowflakes";

const CommunicationRules = () => {
  const rules = [
    {
      number: "2.1",
      title: "Запрет оскорблений",
      description: "Запрещено оскорблять, принижать достоинство, переходить на личности игроков, администрации сервера.",
      punishment: "Мут от 30-ти минут до 6-ти часов",
      notes: [
        "Примечание: Лох, дура, дурак - считаются за оскорбления. Оскорбления в вопросительной форме так же наказуемы.",
        "Дополнение: Запрещено оскорблять с разных аккаунтов. Наказание: Мут по айпи до 8-и часов."
      ]
    },
    {
      number: "2.2",
      title: "Обход мута/бана",
      description: "Запрещён обход мута/бана.",
      punishment: "Бан от 3-х до 12-х часов",
      notes: []
    },
    {
      number: "2.3",
      title: "Переход на личную жизнь",
      description: "Запрещено переходить на личную жизнь, например, напрямую затрагивать его семью в негативном/саркастическом ключе.",
      punishment: "Мут до 7-и дней",
      notes: [
        "Если оскорбляют в личных сообщения или локальном чате и игрок не против этого, то допускается и разрешается бездействие по отношению к нарушителю."
      ]
    },
    {
      number: "2.4",
      title: "Провокации",
      description: "Запрещено провоцировать других игроков на неадекватные действия/нарушения.",
      punishment: "Мут от 30-ти до 60-ти минут",
      notes: ["Примечание: Оскорбление не считается за провокацию."]
    },
    {
      number: "2.5",
      title: "Попрошайничество",
      description: "Запрещено попрошайничество (Ресурсов, /gm 1, разбана/размута и т.п.)",
      punishment: "Мут от 30-ти минут до 3-х часов",
      notes: []
    },
    {
      number: "2.6",
      title: "Спам, флуд и капс",
      description: "Запрещен спам, флуд и капс (написание в верхнем регистре; флуд сообщениями, которые не несут никакой информативной нагрузки).",
      punishment: "Мут от 20-60 минут",
      notes: [
        "Спам/флуд от 3-х сообщений и больше",
        "Капс от 4-х и больше слов",
        "Рекламировать кланы игрокам можно только 1 раз в минуту, ботам раз в 15 минут"
      ]
    },
    {
      number: "2.7",
      title: "Выдача себя за администрацию",
      description: "Запрещено выдавать себя за администрацию/модерацию проекта.",
      punishment: "Мут от 1 часа до 6 часов",
      notes: []
    },
    {
      number: "2.8",
      title: "Разжигание розни",
      description: "Запрещено разжигание межрасовой, религиозной, политической и межнациональной розни.",
      punishment: "Бан от 2-ух дней до 7-ми",
      notes: []
    },
    {
      number: "2.9",
      title: "Введение в заблуждение",
      description: "Запрещено вводить в заблуждение игроков/персонал сервера.",
      punishment: "Мут от 30-ти до 60-ти минут",
      notes: []
    },
    {
      number: "2.10",
      title: "Обман персонала",
      description: "Запрещено обманывать персонал сервера. (Модерацию/Администрацию)",
      punishment: "Бан от 1 часа до 1 дня",
      notes: []
    },
    {
      number: "2.11",
      title: "Коммерческая деятельность",
      description: "Запрещена любая коммерческая деятельность на сервере.",
      punishment: "Бан аккаунта навсегда",
      notes: []
    },
    {
      number: "2.12",
      title: "Реклама сторонних ресурсов",
      description: "Запрещено рекламировать любые сторонние ресурсы.",
      punishment: "Бан от 1 часа до 6 часов",
      notes: ["Примечание: Если реклама серверов/скам-ссылок - бан навсегда."]
    },
    {
      number: "2.13",
      title: "Угрозы игрокам",
      description: "Запрещены любые угрозы в сторону игроков.",
      punishment: "Бан на 6 часов",
      notes: ["Примечание: Предупреждение - не угроза!"]
    }
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
          <Button variant="outline" onClick={() => window.location.href = '/rules'}>
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Назад к правилам
          </Button>
        </div>
      </nav>

      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedCard delay={0}>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Icon name="MessageSquare" className="text-primary" size={64} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Игровой чат
              </h1>
              <p className="text-lg text-foreground/70">
                Правила использования чатов и голосового общения
              </p>
            </div>
          </AnimatedCard>

          <div className="space-y-6">
            {rules.map((rule, index) => (
              <AnimatedCard key={index} delay={100 + index * 50}>
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-lg">{rule.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{rule.title}</h3>
                      <p className="text-foreground/80 mb-3 leading-relaxed">{rule.description}</p>
                      
                      {rule.punishment && (
                        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Icon name="AlertTriangle" size={16} className="text-red-400" />
                            <span className="text-sm font-semibold text-red-400">Наказание:</span>
                            <span className="text-sm text-foreground/80">{rule.punishment}</span>
                          </div>
                        </div>
                      )}
                      
                      {rule.notes && rule.notes.length > 0 && (
                        <div className="space-y-2 bg-background/30 rounded-lg p-4">
                          {rule.notes.map((note, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-sm text-foreground/70 leading-relaxed">• {note}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedCard delay={500}>
            <Card className="mt-8 p-6 bg-accent/10 border-accent/30">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-accent flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-lg mb-2">Важно знать</h3>
                  <p className="text-foreground/80">
                    Культура общения — важная часть комфортной игры. Соблюдайте правила и будьте вежливы с другими игроками.
                  </p>
                </div>
              </div>
            </Card>
          </AnimatedCard>
        </div>
      </section>
    </div>
  );
};

export default CommunicationRules;