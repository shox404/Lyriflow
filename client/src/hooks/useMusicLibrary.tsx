
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export interface MusicItemType {
  id: string;
  title: string;
  artist: string;
  genre: string;
  description?: string;
  coverImage: string;
  createdAt: string;
  isInWishlist: boolean;
}

export interface PlaylistType {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  musicIds: string[];
}

export const useMusicLibrary = () => {
  const [musicList, setMusicList] = useState<MusicItemType[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load user music from local storage
  useEffect(() => {
    setLoading(true);
    
    // Get music
    const savedMusic = JSON.parse(localStorage.getItem("userMusics") || "[]");
    setMusicList(savedMusic);
    
    // Get playlists
    const savedPlaylists = JSON.parse(localStorage.getItem("userPlaylists") || "[]");
    setPlaylists(savedPlaylists);
    
    setLoading(false);
  }, []);
  
  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem("userMusics", JSON.stringify(musicList));
  }, [musicList]);
  
  useEffect(() => {
    localStorage.setItem("userPlaylists", JSON.stringify(playlists));
  }, [playlists]);
  
  const toggleWishlist = (musicId: string) => {
    setMusicList(prevMusic => 
      prevMusic.map(item => 
        item.id === musicId 
          ? { ...item, isInWishlist: !item.isInWishlist } 
          : item
      )
    );
    
    const music = musicList.find(m => m.id === musicId);
    if (music) {
      toast({
        title: music.isInWishlist ? "Removed from wishlist" : "Added to wishlist",
        description: `"${music.title}" ${music.isInWishlist ? "removed from" : "added to"} your wishlist.`,
      });
    }
  };

  const handlePlaylistCreated = (newPlaylist: PlaylistType) => {
    setPlaylists(prev => [...prev, newPlaylist]);
  };
  
  const updatePlaylist = (id: string, name: string, description: string) => {
    setPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === id 
          ? { ...playlist, name, description }
          : playlist
      )
    );
  };
  
  const deletePlaylist = (id: string) => {
    setPlaylists(prev => prev.filter(playlist => playlist.id !== id));
  };
  
  return { 
    musicList, 
    playlists, 
    loading,
    toggleWishlist,
    handlePlaylistCreated,
    updatePlaylist,
    deletePlaylist,
    wishlistItems: musicList.filter(music => music.isInWishlist)
  };
};
