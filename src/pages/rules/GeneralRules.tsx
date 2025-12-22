import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";
import SpaceBackground from "@/components/SpaceBackground";
import Fireworks from "@/components/Fireworks";
import Snowflakes from "@/components/Snowflakes";

const GeneralRules = () => {
  const rules = [
    {
      number: "1.1",
      title: "Согласие с правилами",
      description: "Регистрируясь на сервере, вы соглашаетесь со всеми правилами предоставленными в этом списке, правами описанными ниже и обязанностями.",
      examples: []
    },
    {
      number: "1.2",
      title: "Незнание не освобождает",
      description: "Незнание правил не освобождает от ответственности.",
      examples: []
    },
    {
      number: "1.3",
      title: "Ответственность за ник",
      description: "При вводе на сайте неверного ника администрация не отвечает за последствия покупки доната на этот ник.",
      examples: []
    },
    {
      number: "1.4",
      title: "Изменение правил",
      description: "Администрация оставляет за собой право в одностороннем порядке изменять текущие правила без уведомления пользователей.",
      examples: []
    },
    {
      number: "1.5",
      title: "Управление проектом",
      description: "Администрация ведет управление игровыми процессами и всем проектом исключительно по своему усмотрению.",
      examples: []
    },
    {
      number: "1.6",
      title: "Решение администрации",
      description: "Так как не всегда удается определить нарушение правил пользователем, окончательное решение остается за Администраторами проекта.",
      examples: []
    },
    {
      number: "1.7",
      title: "Равенство игроков",
      description: "Игроки, имеющие различные привилегии на сервере, ничем не отличаются от обычных игроков, кроме привилегий и полностью подчиняются правилам проекта.",
      examples: []
    },
    {
      number: "1.8",
      title: "Права модераторов",
      description: "Модераторы имеют право НЕ отвечать на Ваш вопрос, ЕСЛИ посчитают его некорректным. (И могут добавить вас в \"Черный список\")",
      examples: []
    },
    {
      number: "1.9",
      title: "Отказ в рассмотрении жалобы",
      description: "Модераторы могут отказать Вам в рассмотрении жалобы БЕЗ объяснения причины, если правила сервера были неоднократно нарушены и вы получили бан.",
      examples: []
    },
    {
      number: "1.10",
      title: "Здравый смысл",
      description: "Все правила сервера основаны на здравом понимании, если вы пользуетесь правилами в ущерб здравому смыслу, то будете строго наказаны.",
      examples: []
    },
    {
      number: "1.11",
      title: "Доказательства нарушений",
      description: "Каждый игрок который выдаёт наказание, обязан иметь доказательство на нарушение (скриншоты/видеоматериалы).",
      examples: []
    },
    {
      number: "1.12",
      title: "Запрос доказательств",
      description: "Только Модерация/Администрация проекта имеет право просить у вас доказательства в виде скриншотов/видеоматериалов.",
      examples: []
    },
    {
      number: "1.13",
      title: "Увеличение сроков наказания",
      description: "При многочисленных и повторных нарушениях модераторы вправе увеличивать сроки наказания.",
      examples: []
    },
    {
      number: "1.14",
      title: "Индивидуальные решения",
      description: "В исключительных случаях, в том числе при злоупотреблении правилами, персонал проекта вправе принять индивидуальное решение, отличающееся от стандартных мер наказания, предварительно уведомив игрока и объяснив причину.",
      examples: []
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
                <Icon name="BookOpen" className="text-primary" size={64} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Правила проекта Imunns
              </h1>
              <p className="text-lg text-foreground/70">
                Основные правила поведения на сервере
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
                      <p className="text-foreground/80 leading-relaxed">{rule.description}</p>
                      {rule.examples.length > 0 && (
                        <div className="mt-4 space-y-2 bg-background/30 rounded-lg p-4">
                          {rule.examples.map((example, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-sm">{example}</span>
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

          <AnimatedCard delay={600}>
            <Card className="mt-8 p-6 bg-accent/10 border-accent/30">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-accent flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-lg mb-2">Важно знать</h3>
                  <p className="text-foreground/80">
                    Незнание правил не освобождает от ответственности. Администрация оставляет за собой право изменять правила и меры наказания в зависимости от ситуации.
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

export default GeneralRules;