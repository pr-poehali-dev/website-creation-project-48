import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface FriendNotificationBadgeProps {
  userId: string;
  onClick: () => void;
}

export default function FriendNotificationBadge({ userId, onClick }: FriendNotificationBadgeProps) {
  const [requestsCount, setRequestsCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const checkRequests = () => {
      const requestsKey = `${userId}_friend_requests`;
      const requests = JSON.parse(localStorage.getItem(requestsKey) || '[]');
      const newCount = requests.length;
      
      if (newCount > requestsCount && newCount > 0) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
      
      setRequestsCount(newCount);
    };

    checkRequests();
    const interval = setInterval(checkRequests, 3000);

    return () => clearInterval(interval);
  }, [userId, requestsCount]);

  if (requestsCount === 0) return null;

  return (
    <>
      {showNotification && (
        <div 
          className="fixed top-20 right-4 z-50 animate-in slide-in-from-right-5 duration-500 cursor-pointer"
          onClick={onClick}
        >
          <div className="bg-purple-600/95 backdrop-blur text-white px-6 py-4 rounded-lg shadow-2xl border-2 border-purple-400 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Icon name="UserPlus" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-1">Новая заявка в друзья!</h4>
                <p className="text-sm text-purple-100">
                  У вас {requestsCount} {requestsCount === 1 ? 'новая заявка' : 'новых заявок'} в друзья
                </p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotification(false);
                }}
                className="text-white/80 hover:text-white"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
