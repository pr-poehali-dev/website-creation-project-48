import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import SpaceBackground from "@/components/SpaceBackground";
import { API_URLS } from "@/config/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const registeredUsername = localStorage.getItem('registeredUsername');
    if (registeredUsername) {
      setFormData(prev => ({ ...prev, username: registeredUsername }));
      localStorage.removeItem('registeredUsername');
    }
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(API_URLS.auth, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        setError(data.error || "Ошибка входа");
      }
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError("Не удалось подключиться к серверу");
      } else {
        setError("Ошибка сети. Попробуйте позже");
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
            <Icon name="LogIn" className="text-white" size={32} />
          </button>
          <button
            onClick={() => navigate("/")}
            className="hover:opacity-80 transition-opacity"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ImunnS RolePlay
            </h1>
          </button>
          <p className="text-foreground/70 mt-2">Войдите в свой аккаунт</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Никнейм</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Пароль</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          {success && (
            <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
              {success}
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            {loading ? "Вход..." : "Войти"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-foreground/70">
            Нет аккаунта?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-primary hover:underline font-medium"
            >
              Зарегистрироваться
            </button>
          </p>
          <p className="text-foreground/70">
            Забыли пароль?{" "}
            <button
              onClick={() => navigate("/reset-password")}
              className="text-primary hover:underline font-medium"
            >
              Восстановить
            </button>
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-foreground/50 hover:text-foreground/70 text-sm flex items-center justify-center gap-2 mx-auto"
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться на главную
          </button>
        </div>
      </Card>
      <SpaceBackground />
    </div>
  );
};

export default Login;