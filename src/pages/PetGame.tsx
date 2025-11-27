import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import SpaceBackground from "@/components/SpaceBackground";
import { toast } from "sonner";

interface Pet {
  name: string;
  level: number;
  experience: number;
  hunger: number;
  happiness: number;
  health: number;
  stage: "egg" | "baby" | "teen" | "adult";
}

const PetGame = () => {
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet>({
    name: "Пушок",
    level: 1,
    experience: 0,
    hunger: 100,
    happiness: 100,
    health: 100,
    stage: "egg"
  });

  const stageEmojis = {
    egg: "🥚",
    baby: "🐣",
    teen: "🐥",
    adult: "🐦"
  };

  const stageNames = {
    egg: "Яйцо",
    baby: "Птенец",
    teen: "Подросток",
    adult: "Взрослый"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPet(prev => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 1),
        happiness: Math.max(0, prev.happiness - 0.5),
        health: prev.hunger < 20 ? Math.max(0, prev.health - 1) : Math.min(100, prev.health + 0.5)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (pet.hunger < 30) {
      toast.warning("Питомец голоден!");
    }
    if (pet.happiness < 30) {
      toast.warning("Питомец грустит!");
    }
    if (pet.health < 30) {
      toast.error("Питомец болен!");
    }
  }, [pet.hunger, pet.happiness, pet.health]);

  useEffect(() => {
    const expToLevel = pet.level * 100;
    if (pet.experience >= expToLevel) {
      setPet(prev => {
        const newLevel = prev.level + 1;
        let newStage = prev.stage;
        
        if (newLevel === 2) newStage = "baby";
        if (newLevel === 5) newStage = "teen";
        if (newLevel === 10) newStage = "adult";
        
        toast.success(`Уровень повышен до ${newLevel}!`);
        if (newStage !== prev.stage) {
          toast.success(`Питомец вырос! Теперь ${stageNames[newStage]}!`);
        }
        
        return {
          ...prev,
          level: newLevel,
          experience: 0,
          stage: newStage
        };
      });
    }
  }, [pet.experience, pet.level]);

  const feedPet = () => {
    setPet(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30),
      experience: prev.experience + 10
    }));
    toast.success("Вкусно! +10 опыта");
  };

  const playWithPet = () => {
    if (pet.hunger < 20) {
      toast.error("Питомец слишком голоден для игр!");
      return;
    }
    
    setPet(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 30),
      hunger: Math.max(0, prev.hunger - 10),
      experience: prev.experience + 15
    }));
    toast.success("Весело! +15 опыта");
  };

  const healPet = () => {
    setPet(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 50),
      experience: prev.experience + 5
    }));
    toast.success("Лечение помогло! +5 опыта");
  };

  const petPet = () => {
    setPet(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 10),
      experience: prev.experience + 5
    }));
    toast.success("Питомец доволен! +5 опыта");
  };

  const getStatusColor = (value: number) => {
    if (value > 60) return "text-green-500";
    if (value > 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-2xl">
        <Button
          variant="outline"
          onClick={() => navigate('/minigames')}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          К выбору игр
        </Button>

        <Card className="p-8 text-center mb-6">
          <div className="text-8xl mb-4">{stageEmojis[pet.stage]}</div>
          <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
          <p className="text-lg text-foreground/70 mb-4">{stageNames[pet.stage]}</p>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Star" size={20} className="text-yellow-500" />
            <span className="text-xl font-bold">Уровень {pet.level}</span>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground/70">Опыт</span>
              <span className="text-sm font-bold">{pet.experience}/{pet.level * 100}</span>
            </div>
            <Progress value={(pet.experience / (pet.level * 100)) * 100} className="h-3" />
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Статус питомца</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon name="Apple" size={20} className="text-red-500" />
                  <span className="font-semibold">Голод</span>
                </div>
                <span className={`font-bold ${getStatusColor(pet.hunger)}`}>{Math.round(pet.hunger)}%</span>
              </div>
              <Progress value={pet.hunger} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon name="Heart" size={20} className="text-pink-500" />
                  <span className="font-semibold">Счастье</span>
                </div>
                <span className={`font-bold ${getStatusColor(pet.happiness)}`}>{Math.round(pet.happiness)}%</span>
              </div>
              <Progress value={pet.happiness} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon name="Activity" size={20} className="text-green-500" />
                  <span className="font-semibold">Здоровье</span>
                </div>
                <span className={`font-bold ${getStatusColor(pet.health)}`}>{Math.round(pet.health)}%</span>
              </div>
              <Progress value={pet.health} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Действия</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={feedPet}
              size="lg"
              className="h-20 flex-col gap-2"
            >
              <Icon name="Apple" size={24} />
              <span>Покормить</span>
            </Button>

            <Button
              onClick={playWithPet}
              size="lg"
              className="h-20 flex-col gap-2"
              variant="secondary"
            >
              <Icon name="Gamepad2" size={24} />
              <span>Поиграть</span>
            </Button>

            <Button
              onClick={healPet}
              size="lg"
              className="h-20 flex-col gap-2"
              variant="outline"
            >
              <Icon name="Heart" size={24} />
              <span>Лечить</span>
            </Button>

            <Button
              onClick={petPet}
              size="lg"
              className="h-20 flex-col gap-2"
              variant="outline"
            >
              <Icon name="Hand" size={24} />
              <span>Погладить</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PetGame;
