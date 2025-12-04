import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const NewYearMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showControls, setShowControls] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicTracks = [
    { name: 'Новогодняя мелодия', url: 'https://cdn.pixabay.com/audio/2022/11/28/audio_17b2a63bca.mp3' },
    { name: 'Last Christmas', url: 'https://cdn.pixabay.com/audio/2024/01/30/audio_4e3f2221c5.mp3' },
    { name: 'Jingle Bells', url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_4e3ab91c61.mp3' },
  ];

  useEffect(() => {
    audioRef.current = new Audio(musicTracks[currentTrack].url);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    audioRef.current.addEventListener('ended', () => {
      setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
    });

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
  }, [currentTrack]);

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

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div 
      className="fixed bottom-6 left-6 z-50"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className={`transition-all duration-300 ${showControls ? 'mb-2' : ''}`}>
        {showControls && (
          <div className="bg-card/95 backdrop-blur border border-border/50 rounded-lg p-3 mb-2 shadow-lg min-w-[200px]">
            <div className="text-xs text-foreground/60 text-center mb-2 font-semibold">
              🎵 {musicTracks[currentTrack].name}
            </div>
            <div className="flex items-center gap-2 mb-3 justify-center">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={prevTrack}
              >
                <Icon name="SkipBack" size={16} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={nextTrack}
              >
                <Icon name="SkipForward" size={16} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Volume2" size={16} className="text-foreground/70" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => setVolume(Number(e.target.value) / 100)}
                className="flex-1 h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-xs text-foreground/70 w-8">{Math.round(volume * 100)}%</span>
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