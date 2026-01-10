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
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('minecraft_nickname');
    const locked = localStorage.getItem('minecraft_nickname_locked');
    if (saved) {
      setSavedNickname(saved);
      setIsLocked(locked === 'true');
      onNicknameSet(saved);
    }
  }, [onNicknameSet]);

  const handleSave = () => {
    if (nickname.trim()) {
      localStorage.setItem('minecraft_nickname', nickname.trim());
      localStorage.setItem('minecraft_nickname_locked', 'true');
      setSavedNickname(nickname.trim());
      setIsLocked(true);
      onNicknameSet(nickname.trim());
    }
  };

  if (savedNickname) {
    return (
      <Card className="p-4 bg-primary/10 border-primary/30 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name={isLocked ? "Lock" : "User"} size={20} className="text-primary" />
            <div>
              <p className="text-xs text-foreground/60">
                {isLocked ? "Ваш игровой ник (привязан навсегда)" : "Ваш игровой ник"}
              </p>
              <p className="font-bold text-lg">{savedNickname}</p>
              {isLocked && (
                <p className="text-xs text-primary/70 mt-0.5">
                  ⚠️ Изменение невозможно. Ник привязан к серверу 185.9.145.175:26068
                </p>
              )}
            </div>
          </div>
          {isLocked && (
            <div className="flex items-center gap-2 text-green-400">
              <Icon name="CheckCircle" size={18} />
              <span className="text-sm font-semibold">Привязан</span>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-yellow-500/10 border-yellow-500/30 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="AlertCircle" size={24} className="text-yellow-400" />
        <div>
          <h3 className="font-bold text-lg mb-1">⚠️ Привяжите игровой ник</h3>
          <p className="text-sm text-foreground/70 mb-2">
            Укажите ваш ник с сервера <span className="font-mono text-primary">185.9.145.175:26068</span> для синхронизации достижений
          </p>
          <div className="bg-red-500/10 border border-red-500/30 rounded p-2 mt-2">
            <p className="text-xs text-red-300 font-semibold">
              🔒 ВАЖНО: Ник можно привязать только ОДИН РАЗ! После привязки изменение будет невозможно.
            </p>
          </div>
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
          <Icon name="Lock" size={18} className="mr-2" />
          Привязать навсегда
        </Button>
      </div>
    </Card>
  );
};

export default NicknameInput;