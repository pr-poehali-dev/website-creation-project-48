import { useParams, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import AnimatedCard from '@/components/AnimatedCard';

const sponsorsData: Record<string, {
  name: string;
  role: string;
  description: string;
  contributions: string[];
  achievements: string[];
  joinDate: string;
}> = {
  Gitilu: {
    name: "Gitilu",
    role: "Спонсор",
    description: "Финансово поддерживает проект, помогая с оплатой хостинга и развитием новых возможностей. Активный игрок и участник сообщества.",
    contributions: [
      "Оплата хостинга сервера",
      "Поддержка новых возможностей",
      "Активное участие в сообществе"
    ],
    achievements: [
      "💎 Один из основных спонсоров",
      "🌟 Активный участник форума",
      "🎯 Помощь в развитии проекта"
    ],
    joinDate: "2024"
  },
  demidbrins: {
    name: "demidbrins",
    role: "Спонсор",
    description: "Вкладывает средства в улучшение сервера и проведение ивентов. Один из первых спонсоров проекта.",
    contributions: [
      "Финансирование ивентов",
      "Улучшение инфраструктуры",
      "Один из первых спонсоров"
    ],
    achievements: [
      "🏆 Первый спонсор проекта",
      "🎉 Организатор ивентов",
      "💪 Поддержка инфраструктуры"
    ],
    joinDate: "2024"
  }
};

export default function SponsorProfile() {
  const { username } = useParams<{ username: string }>();
  
  if (!username || !sponsorsData[username]) {
    return <Navigate to="/admin" replace />;
  }

  const sponsor = sponsorsData[username];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-20">
        <AnimatedCard delay={0}>
          <div className="text-center mb-12">
            <a href="/admin" className="inline-flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors mb-6">
              <Icon name="ArrowLeft" size={20} />
              Вернуться к команде
            </a>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Icon name="Heart" className="text-accent" size={64} />
              </div>
              <span className="px-4 py-1.5 bg-accent/20 text-accent text-sm font-bold rounded-full mb-4">
                SPONSOR
              </span>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-accent to-pink-400 bg-clip-text text-transparent mb-2">
                {sponsor.name}
              </h1>
              <p className="text-xl text-foreground/70">{sponsor.role}</p>
            </div>
          </div>
        </AnimatedCard>

        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatedCard delay={100}>
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="User" className="text-accent" size={24} />
                <h2 className="text-2xl font-bold">О спонсоре</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed text-lg">
                {sponsor.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-foreground/60">
                <Icon name="Calendar" size={18} />
                <span className="text-sm">Спонсор с {sponsor.joinDate}</span>
              </div>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={200}>
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="Trophy" className="text-accent" size={24} />
                <h2 className="text-2xl font-bold">Вклад в проект</h2>
              </div>
              <div className="space-y-3">
                {sponsor.contributions.map((contribution, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-accent/10 p-4 rounded-lg">
                    <Icon name="Check" className="text-accent flex-shrink-0" size={24} />
                    <span className="text-foreground/80">{contribution}</span>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={300}>
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="Award" className="text-accent" size={24} />
                <h2 className="text-2xl font-bold">Достижения</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sponsor.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gradient-to-r from-accent/10 to-accent/5 p-4 rounded-lg border border-accent/20">
                    <span className="text-lg">{achievement}</span>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <Card className="p-8 bg-gradient-to-r from-accent/10 to-pink-500/10 border-accent/30">
              <div className="text-center">
                <Icon name="Heart" className="text-accent mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-3">Благодарим за поддержку!</h3>
                <p className="text-foreground/70 mb-6">
                  {sponsor.name} делает наш проект лучше каждый день
                </p>
                <a href="/admin" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold">
                  <Icon name="Users" size={20} />
                  Посмотреть всю команду
                </a>
              </div>
            </Card>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
