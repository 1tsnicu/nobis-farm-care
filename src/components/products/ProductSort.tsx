import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProductSort = ({ value, onChange }: ProductSortProps) => {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort" className="text-sm whitespace-nowrap">Sortează după:</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="sort" className="w-[200px]">
          <SelectValue placeholder="Selectează..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating-desc">Cele mai apreciate</SelectItem>
          <SelectItem value="price-asc">Preț crescător</SelectItem>
          <SelectItem value="price-desc">Preț descrescător</SelectItem>
          <SelectItem value="name-asc">Nume A-Z</SelectItem>
          <SelectItem value="name-desc">Nume Z-A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
