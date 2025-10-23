import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import AnimatedCard from '@/components/AnimatedCard';

export default function Sponsors() {
  const sponsors = [
    {
      name: "Gitilu",
      role: "Спонсор",
      icon: "Heart",
      badge: "SPONSOR",
      color: "accent",
      description: "Финансово поддерживает проект, помогая с оплатой хостинга и развитием новых возможностей. Активный игрок и участник сообщества.",
      contributions: [
        "Оплата хостинга сервера",
        "Поддержка новых возможностей",
        "Активное участие в сообществе"
      ]
    },
    {
      name: "demidbrins",
      role: "Спонсор",
      icon: "Heart",
      badge: "SPONSOR",
      color: "accent",
      description: "Вкладывает средства в улучшение сервера и проведение ивентов. Один из первых спонсоров проекта.",
      contributions: [
        "Финансирование ивентов",
        "Улучшение инфраструктуры",
        "Один из первых спонсоров"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-20">
        <AnimatedCard delay={0}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Icon name="Heart" className="text-accent" size={48} />
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-accent to-pink-400 bg-clip-text text-transparent">
                Спонсоры
              </h1>
            </div>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Люди, которые поддерживают развитие нашего проекта и делают его лучше
            </p>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <AnimatedCard key={index} delay={(index + 1) * 100}>
              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Icon name={sponsor.icon as any} className="text-accent" size={48} />
                  </div>
                  <span className="px-4 py-1.5 bg-accent/20 text-accent text-sm font-bold rounded-full mb-3">
                    {sponsor.badge}
                  </span>
                  <h2 className="text-2xl font-bold mb-2">{sponsor.name}</h2>
                  <p className="text-foreground/70 mb-4">{sponsor.role}</p>
                </div>

                <div className="border-t border-border/50 pt-6">
                  <p className="text-foreground/80 mb-6 text-center leading-relaxed">
                    {sponsor.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-accent uppercase tracking-wider text-center mb-4">
                      Вклад в проект
                    </h3>
                    {sponsor.contributions.map((contribution, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-accent/10 p-3 rounded-lg">
                        <Icon name="Check" className="text-accent flex-shrink-0" size={20} />
                        <span className="text-foreground/80 text-sm">{contribution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        <AnimatedCard delay={400}>
          <div className="mt-16 text-center">
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50 max-w-2xl mx-auto">
              <Icon name="Sparkles" className="text-accent mx-auto mb-4" size={40} />
              <h3 className="text-2xl font-bold mb-3">Станьте спонсором</h3>
              <p className="text-foreground/70 mb-6">
                Хотите поддержать развитие проекта? Свяжитесь с администрацией!
              </p>
              <a href="/admin" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold">
                <Icon name="Mail" size={20} />
                Связаться с администрацией
              </a>
            </Card>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
