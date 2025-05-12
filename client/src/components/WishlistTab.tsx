
import MusicItem from "@/components/MusicItem";
import { MusicItemType } from "@/hooks/useMusicLibrary";

interface WishlistTabProps {
  wishlistItems: MusicItemType[];
  onToggleWishlist: (id: string) => void;
}

const WishlistTab = ({ wishlistItems, onToggleWishlist }: WishlistTabProps) => {
  if (wishlistItems.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistItems.map(music => (
          <MusicItem
            key={music.id}
            music={music}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium">Your wishlist is empty</h3>
      <p className="text-muted-foreground mt-2">Add music to your wishlist by clicking the heart icon</p>
    </div>
  );
};

export default WishlistTab;
