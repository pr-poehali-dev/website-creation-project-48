import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import SpaceBackground from "@/components/SpaceBackground";
import { toast } from "sonner";

interface Customer {
  id: number;
  order: string;
  patience: number;
  maxPatience: number;
  reward: number;
}

const RestaurantGame = () => {
  const navigate = useNavigate();
  const [money, setMoney] = useState(100);
  const [reputation, setReputation] = useState(50);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [nextCustomerId, setNextCustomerId] = useState(1);
  const [level, setLevel] = useState(1);

  const dishes = [
    { name: "Борщ", time: 3000, price: 50, emoji: "🍲" },
    { name: "Пельмени", time: 2000, price: 40, emoji: "🥟" },
    { name: "Салат", time: 1000, price: 30, emoji: "🥗" },
    { name: "Чай", time: 500, price: 20, emoji: "🍵" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCustomers(prev => 
        prev.map(c => ({
          ...c,
          patience: Math.max(0, c.patience - 1)
        })).filter(c => {
          if (c.patience === 0) {
            setReputation(r => Math.max(0, r - 10));
            toast.error(`Клиент ушел недовольным! -10 репутации`);
            return false;
          }
          return true;
        })
      );
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const spawnTimer = setInterval(() => {
      if (customers.length < 3 && Math.random() > 0.5) {
        const dish = dishes[Math.floor(Math.random() * dishes.length)];
        const newCustomer: Customer = {
          id: nextCustomerId,
          order: dish.name,
          patience: 100,
          maxPatience: 100,
          reward: dish.price
        };
        setCustomers(prev => [...prev, newCustomer]);
        setNextCustomerId(id => id + 1);
      }
    }, 5000);

    return () => clearInterval(spawnTimer);
  }, [customers.length, nextCustomerId]);

  const serveDish = (customerId: number, dishName: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    if (customer.order === dishName) {
      const dish = dishes.find(d => d.name === dishName);
      if (!dish) return;

      setTimeout(() => {
        setCustomers(prev => prev.filter(c => c.id !== customerId));
        setMoney(m => m + customer.reward);
        setReputation(r => Math.min(100, r + 5));
        toast.success(`+${customer.reward}₽ и +5 репутации!`);
        
        if (money + customer.reward > level * 300) {
          setLevel(l => l + 1);
          toast.success(`Уровень повышен до ${level + 1}!`);
        }
      }, dish.time);
      
      toast.info(`Готовим ${dishName}...`);
    } else {
      toast.error("Это не то блюдо!");
    }
  };

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex gap-2 mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/minigames')}
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            К выбору игр
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
          >
            <Icon name="Home" size={16} className="mr-2" />
            Главная
          </Button>
        </div>

        <Card className="p-6 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Coins" size={20} className="text-yellow-500" />
                <span className="font-bold">Деньги</span>
              </div>
              <p className="text-2xl font-bold text-yellow-500">{money}₽</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Star" size={20} className="text-purple-500" />
                <span className="font-bold">Репутация</span>
              </div>
              <Progress value={reputation} className="h-2 mb-1" />
              <p className="text-sm text-foreground/70">{reputation}/100</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="TrendingUp" size={20} className="text-green-500" />
                <span className="font-bold">Уровень</span>
              </div>
              <p className="text-2xl font-bold text-green-500">{level}</p>
            </div>
          </div>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Клиенты</h2>
          {customers.length === 0 ? (
            <Card className="p-8 text-center">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-foreground/30" />
              <p className="text-foreground/50">Ожидаем клиентов...</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {customers.map((customer) => (
                <Card key={customer.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Icon name="User" size={32} className="text-primary" />
                      <div>
                        <p className="font-bold">Клиент #{customer.id}</p>
                        <p className="text-sm text-foreground/70">
                          Заказ: {customer.order} ({customer.reward}₽)
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground/70 mb-1">Терпение</p>
                      <Progress value={(customer.patience / customer.maxPatience) * 100} className="w-24 h-2" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {dishes.map((dish) => (
                      <Button
                        key={dish.name}
                        onClick={() => serveDish(customer.id, dish.name)}
                        variant={customer.order === dish.name ? "default" : "outline"}
                        size="sm"
                      >
                        {dish.emoji} {dish.name}
                      </Button>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Меню</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dishes.map((dish) => (
              <Card key={dish.name} className="p-4 text-center">
                <div className="text-4xl mb-2">{dish.emoji}</div>
                <p className="font-bold mb-1">{dish.name}</p>
                <p className="text-sm text-foreground/70">{dish.price}₽</p>
                <p className="text-xs text-foreground/50">{dish.time / 1000}с</p>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantGame;