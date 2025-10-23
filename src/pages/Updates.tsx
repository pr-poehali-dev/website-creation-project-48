import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCard from "@/components/AnimatedCard";

const Updates = () => {
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
            <a href="/updates" className="text-primary font-bold transition-colors">Обнова</a>
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
              Обновления
            </h1>
            <p className="text-foreground/70 text-lg">
              Следи за последними новостями и изменениями на сервере
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <AnimatedCard delay={0}>
              <Card className="p-8 bg-card/50 backdrop-blur border-primary/50 border-2">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" className="text-white" size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">НОВОЕ</span>
                      <span className="text-foreground/60 text-sm">22 октября 2025</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Обновление 2.5: Темные земли</h2>
                    <p className="text-foreground/80 mb-4">
                      Открыта новая локация с уникальными квестами и боссами. Добавлены новые классы персонажей и система крафта.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Icon name="Plus" className="text-accent flex-shrink-0 mt-1" size={16} />
                        <span>Новая локация "Темные земли" с 15 квестами</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Plus" className="text-accent flex-shrink-0 mt-1" size={16} />
                        <span>Два новых класса: Некромант и Следопыт</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Plus" className="text-accent flex-shrink-0 mt-1" size={16} />
                        <span>Расширенная система крафта предметов</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={100}>
              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Wrench" className="text-accent" size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-foreground/60 text-sm">15 октября 2025</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Патч 2.4.1: Исправления и баланс</h2>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={16} />
                        <span>Исправлена ошибка с инвентарем</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={16} />
                        <span>Балансировка классов: улучшен маг, ослаблен воин</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={16} />
                        <span>Оптимизация производительности сервера</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={200}>
              <Card className="p-8 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Calendar" className="text-primary" size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-foreground/60 text-sm">8 октября 2025</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Ивент: Хэллоуин 2025</h2>
                    <p className="text-foreground/80">
                      Специальный ивент с уникальными наградами. Участвуй в событиях и получи эксклюзивные предметы!
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Updates;