import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const STORAGE_KEY = 'ai_assistant_chat_history';

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [
          {
            id: '1',
            type: 'assistant',
            content: 'Привет! 👋 Я ИИ-помощник сервера Imunns RolePlay. Задавай любые вопросы о сервере, правилах или игровых механиках!',
            timestamp: new Date().toISOString()
          }
        ];
      }
    }
    return [
      {
        id: '1',
        type: 'assistant',
        content: 'Привет! 👋 Я ИИ-помощник сервера Imunns RolePlay. Задавай любые вопросы о сервере, правилах или игровых механиках!',
        timestamp: new Date().toISOString()
      }
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/64a29eb1-ae3b-4a58-a3c6-46b3f90015f2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input })
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.answer,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: `Ошибка: ${data.error || 'Не удалось получить ответ'}`,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Произошла ошибка при отправке запроса. Попробуйте позже.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    const confirmClear = window.confirm('Вы уверены, что хотите очистить историю чата?');
    if (confirmClear) {
      const initialMessage: Message = {
        id: '1',
        type: 'assistant',
        content: 'Привет! 👋 Я ИИ-помощник сервера Imunns RolePlay. Задавай любые вопросы о сервере, правилах или игровых механиках!',
        timestamp: new Date().toISOString()
      };
      setMessages([initialMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "Как начать играть на сервере?",
    "Какие есть правила?",
    "Что такое кристаллы?",
    "Как получить достижения?",
    "Как повысить уровень?"
  ];

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
            <a href="/forum" className="font-bold text-purple-300 hover:text-primary transition-colors">Форум</a>
            <a href="/assistant" className="text-primary font-bold transition-colors">ИИ Помощник</a>
            <a href="/stats" className="font-bold text-purple-300 hover:text-primary transition-colors">Топ игроков</a>
          </div>
          <Button 
            variant="outline" 
            className="border-primary/50 hover:bg-primary/10"
            onClick={() => window.location.href = '/'}
          >
            <Icon name="Home" className="mr-2" size={18} />
            Главная
          </Button>
        </div>
      </nav>

      <section className="py-8 min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4 max-w-5xl h-full">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ИИ Помощник
              </h1>
              <p className="text-foreground/70 text-lg">
                Задавайте вопросы и получайте мгновенные ответы
              </p>
            </div>
            <Button
              variant="outline"
              className="border-destructive/50 hover:bg-destructive/10"
              onClick={handleClearHistory}
            >
              <Icon name="Trash2" className="mr-2" size={18} />
              Очистить историю
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-280px)]">
            <div className="lg:col-span-3 flex flex-col">
              <Card className="flex-1 p-6 bg-card/50 backdrop-blur border-border/50 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'assistant' && (
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="Bot" className="text-white" size={20} />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-primary to-accent text-white'
                            : 'bg-card/80 border border-border/50'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs mt-2 opacity-60">
                          {new Date(message.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.type === 'user' && (
                        <div className="w-10 h-10 bg-card/80 border border-primary/50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="User" className="text-primary" size={20} />
                        </div>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Bot" className="text-white" size={20} />
                      </div>
                      <div className="bg-card/80 border border-border/50 p-4 rounded-lg">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="flex gap-2 border-t border-border/50 pt-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Задайте вопрос..."
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="Lightbulb" className="text-accent" size={20} />
                  Быстрые вопросы
                </h3>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="w-full text-left p-3 bg-card/50 hover:bg-primary/10 border border-border/50 hover:border-primary/50 rounded-lg transition-all text-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Info" className="text-primary" size={18} />
                    <span className="font-semibold">Совет</span>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Формулируйте вопросы чётко и конкретно для получения лучших ответов
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assistant;