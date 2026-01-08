import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";
import MobileMenu from "@/components/MobileMenu";
import SpaceBackground from "@/components/SpaceBackground";
import Fireworks from "@/components/Fireworks";
import Snowflakes from "@/components/Snowflakes";
import SnowText from "@/components/SnowText";


interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedPass, setSelectedPass] = useState<string>("one-time");

  const passes = [
    {
      id: "one-time",
      name: "Одноразовая проходка",
      price: 100,
      icon: "Ticket",
      description: "Единоразовый вход на сервер",
      features: ["Доступ на 1 сессию", "Базовые возможности"]
    },
    {
      id: "monthly",
      name: "Ежемесячная проходка",
      price: 999,
      icon: "Calendar",
      description: "Доступ на месяц",
      features: ["Доступ на 30 дней", "Все возможности", "Приоритет в очереди"]
    },
    {
      id: "yearly",
      name: "Ежегодная проходка",
      price: 6000,
      icon: "CalendarDays",
      description: "Доступ на год",
      features: ["Доступ на 365 дней", "Все возможности", "VIP статус", "Эксклюзивные скины"]
    },
    {
      id: "lifetime",
      name: "Навсегда",
      price: 11500,
      icon: "Infinity",
      description: "Безлимитный доступ на всю жизнь",
      features: ["Доступ навсегда", "Все возможности", "Premium VIP статус", "Эксклюзивные скины", "Приоритетная поддержка", "Закрытые ивенты"]
    }
  ];

  const products = [
    {
      id: 1,
      name: "Кепка Imunns RP",
      category: "apparel",
      price: 1499,
      oldPrice: 2999,
      discount: 50,
      image: "🧢",
      description: "Стильная кепка с логотипом сервера",
      stock: "В наличии"
    },
    {
      id: 2,
      name: "Худи Imunns RP",
      category: "apparel",
      price: 3499,
      oldPrice: 5999,
      discount: 42,
      image: "👕",
      description: "Тёплое худи с вышитым логотипом",
      stock: "В наличии"
    },
    {
      id: 3,
      name: "Шопер Imunns RP",
      category: "accessories",
      price: 899,
      oldPrice: 1799,
      discount: 50,
      image: "👜",
      description: "Практичная сумка для повседневного использования",
      stock: "В наличии"
    },
    {
      id: 4,
      name: "Футболка Imunns RP",
      category: "apparel",
      price: 1299,
      oldPrice: 2599,
      discount: 50,
      image: "👕",
      description: "Качественная футболка из хлопка",
      stock: "В наличии"
    },
    {
      id: 5,
      name: "Кроссовки Imunns RP",
      category: "footwear",
      price: 5999,
      oldPrice: 9999,
      discount: 40,
      image: "👟",
      description: "Удобные кроссовки с уникальным дизайном",
      stock: "Предзаказ"
    },
    {
      id: 6,
      name: "Фигурка LIMITED",
      category: "collectibles",
      price: 2999,
      oldPrice: 4999,
      discount: 40,
      image: "🎭",
      description: "Лимитированная коллекционная фигурка",
      stock: "Осталось 5 шт",
      limited: true
    },
    {
      id: 7,
      name: "Блокнот Imunns RP",
      category: "stationery",
      price: 599,
      oldPrice: 999,
      discount: 40,
      image: "📓",
      description: "Стильный блокнот для заметок",
      stock: "В наличии"
    },
    {
      id: 8,
      name: "Рашгард Imunns RP",
      category: "sportswear",
      price: 2299,
      oldPrice: 3999,
      discount: 42,
      image: "🥋",
      description: "Спортивный рашгард для тренировок",
      stock: "В наличии"
    }
  ];

  const categories = [
    { id: "all", name: "Все товары", icon: "ShoppingBag" },
    { id: "apparel", name: "Одежда", icon: "Shirt" },
    { id: "footwear", name: "Обувь", icon: "Footprints" },
    { id: "accessories", name: "Аксессуары", icon: "Watch" },
    { id: "collectibles", name: "Коллекция", icon: "Star" },
    { id: "stationery", name: "Канцелярия", icon: "PenTool" },
    { id: "sportswear", name: "Спорт", icon: "Dumbbell" }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/60 via-purple-800/40 to-indigo-900/60 animate-gradient relative">
      <SpaceBackground />
      <Fireworks />
      <Snowflakes />

      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Crown" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Imunns RolePlay
            </span>
          </a>
          <div className="hidden md:flex items-center gap-2">
            <a href="/forum" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Форум</a>
            <a href="/shop" className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 border border-primary/40 text-foreground hover:bg-primary/15 transition-all">Магазин</a>
            <a href="/jobs" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Работа</a>
            <a href="/admin" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Администрация</a>
            <a href="/rules" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Правила</a>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="border-primary/50 hover:bg-primary/10 rounded-full h-9 w-9 relative" 
              onClick={() => setShowCart(true)}
            >
              <Icon name="ShoppingCart" size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Button>
            <Button variant="outline" size="icon" className="border-primary/50 hover:bg-primary/10 rounded-full h-9 w-9" onClick={() => window.location.href = '/profile'}>
              <Icon name="User" size={18} />
            </Button>
            <Button 
              variant="outline" 
              className="border-destructive/50 hover:bg-destructive/10" 
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.location.reload();
              }}
            >
              <Icon name="LogOut" className="mr-2" size={18} />
              Выход
            </Button>
          </div>
        </div>
      </nav>

      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <SnowText className="text-5xl font-bold mb-4">
              <h1 className="bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                🎄 Магазин мерча 🎄
              </h1>
            </SnowText>
            <p className="text-foreground/70 text-lg mb-4">
              Официальный мерч Imunns RolePlay
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8">
              <Icon name="Truck" size={16} className="text-primary" />
              <span className="text-sm text-foreground/70">Бесплатная доставка от 3000₽</span>
            </div>
          </div>

          <div className="mb-16">
            <SnowText className="text-3xl font-bold mb-6">
              <h2 className="text-center bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                ❄️ Проходки на сервер ❄️
              </h2>
            </SnowText>
            <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto items-stretch">
              {passes.map((pass) => (
                <AnimatedCard key={pass.id} className="flex-1">
                  <Card className={`p-6 h-full flex flex-col bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all cursor-pointer ${
                    selectedPass === pass.id ? 'border-primary shadow-[0_0_30px_rgba(168,85,247,0.6)]' : ''
                  }`} onClick={() => setSelectedPass(pass.id)}>
                    <div className="flex items-center justify-between mb-4">
                      <Icon name={pass.icon} size={32} className="text-primary" />
                      {selectedPass === pass.id && <Icon name="Check" size={24} className="text-green-400" />}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{pass.name}</h3>
                    <p className="text-foreground/60 text-sm mb-4">{pass.description}</p>
                    <div className="text-3xl font-bold text-primary mb-4">{pass.price}₽</div>
                    <ul className="space-y-2 mb-6 flex-grow">
                      {pass.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-foreground/70">
                          <Icon name="Check" size={16} className="text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-accent mt-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        const passItem = {
                          id: Date.now(),
                          name: pass.name,
                          price: pass.price,
                          image: pass.icon,
                          quantity: 1
                        };
                        setCart([...cart, passItem]);
                      }}
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      Купить
                    </Button>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>

          <SnowText>
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              🎁 Новогодняя коллекция 🎁
            </h2>
          </SnowText>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" : "border-blue-300/30 hover:border-blue-400/50"}
              >
                <Icon name={cat.icon} size={16} className="mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <AnimatedCard key={product.id} delay={index * 50}>
                  <Card className="p-6 bg-blue-950/40 backdrop-blur border-blue-300/30 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all h-full flex flex-col relative overflow-hidden">
                    {product.discount && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg animate-pulse">
                        -{product.discount}%
                      </div>
                    )}
                    
                    {product.limited && (
                      <div className="mb-3 inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full w-fit">
                        <Icon name="Sparkles" size={12} className="text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-400">LIMITED</span>
                      </div>
                    )}
                    
                    <div className="text-6xl mb-4 text-center">{product.image}</div>
                    
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-foreground/60 text-sm mb-4 flex-grow">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {product.oldPrice && (
                          <div className="text-sm text-foreground/40 line-through">{product.oldPrice}₽</div>
                        )}
                        <div className="text-2xl font-bold text-green-400">{product.price}₽</div>
                      </div>
                      <div className={`text-sm px-2 py-1 rounded-full ${
                        product.stock === "В наличии" ? "bg-green-500/20 text-green-400" :
                        product.stock === "Предзаказ" ? "bg-blue-500/20 text-blue-400" :
                        "bg-orange-500/20 text-orange-400"
                      }`}>
                        {product.stock}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-accent"
                      onClick={() => {
                        const existingItem = cart.find(item => item.id === product.id);
                        if (existingItem) {
                          setCart(cart.map(item => 
                            item.id === product.id 
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                          ));
                        } else {
                          setCart([...cart, { ...product, quantity: 1 }]);
                        }
                      }}
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Package" size={48} className="mx-auto mb-4 text-foreground/30" />
              <p className="text-foreground/60 text-lg">Товары не найдены</p>
            </div>
          )}
        </div>
      </section>

      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCart(false)}>
          <Card className="w-full max-w-2xl bg-card/95 backdrop-blur border-border/50 p-6 relative z-10 max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Корзина</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCart(false)}>
                <Icon name="X" size={24} />
              </Button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-foreground/30" />
                <p className="text-foreground/60">Корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-background/50 rounded-lg">
                      <div className="text-3xl">{item.image}</div>
                      <div className="flex-grow">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-foreground/60">{item.price}₽</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8"
                          onClick={() => {
                            if (item.quantity > 1) {
                              setCart(cart.map(i => 
                                i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
                              ));
                            } else {
                              setCart(cart.filter(i => i.id !== item.id));
                            }
                          }}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8"
                          onClick={() => {
                            setCart(cart.map(i => 
                              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                            ));
                          }}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                      <div className="font-bold">{item.price * item.quantity}₽</div>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => setCart(cart.filter(i => i.id !== item.id))}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/50 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold">Итого:</span>
                    <span className="text-2xl font-bold text-primary">
                      {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}₽
                    </span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent" size="lg">
                    <Icon name="CreditCard" className="mr-2" size={18} />
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      <MobileMenu />
    </div>
  );
};

export default Shop;