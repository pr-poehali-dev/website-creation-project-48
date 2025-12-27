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
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

const Screens = () => {
  const [selectedServer, setSelectedServer] = useState<string>("main");
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    image_url: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { toast } = useToast();

  const servers = [
    { id: "main", name: "Основной", icon: "Server", color: "primary" },
    { id: "pvp", name: "ISWAR", icon: "Sword", color: "accent" },
    { id: "rp", name: "Сервер #3", icon: "Crown", color: "primary" },
    { id: "test", name: "Сервер #4", icon: "Flask", color: "accent" },
  ];

  const loadScreenshots = async (serverId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/bc6705e5-4fca-4a0e-95cc-24fbe627eef2?server_id=${serverId}&status=approved`
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
    loadScreenshots(selectedServer);
  }, [selectedServer]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Выберите файл изображения",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 10 МБ",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn || !userId || !username) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите в аккаунт, чтобы загрузить скриншот",
        variant: "destructive",
      });
      window.location.href = "/login";
      return;
    }

    if (!uploadData.title || !selectedFile) {
      toast({
        title: "Ошибка",
        description: "Заполните название и выберите изображение",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // First, upload image to S3
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      
      const imageBase64 = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
      });

      const uploadResponse = await fetch(
        "https://functions.poehali.dev/4454d3cd-9691-49f8-a3a2-bd1cc619abb8",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: imageBase64,
          }),
        }
      );

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        toast({
          title: "Ошибка загрузки",
          description: error.error || "Не удалось загрузить изображение",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const uploadResult = await uploadResponse.json();
      const imageUrl = uploadResult.url;

      // Then, save screenshot data
      const response = await fetch(
        "https://functions.poehali.dev/bc6705e5-4fca-4a0e-95cc-24fbe627eef2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: parseInt(userId),
            username: username,
            server_id: selectedServer,
            title: uploadData.title,
            description: uploadData.description,
            image_url: imageUrl,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Скриншот отправлен на модерацию",
        });
        setUploadModalOpen(false);
        setUploadData({ title: "", description: "", image_url: "" });
        setSelectedFile(null);
        setPreviewUrl("");
        loadScreenshots(selectedServer);
      } else {
        const error = await response.json();
        toast({
          title: "Ошибка",
          description: error.error || "Не удалось загрузить скриншот",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить скриншот",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30">
      <IndexNavigation />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Скриншоты Серверов
          </h1>
          <p className="text-foreground/70 text-lg mb-6">
            Посмотри на наши сервера своими глазами
          </p>
          <Button
            onClick={() => setUploadModalOpen(true)}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Icon name="Upload" size={20} className="mr-2" />
            Загрузить скриншот
          </Button>
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
              Пока нет скриншотов этого сервера
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
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <Icon name="User" size={16} />
                        {screenshot.username}
                      </div>
                    </div>
                    <p className="text-foreground/70">{screenshot.description}</p>
                  </div>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>

      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 bg-card/95 backdrop-blur border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Загрузить скриншот
              </h2>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-foreground/50 hover:text-foreground"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Название
                </label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Красивый замок"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Описание
                </label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) =>
                    setUploadData({
                      ...uploadData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                  rows={3}
                  placeholder="Описание скриншота..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Изображение
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
                     onClick={() => document.getElementById('file-input')?.click()}>
                  {previewUrl ? (
                    <div className="space-y-3">
                      <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                      <p className="text-sm text-foreground/70">{selectedFile?.name}</p>
                      <p className="text-xs text-foreground/50">{(selectedFile!.size / 1024 / 1024).toFixed(2)} МБ</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Icon name="Upload" size={48} className="text-foreground/30 mx-auto" />
                      <p className="text-foreground/70">Нажмите для выбора файла</p>
                      <p className="text-sm text-foreground/50">JPG, PNG, GIF до 10 МБ</p>
                    </div>
                  )}
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleUpload}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  {loading ? "Загрузка..." : "Загрузить"}
                </Button>
                <Button
                  onClick={() => setUploadModalOpen(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Screens;