import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";
import IndexNavigation from "@/components/index/IndexNavigation";
import { useToast } from "@/hooks/use-toast";

interface Screenshot {
  id: number;
  user_id: number;
  username: string;
  server_id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  approved: boolean;
}

const AdminScreens = () => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string>("main");
  const { toast } = useToast();

  const servers = [
    { id: "main", name: "Основной", icon: "Server" },
    { id: "pvp", name: "ISWAR", icon: "Sword" },
    { id: "rp", name: "Сервер #3", icon: "Crown" },
    { id: "test", name: "Сервер #4", icon: "Flask" },
  ];

  const loadScreenshots = async (serverId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/4547bc93-b031-4f90-affa-2025df5e20dc?server_id=${serverId}&show_all=true`
      );
      const data = await response.json();
      setScreenshots(data);
    } catch (error) {
      console.error("Failed to load screenshots:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить скриншоты",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    loadScreenshots(selectedServer);
  }, [selectedServer]);

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(
        "https://functions.poehali.dev/4547bc93-b031-4f90-affa-2025df5e20dc",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            approved: true,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Одобрено!",
          description: "Скриншот опубликован",
        });
        loadScreenshots(selectedServer);
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось одобрить скриншот",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Approve failed:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось одобрить скриншот",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await fetch(
        `https://functions.poehali.dev/4547bc93-b031-4f90-affa-2025df5e20dc?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast({
          title: "Удалено",
          description: "Скриншот отклонён",
        });
        loadScreenshots(selectedServer);
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить скриншот",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Reject failed:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить скриншот",
        variant: "destructive",
      });
    }
  };

  const pendingScreenshots = screenshots.filter((s) => !s.approved);
  const approvedScreenshots = screenshots.filter((s) => s.approved);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30">
      <IndexNavigation />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Модерация Скриншотов
          </h1>
          <p className="text-foreground/70 text-lg">
            Одобряйте или отклоняйте загруженные скриншоты
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {servers.map((server) => (
            <button
              key={server.id}
              onClick={() => setSelectedServer(server.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                selectedServer === server.id
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105"
                  : "bg-card/50 text-foreground/70 hover:bg-card/80"
              }`}
            >
              <Icon name={server.icon as any} size={20} />
              {server.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <Icon
              name="Loader2"
              size={48}
              className="animate-spin text-primary mx-auto"
            />
          </div>
        ) : (
          <>
            {pendingScreenshots.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Icon name="Clock" className="text-accent" size={32} />
                  Ожидают модерации ({pendingScreenshots.length})
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {pendingScreenshots.map((screenshot, index) => (
                    <AnimatedCard key={screenshot.id} delay={index * 100}>
                      <Card className="overflow-hidden bg-card/50 backdrop-blur border-accent/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-all">
                        <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 overflow-hidden">
                          <img
                            src={screenshot.image_url}
                            alt={screenshot.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/800x450/EC4899/FFFFFF?text=No+Image";
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-2xl font-bold text-foreground">
                              {screenshot.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                              <Icon name="User" size={16} />
                              {screenshot.username}
                            </div>
                          </div>
                          <p className="text-foreground/70 mb-4">
                            {screenshot.description || "Без описания"}
                          </p>
                          <div className="flex gap-3">
                            <Button
                              onClick={() => handleApprove(screenshot.id)}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              <Icon name="Check" size={18} className="mr-2" />
                              Одобрить
                            </Button>
                            <Button
                              onClick={() => handleReject(screenshot.id)}
                              variant="destructive"
                              className="flex-1"
                            >
                              <Icon name="X" size={18} className="mr-2" />
                              Отклонить
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            )}

            {approvedScreenshots.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Icon name="CheckCircle" className="text-green-500" size={32} />
                  Опубликованные ({approvedScreenshots.length})
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {approvedScreenshots.map((screenshot, index) => (
                    <AnimatedCard key={screenshot.id} delay={index * 100}>
                      <Card className="overflow-hidden bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                          <img
                            src={screenshot.image_url}
                            alt={screenshot.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=No+Image";
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-2xl font-bold text-foreground">
                              {screenshot.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                              <Icon name="User" size={16} />
                              {screenshot.username}
                            </div>
                          </div>
                          <p className="text-foreground/70 mb-3">
                            {screenshot.description || "Без описания"}
                          </p>
                          <Button
                            onClick={() => handleReject(screenshot.id)}
                            variant="outline"
                            size="sm"
                            className="border-destructive/50 hover:bg-destructive/10"
                          >
                            <Icon name="Trash2" size={16} className="mr-2" />
                            Удалить
                          </Button>
                        </div>
                      </Card>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            )}

            {screenshots.length === 0 && (
              <div className="text-center py-20">
                <Icon
                  name="ImageOff"
                  size={48}
                  className="text-foreground/30 mx-auto mb-4"
                />
                <p className="text-foreground/50 text-lg">
                  Нет скриншотов для этого сервера
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminScreens;
