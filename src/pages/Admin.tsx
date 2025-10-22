import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCard from "@/components/AnimatedCard";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/30 via-background to-purple-600/20 animate-gradient relative">
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
            <a href="/forum" className="text-foreground/80 hover:text-primary transition-colors">Форум</a>
            <a href="/wiki" className="text-foreground/80 hover:text-primary transition-colors">Вики</a>
            <a href="/updates" className="text-foreground/80 hover:text-primary transition-colors">Обнова</a>
            <a href="/admin" className="text-primary font-semibold transition-colors">Администрация</a>
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
              Администрация
            </h1>
            <p className="text-foreground/70 text-lg">
              Команда, которая делает сервер лучше каждый день
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <AnimatedCard delay={0}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-primary/5 backdrop-blur border-border/50 hover:scale-105 transition-transform">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
                    <Icon name="Crown" className="text-white" size={40} />
                  </div>
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full mb-2">ВЛАДЕЛЕЦ</span>
                  <h3 className="text-xl font-bold mb-1">Imunns</h3>
                  <p className="text-foreground/70 text-sm">Основатель сервера</p>
                </div>
              </Card>
            </AnimatedCard>

            {[
              { name: "AdminName1", role: "Главный администратор", icon: "Shield" },
              { name: "AdminName2", role: "Администратор", icon: "Shield" },
              { name: "ModerName1", role: "Модератор", icon: "UserCheck" },
              { name: "ModerName2", role: "Модератор", icon: "UserCheck" },
              { name: "HelperName1", role: "Хелпер", icon: "HelpCircle" },
            ].map((admin, index) => (
              <AnimatedCard key={index} delay={(index + 1) * 50}>
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                      <Icon name={admin.icon as any} className="text-accent" size={32} />
                    </div>
                    <h3 className="text-lg font-bold mb-1">{admin.name}</h3>
                    <p className="text-foreground/70 text-sm">{admin.role}</p>
                  </div>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Связаться с администрацией</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedCard delay={0}>
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageSquare" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Discord</h3>
                      <p className="text-foreground/70 text-sm">Быстрая связь с командой</p>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
              <AnimatedCard delay={100}>
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Форум</h3>
                      <p className="text-foreground/70 text-sm">Официальные обращения</p>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
