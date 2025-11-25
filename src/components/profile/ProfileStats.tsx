import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Stats {
  kills: number;
  deaths: number;
  quests: number;
  achievements: number;
}

interface ProfileStatsProps {
  stats: Stats;
  selectedServer: number;
  onServerChange: (serverNum: number) => void;
  onDeleteProfile: () => void;
}

const ProfileStats = ({ stats, selectedServer, onServerChange, onDeleteProfile }: ProfileStatsProps) => {
  const servers = [
    { id: 1, name: "Сервер #1", players: 42, status: "online" },
    { id: 2, name: "Сервер #2", players: 28, status: "online" },
    { id: 3, name: "Сервер #3", players: 15, status: "online" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 bg-card/80 backdrop-blur border-primary/20">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Icon name="BarChart3" size={24} className="text-primary" />
          Статистика
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.kills}</div>
            <div className="text-sm text-muted-foreground">Убийств</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{stats.deaths}</div>
            <div className="text-sm text-muted-foreground">Смертей</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.quests}</div>
            <div className="text-sm text-muted-foreground">Квестов</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{stats.achievements}</div>
            <div className="text-sm text-muted-foreground">Достижений</div>
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={onDeleteProfile} variant="destructive" className="w-full">
            <Icon name="Trash2" size={16} className="mr-2" />
            Удалить профиль
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-card/80 backdrop-blur border-primary/20">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Icon name="Server" size={24} className="text-primary" />
          Выбор сервера
        </h3>
        <div className="space-y-3">
          {servers.map((server) => (
            <button
              key={server.id}
              onClick={() => onServerChange(server.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                selectedServer === server.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-muted/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    server.status === "online" ? "bg-green-500" : "bg-red-500"
                  } animate-pulse`} />
                  <div className="text-left">
                    <div className="font-bold text-foreground">{server.name}</div>
                    <div className="text-sm text-muted-foreground">{server.players} игроков</div>
                  </div>
                </div>
                {selectedServer === server.id && (
                  <Icon name="Check" size={20} className="text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProfileStats;
