import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import SpaceBackground from "@/components/SpaceBackground";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (formData.password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }

    if (formData.username.length < 3) {
      setError("Никнейм должен быть не менее 3 символов");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://functions.poehali.dev/1f0f1fea-9e59-4896-a885-83d4c981565d", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.user_id);
        navigate("/login");
      } else {
        setError(data.error || "Ошибка регистрации");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30 flex items-center justify-center px-4 py-8 relative">
      <SpaceBackground />
      <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur border-border/50 relative z-10">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Icon name="UserPlus" className="text-white" size={32} />
          </button>
          <button
            onClick={() => navigate("/")}
            className="hover:opacity-80 transition-opacity"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ImunnS RolePlay
            </h1>
          </button>
          <p className="text-foreground/70 mt-2">Создайте новый аккаунт</p>
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
              minLength={3}
            />
            <p className="text-xs text-foreground/50 mt-1">Минимум 3 символа</p>
          </div>

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
              minLength={6}
            />
            <p className="text-xs text-foreground/50 mt-1">Минимум 6 символов</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Подтвердите пароль
            </label>
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

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-foreground/70">
            Уже есть аккаунт?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline font-medium"
            >
              Войти
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

export default Register;