import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";
import MobileMenu from "@/components/MobileMenu";
import SpaceBackground from "@/components/SpaceBackground";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Кепка Imunns RP",
      category: "apparel",
      price: 1499,
      image: "🧢",
      description: "Стильная кепка с логотипом сервера",
      stock: "В наличии"
    },
    {
      id: 2,
      name: "Худи Imunns RP",
      category: "apparel",
      price: 3499,
      image: "👕",
      description: "Тёплое худи с вышитым логотипом",
      stock: "В наличии"
    },
    {
      id: 3,
      name: "Шопер Imunns RP",
      category: "accessories",
      price: 899,
      image: "👜",
      description: "Практичная сумка для повседневного использования",
      stock: "В наличии"
    },
    {
      id: 4,
      name: "Футболка Imunns RP",
      category: "apparel",
      price: 1299,
      image: "👕",
      description: "Качественная футболка из хлопка",
      stock: "В наличии"
    },
    {
      id: 5,
      name: "Кроссовки Imunns RP",
      category: "footwear",
      price: 5999,
      image: "👟",
      description: "Удобные кроссовки с уникальным дизайном",
      stock: "Предзаказ"
    },
    {
      id: 6,
      name: "Фигурка LIMITED",
      category: "collectibles",
      price: 2999,
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
      image: "📓",
      description: "Стильный блокнот для заметок",
      stock: "В наличии"
    },
    {
      id: 8,
      name: "Рашгард Imunns RP",
      category: "sportswear",
      price: 2299,
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
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30 animate-gradient relative">
      <SpaceBackground />

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
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Магазин мерча
            </h1>
            <p className="text-foreground/70 text-lg mb-4">
              Официальный мерч Imunns RolePlay
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <Icon name="Truck" size={16} className="text-primary" />
              <span className="text-sm text-foreground/70">Бесплатная доставка от 3000₽</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? "bg-gradient-to-r from-primary to-accent" : ""}
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
                  <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all h-full flex flex-col">
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
                      <div className="text-2xl font-bold text-primary">{product.price}₽</div>
                      <div className={`text-sm px-2 py-1 rounded-full ${
                        product.stock === "В наличии" ? "bg-green-500/20 text-green-400" :
                        product.stock === "Предзаказ" ? "bg-blue-500/20 text-blue-400" :
                        "bg-orange-500/20 text-orange-400"
                      }`}>
                        {product.stock}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-primary to-accent">
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

      <MobileMenu />
    </div>
  );
};

export default Shop;
