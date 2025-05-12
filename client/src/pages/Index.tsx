import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import FeaturedMusic from "@/components/FeaturedMusic";
import MusicCategory from "@/components/MusicCategory";
import { Music, ListMusic, LogIn } from "lucide-react";

const featuredMusic = [
  {
    id: "1",
    title: "Summer Vibes",
    artist: "Electronic Dreams",
    coverImage:
      "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800",
  },
  {
    id: "2",
    title: "Urban Rhythms",
    artist: "City Beats",
    coverImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800",
  },
  {
    id: "3",
    title: "Acoustic Sessions",
    artist: "Melody Makers",
    coverImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800",
  },
];

const popularCategories = [
  {
    id: "pop",
    title: "Pop",
    description: "Catchy tunes and mainstream hits from around the world",
    image:
      "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800",
    color: "#8B5CF6",
  },
  {
    id: "rock",
    title: "Rock",
    description: "From classic rock to modern alternatives and indie bands",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800",
    color: "#EC4899",
  },
  {
    id: "hiphop",
    title: "Hip Hop",
    description: "Rap, trap, and urban beats from top artists",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800",
    color: "#3B82F6",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-white">
        <video
          src="/main.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="container mx-auto px-4 py-16 md:py-36 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Your Music, <span className="text-music-light">Your Way</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-xl">
              Stream unlimited music from any device. Sign up now and discover
              your next favorite song.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-music-primary hover:bg-music-accent text-black"
                >
                  <Music className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/20"
                >
                  <ListMusic className="mr-2 h-5 w-5" />
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Music */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Music</h2>
            <p className="text-muted-foreground">
              Hot tracks we think you'll love
            </p>
          </div>
          <Link to="/categories">
            <Button
              variant="ghost"
              className="text-music-primary hover:text-music-accent hover:bg-music-primary/10"
            >
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMusic.map((item) => (
            <FeaturedMusic
              key={item.id}
              title={item.title}
              artist={item.artist}
              coverImage={item.coverImage}
            />
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Popular Categories
            </h2>
            <p className="text-muted-foreground">Find music by genre</p>
          </div>
          <Link to="/categories">
            <Button
              variant="ghost"
              className="text-music-primary hover:text-music-accent hover:bg-music-primary/10"
            >
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularCategories.map((category) => (
            <MusicCategory
              key={category.id}
              id={category.id}
              title={category.title}
              description={category.description}
              image={category.image}
              color={category.color}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-music-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start listening?
          </h2>
          <p className="text-xl mb-8 max-w-xl mx-auto text-white/80">
            Join millions of music lovers and discover your next favorite song
            today.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              <LogIn className="mr-2 h-5 w-5" />
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
