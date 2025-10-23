import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCard from "@/components/AnimatedCard";

const Wiki = () => {
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
            <a href="/wiki" className="text-primary font-bold transition-colors">Вики</a>
            <a href="/stats" className="font-bold text-purple-300 hover:text-primary transition-colors">Статистика</a>
            <a href="/jobs" className="font-bold text-purple-300 hover:text-primary transition-colors">Работа</a>
            <a href="/admin" className="font-bold text-purple-300 hover:text-primary transition-colors">Администрация</a>
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
              Вики
            </h1>
            <p className="text-foreground/70 text-lg">
              База знаний о мире, персонажах и механиках сервера
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCard delay={0}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-primary/5 backdrop-blur border-border/50 hover:scale-105 transition-transform h-full cursor-pointer">
                <Icon name="Book" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Квесты</h3>
                <p className="text-foreground/70">Гайды по прохождению сюжетных заданий</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={100}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-accent/5 backdrop-blur border-border/50 hover:scale-105 transition-transform h-full cursor-pointer">
                <Icon name="Users" className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Персонажи</h3>
                <p className="text-foreground/70">Информация о героях и их историях</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={200}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-primary/5 backdrop-blur border-border/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all h-full cursor-pointer">
                <Icon name="MapPin" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Локации</h3>
                <p className="text-foreground/70">Карты и описания игровых территорий</p>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={300}>
              <Card className="p-6 bg-gradient-to-br from-card/50 to-accent/5 backdrop-blur border-border/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all h-full cursor-pointer">
                <Icon name="Gamepad2" className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Механики</h3>
                <p className="text-foreground/70">Правила и особенности геймплея</p>
              </Card>
            </AnimatedCard>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Популярные статьи</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: "Sword", title: "Гайд по боевой системе", category: "Механики" },
                { icon: "Star", title: "Топ-10 квестов для новичков", category: "Квесты" },
                { icon: "Map", title: "Секретные локации на карте", category: "Локации" },
                { icon: "Crown", title: "Легендарные персонажи сервера", category: "Персонажи" },
              ].map((article, index) => (
                <AnimatedCard key={index} delay={index * 50}>
                  <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={article.icon as any} className="text-primary" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-accent mb-1">{article.category}</div>
                        <h3 className="text-lg font-semibold hover:text-primary transition-colors">{article.title}</h3>
                      </div>
                      <Icon name="ChevronRight" className="text-foreground/40 flex-shrink-0" size={20} />
                    </div>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wiki;