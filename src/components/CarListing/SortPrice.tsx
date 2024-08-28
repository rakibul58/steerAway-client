import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TSortProps = {
  sort: string | null;
  setSort: (sort: string | null) => void;
};

const SortPrice = ({ sort, setSort }: TSortProps) => {
  return (
    <Select value={sort === null ? "" : sort} onValueChange={setSort}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Sort by price" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem value="pricePerHour">Ascending</SelectItem>
          <SelectItem value="-pricePerHour">Descending</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortPrice;
