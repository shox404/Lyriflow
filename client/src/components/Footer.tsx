import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Avatar>
                <AvatarImage className="rounded-full" src="/logo.png" />
              </Avatar>
              <span className="font-bold text-lg">Lyriflow</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Your personal music streaming app with unlimited access to
              thousands of songs across various genres.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-music-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-muted-foreground hover:text-music-primary transition-colors"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-muted-foreground hover:text-music-primary transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  className="text-muted-foreground hover:text-music-primary transition-colors"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                Email: info@melodystream.com
              </li>
              <li className="text-muted-foreground">
                Phone: +1 (123) 456-7890
              </li>
              <li className="text-muted-foreground">
                Address: 123 Music Street, Melody City
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Lyriflow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
