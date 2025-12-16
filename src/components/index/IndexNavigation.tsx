import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { sounds } from "@/utils/sounds";
import SnowDriftText from "@/components/SnowDriftText";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IndexNavigationProps {
  isLoggedIn: boolean;
}

const IndexNavigation = ({ isLoggedIn: _isLoggedIn }: IndexNavigationProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50 relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="Crown" className="text-white" size={20} />
          </div>
          <SnowDriftText className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
            <span className="hidden sm:inline">🎄 ImunnS RolePlay ❄️</span>
            <span className="sm:hidden">ImunnS RP</span>
          </SnowDriftText>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <a href="/forum" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Форум</a>
          <a href="/jobs" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Работа</a>
          <a href="/admin" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Администрация</a>
          <a href="/rules" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Правила</a>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
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
          {isAuthenticated && user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-primary/50 hover:bg-primary/10 rounded-full gap-2 pr-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Icon name="User" size={16} className="text-white" />
                    </div>
                    <span className="font-medium">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
                    <Icon name="User" size={16} className="mr-2" />
                    Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = '/achievements'}>
                    <Icon name="Trophy" size={16} className="mr-2" />
                    Достижения
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = '/settings'}>
                    <Icon name="Settings" size={16} className="mr-2" />
                    Настройки
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      logout();
                      window.location.href = '/';
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выход
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90" onClick={() => window.location.href = '/login'}>
              <span className="hidden sm:inline">Вход</span>
              <Icon name="LogIn" size={18} className="sm:hidden" />
            </Button>
          )}
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
              <a href="/forum" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all" onClick={() => setMobileMenuOpen(false)}>Форум</a>
              <a href="/jobs" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all" onClick={() => setMobileMenuOpen(false)}>Работа</a>
              <a href="/admin" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all" onClick={() => setMobileMenuOpen(false)}>Администрация</a>
              <a href="/rules" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all" onClick={() => setMobileMenuOpen(false)}>Правила</a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default IndexNavigation;