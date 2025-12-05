import VirtualAssistant from "@/components/VirtualAssistant";
import SpaceBackground from "@/components/SpaceBackground";
import IndexNavigation from "@/components/index/IndexNavigation";
import HeroSection from "@/components/index/HeroSection";
import ServersSection from "@/components/index/ServersSection";
import PromoSection from "@/components/index/PromoSection";
import Icon from "@/components/ui/icon";
import Fireworks from "@/components/Fireworks";
import Snowflakes from "@/components/Snowflakes";
import NewYearTimer from "@/components/NewYearTimer";
import { useEffect, useState } from "react";
import { API_URLS } from "@/config/api";

const Index = () => {
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [serverStatus, setServerStatus] = useState<'loading' | 'online' | 'offline'>('loading');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch(`${API_URLS.minecraftStatus}?host=imunnsrp.ru&port=25565`);
        
        if (response.status === 402) {
          setServerStatus('offline');
          setOnlinePlayers(0);
          return;
        }
        
        const data = await response.json();
        
        if (data.status === 'online') {
          setOnlinePlayers(data.online);
          setServerStatus('online');
        } else {
          setServerStatus('offline');
          setOnlinePlayers(0);
        }
      } catch (error) {
        setServerStatus('offline');
        setOnlinePlayers(0);
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-900/30 via-purple-800/20 to-indigo-900/30">
      <SpaceBackground />
      <Fireworks />
      <Snowflakes />
      <IndexNavigation isLoggedIn={isLoggedIn} />

      <HeroSection 
        isLoggedIn={isLoggedIn} 
        serverStatus={serverStatus} 
        onlinePlayers={onlinePlayers} 
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <NewYearTimer />
        </div>
      </div>

      <ServersSection />

      <PromoSection />

      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" className="text-white" size={16} />
                </div>
                <span className="text-xl font-bold">Imunns RolePlay</span>
              </div>
              <p className="text-foreground/70">
                Лучший Minecraft RolePlay сервер с уникальными квестами и дружным сообществом
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <div className="space-y-2">
                <a href="#forum" className="block text-foreground/70 hover:text-primary transition-colors">Форум</a>
                <a href="#wiki" className="block text-foreground/70 hover:text-primary transition-colors">Вики</a>
                <a href="#discord" className="block text-foreground/70 hover:text-primary transition-colors">Discord</a>
                <a href="#updates" className="block text-foreground/70 hover:text-primary transition-colors">Обнова</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2">
                <p className="text-foreground/70">Email: imunns@yandex.ru</p>
                <p className="text-foreground/70">Discord: imunns.gg</p>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-border/50">
            <p className="text-foreground/50">
              © 2025 Imunns RolePlay. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
      <VirtualAssistant />
    </div>
  );
};

export default Index;