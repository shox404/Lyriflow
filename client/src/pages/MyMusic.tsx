
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListMusic, Music } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import MusicLibraryHeader from "@/components/MusicLibraryHeader";
import MusicTab from "@/components/MusicTab";
import PlaylistsTab from "@/components/PlaylistsTab";
import WishlistTab from "@/components/WishlistTab";
import { useMusicLibrary } from "@/hooks/useMusicLibrary";

const MyMusic = () => {
  const { 
    musicList, 
    playlists, 
    loading, 
    toggleWishlist, 
    handlePlaylistCreated,
    wishlistItems 
  } = useMusicLibrary();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("my-music");
  
  const filteredMusic = musicList.filter(music => 
    music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    music.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    music.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <MusicLibraryHeader onPlaylistCreated={handlePlaylistCreated} />
        
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="my-music" className="gap-2">
              <Music size={16} />
              My Music
            </TabsTrigger>
            <TabsTrigger value="playlists" className="gap-2">
              <ListMusic size={16} />
              Playlists
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="gap-2">
              <ListMusic size={16} />
              Wishlist
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-music" className="mt-0">
            <MusicTab 
              loading={loading}
              filteredMusic={filteredMusic}
              searchTerm={searchTerm}
              onToggleWishlist={toggleWishlist}
            />
          </TabsContent>
          
          <TabsContent value="playlists" className="mt-0">
            <PlaylistsTab 
              playlists={playlists}
              musicList={musicList}
              onToggleWishlist={toggleWishlist}
              onPlaylistCreated={handlePlaylistCreated}
            />
          </TabsContent>
          
          <TabsContent value="wishlist" className="mt-0">
            <WishlistTab 
              wishlistItems={wishlistItems}
              onToggleWishlist={toggleWishlist}
            />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MyMusic;
