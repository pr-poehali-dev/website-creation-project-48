import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface ProfileChatProps {
  currentUsername: string;
  currentAvatar: string;
}

const ProfileChat = ({ currentUsername, currentAvatar }: ProfileChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('globalChat');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      username: currentUsername,
      avatar: currentAvatar,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('globalChat', JSON.stringify(updatedMessages));
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50 flex flex-col h-[600px]">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
        <Icon name="MessageCircle" className="text-primary" size={24} />
        <h3 className="text-2xl font-bold">Чат игроков</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-foreground/50">
            <Icon name="MessageSquare" size={48} className="mb-2" />
            <p>Пока нет сообщений</p>
            <p className="text-sm">Будь первым, кто напишет!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.username === currentUsername ? 'flex-row-reverse' : ''
              }`}
            >
              <img
                src={msg.avatar}
                alt={msg.username}
                className="w-10 h-10 rounded-full border-2 border-primary/30"
              />
              <div
                className={`flex-1 ${
                  msg.username === currentUsername ? 'text-right' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-primary">
                    {msg.username}
                  </span>
                  <span className="text-xs text-foreground/50">
                    {msg.timestamp}
                  </span>
                </div>
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.username === currentUsername
                      ? 'bg-primary/20 border border-primary/30'
                      : 'bg-card border border-border/50'
                  }`}
                >
                  <p className="text-foreground/90 break-words">{msg.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Напишите сообщение..."
          className="flex-1 bg-background/50 border-border/50"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          <Icon name="Send" size={18} />
        </Button>
      </div>
    </Card>
  );
};

export default ProfileChat;
