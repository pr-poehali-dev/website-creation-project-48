import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  id: string;
  fromUserId: string;
  fromUsername: string;
  fromAvatar: string;
  toUserId: string;
  text: string;
  timestamp: string;
}

interface Friend {
  userId: string;
  username: string;
  avatar: string;
}

interface ProfileChatProps {
  currentUserId: string;
  currentUsername: string;
  currentAvatar: string;
}

const ProfileChat = ({ currentUserId, currentUsername, currentAvatar }: ProfileChatProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showAddFriendDialog, setShowAddFriendDialog] = useState(false);
  const [friendId, setFriendId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedFriends = localStorage.getItem(`${currentUserId}_friends`);
    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }
  }, [currentUserId]);

  useEffect(() => {
    if (selectedFriend) {
      const allMessages = JSON.parse(localStorage.getItem('allMessages') || '[]');
      const chatMessages = allMessages.filter((msg: Message) => 
        (msg.fromUserId === currentUserId && msg.toUserId === selectedFriend.userId) ||
        (msg.fromUserId === selectedFriend.userId && msg.toUserId === currentUserId)
      );
      setMessages(chatMessages);
    }
  }, [selectedFriend, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAddFriend = () => {
    if (!friendId.trim()) return;

    const friendProfile = localStorage.getItem(`profile_${friendId}`);
    if (!friendProfile) {
      alert('Игрок с таким ID не найден');
      return;
    }

    const profile = JSON.parse(friendProfile);
    const newFriend: Friend = {
      userId: friendId,
      username: profile.username,
      avatar: profile.avatar
    };

    if (friends.some(f => f.userId === friendId)) {
      alert('Этот игрок уже в друзьях');
      return;
    }

    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    localStorage.setItem(`${currentUserId}_friends`, JSON.stringify(updatedFriends));
    setShowAddFriendDialog(false);
    setFriendId("");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedFriend) return;

    const message: Message = {
      id: Date.now().toString(),
      fromUserId: currentUserId,
      fromUsername: currentUsername,
      fromAvatar: currentAvatar,
      toUserId: selectedFriend.userId,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    const allMessages = JSON.parse(localStorage.getItem('allMessages') || '[]');
    const updatedMessages = [...allMessages, message];
    localStorage.setItem('allMessages', JSON.stringify(updatedMessages));
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRemoveFriend = (userId: string) => {
    const updatedFriends = friends.filter(f => f.userId !== userId);
    setFriends(updatedFriends);
    localStorage.setItem(`${currentUserId}_friends`, JSON.stringify(updatedFriends));
    if (selectedFriend?.userId === userId) {
      setSelectedFriend(null);
    }
  };

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-4">
      <Card className="p-4 bg-card/50 backdrop-blur border-border/50 h-[600px] flex flex-col">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
          <h3 className="text-lg font-bold">Друзья</h3>
          <Button
            size="sm"
            onClick={() => setShowAddFriendDialog(true)}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Icon name="UserPlus" size={16} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {friends.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-foreground/50 text-center">
              <Icon name="Users" size={32} className="mb-2" />
              <p className="text-sm">Нет друзей</p>
              <p className="text-xs">Добавьте по ID</p>
            </div>
          ) : (
            friends.map((friend) => (
              <div
                key={friend.userId}
                className={`p-3 rounded-lg border cursor-pointer transition-all group ${
                  selectedFriend?.userId === friend.userId
                    ? 'bg-primary/20 border-primary/50'
                    : 'bg-card/50 border-border/30 hover:bg-primary/10 hover:border-primary/30'
                }`}
                onClick={() => setSelectedFriend(friend)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={friend.avatar}
                    alt={friend.username}
                    className="w-10 h-10 rounded-full border-2 border-primary/30"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{friend.username}</p>
                    <p className="text-xs text-foreground/50">ID: {friend.userId}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFriend(friend.userId);
                    }}
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur border-border/50 flex flex-col h-[600px]">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
          <Icon name="MessageCircle" className="text-primary" size={24} />
          <h3 className="text-2xl font-bold">
            {selectedFriend ? `Чат с ${selectedFriend.username}` : 'Выберите друга'}
          </h3>
        </div>

        {!selectedFriend ? (
          <div className="flex-1 flex flex-col items-center justify-center text-foreground/50">
            <Icon name="MessageSquare" size={48} className="mb-2" />
            <p>Выберите друга из списка</p>
            <p className="text-sm">или добавьте нового по ID</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-foreground/50">
                  <Icon name="MessageSquare" size={48} className="mb-2" />
                  <p>Нет сообщений</p>
                  <p className="text-sm">Начните диалог!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.fromUserId === currentUserId ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <img
                      src={msg.fromAvatar}
                      alt={msg.fromUsername}
                      className="w-10 h-10 rounded-full border-2 border-primary/30"
                    />
                    <div
                      className={`flex-1 ${
                        msg.fromUserId === currentUserId ? 'text-right' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-primary">
                          {msg.fromUsername}
                        </span>
                        <span className="text-xs text-foreground/50">
                          {msg.timestamp}
                        </span>
                      </div>
                      <div
                        className={`inline-block px-4 py-2 rounded-lg ${
                          msg.fromUserId === currentUserId
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
          </>
        )}
      </Card>

      <Dialog open={showAddFriendDialog} onOpenChange={setShowAddFriendDialog}>
        <DialogContent className="bg-card/95 backdrop-blur border-primary/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="UserPlus" className="text-primary" />
              Добавить друга
            </DialogTitle>
            <DialogDescription>
              Введите ID игрока, чтобы добавить его в друзья
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
              placeholder="ID игрока (например: 000001)"
              className="bg-background/50 border-border/50"
            />
            <p className="text-sm text-foreground/70">
              Свой ID: <span className="font-bold text-primary">{currentUserId}</span>
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddFriendDialog(false);
                setFriendId("");
              }}
            >
              Отмена
            </Button>
            <Button
              onClick={handleAddFriend}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileChat;
