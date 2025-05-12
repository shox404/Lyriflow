
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MusicItem from "@/components/MusicItem";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Music {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  isInWishlist: boolean;
  genre: string;
}

const mockMusics: Record<string, Music[]> = {
  pop: [
    {
      id: "pop-1",
      title: "Summer Vibes",
      artist: "Alex Johnson",
      coverImage: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800",
      isInWishlist: false,
      genre: "pop"
    },
    {
      id: "pop-2",
      title: "City Lights",
      artist: "Melody Waves",
      coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800",
      isInWishlist: false,
      genre: "pop"
    },
    {
      id: "pop-3",
      title: "Dance All Night",
      artist: "The Beats",
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800",
      isInWishlist: false,
      genre: "pop"
    }
  ],
  rock: [
    {
      id: "rock-1",
      title: "Electric Edge",
      artist: "Stone Crush",
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800",
      isInWishlist: false,
      genre: "rock"
    },
    {
      id: "rock-2",
      title: "Guitar Heroes",
      artist: "Amplified",
      coverImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800",
      isInWishlist: false,
      genre: "rock"
    }
  ],
  jazz: [
    {
      id: "jazz-1",
      title: "Smooth Night",
      artist: "Blue Notes",
      coverImage: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=800",
      isInWishlist: false,
      genre: "jazz"
    }
  ],
  classical: [
    {
      id: "classical-1",
      title: "Moonlight Sonata",
      artist: "Classic Harmony",
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800",
      isInWishlist: false,
      genre: "classical"
    }
  ]
};

const categoryColors: Record<string, string> = {
  pop: "#8B5CF6",
  rock: "#EC4899", 
  hiphop: "#3B82F6",
  jazz: "#F59E0B",
  classical: "#10B981",
  electronic: "#6366F1"
};

const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [musics, setMusics] = useState<Music[]>([]);
  
  useEffect(() => {
    if (id && mockMusics[id]) {
      setMusics(mockMusics[id].map(music => ({
        ...music,
        isInWishlist: false
      })));
    }
  }, [id]);

  const toggleWishlist = (musicId: string) => {
    setMusics(prev => 
      prev.map(music => 
        music.id === musicId 
          ? { ...music, isInWishlist: !music.isInWishlist } 
          : music
      )
    );
  };

  const filteredMusics = musics.filter(music => 
    music.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    music.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryName = id ? id.charAt(0).toUpperCase() + id.slice(1) : "Category";
  const categoryColor = id ? categoryColors[id] || "#8B5CF6" : "#8B5CF6";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="relative">
        <div 
          className="h-40 w-full bg-gradient-to-r from-music-primary to-music-accent"
          style={{ backgroundColor: categoryColor }}
        >
          <div className="container mx-auto px-4 h-full flex items-end pb-6">
            <h1 className="text-4xl font-bold text-white">{categoryName} Music</h1>
          </div>
        </div>
      </div>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-muted-foreground">
              Explore {categoryName.toLowerCase()} music and discover new sounds
            </p>
          </div>
          
          <div className="w-full md:w-auto md:min-w-[300px]">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search music..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMusics.map((music) => (
            <MusicItem 
              key={music.id}
              music={music}
              onToggleWishlist={toggleWishlist}
            />
          ))}
          
          {filteredMusics.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium">No music found</h3>
              <p className="text-muted-foreground mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetail;
