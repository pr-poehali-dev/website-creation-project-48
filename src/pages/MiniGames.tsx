import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import SpaceBackground from "@/components/SpaceBackground";

const MiniGames = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: "restaurant",
      title: "Уютный ресторанчик",
      description: "Управляй своим рестораном, обслуживай клиентов и расширяй бизнес",
      icon: "UtensilsCrossed",
      color: "from-orange-500 to-red-500"
    },
    {
      id: "pet",
      title: "Рост питомца",
      description: "Вырасти своего виртуального питомца, корми и играй с ним",
      icon: "Rabbit",
      color: "from-pink-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Мини-игры
          </h1>
          <p className="text-foreground/70 text-lg">
            Выбери игру и начни приключение!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {games.map((game) => (
            <Card
              key={game.id}
              className="p-6 hover:scale-105 transition-transform cursor-pointer group"
              onClick={() => navigate(`/minigame/${game.id}`)}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon name={game.icon} size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
              <p className="text-foreground/70 mb-4">{game.description}</p>
              
              <Button className="w-full">
                Играть
                <Icon name="PlayCircle" size={16} className="ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniGames;
