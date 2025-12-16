import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import SnowText from "@/components/SnowText";

interface HeroSectionProps {
  isLoggedIn: boolean;
  serverStatus: 'loading' | 'online' | 'offline';
  onlinePlayers: number;
}

const HeroSection = ({ isLoggedIn, serverStatus, onlinePlayers }: HeroSectionProps) => {
  return (
    <section className="relative py-16 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <SnowText className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            <h1 className="bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.9)] animate-pulse">
              🎄 ImunnS RolePlay 🎄
            </h1>
          </SnowText>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 px-4">
            Погрузись в мир ролевой игры с уникальными квестами и персонажами
          </p>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg px-4">
            <div className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-card/50 backdrop-blur border border-primary/30 rounded-full">
              {serverStatus === 'loading' && (
                <>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-foreground/90">Проверка сервера...</span>
                </>
              )}
              {serverStatus === 'online' && (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-foreground/90">
                    <span className="font-bold text-primary">{onlinePlayers}</span> игроков онлайн
                  </span>
                </>
              )}
              {serverStatus === 'offline' && (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-foreground/90">Сервер оффлайн</span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-3 md:gap-4 justify-center flex-wrap px-4">
            {isLoggedIn ? (
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-base md:text-lg px-6 md:px-8" onClick={() => window.location.href = '/profile'}>
                <Icon name="User" className="mr-2" size={18} />
                <span className="hidden sm:inline">Личный кабинет</span>
                <span className="sm:hidden">Профиль</span>
              </Button>
            ) : (
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-base md:text-lg px-6 md:px-8" onClick={() => window.location.href = '/login'}>
                <Icon name="LogIn" className="mr-2" size={18} />
                Вход
              </Button>
            )}
            <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 text-base md:text-lg px-6 md:px-8" asChild>
              <a href="https://t.me/imunns" target="_blank" rel="noopener noreferrer">
                <Icon name="Users" className="mr-2" size={18} />
                <span className="hidden sm:inline">Сообщество</span>
                <span className="sm:hidden">Telegram</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;