
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Play, ListMusic, Trash2 } from "lucide-react";
import MusicItem from "@/components/MusicItem";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import MusicPlayer from "@/components/MusicPlayer";

interface MusicItemType {
  id: string;
  title: string;
  artist: string;
  genre: string;
  description?: string;
  coverImage: string;
  createdAt: string;
  isInWishlist: boolean;
}

interface PlaylistCardProps {
  playlist: {
    id: string;
    name: string;
    description: string;
    coverImage: string;
    musicIds: string[];
  };
  musicList: MusicItemType[];
  onToggleWishlist: (id: string) => void;
  onUpdatePlaylist?: (id: string, name: string, description: string) => void;
  onDeletePlaylist?: (id: string) => void;
}

const PlaylistCard = ({ playlist, musicList, onToggleWishlist, onUpdatePlaylist, onDeletePlaylist }: PlaylistCardProps) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description);
  const [currentMusic, setCurrentMusic] = useState<MusicItemType | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  
  // Filter music items that are in this playlist
  const playlistMusic = musicList.filter(music => 
    playlist.musicIds.includes(music.id)
  );
  
  const handleSave = () => {
    if (onUpdatePlaylist) {
      onUpdatePlaylist(playlist.id, name, description);
      setEditMode(false);
      toast({
        title: "Playlist updated",
        description: `${name} has been updated successfully.`
      });
    }
  };
  
  const handleDelete = () => {
    if (onDeletePlaylist) {
      onDeletePlaylist(playlist.id);
      toast({
        title: "Playlist deleted",
        description: `${playlist.name} has been deleted.`
      });
    }
  };
  
  const handlePlayMusic = (music: MusicItemType) => {
    setCurrentMusic(music);
    setPlayerOpen(true);
  };
  
  return (
    <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 relative">
        <img 
          src={playlist.coverImage} 
          alt={playlist.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          {playlistMusic.length > 0 && (
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full absolute bg-white/20 hover:bg-white/30 w-12 h-12 flex items-center justify-center"
              onClick={() => playlistMusic.length > 0 && handlePlayMusic(playlistMusic[0])}
            >
              <Play size={24} className="ml-1 text-black" />
            </Button>
          )}
          <h3 className="text-xl text-white font-bold absolute bottom-2 left-4">{playlist.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{playlist.description}</p>
        <p className="text-sm text-muted-foreground">{playlist.musicIds.length} songs</p>
        <div className="flex justify-between items-center mt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                size="sm" 
                variant="outline"
                className="text-xs gap-1"
              >
                <Edit size={12} />
                Edit
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-4">
                <h4 className="font-medium">Edit Playlist</h4>
                <div className="space-y-2">
                  <label htmlFor="playlist-name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="playlist-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="playlist-desc" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="playlist-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div className="flex justify-between">
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={handleDelete}
                    className="text-xs gap-1"
                  >
                    <Trash2 size={12} />
                    Delete
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSave}
                    className="text-xs bg-music-primary hover:bg-music-primary/90 text-black"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm"
                className="bg-music-primary hover:bg-music-primary/90 text-xs gap-1 text-black"
              >
                <ListMusic size={12} />
                View
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <ListMusic size={18} className="text-music-primary" />
                  {playlist.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                <p className="text-muted-foreground mb-4">{playlist.description}</p>
                
                {playlistMusic.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {playlistMusic.map(music => (
                      <MusicItem
                        key={music.id}
                        music={music}
                        onToggleWishlist={onToggleWishlist}
                        onPlayMusic={() => handlePlayMusic(music)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-secondary/30 rounded-lg">
                    <ListMusic size={40} className="mx-auto text-muted-foreground mb-2" />
                    <h4 className="text-lg font-medium">This playlist is empty</h4>
                    <p className="text-muted-foreground mt-2">
                      Add music to this playlist from your music library
                    </p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {currentMusic && (
        <Dialog open={playerOpen} onOpenChange={setPlayerOpen}>
          <DialogContent>
            <MusicPlayer music={currentMusic} onClose={() => setPlayerOpen(false)} />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default PlaylistCard;
