import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";
import IndexNavigation from "@/components/index/IndexNavigation";
import { useToast } from "@/hooks/use-toast";

interface Screenshot {
  id: number;
  username: string;
  server_id: string;
  title: string;
  description: string;
  image_url: string;
  status: string;
  created_at: string;
}

const AdminScreens = () => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("pending");
  const { toast } = useToast();



  const loadScreenshots = async (status: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/bc6705e5-4fca-4a0e-95cc-24fbe627eef2?status=${status}`
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
    const adminUsername = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn || adminUsername !== "Genya") {
      toast({
        title: "Доступ запрещен",
        description: "Только администраторы могут просматривать эту страницу",
        variant: "destructive",
      });
      window.location.href = "/";
      return;
    }

    loadScreenshots(filter);
  }, [filter]);

  const handleModerate = async (screenshotId: number, newStatus: string) => {
    const adminUsername = localStorage.getItem("username");
    
    setLoading(true);
    try {
      const response = await fetch(
        "https://functions.poehali.dev/bc6705e5-4fca-4a0e-95cc-24fbe627eef2",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            screenshot_id: screenshotId,
            status: newStatus,
            moderated_by: adminUsername,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: `Скриншот ${newStatus === 'approved' ? 'одобрен' : 'отклонен'}`,
        });
        loadScreenshots(filter);
      } else {
        const error = await response.json();
        toast({
          title: "Ошибка",
          description: error.error || "Не удалось модерировать скриншот",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Moderation failed:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось модерировать скриншот",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getServerName = (serverId: string) => {
    const servers: Record<string, string> = {
      main: "Основной",
      pvp: "ISWAR",
      rp: "Сервер #3",
      test: "Сервер #4",
    };
    return servers[serverId] || serverId;
  };

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
          <button
            onClick={() => setFilter("pending")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              filter === "pending"
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg scale-105"
                : "bg-card/50 text-foreground/70 hover:bg-card/80"
            }`}
          >
            <Icon name="Clock" size={20} />
            На модерации
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              filter === "approved"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105"
                : "bg-card/50 text-foreground/70 hover:bg-card/80"
            }`}
          >
            <Icon name="CheckCircle" size={20} />
            Одобренные
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              filter === "rejected"
                ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg scale-105"
                : "bg-card/50 text-foreground/70 hover:bg-card/80"
            }`}
          >
            <Icon name="XCircle" size={20} />
            Отклоненные
          </button>
        </div>

        {loading && screenshots.length === 0 ? (
          <div className="text-center py-20">
            <Icon
              name="Loader2"
              size={48}
              className="animate-spin text-primary mx-auto"
            />
          </div>
        ) : screenshots.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="ImageOff" size={48} className="text-foreground/30 mx-auto mb-4" />
            <p className="text-foreground/50 text-lg">
              Нет скриншотов для модерации
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {screenshots.map((screenshot, index) => (
              <AnimatedCard key={screenshot.id} delay={index * 100}>
                <Card className="overflow-hidden bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                    <img
                      src={screenshot.image_url}
                      alt={screenshot.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
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
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                        <Icon name="Server" size={14} />
                        {getServerName(screenshot.server_id)}
                      </div>
                    </div>
                    <p className="text-foreground/70 mb-3">{screenshot.description}</p>
                    <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
                      <Icon name="User" size={16} />
                      {screenshot.username}
                    </div>

                    {filter === "pending" && (
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleModerate(screenshot.id, "approved")}
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                        >
                          <Icon name="Check" size={18} className="mr-2" />
                          Одобрить
                        </Button>
                        <Button
                          onClick={() => handleModerate(screenshot.id, "rejected")}
                          disabled={loading}
                          variant="destructive"
                          className="flex-1"
                        >
                          <Icon name="X" size={18} className="mr-2" />
                          Отклонить
                        </Button>
                      </div>
                    )}

                    {filter === "approved" && (
                      <div className="flex items-center gap-2 text-green-500 font-semibold">
                        <Icon name="CheckCircle" size={18} />
                        Одобрено
                      </div>
                    )}

                    {filter === "rejected" && (
                      <div className="flex items-center gap-2 text-red-500 font-semibold">
                        <Icon name="XCircle" size={18} />
                        Отклонено
                      </div>
                    )}
                  </div>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminScreens;
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