
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Play } from "lucide-react";
import { Dialog as UIDialog, DialogContent as UIDialogContent } from "@/components/ui/dialog";
import MusicPlayer from "@/components/MusicPlayer";

interface MusicItemProps {
  music: {
    id: string;
    title: string;
    artist: string;
    coverImage: string;
    isInWishlist: boolean;
  };
  onToggleWishlist: (id: string) => void;
  onPlayMusic?: () => void;
}

const MusicItem = ({ music, onToggleWishlist, onPlayMusic }: MusicItemProps) => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const handlePlayClick = () => {
    if (onPlayMusic) {
      onPlayMusic();
    } else {
      setIsPlayerOpen(true);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <div className="relative h-60">
        {/* Cover image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${music.coverImage})` }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            onClick={handlePlayClick} 
            size="icon" 
            variant="secondary"
            className="rounded-full bg-white/30 hover:bg-white/50 w-14 h-14 flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform"
          >
            <Play size={28} className="text-white ml-1" />
          </Button>
        </div>
        
        {/* Music info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold line-clamp-1">{music.title}</h3>
          <p className="text-sm text-white/80 mb-3">{music.artist}</p>
          
          {/* Two buttons */}
          <div className="flex items-center justify-between">
            <Button 
              onClick={handlePlayClick}
              size="sm" 
              className="bg-music-primary hover:bg-music-primary/90 gap-1 text-black"
            >
              <Play size={16} />
              Play
            </Button>
            
            <Button 
              onClick={() => onToggleWishlist(music.id)}
              size="sm"
              variant="outline"
              className="border-white/30 hover:bg-white/20 text-white"
            >
              <Heart 
                size={18} 
                fill={music.isInWishlist ? "#ea384c" : "none"} 
                stroke={music.isInWishlist ? "#ea384c" : "white"} 
                className={`transition-all ${music.isInWishlist ? "scale-110" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Music Player Dialog */}
      <UIDialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <UIDialogContent className="sm:max-w-md">
          {isPlayerOpen && <MusicPlayer music={music} onClose={() => setIsPlayerOpen(false)} />}
        </UIDialogContent>
      </UIDialog>
    </Card>
  );
};

export default MusicItem;
