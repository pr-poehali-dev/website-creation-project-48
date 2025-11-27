import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface IndexNavigationProps {
  isLoggedIn: boolean;
}

const IndexNavigation = ({ isLoggedIn }: IndexNavigationProps) => {
  return (
    <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50 relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="Crown" className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ImunnS RolePlay</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <a href="/forum" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Форум</a>
          <a href="/stats" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Топ игроков</a>
          <a href="/jobs" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Работа</a>
          <a href="/admin" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Администрация</a>
          <a href="/rules" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Правила</a>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="border-orange-500/50 hover:bg-orange-500/10 rounded-full h-9 w-9" 
            onClick={() => window.location.href = '/game'}
            title="Игра: Уютный ресторанчик"
          >
            <Icon name="UtensilsCrossed" size={18} className="text-orange-400" />
          </Button>
          {isLoggedIn ? (
            <>
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
            </>
          ) : (
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90" onClick={() => window.location.href = '/login'}>
              Вход
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default IndexNavigation;