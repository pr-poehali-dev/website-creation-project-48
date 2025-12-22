import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import SpaceBackground from '@/components/SpaceBackground';

interface Customer {
  id: number;
  z: number;
  order: {
    tea: string;
    milk: string;
    bubbles: string;
    ice: boolean;
  };
  patience: number;
  maxPatience: number;
  sprite: string;
}

interface Recipe {
  tea: string;
  milk: string;
  bubbles: string;
  ice: boolean;
}

const BubbleTeaGame = () => {
  const [score, setScore] = useState(0);
  const [money, setMoney] = useState(0);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>({
    tea: '',
    milk: '',
    bubbles: '',
    ice: false
  });
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const [spawnCooldown, setSpawnCooldown] = useState(3000);

  const teaTypes = [
    { name: '🍵 Зелёный', color: '#90EE90' },
    { name: '☕ Чёрный', color: '#8B4513' },
    { name: '🫖 Улун', color: '#FFE4B5' },
    { name: '🧡 Тайский', color: '#FFA500' }
  ];

  const milkTypes = [
    { name: '🥛 Обычное' },
    { name: '🥥 Кокосовое' },
    { name: '🌰 Миндальное' },
    { name: '🚫 Без молока' }
  ];

  const bubbleTypes = [
    { name: '⚫ Тапиока' },
    { name: '🟣 Желе' },
    { name: '🔵 Поппинг' },
    { name: '🚫 Без бабблов' }
  ];

  const customerSprites = ['🧑', '👨', '👩', '🧒', '👴', '👵', '🧑‍🦱', '👨‍🦰', '👩‍🦳'];

  useEffect(() => {
    const now = Date.now();
    const cooldown = Math.max(2000, 4000 - (level * 300));
    setSpawnCooldown(cooldown);

    const spawnInterval = setInterval(() => {
      if (customers.length < 2 + level && !gameOver && now - lastSpawnTime >= cooldown) {
        spawnCustomer();
        setLastSpawnTime(Date.now());
      }
    }, 500);

    return () => clearInterval(spawnInterval);
  }, [customers.length, level, gameOver, lastSpawnTime]);

  useEffect(() => {
    const patienceInterval = setInterval(() => {
      setCustomers(prev => {
        const updated = prev.map(customer => {
          const newPatience = customer.patience - 1;
          if (newPatience <= 0) {
            setLives(l => {
              const newLives = l - 1;
              if (newLives <= 0) {
                setGameOver(true);
              }
              return newLives;
            });
            return null;
          }
          return { ...customer, patience: newPatience };
        }).filter(c => c !== null) as Customer[];
        return updated;
      });
    }, 1000);

    return () => clearInterval(patienceInterval);
  }, []);

  const spawnCustomer = () => {
    const order: Recipe = {
      tea: teaTypes[Math.floor(Math.random() * teaTypes.length)].name,
      milk: milkTypes[Math.floor(Math.random() * milkTypes.length)].name,
      bubbles: bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)].name,
      ice: Math.random() > 0.5
    };

    const newCustomer: Customer = {
      id: Date.now(),
      z: Math.random() * 70 + 15,
      order,
      patience: Math.max(15, 35 - (level * 3)),
      maxPatience: Math.max(15, 35 - (level * 3)),
      sprite: customerSprites[Math.floor(Math.random() * customerSprites.length)]
    };

    setCustomers(prev => [...prev, newCustomer]);
  };

  const selectIngredient = (type: 'tea' | 'milk' | 'bubbles', value: string) => {
    setCurrentRecipe(prev => ({ ...prev, [type]: value }));
  };

  const toggleIce = () => {
    setCurrentRecipe(prev => ({ ...prev, ice: !prev.ice }));
  };

  const serveCustomer = (customer: Customer) => {
    const isCorrect = 
      currentRecipe.tea === customer.order.tea &&
      currentRecipe.milk === customer.order.milk &&
      currentRecipe.bubbles === customer.order.bubbles &&
      currentRecipe.ice === customer.order.ice;

    if (isCorrect) {
      const bonus = Math.floor((customer.patience / customer.maxPatience) * 50);
      const earnedMoney = 100 + bonus;
      setScore(s => {
        const newScore = s + 100 + bonus;
        if (newScore > 0 && newScore % 1000 < 150 && newScore > s) {
          setLevel(l => l + 1);
        }
        return newScore;
      });
      setMoney(m => m + earnedMoney);
      setCustomers(prev => prev.filter(c => c.id !== customer.id));
    } else {
      setLives(l => {
        const newLives = l - 1;
        if (newLives <= 0) {
          setGameOver(true);
        }
        return newLives;
      });
    }

    setCurrentRecipe({ tea: '', milk: '', bubbles: '', ice: false });
  };

  const resetGame = () => {
    setScore(0);
    setMoney(0);
    setCustomers([]);
    setCurrentRecipe({ tea: '', milk: '', bubbles: '', ice: false });
    setGameOver(false);
    setLives(3);
    setLevel(1);
    setLastSpawnTime(0);
  };

  const nextSpawnIn = Math.max(0, Math.ceil((spawnCooldown - (Date.now() - lastSpawnTime)) / 1000));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden">
      <SpaceBackground />
      
      <nav className="border-b border-border/50 backdrop-blur-sm bg-white/80 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={() => window.location.href = '/minigames'}>
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Назад
          </Button>
          <h1 className="text-2xl font-bold text-purple-600">🧋 Бабл Ти Ресторан 3D</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <Icon name="Coins" size={18} className="text-green-600" />
              <span className="font-bold text-green-600">{money}₽</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
              <Icon name="Star" size={18} className="text-blue-600" />
              <span className="font-bold text-blue-600">{score}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(Math.max(0, lives))].map((_, i) => (
                <Icon key={i} name="Heart" size={20} className="text-red-500 fill-red-500" />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {gameOver ? (
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto p-8 text-center bg-white/90 backdrop-blur">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-3xl font-bold mb-4">Игра окончена!</h2>
            <p className="text-lg mb-2">Финальный счёт: <span className="font-bold text-blue-600">{score}</span></p>
            <p className="text-lg mb-6">Заработано: <span className="font-bold text-green-600">{money}₽</span></p>
            <p className="text-lg mb-6">Уровень: <span className="font-bold text-purple-600">{level}</span></p>
            <Button onClick={resetGame} className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Icon name="RefreshCw" className="mr-2" size={18} />
              Играть снова
            </Button>
          </Card>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="mb-4 text-center flex items-center justify-center gap-4">
            <span className="text-2xl font-bold text-purple-600">Уровень {level}</span>
            {nextSpawnIn > 0 && (
              <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-bold">
                Следующий клиент через {nextSpawnIn}с
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Users" size={24} className="text-purple-600" />
                Клиенты ({customers.length})
              </h3>
              
              <div className="relative h-96 bg-gradient-to-b from-sky-200 via-blue-100 to-amber-50 rounded-lg border-4 border-amber-800 overflow-hidden"
                   style={{ perspective: '800px' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-amber-100/60" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-900/40 via-amber-700/20 to-transparent" />
                
                {customers.sort((a, b) => a.z - b.z).map((customer, idx) => {
                  const patiencePercent = (customer.patience / customer.maxPatience) * 100;
                  const scale = 0.5 + (customer.z / 100) * 0.8;
                  const yPos = 20 + (customer.z / 100) * 60;
                  
                  return (
                    <div
                      key={customer.id}
                      className="absolute transition-all duration-700"
                      style={{ 
                        left: '50%',
                        top: `${yPos}%`,
                        transform: `translateX(-50%) scale(${scale})`,
                        zIndex: Math.floor(customer.z)
                      }}
                    >
                      <div className="text-center">
                        <div className="text-5xl mb-2 cursor-pointer hover:scale-110 transition-transform"
                             onClick={() => serveCustomer(customer)}>
                          {customer.sprite}
                        </div>
                        
                        <Card className="p-3 bg-white/95 backdrop-blur shadow-lg min-w-[180px]">
                          <div className="text-xs space-y-1 text-left">
                            <div className="flex items-center gap-1">
                              <span className="font-bold">Чай:</span>
                              <span>{customer.order.tea}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold">Молоко:</span>
                              <span>{customer.order.milk}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold">Бабблы:</span>
                              <span>{customer.order.bubbles}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold">Лёд:</span>
                              <span>{customer.order.ice ? '🧊 Да' : '🚫 Нет'}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-1000 ${
                                  patiencePercent > 60 ? 'bg-green-500' :
                                  patiencePercent > 30 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${patiencePercent}%` }}
                              />
                            </div>
                            <div className="text-xs text-center mt-1 text-gray-600">
                              {customer.patience}с
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 text-sm text-gray-600 text-center">
                💡 Нажми на клиента, чтобы подать заказ
              </div>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Coffee" size={24} className="text-purple-600" />
                Приготовление напитка
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-3 text-lg">Выбери чай:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {teaTypes.map(tea => (
                      <Button
                        key={tea.name}
                        variant={currentRecipe.tea === tea.name ? "default" : "outline"}
                        onClick={() => selectIngredient('tea', tea.name)}
                        className={`h-auto py-3 text-base ${
                          currentRecipe.tea === tea.name 
                            ? 'bg-purple-500 hover:bg-purple-600 shadow-lg scale-105' 
                            : 'hover:bg-purple-50'
                        }`}
                      >
                        {tea.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3 text-lg">Добавь молоко:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {milkTypes.map(milk => (
                      <Button
                        key={milk.name}
                        variant={currentRecipe.milk === milk.name ? "default" : "outline"}
                        onClick={() => selectIngredient('milk', milk.name)}
                        className={`h-auto py-3 text-base ${
                          currentRecipe.milk === milk.name 
                            ? 'bg-blue-500 hover:bg-blue-600 shadow-lg scale-105' 
                            : 'hover:bg-blue-50'
                        }`}
                      >
                        {milk.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3 text-lg">Добавь бабблы:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {bubbleTypes.map(bubble => (
                      <Button
                        key={bubble.name}
                        variant={currentRecipe.bubbles === bubble.name ? "default" : "outline"}
                        onClick={() => selectIngredient('bubbles', bubble.name)}
                        className={`h-auto py-3 text-base ${
                          currentRecipe.bubbles === bubble.name 
                            ? 'bg-pink-500 hover:bg-pink-600 shadow-lg scale-105' 
                            : 'hover:bg-pink-50'
                        }`}
                      >
                        {bubble.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3 text-lg">Лёд:</h4>
                  <Button
                    variant={currentRecipe.ice ? "default" : "outline"}
                    onClick={toggleIce}
                    className={`w-full h-auto py-4 text-xl ${
                      currentRecipe.ice 
                        ? 'bg-cyan-500 hover:bg-cyan-600 shadow-lg scale-105' 
                        : 'hover:bg-cyan-50'
                    }`}
                  >
                    {currentRecipe.ice ? '🧊 С льдом' : '🚫 Без льда'}
                  </Button>
                </div>

                {(currentRecipe.tea || currentRecipe.milk || currentRecipe.bubbles) && (
                  <Card className="p-4 bg-purple-50 border-purple-200">
                    <h4 className="font-bold mb-2">Текущий напиток:</h4>
                    <div className="space-y-1 text-sm">
                      {currentRecipe.tea && <p>Чай: {currentRecipe.tea}</p>}
                      {currentRecipe.milk && <p>Молоко: {currentRecipe.milk}</p>}
                      {currentRecipe.bubbles && <p>Бабблы: {currentRecipe.bubbles}</p>}
                      <p>Лёд: {currentRecipe.ice ? '🧊 Да' : '🚫 Нет'}</p>
                    </div>
                  </Card>
                )}
              </div>
            </Card>
          </div>

          <div className="mt-6 p-4 bg-white/80 backdrop-blur rounded-lg text-center">
            <h4 className="font-bold mb-2">📖 Как играть:</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>1️⃣ Смотри заказы клиентов на экране</p>
              <p>2️⃣ Выбирай ингредиенты: чай, молоко, бабблы и лёд</p>
              <p>3️⃣ Нажми на клиента, чтобы подать готовый напиток</p>
              <p>⚡ Клиенты появляются каждые {Math.ceil(spawnCooldown / 1000)} секунд</p>
              <p>⏰ Успей обслужить до окончания терпения!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BubbleTeaGame;
