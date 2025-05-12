
import { Input } from "@/components/ui/input";
import { ListMusic } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="relative max-w-md mb-8">
      <Input
        type="search"
        placeholder="Search music..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <ListMusic className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
    </div>
  );
};

export default SearchBar;
