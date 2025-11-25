import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  isLoggedIn: boolean;
  serverStatus: 'loading' | 'online' | 'offline';
  onlinePlayers: number;
}

const HeroSection = ({ isLoggedIn, serverStatus, onlinePlayers }: HeroSectionProps) => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">ImunnS RolePlay</h1>
          <p className="text-xl md:text-2xl text-foreground/90">
            Погрузись в мир ролевой игры с уникальными квестами и персонажами
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur border border-primary/30 rounded-full">
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
          <div className="flex gap-4 justify-center flex-wrap">
            {isLoggedIn ? (
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8" onClick={() => window.location.href = '/profile'}>
                <Icon name="User" className="mr-2" size={20} />
                Личный кабинет
              </Button>
            ) : (
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8" onClick={() => window.location.href = '/login'}>
                <Icon name="LogIn" className="mr-2" size={20} />
                Вход
              </Button>
            )}
            <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 text-lg px-8" asChild>
              <a href="https://t.me/imunns" target="_blank" rel="noopener noreferrer">
                <Icon name="Users" className="mr-2" size={20} />
                Сообщество
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
