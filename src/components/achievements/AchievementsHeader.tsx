import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface AchievementsHeaderProps {
  unlockedCount: number;
  totalCount: number;
  claimedCount: number;
  totalGems: number;
  totalExp: number;
  totalCoins: number;
}

const AchievementsHeader = ({
  unlockedCount,
  totalCount,
  claimedCount,
  totalGems,
  totalExp,
  totalCoins
}: AchievementsHeaderProps) => {
  return (
    <>
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
          <div className="hidden md:flex items-center gap-2">
            <a href="/forum" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Форум</a>
            <a href="/stats" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Топ игроков</a>
            <a href="/jobs" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Работа</a>
            <a href="/admin" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Администрация</a>
            <a href="/rules" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Правила</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10 rounded-full h-9 w-9" onClick={() => window.location.href = '/profile'}>
              <Icon name="User" size={18} />
            </Button>
            <Button 
              variant="outline" 
              className="border-destructive/50 hover:bg-destructive/10" 
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.location.reload();
              }}
            >
              <Icon name="LogOut" className="mr-2" size={18} />
              Выход
            </Button>
          </div>
        </div>
      </nav>

      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Достижения
            </h1>
            <p className="text-foreground/70 text-lg">
              Открыто {unlockedCount} из {totalCount} достижений · Получено наград: {claimedCount}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-400/50">
                <div className="flex items-center gap-3">
                  <Icon name="Gem" size={32} className="text-purple-400" />
                  <div>
                    <div className="text-2xl font-bold text-purple-300">{totalGems}</div>
                    <div className="text-sm text-purple-400/70">Гемов заработано</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-400/50">
                <div className="flex items-center gap-3">
                  <Icon name="Zap" size={32} className="text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-blue-300">{totalExp}</div>
                    <div className="text-sm text-blue-400/70">Опыта получено</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-400/50">
                <div className="flex items-center gap-3">
                  <Icon name="Coins" size={32} className="text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold text-yellow-300">{totalCoins}</div>
                    <div className="text-sm text-yellow-400/70">Монет заработано</div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="mt-4 w-full bg-card/30 rounded-full h-3 overflow-hidden border border-border/50">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AchievementsHeader;
