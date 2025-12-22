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
      number: "3.1",
      title: "Использование голосового чата",
      description: "Голосовой чат используется для РП взаимодействия. Качество микрофона должно быть приемлемым.",
      examples: [
        "✅ Чистый звук, без шумов",
        "❌ Музыка в микрофон, крики, шумы"
      ]
    },
    {
      number: "3.2",
      title: "Запрет спама в чате",
      description: "Запрещено отправлять большое количество однотипных сообщений или флудить в чат.",
      examples: [
        "✅ Осмысленные сообщения",
        "❌ Повторение одного и того же, капс"
      ]
    },
    {
      number: "3.3",
      title: "Запрет рекламы",
      description: "Запрещена реклама других серверов, Discord-серверов и любых коммерческих услуг.",
      examples: [
        "✅ Общение в рамках сервера",
        "❌ 'Зайдите на сервер X', реклама услуг"
      ]
    },
    {
      number: "3.4",
      title: "Культура общения",
      description: "Запрещены оскорбления, провокации, флуд, троллинг и другие формы неконструктивного общения.",
      examples: [
        "✅ Вежливое общение",
        "❌ Оскорбления, провокации, троллинг"
      ]
    },
    {
      number: "3.5",
      title: "Русский язык",
      description: "Основной язык общения на сервере — русский. Использование других языков допускается в приватном общении.",
      examples: [
        "✅ Общение на русском языке",
        "❌ Общение в общем чате на других языках"
      ]
    },
    {
      number: "3.6",
      title: "Разделение IC и OOC",
      description: "Необходимо четко разделять внутриигровое (IC) и внеигровое (OOC) общение.",
      examples: [
        "✅ /ooc для внеигровых вопросов",
        "❌ Обсуждение игровых механик в IC чате"
      ]
    },
    {
      number: "3.7",
      title: "Адекватность в конфликтах",
      description: "В случае конфликтов необходимо сохранять спокойствие и решать вопросы через администрацию.",
      examples: [
        "✅ Обращение к администрации",
        "❌ Переход на личности, оскорбления"
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
                <Icon name="MessageSquare" className="text-primary" size={64} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Правила общения
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
