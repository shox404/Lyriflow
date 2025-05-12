
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PlaylistForm from "@/components/PlaylistForm";
import { PlaylistType } from "@/hooks/useMusicLibrary";

interface MusicLibraryHeaderProps {
  onPlaylistCreated: (playlist: PlaylistType) => void;
}

const MusicLibraryHeader = ({ onPlaylistCreated }: MusicLibraryHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Music</h1>
        <p className="text-muted-foreground">Manage your music and playlists</p>
      </div>
      
      <div className="flex gap-3">
        <Link to="/create-music">
          <Button className="bg-music-primary hover:bg-music-primary/90 gap-2 text-black">
            <Plus size={16} />
            Add Music
          </Button>
        </Link>
        
        <PlaylistForm onPlaylistCreated={onPlaylistCreated} />
      </div>
    </div>
  );
};

export default MusicLibraryHeader;
