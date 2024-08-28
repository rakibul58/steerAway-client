import { CarFeatures } from "@/Constants/Car";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
type TFilterFeatures = {
  feature: string | null;
  setFeature: (feature: string | null) => void;
};

const FilterByFeatures = ({ feature, setFeature }: TFilterFeatures) => {
  return (
    <Select value={feature === null ? "" : feature} onValueChange={setFeature}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Filter by Feature" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Feature</SelectLabel>
          {CarFeatures.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterByFeatures;
