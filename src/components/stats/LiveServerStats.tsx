import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ServerStats {
  serverName: string;
  isOnline: boolean;
  currentPlayers: number;
  maxPlayers: number;
  lastUpdated: string;
}

interface StatsResponse {
  servers: ServerStats[];
  totalOnline: number;
  timestamp: string;
}

const LiveServerStats = () => {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/46dc376f-2143-43fe-b8fe-2cf0bc9ed472');
      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch server stats:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="flex items-center justify-center">
          <Icon name="Loader2" className="animate-spin text-primary" size={32} />
        </div>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Users" className="text-primary" size={32} />
            <div>
              <h3 className="text-2xl font-bold">{stats.totalOnline}</h3>
              <p className="text-sm text-foreground/70">Игроков онлайн</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-foreground/70">Обновлено</span>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {stats.servers.map((server) => (
          <Card
            key={server.serverName}
            className={`p-6 backdrop-blur border-border/50 transition-all ${
              server.isOnline
                ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                : 'bg-gradient-to-br from-gray-500/10 to-slate-500/10'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon 
                  name={server.isOnline ? "Server" : "ServerOff"} 
                  className={server.isOnline ? "text-green-500" : "text-gray-400"} 
                  size={24} 
                />
                <h4 className="font-semibold">{server.serverName}</h4>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                server.isOnline 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {server.isOnline ? 'Открыт' : 'Закрыт'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/70">Игроков:</span>
                <span className="font-medium">
                  {server.currentPlayers} / {server.maxPlayers}
                </span>
              </div>
              
              <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    server.isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                  style={{ width: `${(server.currentPlayers / server.maxPlayers) * 100}%` }}
                />
              </div>

              {server.isOnline && (
                <p className="text-xs text-foreground/50 mt-2">
                  Обновлено: {new Date(server.lastUpdated).toLocaleTimeString('ru-RU')}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LiveServerStats;
