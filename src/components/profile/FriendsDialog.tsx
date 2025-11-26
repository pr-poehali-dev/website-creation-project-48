import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import AddFriendDialog from './AddFriendDialog';

interface FriendsDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export default function FriendsDialog({ open, onClose, userId }: FriendsDialogProps) {
  const [friends, setFriends] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const loadFriends = () => {
    const friendsKey = `${userId}_friends`;
    const friendsList = JSON.parse(localStorage.getItem(friendsKey) || '[]');
    setFriends(friendsList);

    const requestsKey = `${userId}_friend_requests`;
    const requestsList = JSON.parse(localStorage.getItem(requestsKey) || '[]');
    setRequests(requestsList);
  };

  useEffect(() => {
    if (open) {
      loadFriends();
    }
  }, [open, userId]);

  const handleAcceptRequest = (friendUserId: string) => {
    const requestsKey = `${userId}_friend_requests`;
    const requestsList = JSON.parse(localStorage.getItem(requestsKey) || '[]');
    const request = requestsList.find((r: any) => r.userId === friendUserId);
    
    if (!request) return;

    const updatedRequests = requestsList.filter((r: any) => r.userId !== friendUserId);
    localStorage.setItem(requestsKey, JSON.stringify(updatedRequests));

    const friendsKey = `${userId}_friends`;
    const friendsList = JSON.parse(localStorage.getItem(friendsKey) || '[]');
    friendsList.push({ ...request, status: 'accepted' });
    localStorage.setItem(friendsKey, JSON.stringify(friendsList));

    const senderFriendsKey = `${friendUserId}_friends`;
    const senderFriends = JSON.parse(localStorage.getItem(senderFriendsKey) || '[]');
    const senderFriend = senderFriends.find((f: any) => f.userId === userId);
    
    if (senderFriend) {
      senderFriend.status = 'accepted';
      localStorage.setItem(senderFriendsKey, JSON.stringify(senderFriends));
    }

    loadFriends();
  };

  const handleRejectRequest = (friendUserId: string) => {
    const requestsKey = `${userId}_friend_requests`;
    const requestsList = JSON.parse(localStorage.getItem(requestsKey) || '[]');
    const updatedRequests = requestsList.filter((r: any) => r.userId !== friendUserId);
    localStorage.setItem(requestsKey, JSON.stringify(updatedRequests));

    const senderFriendsKey = `${friendUserId}_friends`;
    const senderFriends = JSON.parse(localStorage.getItem(senderFriendsKey) || '[]');
    const updatedSenderFriends = senderFriends.filter((f: any) => f.userId !== userId);
    localStorage.setItem(senderFriendsKey, JSON.stringify(updatedSenderFriends));

    loadFriends();
  };

  const handleRemoveFriend = (friendUserId: string) => {
    const friendsKey = `${userId}_friends`;
    const friendsList = JSON.parse(localStorage.getItem(friendsKey) || '[]');
    const updatedFriends = friendsList.filter((f: any) => f.userId !== friendUserId);
    localStorage.setItem(friendsKey, JSON.stringify(updatedFriends));

    const otherFriendsKey = `${friendUserId}_friends`;
    const otherFriends = JSON.parse(localStorage.getItem(otherFriendsKey) || '[]');
    const updatedOtherFriends = otherFriends.filter((f: any) => f.userId !== userId);
    localStorage.setItem(otherFriendsKey, JSON.stringify(updatedOtherFriends));

    loadFriends();
  };

  const acceptedFriends = friends.filter(f => f.status === 'accepted');
  const pendingFriends = friends.filter(f => f.status === 'pending');

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-zinc-900 border-purple-600 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon name="Users" size={20} />
                Друзья
              </span>
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="bg-purple-600 hover:bg-purple-700"
                size="sm"
              >
                <Icon name="UserPlus" size={16} className="mr-2" />
                Добавить
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="friends" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
              <TabsTrigger value="friends" className="data-[state=active]:bg-purple-600">
                Друзья ({acceptedFriends.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-purple-600">
                Исходящие ({pendingFriends.length})
              </TabsTrigger>
              <TabsTrigger value="requests" className="data-[state=active]:bg-purple-600">
                Входящие ({requests.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="friends" className="space-y-2">
              {acceptedFriends.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <Icon name="Users" size={48} className="mx-auto mb-2 opacity-50" />
                  <p>У вас пока нет друзей</p>
                </div>
              ) : (
                acceptedFriends.map(friend => (
                  <div key={friend.userId} className="bg-zinc-800 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={friend.avatar} alt={friend.username} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="text-white font-medium">{friend.username}</p>
                        <p className="text-gray-400 text-sm">ID: {friend.userId}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRemoveFriend(friend.userId)}
                      variant="destructive"
                      size="sm"
                    >
                      <Icon name="UserMinus" size={16} />
                    </Button>
                  </div>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-2">
              {pendingFriends.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <Icon name="Clock" size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Нет исходящих заявок</p>
                </div>
              ) : (
                pendingFriends.map(friend => (
                  <div key={friend.userId} className="bg-zinc-800 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={friend.avatar} alt={friend.username} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="text-white font-medium">{friend.username}</p>
                        <p className="text-gray-400 text-sm">ID: {friend.userId}</p>
                      </div>
                    </div>
                    <span className="text-yellow-400 text-sm flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      Ожидание
                    </span>
                  </div>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="requests" className="space-y-2">
              {requests.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <Icon name="Inbox" size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Нет входящих заявок</p>
                </div>
              ) : (
                requests.map(request => (
                  <div key={request.userId} className="bg-zinc-800 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={request.avatar} alt={request.username} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="text-white font-medium">{request.username}</p>
                        <p className="text-gray-400 text-sm">ID: {request.userId}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAcceptRequest(request.userId)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Icon name="Check" size={16} />
                      </Button>
                      <Button
                        onClick={() => handleRejectRequest(request.userId)}
                        variant="destructive"
                        size="sm"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <AddFriendDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        currentUserId={userId}
        onFriendAdded={loadFriends}
      />
    </>
  );
}
