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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const imageUrls = [
      'https://cdn.poehali.dev/files/83519596-fd8f-46e7-8bce-9817f4304f92.jpg',
      'https://cdn.poehali.dev/files/e1d44230-f036-446d-b6d2-ea59f9c6680c.jpg',
      'https://cdn.poehali.dev/files/0b540acb-35ee-4a9f-af60-daa986069f03.jpg'
    ];

    const images: HTMLImageElement[] = [];
    const floatingImages: FloatingImage[] = [];
    const imageCount = 15;

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

    loadImages().then(loadedImages => {
      images.push(...loadedImages);

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

      animate();
    });

    const drawFloatingImage = (floatingImg: FloatingImage) => {
      if (!images[floatingImg.imageIndex]) return;

      ctx.save();
      ctx.translate(floatingImg.x, floatingImg.y);
      ctx.rotate(floatingImg.rotation);
      ctx.globalAlpha = floatingImg.opacity;

      const img = images[floatingImg.imageIndex];
      ctx.drawImage(
        img,
        -floatingImg.size / 2,
        -floatingImg.size / 2,
        floatingImg.size,
        floatingImg.size
      );

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      floatingImages.forEach(floatingImg => {
        drawFloatingImage(floatingImg);

        floatingImg.y -= floatingImg.speed;
        floatingImg.rotation += floatingImg.rotationSpeed;

        if (floatingImg.y < -floatingImg.size) {
          floatingImg.y = canvas.height + floatingImg.size;
          floatingImg.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

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