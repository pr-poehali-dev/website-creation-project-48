import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://functions.poehali.dev/33595cf5-9434-4502-a9bd-5c6888b6fbf5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        setError(data.error || "Ошибка входа");
      }
    } catch (err) {
      setError("Ошибка подключения к серверу");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur border-border/50">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="LogIn" className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Вход
          </h1>
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

        <div className="mt-6 text-center">
          <p className="text-foreground/70">
            Нет аккаунта?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-primary hover:underline font-medium"
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;