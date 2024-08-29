import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
type TFilterStatus = {
  status: string | null;
  setStatus: (carType: string | null) => void;
};

const FilterByStatus = ({ status, setStatus }: TFilterStatus) => {
  return (
    <Select value={status === null ? "" : status} onValueChange={setStatus}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Filter by Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Status</SelectLabel>
          <SelectItem value={"available"}>Available</SelectItem>
          <SelectItem value={"unavailable"}>Unavailable</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterByStatus;
