
import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface MusicItemType {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
}

interface MusicPlayerProps {
  music: MusicItemType;
  onClose: () => void;
}

const MusicPlayer = ({ music, onClose }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  
  // Simulate music player functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 200);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };
  
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };
  
  // Format time from progress percentage (0-100) to MM:SS
  const formatTime = (percent: number) => {
    // Assuming a song is 3 minutes long
    const totalSeconds = 180 * (percent / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <div className="relative w-48 h-48 rounded-md overflow-hidden shadow-lg">
        <img 
          src={music.coverImage} 
          alt={music.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">{music.title}</h3>
        <p className="text-sm text-muted-foreground">{music.artist}</p>
      </div>
      
      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(100)}</span>
        </div>
        <Slider 
          value={[progress]} 
          max={100} 
          step={0.1}
          onValueChange={handleProgressChange}
          className="w-full"
        />
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <SkipBack size={20} />
        </Button>
        <Button 
          onClick={togglePlay} 
          size="icon" 
          className="bg-music-primary hover:bg-music-primary/90 rounded-full h-12 w-12 text-black"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <SkipForward size={20} />
        </Button>
      </div>
      
      <div className="flex items-center space-x-2 w-full max-w-xs">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="rounded-full">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
        <Slider 
          value={[isMuted ? 0 : volume]} 
          max={100} 
          onValueChange={handleVolumeChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
