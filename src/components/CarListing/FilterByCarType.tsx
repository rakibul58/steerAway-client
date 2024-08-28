import { CarTypes } from "@/Constants/Car";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
type TFilterCarTypeProps = {
  carType: string | null;
  setCarType: (carType: string | null) => void;
};

const FilterByCarType = ({ carType, setCarType }: TFilterCarTypeProps) => {
  return (
    <Select value={carType === null ? "" : carType} onValueChange={setCarType}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Filter by Car Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Car Type</SelectLabel>
          {CarTypes.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterByCarType;
