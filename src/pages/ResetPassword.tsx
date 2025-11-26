import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import SpaceBackground from "@/components/SpaceBackground";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    code: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://functions.poehali.dev/784307b5-0758-4a31-aee5-b7d19ac35922", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "request",
          email: formData.email
        }),
      });

      if (response.status === 402) {
        setError("Сервис временно недоступен. Попробуйте позже.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setMessage(`Код восстановления: ${data.code}`);
        setFormData({ ...formData, username: data.username });
        setStep('code');
      } else {
        setError(data.error || "Ошибка отправки кода");
      }
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError("Не удалось подключиться к серверу. Проверьте интернет-соединение.");
      } else {
        setError("Произошла ошибка. Попробуйте позже.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://functions.poehali.dev/784307b5-0758-4a31-aee5-b7d19ac35922", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "verify",
          username: formData.username,
          code: formData.code,
          new_password: formData.newPassword
        }),
      });

      if (response.status === 402) {
        setError("Сервис временно недоступен. Попробуйте позже.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setMessage("Пароль успешно изменен! Переход на страницу входа...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.error || "Ошибка сброса пароля");
      }
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError("Не удалось подключиться к серверу. Проверьте интернет-соединение.");
      } else {
        setError("Произошла ошибка. Попробуйте позже.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30 flex items-center justify-center px-4 relative">
      <SpaceBackground />
      <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur border-border/50 relative z-10">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Icon name="Key" className="text-white" size={32} />
          </button>
          <button
            onClick={() => navigate("/")}
            className="hover:opacity-80 transition-opacity"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ImunnS RolePlay
            </h1>
          </button>
          <p className="text-foreground/70 mt-2">
            {step === 'email' ? 'Восстановление пароля' : 'Введите код и новый пароль'}
          </p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleRequestCode} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              {loading ? "Отправка..." : "Отправить код"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Код восстановления</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
                maxLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Новый пароль</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Подтвердите пароль</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              {loading ? "Сохранение..." : "Сохранить новый пароль"}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-foreground/50 hover:text-foreground/70 text-sm flex items-center justify-center gap-2 mx-auto"
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться к входу
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;