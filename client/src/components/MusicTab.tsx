
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MusicItem from "@/components/MusicItem";
import { MusicItemType } from "@/hooks/useMusicLibrary";

interface MusicTabProps {
  loading: boolean;
  filteredMusic: MusicItemType[];
  searchTerm: string;
  onToggleWishlist: (id: string) => void;
}

const MusicTab = ({ loading, filteredMusic, searchTerm, onToggleWishlist }: MusicTabProps) => {
  if (loading) {
    return <div className="text-center py-12">Loading your music...</div>;
  }
  
  if (filteredMusic.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMusic.map(music => (
          <MusicItem
            key={music.id}
            music={music}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium">No music found</h3>
      <p className="text-muted-foreground mt-2">
        {searchTerm 
          ? "Try a different search term" 
          : "Click 'Add Music' to create your first music"}
      </p>
      {!searchTerm && (
        <Link to="/create-music" className="mt-4 inline-block">
          <Button className="bg-music-primary hover:bg-music-primary/90 gap-2 text-black">
            <Plus size={16} />
            Add Music
          </Button>
        </Link>
      )}
    </div>
  );
};

export default MusicTab;
