import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import SpaceBackground from '@/components/SpaceBackground';

interface Customer {
  id: number;
  x: number;
  order: {
    tea: string;
    milk: string;
    bubbles: string;
    ice: boolean;
  };
  patience: number;
  maxPatience: number;
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

  const teaTypes = [
    { name: 'Зелёный чай', color: '#90EE90', icon: '🍵' },
    { name: 'Чёрный чай', color: '#8B4513', icon: '☕' },
    { name: 'Молочный улун', color: '#FFE4B5', icon: '🫖' },
    { name: 'Тайский чай', color: '#FFA500', icon: '🧡' }
  ];

  const milkTypes = [
    { name: 'Обычное молоко', icon: '🥛' },
    { name: 'Кокосовое', icon: '🥥' },
    { name: 'Миндальное', icon: '🌰' },
    { name: 'Без молока', icon: '🚫' }
  ];

  const bubbleTypes = [
    { name: 'Тапиока', icon: '⚫' },
    { name: 'Желе', icon: '🟣' },
    { name: 'Поппинг боба', icon: '🔵' },
    { name: 'Без бабблов', icon: '🚫' }
  ];

  const customerSprites = ['🧑', '👨', '👩', '🧒', '👴', '👵', '🧑‍🦱', '👨‍🦰', '👩‍🦳'];

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (customers.length < 3 + level && !gameOver) {
        spawnCustomer();
      }
    }, 3000 - (level * 200));

    return () => clearInterval(spawnInterval);
  }, [customers.length, level, gameOver]);

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
      x: Math.random() * 60 + 10,
      order,
      patience: 30 - (level * 2),
      maxPatience: 30 - (level * 2)
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
      setScore(s => s + 100 + bonus);
      setMoney(m => m + earnedMoney);
      setCustomers(prev => prev.filter(c => c.id !== customer.id));
      
      if (score > 0 && (score + 100 + bonus) % 1000 === 0) {
        setLevel(l => l + 1);
      }
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden">
      <SpaceBackground />
      
      <nav className="border-b border-border/50 backdrop-blur-sm bg-white/80 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={() => window.location.href = '/minigames'}>
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Назад
          </Button>
          <h1 className="text-2xl font-bold text-purple-600">🧋 Бабл Ти Ресторан</h1>
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
          <div className="mb-4 text-center">
            <span className="text-2xl font-bold text-purple-600">Уровень {level}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Users" size={24} className="text-purple-600" />
                Клиенты ({customers.length})
              </h3>
              
              <div className="relative h-64 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg border-4 border-brown-400 overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-900/50 to-transparent" />
                
                {customers.map((customer, idx) => {
                  const patiencePercent = (customer.patience / customer.maxPatience) * 100;
                  return (
                    <div
                      key={customer.id}
                      className="absolute bottom-4 transition-all duration-500"
                      style={{ left: `${customer.x}%` }}
                    >
                      <div className="text-4xl animate-bounce" style={{ animationDelay: `${idx * 0.2}s` }}>
                        {customerSprites[idx % customerSprites.length]}
                      </div>
                      
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-2 shadow-lg border-2 border-purple-300 w-32">
                        <div className="text-xs mb-1">
                          {teaTypes.find(t => t.name === customer.order.tea)?.icon}
                          {milkTypes.find(m => m.name === customer.order.milk)?.icon}
                          {bubbleTypes.find(b => b.name === customer.order.bubbles)?.icon}
                          {customer.order.ice && '🧊'}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full transition-all ${
                              patiencePercent > 50 ? 'bg-green-500' : 
                              patiencePercent > 25 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${patiencePercent}%` }}
                          />
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gradient-to-r from-green-500 to-emerald-600"
                        onClick={() => serveCustomer(customer)}
                      >
                        Отдать
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Coffee" size={24} className="text-purple-600" />
                Приготовление напитка
              </h3>

              <div className="mb-6 p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300">
                <div className="text-6xl mb-2 text-center">🧋</div>
                <div className="flex flex-wrap gap-2 justify-center text-2xl">
                  {currentRecipe.tea && teaTypes.find(t => t.name === currentRecipe.tea)?.icon}
                  {currentRecipe.milk && milkTypes.find(m => m.name === currentRecipe.milk)?.icon}
                  {currentRecipe.bubbles && bubbleTypes.find(b => b.name === currentRecipe.bubbles)?.icon}
                  {currentRecipe.ice && '🧊'}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Выбери чай:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {teaTypes.map(tea => (
                      <Button
                        key={tea.name}
                        variant={currentRecipe.tea === tea.name ? "default" : "outline"}
                        className={currentRecipe.tea === tea.name ? "bg-purple-500" : ""}
                        onClick={() => selectIngredient('tea', tea.name)}
                      >
                        {tea.icon} {tea.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Добавь молоко:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {milkTypes.map(milk => (
                      <Button
                        key={milk.name}
                        variant={currentRecipe.milk === milk.name ? "default" : "outline"}
                        className={currentRecipe.milk === milk.name ? "bg-purple-500" : ""}
                        onClick={() => selectIngredient('milk', milk.name)}
                      >
                        {milk.icon} {milk.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Добавь бабблы:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {bubbleTypes.map(bubble => (
                      <Button
                        key={bubble.name}
                        variant={currentRecipe.bubbles === bubble.name ? "default" : "outline"}
                        className={currentRecipe.bubbles === bubble.name ? "bg-purple-500" : ""}
                        onClick={() => selectIngredient('bubbles', bubble.name)}
                      >
                        {bubble.icon} {bubble.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Button
                    variant={currentRecipe.ice ? "default" : "outline"}
                    className={`w-full ${currentRecipe.ice ? "bg-blue-500" : ""}`}
                    onClick={toggleIce}
                  >
                    🧊 {currentRecipe.ice ? 'Со льдом' : 'Без льда'}
                  </Button>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500"
                  onClick={() => setCurrentRecipe({ tea: '', milk: '', bubbles: '', ice: false })}
                >
                  <Icon name="Trash2" className="mr-2" size={18} />
                  Очистить
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default BubbleTeaGame;