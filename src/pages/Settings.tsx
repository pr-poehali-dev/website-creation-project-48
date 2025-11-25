import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'security'>('account');
  
  const [accountData, setAccountData] = useState({
    username: "Player123",
    email: "player@example.com"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    setTimeout(() => {
      setMessage({ type: 'success', text: 'Данные аккаунта успешно обновлены!' });
      setLoading(false);
      localStorage.setItem('username', accountData.username);
    }, 1000);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Пароли не совпадают!' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Пароль должен содержать минимум 6 символов!' });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setMessage({ type: 'success', text: 'Пароль успешно изменен!' });
      setLoading(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30 animate-gradient relative">
      <ParticlesBackground />
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Imunns RolePlay
            </span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/profile" className="font-bold text-purple-300 hover:text-primary transition-colors">Профиль</a>
            <a href="/achievements" className="font-bold text-purple-300 hover:text-primary transition-colors">Достижения</a>
            <a href="/forum" className="font-bold text-purple-300 hover:text-primary transition-colors">Форум</a>
            <a href="/stats" className="font-bold text-purple-300 hover:text-primary transition-colors">Топ игроков</a>
          </div>
          <Button 
            variant="outline" 
            className="border-primary/50 hover:bg-primary/10"
            onClick={() => window.location.href = '/profile'}
          >
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Назад
          </Button>
        </div>
      </nav>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Настройки профиля
            </h1>
            <p className="text-foreground/70 text-lg">
              Управление данными аккаунта и безопасностью
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <Button
              variant={activeTab === 'account' ? 'default' : 'outline'}
              className={activeTab === 'account' ? 'bg-gradient-to-r from-primary to-accent' : 'border-primary/50'}
              onClick={() => setActiveTab('account')}
            >
              <Icon name="User" className="mr-2" size={18} />
              Данные аккаунта
            </Button>
            <Button
              variant={activeTab === 'security' ? 'default' : 'outline'}
              className={activeTab === 'security' ? 'bg-gradient-to-r from-primary to-accent' : 'border-primary/50'}
              onClick={() => setActiveTab('security')}
            >
              <Icon name="Lock" className="mr-2" size={18} />
              Безопасность
            </Button>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-green-500/10 border-green-500/50 text-green-500' 
                : 'bg-red-500/10 border-red-500/50 text-red-500'
            }`}>
              <div className="flex items-center gap-2">
                <Icon name={message.type === 'success' ? 'CheckCircle' : 'AlertCircle'} size={20} />
                <span>{message.text}</span>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="User" className="text-primary" size={24} />
                Изменить данные аккаунта
              </h2>
              <form onSubmit={handleUpdateAccount} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Никнейм
                  </label>
                  <input
                    type="text"
                    value={accountData.username}
                    onChange={(e) => setAccountData({ ...accountData, username: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    required
                    minLength={3}
                  />
                  <p className="text-xs text-foreground/60 mt-1">Минимум 3 символа</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={accountData.email}
                    onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                  <p className="text-xs text-foreground/60 mt-1">Используется для восстановления доступа</p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  {loading ? 'Сохранение...' : 'Сохранить изменения'}
                </Button>
              </form>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Lock" className="text-primary" size={24} />
                Изменить пароль
              </h2>
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Текущий пароль
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Новый пароль
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-foreground/60 mt-1">Минимум 6 символов</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Подтвердите новый пароль
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    required
                    minLength={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  {loading ? 'Изменение...' : 'Изменить пароль'}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Settings;
