import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, ListMusic, User } from "lucide-react";
import { AvatarImage, Avatar } from "@radix-ui/react-avatar";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Avatar>
            <AvatarImage className="rounded-full" src="/logo.png" />
          </Avatar>
          <span className="font-bold text-lg">Lyriflow</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm transition-colors ${
              location.pathname === "/"
                ? "text-music-primary font-medium"
                : "text-muted-foreground hover:text-music-primary"
            }`}
          >
            Home
          </Link>
          <Link
            to="/categories"
            className={`text-sm transition-colors ${
              location.pathname === "/categories"
                ? "text-music-primary font-medium"
                : "text-muted-foreground hover:text-music-primary"
            }`}
          >
            Categories
          </Link>
          <Link
            to="/my-music"
            className={`text-sm transition-colors ${
              location.pathname === "/my-music"
                ? "text-music-primary font-medium"
                : "text-muted-foreground hover:text-music-primary"
            }`}
          >
            My Music
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/my-music" className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ListMusic className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/create-music">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Music className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/signin">
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Sign in</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
