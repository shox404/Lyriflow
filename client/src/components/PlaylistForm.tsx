
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ListMusic, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface PlaylistFormProps {
  onPlaylistCreated: (playlist: {
    id: string;
    name: string;
    description: string;
    coverImage: string;
    musicIds: string[];
  }) => void;
}

const PlaylistForm = ({ onPlaylistCreated }: PlaylistFormProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a playlist name",
        variant: "destructive",
      });
      return;
    }

    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || "My custom playlist",
      coverImage,
      musicIds: [],
    };

    onPlaylistCreated(newPlaylist);
    
    toast({
      title: "Playlist created!",
      description: `"${name}" has been added to your playlists.`,
    });
    
    // Reset form and close dialog
    setName("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="gap-2"
        >
          <ListMusic size={16} />
          New Playlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create New Playlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="playlist-name">Playlist Name</Label>
            <Input
              id="playlist-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Playlist"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="playlist-description">Description (Optional)</Label>
            <Textarea
              id="playlist-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for your playlist"
              rows={3}
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-music-primary hover:bg-music-primary/90 text-black">
              Create Playlist
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistForm;
