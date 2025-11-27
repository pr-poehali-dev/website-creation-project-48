import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface GameStatsProps {
  money: number;
  completedOrders: number;
  gameTime: number;
  ordersCount: number;
  formatTime: (seconds: number) => string;
}

const GameStats = ({ money, completedOrders, gameTime, ordersCount, formatTime }: GameStatsProps) => {
  return (
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
            <p className="text-2xl font-bold text-white">{ordersCount}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameStats;
