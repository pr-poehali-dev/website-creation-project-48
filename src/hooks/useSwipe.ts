import { useEffect, useState } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface SwipeConfig {
  minSwipeDistance?: number;
  maxSwipeTime?: number;
}

export const useSwipe = (
  handlers: SwipeHandlers,
  config: SwipeConfig = {}
) => {
  const { minSwipeDistance = 50, maxSwipeTime = 500 } = config;
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; time: number } | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    });
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const deltaTime = Date.now() - touchStart.time;

    if (deltaTime > maxSwipeTime) {
      setTouchStart(null);
      return;
    }

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX > minSwipeDistance || absDeltaY > minSwipeDistance) {
      if (absDeltaX > absDeltaY) {
        if (deltaX > 0 && handlers.onSwipeRight) {
          handlers.onSwipeRight();
        } else if (deltaX < 0 && handlers.onSwipeLeft) {
          handlers.onSwipeLeft();
        }
      } else {
        if (deltaY > 0 && handlers.onSwipeDown) {
          handlers.onSwipeDown();
        } else if (deltaY < 0 && handlers.onSwipeUp) {
          handlers.onSwipeUp();
        }
      }
    }

    setTouchStart(null);
  };

  return { onTouchStart, onTouchEnd };
};
