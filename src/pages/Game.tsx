import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import SpaceBackground from "@/components/SpaceBackground";
import { sounds } from "@/utils/sounds";
import GameStats from "@/components/game/GameStats";
import UpgradeShop, { Upgrade } from "@/components/game/UpgradeShop";
import OrdersList, { MenuItem, Order } from "@/components/game/OrdersList";
import MenuPanel from "@/components/game/MenuPanel";

const menuItems: MenuItem[] = [
  { id: '1', name: 'Кофе', icon: 'Coffee', price: 150, category: 'drink' },
  { id: '2', name: 'Чай', icon: 'Wine', price: 100, category: 'drink' },
  { id: '3', name: 'Сок', icon: 'GlassWater', price: 120, category: 'drink' },
  { id: '4', name: 'Пицца', icon: 'Pizza', price: 450, category: 'food' },
  { id: '5', name: 'Бургер', icon: 'Sandwich', price: 350, category: 'food' },
  { id: '6', name: 'Салат', icon: 'Salad', price: 250, category: 'food' },
  { id: '7', name: 'Суп', icon: 'Soup', price: 200, category: 'food' },
  { id: '8', name: 'Десерт', icon: 'Cake', price: 180, category: 'food' },
];

const customerNames = ['Алексей', 'Мария', 'Дмитрий', 'Анна', 'Иван', 'Елена', 'Сергей', 'Ольга'];

const Game = () => {
  const [money, setMoney] = useState(1000);
  const [orders, setOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [showShop, setShowShop] = useState(false);
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    { id: '1', name: 'Больше времени', description: 'Увеличивает время на заказ на 5 сек', icon: 'Clock', cost: 500, level: 0, maxLevel: 5, effect: 'time' },
    { id: '2', name: 'Бонус к заработку', description: 'Увеличивает доход на 20%', icon: 'TrendingUp', cost: 800, level: 0, maxLevel: 3, effect: 'income' },
    { id: '3', name: 'Меньше штрафов', description: 'Уменьшает штрафы на 50%', icon: 'Shield', cost: 600, level: 0, maxLevel: 2, effect: 'penalty' },
    { id: '4', name: 'Редкие гости', description: 'Уменьшает частоту заказов', icon: 'Users', cost: 400, level: 0, maxLevel: 3, effect: 'frequency' },
  ]);

  useEffect(() => {
    if (!isPlaying) return;

    const gameTimer = setInterval(() => {
      setGameTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(gameTimer);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const frequencyUpgrade = upgrades.find(u => u.id === '4');
    const interval = 8000 + (frequencyUpgrade?.level || 0) * 2000;

    const orderInterval = setInterval(() => {
      const maxOrders = 3;
      if (orders.length < maxOrders) {
        generateNewOrder();
      }
    }, interval);

    return () => clearInterval(orderInterval);
  }, [isPlaying, orders.length, upgrades]);

  useEffect(() => {
    if (!isPlaying) return;

    const timerInterval = setInterval(() => {
      const penaltyUpgrade = upgrades.find(u => u.id === '3');
      
      setOrders(prevOrders => {
        const updatedOrders = prevOrders.map(order => ({
          ...order,
          time: order.time - 1
        }));

        const expiredOrders = updatedOrders.filter(order => order.time <= 0);
        if (expiredOrders.length > 0) {
          const penalty = penaltyUpgrade && penaltyUpgrade.level > 0 ? 50 : 100;
          setMoney(prev => Math.max(0, prev - penalty));
          sounds.error();
        }
        
        updatedOrders.forEach(order => {
          if (order.time === 10) {
            sounds.warning();
          }
        });

        return updatedOrders.filter(order => order.time > 0);
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isPlaying, upgrades]);

  const generateNewOrder = () => {
    const numItems = Math.floor(Math.random() * 3) + 1;
    const orderItems: MenuItem[] = [];
    
    for (let i = 0; i < numItems; i++) {
      const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)];
      orderItems.push(randomItem);
    }

    const total = orderItems.reduce((sum, item) => sum + item.price, 0);
    const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];

    const timeUpgrade = upgrades.find(u => u.id === '1');
    const baseTime = 30 + (timeUpgrade?.level || 0) * 5;

    const newOrder: Order = {
      id: Date.now().toString(),
      items: orderItems,
      total,
      customerName,
      time: baseTime
    };

    setOrders(prev => [...prev, newOrder]);
    sounds.newOrder();
  };

  const toggleItemSelection = (item: MenuItem) => {
    sounds.click();
    const isSelected = selectedItems.find(i => i.id === item.id);
    if (isSelected) {
      setSelectedItems(prev => prev.filter(i => i.id !== item.id));
    } else {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const serveOrder = (order: Order) => {
    const selectedIds = selectedItems.map(i => i.id).sort().join(',');
    const orderIds = order.items.map(i => i.id).sort().join(',');

    if (selectedIds === orderIds) {
      sounds.success();
      sounds.coin();
      const incomeUpgrade = upgrades.find(u => u.id === '2');
      const bonus = 1 + (incomeUpgrade?.level || 0) * 0.2;
      const earnedMoney = Math.floor(order.total * bonus);
      setMoney(prev => prev + earnedMoney);
      setCompletedOrders(prev => prev + 1);
      setOrders(prev => prev.filter(o => o.id !== order.id));
      setSelectedItems([]);
    } else {
      sounds.error();
      const penaltyUpgrade = upgrades.find(u => u.id === '3');
      const penalty = penaltyUpgrade && penaltyUpgrade.level > 0 ? 25 : 50;
      setMoney(prev => Math.max(0, prev - penalty));
      setSelectedItems([]);
    }
  };

  const startGame = () => {
    sounds.success();
    setIsPlaying(true);
    setMoney(1000);
    setOrders([]);
    setCompletedOrders(0);
    setGameTime(0);
    setSelectedItems([]);
    generateNewOrder();
  };

  const stopGame = () => {
    setIsPlaying(false);
  };

  const buyUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || upgrade.level >= upgrade.maxLevel) return;
    
    const cost = upgrade.cost * (upgrade.level + 1);
    if (money < cost) {
      sounds.error();
      return;
    }
    
    sounds.coin();
    sounds.success();
    setMoney(prev => prev - cost);
    setUpgrades(prev => prev.map(u => 
      u.id === upgradeId ? { ...u, level: u.level + 1 } : u
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">🍽️ Уютный ресторанчик</h1>
              <p className="text-white/80">Обслуживай гостей и зарабатывай деньги!</p>
            </div>
            <div className="flex gap-3">
              {!isPlaying ? (
                <Button onClick={startGame} size="lg" className="gap-2">
                  <Icon name="Play" size={20} />
                  Начать игру
                </Button>
              ) : (
                <>
                  <Button onClick={() => setShowShop(!showShop)} size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700">
                    <Icon name="ShoppingCart" size={20} />
                    Магазин
                  </Button>
                  <Button onClick={stopGame} variant="destructive" size="lg" className="gap-2">
                    <Icon name="Square" size={20} />
                    Закончить
                  </Button>
                </>
              )}
            </div>
          </div>

          {isPlaying && (
            <>
              <GameStats
                money={money}
                completedOrders={completedOrders}
                gameTime={gameTime}
                ordersCount={orders.length}
                formatTime={formatTime}
              />

              {showShop && (
                <UpgradeShop
                  upgrades={upgrades}
                  money={money}
                  onBuyUpgrade={buyUpgrade}
                  onClose={() => setShowShop(false)}
                />
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <OrdersList
                  orders={orders}
                  onServeOrder={serveOrder}
                />

                <MenuPanel
                  menuItems={menuItems}
                  selectedItems={selectedItems}
                  onToggleItem={toggleItemSelection}
                />
              </div>
            </>
          )}

          {!isPlaying && (
            <Card className="p-12 bg-white/10 backdrop-blur border-white/20 text-center">
              <Icon name="ChefHat" size={64} className="mx-auto mb-4 text-white/60" />
              <h2 className="text-3xl font-bold text-white mb-4">Добро пожаловать в ресторанчик!</h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Обслуживай гостей, готовь заказы правильно и быстро. Зарабатывай деньги и становись лучшим рестораном!
              </p>
              <Button onClick={startGame} size="lg" className="gap-2">
                <Icon name="Play" size={20} />
                Начать игру
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
