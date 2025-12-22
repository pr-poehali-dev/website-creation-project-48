import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";
import SpaceBackground from "@/components/SpaceBackground";
import Fireworks from "@/components/Fireworks";
import Snowflakes from "@/components/Snowflakes";

const GameplayRules = () => {
  const rules = [
    {
      number: "4.1",
      title: "Запрет на создание лагов",
      description: "Запрещено намеренно создавать лаги сервера через редстоун-механизмы, спавн мобов или другие способы.",
      examples: [
        "✅ Оптимизированные постройки",
        "❌ Огромные редстоун-фермы, спавн сотен мобов"
      ]
    },
    {
      number: "4.2",
      title: "Запрет гриферства",
      description: "Запрещено разрушение чужих построек, кража предметов без РП причины.",
      examples: [
        "✅ Уважение чужой собственности",
        "❌ Разрушение домов, кража без РП"
      ]
    },
    {
      number: "4.3",
      title: "Уважение чужой собственности",
      description: "Запрещено использовать чужие ресурсы, постройки или предметы без разрешения владельца.",
      examples: [
        "✅ Спросить разрешение у владельца",
        "❌ Брать чужие вещи без спроса"
      ]
    },
    {
      number: "4.4",
      title: "Запрет абуза игровых механик",
      description: "Запрещено злоупотреблять игровыми механиками для получения нечестного преимущества.",
      examples: [
        "✅ Честное использование механик",
        "❌ Дюп предметов, эксплойты, баги"
      ]
    },
    {
      number: "4.5",
      title: "Сообщение о багах",
      description: "При обнаружении бага необходимо немедленно сообщить администрации и не использовать его.",
      examples: [
        "✅ Репорт бага администрации",
        "❌ Использование бага в своих целях"
      ]
    },
    {
      number: "4.6",
      title: "Запрет AFK-фарма",
      description: "Запрещено использовать AFK-методы для автоматической добычи ресурсов.",
      examples: [
        "✅ Активная игра и фарм",
        "❌ AFK-фермы с авто-кликерами"
      ]
    },
    {
      number: "4.7",
      title: "Ограничение построек",
      description: "Постройки не должны нарушать эстетику сервера и мешать другим игрокам.",
      examples: [
        "✅ Красивые, продуманные постройки",
        "❌ Столбы в небо, огромные платформы"
      ]
    },
    {
      number: "4.8",
      title: "Экономика сервера",
      description: "Запрещены манипуляции с экономикой сервера, попытки обмана в торговле.",
      examples: [
        "✅ Честная торговля",
        "❌ Обман в сделках, махинации с ценами"
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
                <Icon name="Gamepad2" className="text-accent" size={64} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Игровой процесс
              </h1>
              <p className="text-lg text-foreground/70">
                Правила игровых механик и взаимодействия с миром
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
                    Соблюдение правил игрового процесса обеспечивает стабильную и комфортную игру для всех. Злоупотребление механиками карается строго.
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

export default GameplayRules;
