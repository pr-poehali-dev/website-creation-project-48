import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface NicknameInputProps {
  onNicknameSet: (nickname: string) => void;
}

const NicknameInput = ({ onNicknameSet }: NicknameInputProps) => {
  const [nickname, setNickname] = useState("");
  const [savedNickname, setSavedNickname] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('minecraft_nickname');
    if (saved) {
      setSavedNickname(saved);
      onNicknameSet(saved);
    }
  }, [onNicknameSet]);

  const handleSave = () => {
    if (nickname.trim()) {
      localStorage.setItem('minecraft_nickname', nickname.trim());
      setSavedNickname(nickname.trim());
      onNicknameSet(nickname.trim());
    }
  };

  const handleChange = () => {
    setSavedNickname(null);
    localStorage.removeItem('minecraft_nickname');
  };

  if (savedNickname) {
    return (
      <Card className="p-4 bg-primary/10 border-primary/30 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="User" size={20} className="text-primary" />
            <div>
              <p className="text-xs text-foreground/60">Ваш игровой ник</p>
              <p className="font-bold text-lg">{savedNickname}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleChange}
            className="border-primary/50"
          >
            Изменить
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-yellow-500/10 border-yellow-500/30 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="AlertCircle" size={24} className="text-yellow-400" />
        <div>
          <h3 className="font-bold text-lg mb-1">Привяжите игровой ник</h3>
          <p className="text-sm text-foreground/70">
            Укажите ваш ник с сервера <span className="font-mono text-primary">185.9.145.175:26068</span> для синхронизации достижений
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Введите ваш игровой ник"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          className="flex-1 bg-background/50 border-primary/30"
        />
        <Button
          onClick={handleSave}
          disabled={!nickname.trim()}
          className="bg-primary hover:bg-primary/90"
        >
          <Icon name="Save" size={18} className="mr-2" />
          Сохранить
        </Button>
      </div>
    </Card>
  );
};

export default NicknameInput;
