import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MusicCategory from "@/components/MusicCategory";
import { Input } from "@/components/ui/input";
import { ListMusic } from "lucide-react";

const categories = [
  {
    id: "pop",
    title: "Pop",
    description: "Catchy tunes and mainstream hits from around the world",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800",
    color: "#8B5CF6"
  },
  {
    id: "rock",
    title: "Rock",
    description: "From classic rock to modern alternatives and indie bands",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800",
    color: "#EC4899"
  },
  {
    id: "hiphop",
    title: "Hip Hop",
    description: "Rap, trap, and urban beats from top artists",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800",
    color: "#3B82F6" 
  },
  {
    id: "jazz",
    title: "Jazz",
    description: "Smooth improvisation and classic jazz from legendary musicians",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800",
    color: "#F59E0B"
  },
  {
    id: "classical",
    title: "Classical",
    description: "Timeless compositions from the great classical composers",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800",
    color: "#10B981"
  },
  {
    id: "electronic",
    title: "Electronic",
    description: "EDM, house, techno and all things electronic",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800",
    color: "#6366F1"
  },
];

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Music Categories</h1>
          <p className="text-muted-foreground">Explore music by genre and discover new sounds</p>
          
          <div className="mt-6 relative max-w-md">
            <Input
              type="search"
              placeholder="Search categories..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ListMusic className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <MusicCategory 
              key={category.id}
              id={category.id}
              title={category.title}
              description={category.description}
              image={category.image}
              color={category.color}
            />
          ))}
          
          {filteredCategories.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium">No categories found</h3>
              <p className="text-muted-foreground mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
