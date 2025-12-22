import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";
import SpaceBackground from "@/components/SpaceBackground";
import Fireworks from "@/components/Fireworks";
import Snowflakes from "@/components/Snowflakes";

const RpRules = () => {
  const rules = [
    {
      number: "2.1",
      title: "Соблюдение роли персонажа",
      description: "Игрок обязан играть в соответствии с выбранной ролью и не выходить из образа без веской причины.",
      examples: [
        "✅ Действия согласно роли персонажа",
        "❌ ООС (Out Of Character) общение в IC ситуациях"
      ]
    },
    {
      number: "2.2",
      title: "Запрет MetaGaming",
      description: "Запрещено использование информации, полученной вне игры (Discord, стримы) для получения преимущества в РП.",
      examples: [
        "✅ Использование только IC информации",
        "❌ Знание имен игроков без представления"
      ]
    },
    {
      number: "2.3",
      title: "Запрет PowerGaming",
      description: "Запрещено игнорировать действия других игроков и не давать им возможности отыграть ситуацию.",
      examples: [
        "✅ Дать время на РП отыгровку",
        "❌ '/me связал игрока без возможности ответа'"
      ]
    },
    {
      number: "2.4",
      title: "Запрет RDM (Random DeathMatch)",
      description: "Запрещено убивать других игроков без веской ролевой причины.",
      examples: [
        "✅ Убийство после РП конфликта",
        "❌ Убийство без причины или слов"
      ]
    },
    {
      number: "2.5",
      title: "Запрет VDM (Vehicle DeathMatch)",
      description: "Запрещено использовать транспорт для намеренного убийства игроков без РП причины.",
      examples: [
        "✅ Использование транспорта по назначению",
        "❌ Таран игроков на авто"
      ]
    },
    {
      number: "2.6",
      title: "FearRP (Страх за жизнь)",
      description: "В ситуациях угрозы жизни персонаж должен бояться за свою жизнь и выполнять требования.",
      examples: [
        "✅ Выполнение требований при угрозе оружием",
        "❌ Игнорирование угрозы, геройство"
      ]
    },
    {
      number: "2.7",
      title: "PainRP (Боль)",
      description: "Необходимо отыгрывать боль и травмы персонажа реалистично.",
      examples: [
        "✅ Отыгрыш боли после ранений",
        "❌ Игнорирование травм, бег после ранения"
      ]
    },
    {
      number: "2.8",
      title: "NewLife (Новая жизнь)",
      description: "После смерти персонаж забывает последние 15 минут жизни и не может вернуться на место смерти.",
      examples: [
        "✅ Забыть обстоятельства смерти",
        "❌ Помнить убийцу, возвращаться на место"
      ]
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
                <Icon name="Users" className="text-accent" size={64} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Правила РП
              </h1>
              <p className="text-lg text-foreground/70">
                Правила ролевой игры и взаимодействия с другими игроками
              </p>
            </div>
          </AnimatedCard>

          <div className="space-y-6">
            {rules.map((rule, index) => (
              <AnimatedCard key={index} delay={100 + index * 50}>
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-accent/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-bold text-lg">{rule.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{rule.title}</h3>
                      <p className="text-foreground/80 mb-4 leading-relaxed">{rule.description}</p>
                      <div className="space-y-2 bg-background/30 rounded-lg p-4">
                        {rule.examples.map((example, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-sm">{example}</span>
                          </div>
                        ))}
                      </div>
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
                    РП правила — основа нашего сервера. Качественная ролевая игра делает процесс интересным для всех. Нарушение РП правил карается строго.
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

export default RpRules;
