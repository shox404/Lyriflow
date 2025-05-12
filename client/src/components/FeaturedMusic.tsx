
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface FeaturedMusicProps {
  title: string;
  artist: string;
  coverImage: string;
}

const FeaturedMusic = ({ title, artist, coverImage }: FeaturedMusicProps) => {
  return (
    <Card className="music-card border-0 overflow-hidden relative">
      <div 
        className="h-[300px] w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold line-clamp-1">{title}</h3>
          <p className="text-sm text-white/80">{artist}</p>
          
          <div className="mt-4 flex gap-2">
            <Button 
              size="sm" 
              className="bg-music-primary hover:bg-music-primary/90 gap-1 text-black"
            >
              <Play size={16} />
              Play Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedMusic;
