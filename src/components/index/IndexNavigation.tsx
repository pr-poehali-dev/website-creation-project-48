import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { sounds } from "@/utils/sounds";

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
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent relative">
            <style>{`
              @keyframes snow-drift {
                0%, 100% {
                  transform: translateY(0) scale(1);
                }
                50% {
                  transform: translateY(-2px) scale(1.05);
                }
              }
              .snow-drift {
                position: absolute;
                bottom: -8px;
                left: 0;
                right: 0;
                height: 12px;
                background: linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(200,230,255,0.7));
                border-radius: 50% 50% 0 0 / 100% 100% 0 0;
                box-shadow: 
                  0 -2px 10px rgba(255,255,255,0.5),
                  inset 0 2px 5px rgba(200,230,255,0.3);
                animation: snow-drift 3s ease-in-out infinite;
              }
              .snow-drift::before {
                content: '';
                position: absolute;
                top: -3px;
                left: 10%;
                width: 25%;
                height: 6px;
                background: rgba(255,255,255,0.8);
                border-radius: 50%;
                box-shadow: 0 0 8px rgba(255,255,255,0.6);
              }
              .snow-drift::after {
                content: '';
                position: absolute;
                top: -5px;
                right: 15%;
                width: 30%;
                height: 8px;
                background: rgba(255,255,255,0.8);
                border-radius: 50%;
                box-shadow: 0 0 8px rgba(255,255,255,0.6);
              }
            `}</style>
            🎄 ImunnS RolePlay ❄️
            <span className="snow-drift"></span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <a href="/forum" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Форум</a>
          <a href="/shop" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Магазин</a>
          <a href="/jobs" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Работа</a>
          <a href="/admin" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Администрация</a>
          <a href="/rules" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Правила</a>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="border-purple-500/50 hover:bg-purple-500/10 rounded-full h-9 w-9 relative overflow-hidden group animate-pulse hover:animate-none transition-all hover:scale-110" 
            onClick={() => {
              sounds.click();
              setTimeout(() => window.location.href = '/minigames', 100);
            }}
            title="Мини-игры"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Icon name="Gamepad2" size={18} className="text-purple-400 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
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