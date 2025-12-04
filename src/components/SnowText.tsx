import { ReactNode } from 'react';

interface SnowTextProps {
  children: ReactNode;
  className?: string;
}

const SnowText = ({ children, className = '' }: SnowTextProps) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes snow-fall {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(20px) rotate(360deg);
            opacity: 0;
          }
        }

        .snow-particle {
          position: absolute;
          color: white;
          font-size: 12px;
          animation: snow-fall 3s infinite;
          pointer-events: none;
        }
      `}</style>
      
      {[...Array(15)].map((_, i) => (
        <span
          key={i}
          className="snow-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            fontSize: `${8 + Math.random() * 8}px`,
          }}
        >
          ❄
        </span>
      ))}
      
      {children}
    </div>
  );
};

export default SnowText;
