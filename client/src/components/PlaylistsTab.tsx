
import { useState } from "react";
import PlaylistCard from "@/components/PlaylistCard";
import PlaylistForm from "@/components/PlaylistForm";
import { MusicItemType, PlaylistType } from "@/hooks/useMusicLibrary";
import { toast } from "@/components/ui/use-toast";

interface PlaylistsTabProps {
  playlists: PlaylistType[];
  musicList: MusicItemType[];
  onToggleWishlist: (id: string) => void;
  onPlaylistCreated: (playlist: PlaylistType) => void;
}

const PlaylistsTab = ({ 
  playlists, 
  musicList, 
  onToggleWishlist,
  onPlaylistCreated 
}: PlaylistsTabProps) => {
  const [updatedPlaylists, setUpdatedPlaylists] = useState<PlaylistType[]>(playlists);
  
  // Update the playlists in state and localStorage
  const updatePlaylist = (id: string, name: string, description: string) => {
    const newPlaylists = playlists.map(playlist => 
      playlist.id === id 
        ? { ...playlist, name, description }
        : playlist
    );
    
    // Update localStorage
    localStorage.setItem("userPlaylists", JSON.stringify(newPlaylists));
    
    // Update the state with the latest playlists
    setUpdatedPlaylists(newPlaylists);
  };
  
  // Delete a playlist
  const deletePlaylist = (id: string) => {
    const newPlaylists = playlists.filter(playlist => playlist.id !== id);
    
    // Update localStorage
    localStorage.setItem("userPlaylists", JSON.stringify(newPlaylists));
    
    // Update the state with the latest playlists
    setUpdatedPlaylists(newPlaylists);
  };
  
  // Use the latest playlists from state or props
  const displayPlaylists = updatedPlaylists.length > 0 ? updatedPlaylists : playlists;
  
  if (displayPlaylists.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayPlaylists.map(playlist => (
          <PlaylistCard 
            key={playlist.id} 
            playlist={playlist} 
            musicList={musicList}
            onToggleWishlist={onToggleWishlist}
            onUpdatePlaylist={updatePlaylist}
            onDeletePlaylist={deletePlaylist}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium">No playlists yet</h3>
      <p className="text-muted-foreground mt-2">Create your first playlist</p>
      <div className="mt-4 inline-block">
        <PlaylistForm onPlaylistCreated={onPlaylistCreated} />
      </div>
    </div>
  );
};

export default PlaylistsTab;
