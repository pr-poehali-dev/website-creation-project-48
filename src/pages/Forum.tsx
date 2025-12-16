import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

import AnimatedCard from "@/components/AnimatedCard";
import SpaceBackground from "@/components/SpaceBackground";
import Fireworks from "@/components/Fireworks";
import Snowflakes from "@/components/Snowflakes";
import NewYearTimer from "@/components/NewYearTimer";

const Forum = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/60 via-purple-800/40 to-indigo-900/60 animate-gradient relative">
      <SpaceBackground />
      <Fireworks />
      <Snowflakes />

      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Crown" className="text-white" size={20} />
            </div>
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              <span className="hidden sm:inline">Imunns RolePlay</span>
              <span className="sm:hidden">Imunns RP</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-2">
            <a href="/forum" className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 border border-primary/40 text-foreground hover:bg-primary/15 transition-all">Форум</a>
            <a href="/stats" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Топ игроков</a>
            <a href="/jobs" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Работа</a>
            <a href="/admin" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Администрация</a>
            <a href="/rules" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Правила</a>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10 rounded-full h-9 w-9" onClick={() => window.location.href = '/profile'}>
              <Icon name="User" size={18} />
            </Button>
            <Button 
              variant="outline" 
              className="hidden sm:flex border-destructive/50 hover:bg-destructive/10" 
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.location.reload();
              }}
            >
              <Icon name="LogOut" className="mr-2" size={18} />
              Выход
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-primary/50 hover:bg-primary/10 rounded-full h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={18} />
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-16 left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border/50 z-40 animate-in slide-in-from-top md:hidden">
              <div className="container mx-auto px-4 py-6 space-y-3">
                <a href="/forum" className="block py-3 px-4 rounded-lg text-foreground bg-primary/10 border border-primary/40 hover:bg-primary/15 transition-all" onClick={() => setMobileMenuOpen(false)}>Форум</a>
                <a href="/stats" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all" onClick={() => setMobileMenuOpen(false)}>Топ игроков</a>
                <a href="/jobs" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all" onClick={() => setMobileMenuOpen(false)}>Работа</a>
                <a href="/admin" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all" onClick={() => setMobileMenuOpen(false)}>Администрация</a>
                <a href="/rules" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all" onClick={() => setMobileMenuOpen(false)}>Правила</a>
                <button 
                  className="block w-full py-3 px-4 rounded-lg text-destructive hover:bg-destructive/10 transition-all text-left sm:hidden" 
                  onClick={() => {
                    localStorage.removeItem('isLoggedIn');
                    window.location.reload();
                  }}
                >
                  <Icon name="LogOut" className="inline mr-2" size={18} />
                  Выход
                </button>
              </div>
            </div>
          </>
        )}
      </nav>

      <section className="py-12 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Форум
            </h1>
            <p className="text-foreground/70 text-base md:text-lg">
              Общайся с игроками, делись опытом и находи новых друзей
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8 md:mb-12">
            <NewYearTimer />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            <AnimatedCard delay={0}>
              <Card 
                className="p-4 md:p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all h-full cursor-pointer"
                onClick={() => window.open('https://t.me/+QgiLIa1gFRY4Y2Iy', '_blank')}
              >
                <Icon name="MessageSquare" className="text-primary mb-3 md:mb-4" size={28} />
                <h3 className="text-lg md:text-xl font-bold mb-2">Общие обсуждения</h3>
                <p className="text-foreground/70 text-sm md:text-base mb-3 md:mb-4">Обсуждай игровой процесс и делись впечатлениями</p>
                <div className="flex items-center gap-2 text-xs md:text-sm text-foreground/60">
                  <Icon name="Users" size={14} />
                  <span>1,247 участников</span>
                </div>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={100}>
              <Card 
                className="p-4 md:p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all h-full cursor-pointer"
                onClick={() => window.open('https://t.me/+QgiLIa1gFRY4Y2Iy', '_blank')}
              >
                <Icon name="HelpCircle" className="text-accent mb-3 md:mb-4" size={28} />
                <h3 className="text-lg md:text-xl font-bold mb-2">Помощь новичкам</h3>
                <p className="text-foreground/70 text-sm md:text-base mb-3 md:mb-4">Получи ответы на вопросы от опытных игроков</p>
                <div className="flex items-center gap-2 text-xs md:text-sm text-foreground/60">
                  <Icon name="Users" size={14} />
                  <span>523 участника</span>
                </div>
              </Card>
            </AnimatedCard>
            <AnimatedCard delay={200}>
              <Card 
                className="p-4 md:p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all h-full cursor-pointer"
                onClick={() => window.location.href = '/achievements'}
              >
                <Icon name="Trophy" className="text-primary mb-3 md:mb-4" size={28} />
                <h3 className="text-lg md:text-xl font-bold mb-2">Достижения</h3>
                <p className="text-foreground/70 text-sm md:text-base mb-3 md:mb-4">Делись своими успехами и историями</p>
                <div className="flex items-center gap-2 text-xs md:text-sm text-foreground/60">
                  <Icon name="Users" size={14} />
                  <span>892 участника</span>
                </div>
              </Card>
            </AnimatedCard>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Последние темы</h2>
            {[
              { title: "Новый ивент: Охота на драконов", author: "DragonSlayer", replies: 45, views: 1230 },
              { title: "Гайд по прокачке персонажа", author: "ProGamer", replies: 23, views: 890 },
              { title: "Обсуждение последнего обновления", author: "Admin", replies: 67, views: 2140 },
              { title: "Поиск гильдии для рейдов", author: "NewPlayer", replies: 12, views: 340 },
            ].map((topic, index) => (
              <AnimatedCard key={index} delay={index * 50}>
                <Card 
                  className="p-4 md:p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
                  onClick={() => window.open('https://t.me/+QgiLIa1gFRY4Y2Iy', '_blank')}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold mb-2 hover:text-primary transition-colors truncate">{topic.title}</h3>
                      <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-foreground/60 flex-wrap">
                        <span className="truncate">Автор: {topic.author}</span>
                        <span className="flex items-center gap-1 shrink-0">
                          <Icon name="MessageCircle" size={14} />
                          {topic.replies}
                        </span>
                        <span className="flex items-center gap-1 shrink-0">
                          <Icon name="Eye" size={14} />
                          {topic.views}
                        </span>
                      </div>
                    </div>
                    <Icon name="ChevronRight" className="text-foreground/40 shrink-0" size={18} />
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
