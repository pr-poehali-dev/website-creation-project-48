import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const VirtualAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Привет! Я виртуальный помощник Imunns RolePlay. Чем могу помочь?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages([...messages, { text: inputValue, isUser: true }]);
    
    setTimeout(() => {
      const responses = [
        "Спасибо за вопрос! Наша команда поддержки скоро ответит вам.",
        "Вы можете найти ответ в разделе Вики или на Форуме.",
        "Для входа на сервер используйте кнопку 'Вход' в верхнем меню.",
        "Онлайн игроков обновляется каждые 30 секунд на главной странице."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);

    setInputValue("");
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-[0_0_30px_rgba(168,85,247,0.6)] z-50"
        >
          <Icon name="MessageCircle" size={28} />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] bg-card/95 backdrop-blur border-primary/50 shadow-[0_0_40px_rgba(168,85,247,0.4)] z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Icon name="Bot" className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold">Артём
</h3>
                <p className="text-xs text-foreground/60">Онлайн</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary/10"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isUser
                      ? "bg-gradient-to-r from-primary to-accent text-white"
                      : "bg-card/50 border border-border/50"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Напишите сообщение..."
                className="flex-1 px-4 py-2 bg-background border border-border/50 rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default VirtualAssistant;