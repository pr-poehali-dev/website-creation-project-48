import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCard from "@/components/AnimatedCard";

const Forum = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-purple-950 to-black animate-gradient relative">
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
          <div className="hidden md:flex items-center gap-2">
            <a href="/forum" className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 border border-primary/40 text-foreground hover:bg-primary/15 transition-all">Форум</a>
            <a href="/stats" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Топ игроков</a>
            <a href="/jobs" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Работа</a>
            <a href="/admin" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Администрация</a>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Играть
          </Button>
        </div>
      </nav>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Форум
            </h1>
            <p className="text-foreground/70 text-lg">
              Общайся с игроками, делись опытом и находи новых друзей
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <AnimatedCard delay={0}>
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all h-full cursor-pointer">
                <Icon name="MessageSquare" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Общие обсуждения</h3>
                <p className="text-foreground/70 mb-4">Обсуждай игровой процесс и делись впечатлениями</p>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Icon name="Users" size={16} />
                  <span>1,247 участников</span>
                </div>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={100}>
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all h-full cursor-pointer">
                <Icon name="HelpCircle" className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Помощь новичкам</h3>
                <p className="text-foreground/70 mb-4">Получи ответы на вопросы от опытных игроков</p>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Icon name="Users" size={16} />
                  <span>523 участника</span>
                </div>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={200}>
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all h-full cursor-pointer">
                <Icon name="Trophy" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Достижения</h3>
                <p className="text-foreground/70 mb-4">Делись своими успехами и историями</p>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Icon name="Users" size={16} />
                  <span>892 участника</span>
                </div>
              </Card>
            </AnimatedCard>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Последние темы</h2>
            {[
              { title: "Новый ивент: Охота на драконов", author: "DragonSlayer", replies: 45, views: 1230 },
              { title: "Гайд по прокачке персонажа", author: "ProGamer", replies: 23, views: 890 },
              { title: "Обсуждение последнего обновления", author: "Admin", replies: 67, views: 2140 },
              { title: "Поиск гильдии для рейдов", author: "NewPlayer", replies: 12, views: 340 },
            ].map((topic, index) => (
              <AnimatedCard key={index} delay={index * 50}>
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">{topic.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-foreground/60">
                        <span>Автор: {topic.author}</span>
                        <span className="flex items-center gap-1">
                          <Icon name="MessageCircle" size={14} />
                          {topic.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Eye" size={14} />
                          {topic.views}
                        </span>
                      </div>
                    </div>
                    <Icon name="ChevronRight" className="text-foreground/40" size={20} />
                  </div>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forum;