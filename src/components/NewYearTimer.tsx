import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const NewYearTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const difference = newYear.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-600/20 via-green-600/20 to-red-600/20 border border-yellow-400/50 rounded-2xl p-6 backdrop-blur-sm shadow-[0_0_40px_rgba(234,179,8,0.3)]">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Icon name="Clock" size={32} className="text-yellow-400 animate-pulse" />
        <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent">
          🎄 До Нового Года 🎄
        </h3>
        <Icon name="Clock" size={32} className="text-yellow-400 animate-pulse" />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-background/50 backdrop-blur rounded-lg p-3 text-center border border-primary/30">
          <div className="text-3xl font-bold text-primary mb-1">{timeLeft.days}</div>
          <div className="text-xs text-foreground/60">дней</div>
        </div>
        <div className="bg-background/50 backdrop-blur rounded-lg p-3 text-center border border-primary/30">
          <div className="text-3xl font-bold text-primary mb-1">{timeLeft.hours}</div>
          <div className="text-xs text-foreground/60">часов</div>
        </div>
        <div className="bg-background/50 backdrop-blur rounded-lg p-3 text-center border border-primary/30">
          <div className="text-3xl font-bold text-primary mb-1">{timeLeft.minutes}</div>
          <div className="text-xs text-foreground/60">минут</div>
        </div>
        <div className="bg-background/50 backdrop-blur rounded-lg p-3 text-center border border-primary/30">
          <div className="text-3xl font-bold text-primary mb-1">{timeLeft.seconds}</div>
          <div className="text-xs text-foreground/60">секунд</div>
        </div>
      </div>


    </div>
  );
};

export default NewYearTimer;