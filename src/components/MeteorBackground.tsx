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
    const generateMeteors = () => {
      const newMeteors: Meteor[] = [];
      for (let i = 0; i < 15; i++) {
        newMeteors.push({
          id: i,
          letter: Math.random() > 0.5 ? 'I' : 'S',
          left: Math.random() * 100,
          animationDuration: 3 + Math.random() * 4,
          size: 20 + Math.random() * 30,
          delay: Math.random() * 5
        });
      }
      setMeteors(newMeteors);
    };

    generateMeteors();
    const interval = setInterval(generateMeteors, 10000);

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
