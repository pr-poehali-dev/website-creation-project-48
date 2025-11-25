import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      fadeDirection: number;
    }> = [];

    const nebulae: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5,
        speed: Math.random() * 0.05 + 0.01,
        opacity: Math.random(),
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
      });
    }

    for (let i = 0; i < 8; i++) {
      const colors = [
        'rgba(168, 85, 247, 0.15)',
        'rgba(236, 72, 153, 0.12)',
        'rgba(147, 51, 234, 0.18)',
        'rgba(192, 132, 252, 0.1)',
      ];
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 300 + 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const drawBackground = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, '#1a0b2e');
      gradient.addColorStop(0.5, '#0f0520');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawNebulae = () => {
      nebulae.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.size
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
    };

    const drawStars = () => {
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        if (star.size > 1.5) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(168, 85, 247, ${star.opacity * 0.5})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
    };

    const animate = () => {
      drawBackground();
      drawNebulae();
      drawStars();

      stars.forEach((star) => {
        star.opacity += star.fadeDirection * star.speed;
        if (star.opacity >= 1 || star.opacity <= 0.1) {
          star.fadeDirection *= -1;
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
      className="fixed top-0 left-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0 }}
    />
  );
};

export default SpaceBackground;