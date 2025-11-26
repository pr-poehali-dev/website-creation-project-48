import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AddFriendDialogProps {
  open: boolean;
  onClose: () => void;
  currentUserId: string;
  onFriendAdded: () => void;
}

export default function AddFriendDialog({ open, onClose, currentUserId, onFriendAdded }: AddFriendDialogProps) {
  const [friendId, setFriendId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    setSearchResult(null);

    if (!friendId.trim()) {
      setError('Введите ID пользователя');
      return;
    }

    if (friendId === currentUserId) {
      setError('Нельзя добавить себя в друзья');
      return;
    }

    const profileData = localStorage.getItem(`profile_${friendId}`);
    
    if (!profileData) {
      setError('Пользователь с таким ID не найден');
      return;
    }

    const userData = JSON.parse(profileData);
    const friendsKey = `${currentUserId}_friends`;
    const existingFriends = JSON.parse(localStorage.getItem(friendsKey) || '[]');
    
    const alreadyFriend = existingFriends.some((f: any) => f.userId === friendId);
    
    if (alreadyFriend) {
      setError('Этот пользователь уже у вас в друзьях');
      return;
    }

    setSearchResult(userData);
  };

  const handleAddFriend = () => {
    if (!searchResult) return;

    const friendsKey = `${currentUserId}_friends`;
    const existingFriends = JSON.parse(localStorage.getItem(friendsKey) || '[]');
    
    const newFriend = {
      userId: searchResult.userId,
      username: searchResult.username,
      avatar: searchResult.avatar,
      status: 'pending',
      addedAt: new Date().toISOString()
    };

    existingFriends.push(newFriend);
    localStorage.setItem(friendsKey, JSON.stringify(existingFriends));

    const receivedKey = `${searchResult.userId}_friend_requests`;
    const receivedRequests = JSON.parse(localStorage.getItem(receivedKey) || '[]');
    
    const currentUserData = JSON.parse(localStorage.getItem(`profile_${currentUserId}`) || '{}');
    
    receivedRequests.push({
      userId: currentUserId,
      username: currentUserData.username || 'Unknown',
      avatar: currentUserData.avatar || '',
      status: 'pending',
      addedAt: new Date().toISOString()
    });
    
    localStorage.setItem(receivedKey, JSON.stringify(receivedRequests));

    onFriendAdded();
    setFriendId('');
    setSearchResult(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-purple-600">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Icon name="UserPlus" size={20} />
            Добавить друга
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="friendId" className="text-gray-300">ID игрока</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="friendId"
                value={friendId}
                onChange={(e) => setFriendId(e.target.value)}
                placeholder="Введите ID"
                className="bg-zinc-800 border-zinc-700 text-white"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700">
                <Icon name="Search" size={16} />
              </Button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg flex items-center gap-2">
              <Icon name="AlertCircle" size={16} />
              {error}
            </div>
          )}

          {searchResult && (
            <div className="bg-zinc-800 border border-purple-600/30 rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={searchResult.avatar}
                  alt={searchResult.username}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-white font-medium">{searchResult.username}</p>
                  <p className="text-gray-400 text-sm">ID: {searchResult.userId}</p>
                </div>
              </div>
              
              <Button 
                onClick={handleAddFriend}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Icon name="UserPlus" size={16} className="mr-2" />
                Отправить заявку
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
