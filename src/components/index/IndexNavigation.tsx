import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { sounds } from "@/utils/sounds";
import SnowDriftText from "@/components/SnowDriftText";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useSwipe } from "@/hooks/useSwipe";
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

  const swipeHandlers = useSwipe({
    onSwipeRight: () => mobileMenuOpen && setMobileMenuOpen(false),
  });

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener('touchstart', swipeHandlers.onTouchStart as any);
      document.addEventListener('touchend', swipeHandlers.onTouchEnd as any);
      return () => {
        document.removeEventListener('touchstart', swipeHandlers.onTouchStart as any);
        document.removeEventListener('touchend', swipeHandlers.onTouchEnd as any);
      };
    }
  }, [mobileMenuOpen]);
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
          <div className="hidden lg:flex items-center gap-1.5 mr-2">
            <a 
              href="https://t.me/imunns" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 hover:border-[#0088cc]/50 transition-all active-scale touch-optimized"
              title="Telegram"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0088cc]">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </a>
            <a 
              href="https://vk.com/imunns" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0077ff]/10 hover:bg-[#0077ff]/20 border border-[#0077ff]/30 hover:border-[#0077ff]/50 transition-all active-scale touch-optimized"
              title="ВКонтакте"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0077ff]">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.25 14.14c-.45.45-1.47.73-2.2.73-.96 0-1.19-.29-1.88-.98-.53-.53-.76-.76-1.13-.76-.44 0-.52.08-.52.47v1.08c0 .29-.09.46-.9.46-1.37 0-2.89-.83-3.96-2.36C6.11 12.93 5.62 11.03 5.62 10.7c0-.23.09-.44.47-.44h1.22c.35 0 .48.16.62.54.68 1.98 1.83 3.72 2.3 3.72.18 0 .26-.08.26-.54v-2.1c-.06-.97-.57-1.05-.57-1.39 0-.19.15-.38.4-.38h1.92c.3 0 .41.16.41.51v2.83c0 .3.14.41.22.41.18 0 .35-.11.71-.47 1.1-1.24 1.89-3.15 1.89-3.15.1-.23.27-.44.62-.44h1.22c.37 0 .45.19.37.51-.14.73-.89 2.33-1.88 3.56-.16.21-.21.31 0 .55.15.18.65.64 1 1.04.63.74 1.12 1.36 1.25 1.79.12.43-.07.65-.5.65h-1.22z"/>
              </svg>
            </a>
            <a 
              href="https://www.tiktok.com/@imunns" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#ff0050]/10 to-[#00f2ea]/10 hover:from-[#ff0050]/20 hover:to-[#00f2ea]/20 border border-[#ff0050]/30 hover:border-[#ff0050]/50 transition-all active-scale touch-optimized"
              title="TikTok"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path fill="#ff0050" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a 
              href="https://youtube.com/@imunns" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#ff0000]/10 hover:bg-[#ff0000]/20 border border-[#ff0000]/30 hover:border-[#ff0000]/50 transition-all active-scale touch-optimized"
              title="YouTube"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#ff0000]">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-purple-500/50 hover:bg-purple-500/10 rounded-full h-9 w-9 relative overflow-hidden group animate-pulse hover:animate-none transition-all hover:scale-110 active-scale touch-optimized" 
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
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden touch-optimized"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border/50 z-40 animate-in slide-in-from-top md:hidden swipe-smooth">
            <div className="container mx-auto px-4 py-6 space-y-3">
              <a href="/forum" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all active-scale touch-feedback" onClick={() => setMobileMenuOpen(false)}>Форум</a>
              <a href="/jobs" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all active-scale touch-feedback" onClick={() => setMobileMenuOpen(false)}>Работа</a>
              <a href="/admin" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all active-scale touch-feedback" onClick={() => setMobileMenuOpen(false)}>Администрация</a>
              <a href="/rules" className="block py-3 px-4 rounded-lg text-foreground hover:bg-primary/10 transition-all active-scale touch-feedback" onClick={() => setMobileMenuOpen(false)}>Правила</a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default IndexNavigation;