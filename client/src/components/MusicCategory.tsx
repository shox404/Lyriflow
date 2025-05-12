
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface MusicCategoryProps {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

const MusicCategory = ({ id, title, description, image, color }: MusicCategoryProps) => {
  return (
    <Link to={`/category/${id}`} className="block hover-scale">
      <Card className="music-card border-0 h-full overflow-hidden">
        <div className="relative h-40 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${image})` }}
          />
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: color, opacity: 0.7 }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <h3 className="text-xl md:text-2xl font-bold text-white text-center">{title}</h3>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MusicCategory;
