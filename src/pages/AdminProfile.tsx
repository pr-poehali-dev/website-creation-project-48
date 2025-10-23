import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCard from "@/components/AnimatedCard";
import { useParams, useNavigate } from "react-router-dom";

interface AdminData {
  name: string;
  role: string;
  badge: string;
  description: string;
  icon: string;
  color: string;
  stats: {
    label: string;
    value: string;
    icon: string;
  }[];
  achievements: string[];
}

const adminsData: Record<string, AdminData> = {
  den_master: {
    name: "den_master",
    role: "Создатель сервера",
    badge: "СОЗДАТЕЛЬ",
    description: "Основатель и идейный вдохновитель проекта Imunns RolePlay. Создал уникальный мир для игроков с продуманной экономикой и механиками.",
    icon: "Crown",
    color: "primary",
    stats: [
      { label: "На сервере с", value: "2020 года", icon: "Calendar" },
      { label: "Онлайн часов", value: "10000+", icon: "Clock" },
      { label: "Создано контента", value: "500+", icon: "FileText" },
    ],
    achievements: [
      "Создал сервер с нуля",
      "Развил активное комьюнити 1000+ игроков",
      "Организовал 50+ крупных ивентов",
      "Внедрил уникальные игровые механики",
    ],
  },
  Artemon228: {
    name: "Artemon228",
    role: "Администратор",
    badge: "ADMIN",
    description: "Опытный администратор, следящий за порядком на сервере и помогающий игрокам. Специализируется на решении конфликтов и технической поддержке.",
    icon: "Shield",
    color: "primary",
    stats: [
      { label: "На сервере с", value: "2021 года", icon: "Calendar" },
      { label: "Решено вопросов", value: "3000+", icon: "CheckCircle" },
      { label: "Помощь игрокам", value: "24/7", icon: "Users" },
    ],
    achievements: [
      "Разрешил 3000+ игровых ситуаций",
      "Помог внедрить систему модерации",
      "Обучил 20+ новых модераторов",
      "Создал базу знаний для администрации",
    ],
  },
  JloM: {
    name: "JloM",
    role: "Администратор",
    badge: "ADMIN",
    description: "Технический администратор, отвечающий за стабильность сервера и внедрение новых функций. Эксперт в настройке плагинов и оптимизации.",
    icon: "Shield",
    color: "primary",
    stats: [
      { label: "На сервере с", value: "2021 года", icon: "Calendar" },
      { label: "Внедрено плагинов", value: "150+", icon: "Puzzle" },
      { label: "Uptime сервера", value: "99.9%", icon: "Activity" },
    ],
    achievements: [
      "Настроил 150+ плагинов и модов",
      "Обеспечил стабильную работу сервера",
      "Оптимизировал производительность на 40%",
      "Внедрил систему автоматических бэкапов",
    ],
  },
};

const AdminProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  
  const adminData = username ? adminsData[username] : null;

  if (!adminData) {
    navigate('/admin');
    return null;
  }

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
            <a href="/wiki" className="font-bold text-purple-300 hover:text-primary transition-colors">Вики</a>
            <a href="/stats" className="font-bold text-purple-300 hover:text-primary transition-colors">Статистика</a>
            <a href="/jobs" className="font-bold text-purple-300 hover:text-primary transition-colors">Работа</a>
            <a href="/admin" className="text-primary font-bold transition-colors">Администрация</a>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Играть
          </Button>
        </div>
      </nav>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button 
            variant="outline" 
            className="mb-8 border-primary/50 hover:bg-primary/10"
            onClick={() => navigate('/admin')}
          >
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            Назад к команде
          </Button>

          <AnimatedCard delay={0}>
            <Card className="p-8 md:p-12 bg-gradient-to-br from-card/50 to-primary/10 backdrop-blur border-primary/30 shadow-[0_0_40px_rgba(168,85,247,0.3)] mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className={`w-32 h-32 bg-gradient-to-br from-${adminData.color} to-accent rounded-full flex items-center justify-center mb-4 shadow-lg shadow-${adminData.color}/50`}>
                    <Icon name={adminData.icon as any} className="text-white" size={64} />
                  </div>
                  <span className={`px-4 py-1.5 bg-gradient-to-r from-${adminData.color} to-accent text-white text-xs font-bold rounded-full mb-3 shadow-lg`}>
                    {adminData.badge}
                  </span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {adminData.name}
                  </h1>
                  <p className="text-xl text-foreground/80 mb-4">{adminData.role}</p>
                  <p className="text-foreground/70 text-lg leading-relaxed">
                    {adminData.description}
                  </p>
                </div>
              </div>
            </Card>
          </AnimatedCard>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {adminData.stats.map((stat, index) => (
              <AnimatedCard key={index} delay={100 + index * 50}>
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name={stat.icon as any} className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">{stat.label}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedCard delay={250}>
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Trophy" className="text-accent" size={28} />
                Достижения
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {adminData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                    <Icon name="CheckCircle" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-foreground/80">{achievement}</span>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedCard>
        </div>
      </section>
    </div>
  );
};

export default AdminProfile;