import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export interface MenuItem {
  id: string;
  name: string;
  icon: string;
  price: number;
  category: 'food' | 'drink';
}

export interface Order {
  id: string;
  items: MenuItem[];
  total: number;
  customerName: string;
  time: number;
}

interface OrdersListProps {
  orders: Order[];
  onServeOrder: (order: Order) => void;
}

const OrdersList = ({ orders, onServeOrder }: OrdersListProps) => {
  return (
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

            <Button onClick={() => onServeOrder(order)} className="w-full" size="lg">
              Подать заказ
            </Button>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrdersList;
