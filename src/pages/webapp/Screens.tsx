import { useState } from "react";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";
import IndexNavigation from "@/components/index/IndexNavigation";

const Screens = () => {
  const [selectedServer, setSelectedServer] = useState<string>("main");

  const screenshots = {
    main: [
      {
        id: 1,
        title: "Спавн сервера",
        description: "Красивый спавн с порталами в разные миры",
        image: "https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=Spawn",
      },
      {
        id: 2,
        title: "Город игроков",
        description: "Развитый город с магазинами и домами",
        image: "https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=City",
      },
      {
        id: 3,
        title: "Ролевые зоны",
        description: "Специальные зоны для ролевой игры",
        image: "https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=RP+Zones",
      },
      {
        id: 4,
        title: "События",
        description: "Арена для проведения массовых событий",
        image: "https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=Events",
      },
    ],
    pvp: [
      {
        id: 1,
        title: "PvP Арена",
        description: "Главная арена для дуэлей",
        image: "https://via.placeholder.com/800x450/EC4899/FFFFFF?text=Arena",
      },
      {
        id: 2,
        title: "Турнирная зона",
        description: "Место для турниров и соревнований",
        image: "https://via.placeholder.com/800x450/EC4899/FFFFFF?text=Tournament",
      },
    ],
    rp: [
      {
        id: 1,
        title: "Королевский замок",
        description: "Резиденция правителя королевства",
        image: "https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=Castle",
      },
      {
        id: 2,
        title: "Торговая площадь",
        description: "Центр торговли и ремесел",
        image: "https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=Market",
      },
    ],
    test: [
      {
        id: 1,
        title: "Тестовая зона",
        description: "Место для тестирования новых механик",
        image: "https://via.placeholder.com/800x450/F59E0B/FFFFFF?text=Test+Zone",
      },
    ],
  };

  const servers = [
    { id: "main", name: "Основной", icon: "Server", color: "primary" },
    { id: "pvp", name: "ISWAR", icon: "Sword", color: "accent" },
    { id: "rp", name: "Сервер #3", icon: "Crown", color: "primary" },
    { id: "test", name: "Сервер #4", icon: "Flask", color: "accent" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30">
      <IndexNavigation />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Скриншоты Серверов
          </h1>
          <p className="text-foreground/70 text-lg">
            Посмотри на наши сервера своими глазами
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {servers.map((server) => (
            <button
              key={server.id}
              onClick={() => setSelectedServer(server.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                selectedServer === server.id
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105"
                  : "bg-card/50 text-foreground/70 hover:bg-card/80"
              }`}
            >
              <Icon name={server.icon as any} size={20} />
              {server.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {screenshots[selectedServer as keyof typeof screenshots].map(
            (screenshot, index) => (
              <AnimatedCard key={screenshot.id} delay={index * 100}>
                <Card className="overflow-hidden bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">
                      {screenshot.title}
                    </h3>
                    <p className="text-foreground/70">{screenshot.description}</p>
                  </div>
                </Card>
              </AnimatedCard>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Screens;