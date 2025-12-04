import { ReactNode } from 'react';

interface SnowDriftTextProps {
  children: ReactNode;
  className?: string;
}

const SnowDriftText = ({ children, className = '' }: SnowDriftTextProps) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes snow-drift {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.05);
          }
        }
        .snow-drift-bottom {
          position: absolute;
          bottom: -8px;
          left: 0;
          right: 0;
          height: 12px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(200,230,255,0.7));
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
          box-shadow: 
            0 -2px 10px rgba(255,255,255,0.5),
            inset 0 2px 5px rgba(200,230,255,0.3);
          animation: snow-drift 3s ease-in-out infinite;
          pointer-events: none;
        }
        .snow-drift-bottom::before {
          content: '';
          position: absolute;
          top: -3px;
          left: 10%;
          width: 25%;
          height: 6px;
          background: rgba(255,255,255,0.8);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255,255,255,0.6);
        }
        .snow-drift-bottom::after {
          content: '';
          position: absolute;
          top: -5px;
          right: 15%;
          width: 30%;
          height: 8px;
          background: rgba(255,255,255,0.8);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255,255,255,0.6);
        }
      `}</style>
      {children}
      <span className="snow-drift-bottom"></span>
    </span>
  );
};

export default SnowDriftText;
