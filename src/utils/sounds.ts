export const playSound = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    console.log('Audio not supported');
  }
};

export const sounds = {
  click: () => playSound(800, 0.1, 'sine'),
  success: () => {
    playSound(523, 0.1, 'sine');
    setTimeout(() => playSound(659, 0.1, 'sine'), 100);
    setTimeout(() => playSound(784, 0.2, 'sine'), 200);
  },
  error: () => {
    playSound(200, 0.2, 'sawtooth');
  },
  coin: () => {
    playSound(987, 0.05, 'sine');
    setTimeout(() => playSound(1318, 0.1, 'sine'), 50);
  },
  warning: () => {
    playSound(440, 0.15, 'square');
    setTimeout(() => playSound(440, 0.15, 'square'), 200);
  },
  newOrder: () => {
    playSound(659, 0.1, 'sine');
    setTimeout(() => playSound(523, 0.15, 'sine'), 100);
  }
};
