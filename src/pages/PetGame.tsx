import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  coins: number;
  outfit: string;
}

interface ClothingItem {
  id: string;
  name: string;
  emoji: string;
  price: number;
  purchased: boolean;
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
    stage: "egg",
    coins: 100,
    outfit: ""
  });

  const [shopOpen, setShopOpen] = useState(false);
  const [cooldowns, setCooldowns] = useState({
    feed: 0,
    play: 0,
    heal: 0,
    pet: 0
  });

  const [clothing, setClothing] = useState<ClothingItem[]>([
    { id: "hat", name: "Шляпа", emoji: "🎩", price: 50, purchased: false },
    { id: "bow", name: "Бантик", emoji: "🎀", price: 40, purchased: false },
    { id: "glasses", name: "Очки", emoji: "🕶️", price: 60, purchased: false },
    { id: "crown", name: "Корона", emoji: "👑", price: 100, purchased: false },
    { id: "scarf", name: "Шарф", emoji: "🧣", price: 45, purchased: false },
    { id: "tie", name: "Галстук", emoji: "👔", price: 55, purchased: false }
  ]);

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
        hunger: Math.max(0, prev.hunger - 0.5),
        happiness: Math.max(0, prev.happiness - 0.3),
        health: prev.hunger < 20 ? Math.max(0, prev.health - 1) : Math.min(100, prev.health + 0.5)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cdTimer = setInterval(() => {
      setCooldowns(prev => ({
        feed: Math.max(0, prev.feed - 1),
        play: Math.max(0, prev.play - 1),
        heal: Math.max(0, prev.heal - 1),
        pet: Math.max(0, prev.pet - 1)
      }));
    }, 1000);

    return () => clearInterval(cdTimer);
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
          stage: newStage,
          coins: prev.coins + 50
        };
      });
    }
  }, [pet.experience, pet.level]);

  const feedPet = () => {
    if (cooldowns.feed > 0) {
      toast.error(`Подожди ${cooldowns.feed} сек`);
      return;
    }

    setPet(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30),
      experience: prev.experience + 10,
      coins: prev.coins + 5
    }));
    setCooldowns(prev => ({ ...prev, feed: 10 }));
    toast.success("Вкусно! +10 опыта, +5 монет");
  };

  const playWithPet = () => {
    if (cooldowns.play > 0) {
      toast.error(`Подожди ${cooldowns.play} сек`);
      return;
    }

    if (pet.hunger < 20) {
      toast.error("Питомец слишком голоден для игр!");
      return;
    }
    
    setPet(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 30),
      hunger: Math.max(0, prev.hunger - 10),
      experience: prev.experience + 15,
      coins: prev.coins + 10
    }));
    setCooldowns(prev => ({ ...prev, play: 15 }));
    toast.success("Весело! +15 опыта, +10 монет");
  };

  const healPet = () => {
    if (cooldowns.heal > 0) {
      toast.error(`Подожди ${cooldowns.heal} сек`);
      return;
    }

    setPet(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 50),
      experience: prev.experience + 5
    }));
    setCooldowns(prev => ({ ...prev, heal: 20 }));
    toast.success("Лечение помогло! +5 опыта");
  };

  const petPet = () => {
    if (cooldowns.pet > 0) {
      toast.error(`Подожди ${cooldowns.pet} сек`);
      return;
    }

    setPet(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 10),
      experience: prev.experience + 5,
      coins: prev.coins + 3
    }));
    setCooldowns(prev => ({ ...prev, pet: 5 }));
    toast.success("Питомец доволен! +5 опыта, +3 монеты");
  };

  const buyClothing = (item: ClothingItem) => {
    if (item.purchased) {
      setPet(prev => ({ ...prev, outfit: item.emoji }));
      toast.success(`Надел ${item.name}!`);
      setShopOpen(false);
      return;
    }

    if (pet.coins < item.price) {
      toast.error("Недостаточно монет!");
      return;
    }

    setPet(prev => ({ ...prev, coins: prev.coins - item.price, outfit: item.emoji }));
    setClothing(prev => prev.map(c => c.id === item.id ? { ...c, purchased: true } : c));
    toast.success(`Куплено: ${item.name}!`);
    setShopOpen(false);
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
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/minigames')}
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            К выбору игр
          </Button>

          <Button
            onClick={() => setShopOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <Icon name="ShoppingBag" size={16} className="mr-2" />
            Магазин
          </Button>
        </div>

        <Card className="p-8 text-center mb-6">
          <div className="relative inline-block">
            <div className="text-8xl mb-4">{stageEmojis[pet.stage]}</div>
            {pet.outfit && (
              <div className="absolute top-0 -right-4 text-4xl">{pet.outfit}</div>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
          <p className="text-lg text-foreground/70 mb-4">{stageNames[pet.stage]}</p>
          
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Star" size={20} className="text-yellow-500" />
              <span className="text-xl font-bold">Уровень {pet.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Coins" size={20} className="text-amber-500" />
              <span className="text-xl font-bold">{pet.coins}</span>
            </div>
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
              disabled={cooldowns.feed > 0}
            >
              <Icon name="Apple" size={24} />
              <span>{cooldowns.feed > 0 ? `${cooldowns.feed}с` : "Покормить"}</span>
            </Button>

            <Button
              onClick={playWithPet}
              size="lg"
              className="h-20 flex-col gap-2"
              variant="secondary"
              disabled={cooldowns.play > 0}
            >
              <Icon name="Gamepad2" size={24} />
              <span>{cooldowns.play > 0 ? `${cooldowns.play}с` : "Поиграть"}</span>
            </Button>

            <Button
              onClick={healPet}
              size="lg"
              className="h-20 flex-col gap-2"
              variant="outline"
              disabled={cooldowns.heal > 0}
            >
              <Icon name="Heart" size={24} />
              <span>{cooldowns.heal > 0 ? `${cooldowns.heal}с` : "Лечить"}</span>
            </Button>

            <Button
              onClick={petPet}
              size="lg"
              className="h-20 flex-col gap-2"
              variant="outline"
              disabled={cooldowns.pet > 0}
            >
              <Icon name="Hand" size={24} />
              <span>{cooldowns.pet > 0 ? `${cooldowns.pet}с` : "Погладить"}</span>
            </Button>
          </div>
        </Card>
      </div>

      <Dialog open={shopOpen} onOpenChange={setShopOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="ShoppingBag" size={24} />
              Магазин одежды
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3">
            {clothing.map((item) => (
              <Card
                key={item.id}
                className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => buyClothing(item)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.emoji}</span>
                    <div>
                      <p className="font-bold">{item.name}</p>
                      {item.purchased ? (
                        <p className="text-sm text-green-500">Куплено</p>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-500">
                          <Icon name="Coins" size={14} />
                          <span className="text-sm font-bold">{item.price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {item.purchased ? (
                    <Button size="sm" variant="outline">
                      Надеть
                    </Button>
                  ) : (
                    <Button size="sm">
                      Купить
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PetGame;
