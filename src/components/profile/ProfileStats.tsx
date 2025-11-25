import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";

interface Stats {
  kills: number;
  deaths: number;
  quests: number;
  achievements: number;
}

interface ProfileStatsProps {
  selectedServer: number;
  onServerChange: (serverNum: number) => void;
}

const ProfileStats = ({ selectedServer, onServerChange }: ProfileStatsProps) => {
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [serverStatus, setServerStatus] = useState<'loading' | 'online' | 'offline'>('loading');

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/97b19ffd-bf8c-421a-9ae5-ee754557f899');
        const data = await response.json();
        
        if (data.status === 'online') {
          setOnlinePlayers(data.online);
          setServerStatus('online');
        } else {
          setServerStatus('offline');
        }
      } catch (error) {
        console.error('Failed to fetch server status:', error);
        setServerStatus('offline');
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const servers = [
    { id: 1, name: "Imunns Role Play", players: onlinePlayers, status: serverStatus },
    { id: 2, name: "ISWAR", players: 189, status: "online" },
    { id: 3, name: "Сервер #3", players: 156, status: "online" },
    { id: 4, name: "Сервер #4", players: 78, status: "online" },
  ];

  return (
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
  );
};

export default ProfileStats;