import { useEffect, useRef } from 'react';

interface Crown {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const CrownsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const crowns: Crown[] = [];
    const crownCount = 20;

    for (let i = 0; i < crownCount; i++) {
      crowns.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 10,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.2 + 0.05,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    const drawCrown = (crown: Crown) => {
      ctx.save();
      ctx.translate(crown.x, crown.y);
      ctx.rotate(crown.rotation);
      ctx.globalAlpha = crown.opacity;

      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;

      const s = crown.size;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.4);
      ctx.lineTo(s * 0.15, -s * 0.2);
      ctx.lineTo(s * 0.2, -s * 0.5);
      ctx.lineTo(s * 0.3, -s * 0.2);
      ctx.lineTo(s * 0.4, -s * 0.6);
      ctx.lineTo(s * 0.5, -s * 0.2);
      ctx.lineTo(s * 0.6, 0);
      ctx.lineTo(s * 0.3, 0.1);
      ctx.lineTo(0, 0.3);
      ctx.lineTo(-s * 0.3, 0.1);
      ctx.lineTo(-s * 0.6, 0);
      ctx.lineTo(-s * 0.5, -s * 0.2);
      ctx.lineTo(-s * 0.4, -s * 0.6);
      ctx.lineTo(-s * 0.3, -s * 0.2);
      ctx.lineTo(-s * 0.2, -s * 0.5);
      ctx.lineTo(-s * 0.15, -s * 0.2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      crowns.forEach(crown => {
        drawCrown(crown);

        crown.y -= crown.speed;
        crown.rotation += crown.rotationSpeed;

        if (crown.y < -crown.size) {
          crown.y = canvas.height + crown.size;
          crown.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default CrownsBackground;