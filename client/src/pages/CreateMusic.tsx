
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { 
  Music, 
  Upload,
  FileMusic,
  ListMusic
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const CreateMusic = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800");
  const [playlist, setPlaylist] = useState("");
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Mock playlists
  const playlists = [
    { id: "favorites", name: "Favorites" },
    { id: "workout", name: "Workout" },
    { id: "chill", name: "Chill Vibes" },
    { id: "focus", name: "Focus" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !artist || !genre) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!fileName) {
      toast({
        title: "Missing music file",
        description: "Please upload a music file.",
        variant: "destructive"
      });
      return;
    }

    // Simulate creating a music entry
    setIsUploading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsUploading(false);
      
      // Add to local storage
      const existingMusic = JSON.parse(localStorage.getItem("userMusics") || "[]");
      const newMusic = {
        id: `music-${Date.now()}`,
        title,
        artist,
        genre,
        description,
        coverImage,
        playlist,
        fileName,
        createdAt: new Date().toISOString(),
        isInWishlist: false
      };
      
      localStorage.setItem("userMusics", JSON.stringify([...existingMusic, newMusic]));
      
      toast({
        title: "Music created!",
        description: `"${title}" has been added to your collection.`,
      });
      
      navigate("/my-music");
    }, 1500);
  };

  // Simulate file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      toast({
        title: "File selected",
        description: `"${files[0].name}" ready to upload.`,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Create New Music</h1>
          <p className="text-muted-foreground">Add your music to your collection</p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-md">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter music title"
                    required
                    className="border-music-primary/20 focus-visible:ring-music-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="artist" className="text-sm font-medium">
                    Artist <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Enter artist name"
                    required
                    className="border-music-primary/20 focus-visible:ring-music-primary"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="genre" className="text-sm font-medium">
                    Genre <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Enter music genre"
                    required
                    className="border-music-primary/20 focus-visible:ring-music-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="playlist" className="text-sm font-medium">
                    Playlist
                  </Label>
                  <Select value={playlist} onValueChange={setPlaylist}>
                    <SelectTrigger id="playlist" className="border-music-primary/20 focus-visible:ring-music-primary">
                      <SelectValue placeholder="Select a playlist" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No playlist</SelectItem>
                      {playlists.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your music"
                  className="min-h-[120px] border-music-primary/20 focus-visible:ring-music-primary"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="musicFile" className="text-sm font-medium">
                  Music File <span className="text-red-500">*</span>
                </label>
                <div className="border border-dashed border-music-primary/50 rounded-md p-6 flex flex-col items-center justify-center bg-muted/30">
                  <FileMusic size={48} className="text-music-primary mb-4" />
                  <p className="text-sm text-center mb-4">{fileName ? `Selected: ${fileName}` : "Drag & drop your music file or click to browse"}</p>
                  <Input
                    id="musicFile"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    className="gap-2"
                    onClick={() => document.getElementById("musicFile")?.click()}
                  >
                    <Upload size={16} />
                    {fileName ? "Change File" : "Select File"}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image</label>
                <div className="border border-input rounded-md p-4 flex flex-col items-center">
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                    {coverImage ? (
                      <img 
                        src={coverImage} 
                        alt="Music Cover" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Music size={48} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      // Simple mock for cover selection
                      const mockCovers = [
                        "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800",
                        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800",
                        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800",
                        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800"
                      ];
                      
                      const randomCover = mockCovers[Math.floor(Math.random() * mockCovers.length)];
                      setCoverImage(randomCover);
                    }}
                  >
                    <Upload size={16} />
                    Change Cover Image
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-music-primary hover:bg-music-primary/90 gap-2 text-black"
                  disabled={isUploading}
                >
                  <Music size={16} />
                  {isUploading ? "Creating..." : "Create Music"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CreateMusic;
