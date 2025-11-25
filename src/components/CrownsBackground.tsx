import { useEffect, useRef } from 'react';

interface FloatingImage {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  imageIndex: number;
}

const CrownsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const imageUrls = [
      'https://cdn.poehali.dev/files/83519596-fd8f-46e7-8bce-9817f4304f92.jpg',
      'https://cdn.poehali.dev/files/e1d44230-f036-446d-b6d2-ea59f9c6680c.jpg'
    ];

    const loadImages = () => {
      return Promise.all(
        imageUrls.map(url => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.src = url;
          });
        })
      );
    };

    loadImages().then(images => {
      imagesRef.current = images;

      const floatingImages: FloatingImage[] = [];
      const imageCount = 15;

      for (let i = 0; i < imageCount; i++) {
        floatingImages.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 80 + 60,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.15 + 0.05,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          imageIndex: Math.floor(Math.random() * images.length)
        });
      }

      const drawImage = (item: FloatingImage) => {
        const img = imagesRef.current[item.imageIndex];
        if (!img) return;

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        ctx.globalAlpha = item.opacity;

        const aspectRatio = img.width / img.height;
        const width = item.size;
        const height = item.size / aspectRatio;

        ctx.drawImage(img, -width / 2, -height / 2, width, height);

        ctx.restore();
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        floatingImages.forEach(item => {
          drawImage(item);

          item.y -= item.speed;
          item.rotation += item.rotationSpeed;

          if (item.y < -item.size) {
            item.y = canvas.height + item.size;
            item.x = Math.random() * canvas.width;
          }
        });

        requestAnimationFrame(animate);
      };

      animate();
    });

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