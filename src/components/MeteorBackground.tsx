import { useEffect, useState } from 'react';

interface Meteor {
  id: number;
  letter: 'I' | 'S';
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
}

const MeteorBackground = () => {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    let idCounter = 0;
    
    const addMeteor = () => {
      const newMeteor: Meteor = {
        id: idCounter++,
        letter: Math.random() > 0.5 ? 'I' : 'S',
        left: Math.random() * 100,
        animationDuration: 8 + Math.random() * 6,
        size: 20 + Math.random() * 30,
        delay: 0
      };
      
      setMeteors(prev => [...prev, newMeteor]);
      
      setTimeout(() => {
        setMeteors(prev => prev.filter(m => m.id !== newMeteor.id));
      }, (newMeteor.animationDuration + 1) * 1000);
    };

    addMeteor();
    const interval = setInterval(addMeteor, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute animate-meteor"
          style={{
            left: `${meteor.left}%`,
            top: '-100px',
            fontSize: `${meteor.size}px`,
            animationDuration: `${meteor.animationDuration}s`,
            animationDelay: `${meteor.delay}s`,
            color: 'hsl(var(--primary))',
            opacity: 0.3,
            fontWeight: 'bold',
            textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--accent))',
            filter: 'blur(1px)'
          }}
        >
          {meteor.letter}
        </div>
      ))}
    </div>
  );
};

export default MeteorBackground;