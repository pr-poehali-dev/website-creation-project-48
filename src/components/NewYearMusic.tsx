import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const NewYearMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicTracks = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  ];

  useEffect(() => {
    audioRef.current = new Audio(musicTracks[0]);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    const savedMusicState = localStorage.getItem('newYearMusicPlaying');
    if (savedMusicState === 'true') {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem('newYearMusicPlaying', 'false');
    } else {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
      localStorage.setItem('newYearMusicPlaying', 'true');
    }
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className={`transition-all duration-300 ${showControls ? 'mb-2' : ''}`}>
        {showControls && (
          <div className="bg-card/95 backdrop-blur border border-border/50 rounded-lg p-3 mb-2 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Volume2" size={16} className="text-foreground/70" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => setVolume(Number(e.target.value) / 100)}
                className="w-24 h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-xs text-foreground/70 w-8">{Math.round(volume * 100)}%</span>
            </div>
            <div className="text-xs text-foreground/60 text-center">
              🎵 Новогодняя музыка
            </div>
          </div>
        )}
      </div>

      <Button
        size="icon"
        onClick={toggleMusic}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isPlaying 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 animate-pulse' 
            : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
        }`}
      >
        {isPlaying ? (
          <Icon name="Volume2" size={24} className="text-white" />
        ) : (
          <Icon name="VolumeX" size={24} className="text-white" />
        )}
      </Button>
      
      {isPlaying && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping" />
      )}
    </div>
  );
};

export default NewYearMusic;
