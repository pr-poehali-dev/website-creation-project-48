import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export interface MenuItem {
  id: string;
  name: string;
  icon: string;
  price: number;
  category: 'food' | 'drink';
}

interface MenuPanelProps {
  menuItems: MenuItem[];
  selectedItems: MenuItem[];
  onToggleItem: (item: MenuItem) => void;
}

const MenuPanel = ({ menuItems, selectedItems, onToggleItem }: MenuPanelProps) => {
  return (
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
                onClick={() => onToggleItem(item)}
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
                onClick={() => onToggleItem(item)}
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
  );
};

export default MenuPanel;
