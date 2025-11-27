import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import SpaceBackground from "@/components/SpaceBackground";
import { sounds } from "@/utils/sounds";

interface MenuItem {
  id: string;
  name: string;
  icon: string;
  price: number;
  category: 'food' | 'drink';
}

interface Order {
  id: string;
  items: MenuItem[];
  total: number;
  customerName: string;
  time: number;
}

interface Upgrade {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  level: number;
  maxLevel: number;
  effect: string;
}

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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 bg-green-500/20 backdrop-blur border-green-500/30">
                  <div className="flex items-center gap-3">
                    <Icon name="Coins" className="text-yellow-400" size={32} />
                    <div>
                      <p className="text-sm text-white/70">Деньги</p>
                      <p className="text-2xl font-bold text-white">{money} ₽</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-blue-500/20 backdrop-blur border-blue-500/30">
                  <div className="flex items-center gap-3">
                    <Icon name="CheckCircle" className="text-green-400" size={32} />
                    <div>
                      <p className="text-sm text-white/70">Заказов</p>
                      <p className="text-2xl font-bold text-white">{completedOrders}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-purple-500/20 backdrop-blur border-purple-500/30">
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" className="text-purple-400" size={32} />
                    <div>
                      <p className="text-sm text-white/70">Время</p>
                      <p className="text-2xl font-bold text-white">{formatTime(gameTime)}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-orange-500/20 backdrop-blur border-orange-500/30">
                  <div className="flex items-center gap-3">
                    <Icon name="Users" className="text-orange-400" size={32} />
                    <div>
                      <p className="text-sm text-white/70">Ожидают</p>
                      <p className="text-2xl font-bold text-white">{orders.length}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {showShop && (
                <Card className="p-6 bg-purple-500/10 backdrop-blur border-purple-500/30 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Icon name="ShoppingCart" size={24} />
                      Магазин улучшений
                    </h2>
                    <Button onClick={() => setShowShop(false)} variant="outline" size="sm">
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upgrades.map(upgrade => {
                      const cost = upgrade.cost * (upgrade.level + 1);
                      const canAfford = money >= cost;
                      const maxed = upgrade.level >= upgrade.maxLevel;
                      
                      return (
                        <Card key={upgrade.id} className="p-4 bg-white/5 backdrop-blur border-white/20">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                              <Icon name={upgrade.icon} size={24} className="text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white">{upgrade.name}</h3>
                              <p className="text-sm text-white/60">{upgrade.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex gap-1">
                              {Array.from({ length: upgrade.maxLevel }).map((_, i) => (
                                <div key={i} className={`w-8 h-2 rounded-full ${i < upgrade.level ? 'bg-purple-500' : 'bg-white/10'}`} />
                              ))}
                            </div>
                            <span className="text-xs text-white/60">
                              {upgrade.level}/{upgrade.maxLevel}
                            </span>
                          </div>
                          
                          <Button 
                            onClick={() => buyUpgrade(upgrade.id)}
                            disabled={!canAfford || maxed}
                            className="w-full"
                            variant={maxed ? "outline" : canAfford ? "default" : "outline"}
                          >
                            {maxed ? (
                              <>
                                <Icon name="CheckCircle" size={16} className="mr-2" />
                                Максимум
                              </>
                            ) : (
                              <>
                                <Icon name="Coins" size={16} className="mr-2" />
                                {cost} ₽
                              </>
                            )}
                          </Button>
                        </Card>
                      );
                    })}
                  </div>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Icon name="ClipboardList" size={24} />
                    Заказы гостей
                  </h2>

                  {orders.length === 0 ? (
                    <Card className="p-8 bg-white/10 backdrop-blur border-white/20">
                      <p className="text-white/60 text-center">Пока нет заказов. Ожидайте гостей...</p>
                    </Card>
                  ) : (
                    orders.map(order => (
                      <Card key={order.id} className="p-6 bg-white/10 backdrop-blur border-white/20 hover:border-white/40 transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{order.customerName}</h3>
                            <p className="text-sm text-white/60">Заказ #{order.id.slice(-4)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-yellow-400">{order.total} ₽</p>
                            <p className={`text-sm font-medium ${
                              order.time < 10 ? 'text-red-400' : 
                              order.time < 20 ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                              <Icon name="Timer" size={14} className="inline mr-1" />
                              {order.time}с
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {order.items.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                              <Icon name={item.icon} size={16} className="text-white/80" />
                              <span className="text-sm text-white">{item.name}</span>
                            </div>
                          ))}
                        </div>

                        <Button onClick={() => serveOrder(order)} className="w-full" size="lg">
                          Подать заказ
                        </Button>
                      </Card>
                    ))
                  )}
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Icon name="UtensilsCrossed" size={24} />
                    Меню
                  </h2>

                  <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
                    <p className="text-sm text-white/70 mb-4">Выбери блюда для заказа:</p>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-semibold text-white/50 uppercase">Напитки</p>
                      {menuItems.filter(item => item.category === 'drink').map(item => {
                        const isSelected = selectedItems.find(i => i.id === item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => toggleItemSelection(item)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                              isSelected 
                                ? 'bg-green-500/30 border-2 border-green-400' 
                                : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon name={item.icon} size={20} className="text-white" />
                              <span className="text-white font-medium">{item.name}</span>
                            </div>
                            <span className="text-yellow-400 font-bold">{item.price}₽</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-white/50 uppercase">Еда</p>
                      {menuItems.filter(item => item.category === 'food').map(item => {
                        const isSelected = selectedItems.find(i => i.id === item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => toggleItemSelection(item)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                              isSelected 
                                ? 'bg-green-500/30 border-2 border-green-400' 
                                : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon name={item.icon} size={20} className="text-white" />
                              <span className="text-white font-medium">{item.name}</span>
                            </div>
                            <span className="text-yellow-400 font-bold">{item.price}₽</span>
                          </button>
                        );
                      })}
                    </div>

                    {selectedItems.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-sm text-white/70 mb-2">Выбрано:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedItems.map((item, idx) => (
                            <div key={`selected-${item.id}-${idx}`} className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded text-xs text-white">
                              <Icon name={item.icon} size={12} />
                              {item.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>

                  <Card className="p-4 bg-blue-500/10 backdrop-blur border-blue-500/30">
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                      <Icon name="Info" size={16} />
                      Как играть
                    </h3>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Выбирай блюда из меню</li>
                      <li>• Собери точный заказ гостя</li>
                      <li>• Нажми "Подать заказ"</li>
                      <li>• Успей до окончания времени!</li>
                      <li>• За ошибки -50₽</li>
                      <li>• За просрочку -100₽</li>
                    </ul>
                  </Card>
                </div>
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