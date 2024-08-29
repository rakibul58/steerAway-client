import { Dispatch, SetStateAction, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TFilterPriceProps = {
  maxPrice: number | null;
  minPrice: number | null;
  setMaxPrice: Dispatch<SetStateAction<number | null>>;
  setMinPrice: Dispatch<SetStateAction<number | null>>;
};

const FilterByPrice = ({
  maxPrice,
  minPrice,
  setMaxPrice,
  setMinPrice,
}: TFilterPriceProps) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value: string) => {
    if (value === "range1") {
      setSelectedValue(value);
      setMinPrice(0);
      setMaxPrice(100);
    } else if (value === "range2") {
      setSelectedValue(value);
      setMinPrice(101);
      setMaxPrice(300);
    }
    if (value === "range3") {
      setSelectedValue(value);
      setMinPrice(301);
      setMaxPrice(500);
    }
    if (value === "range4") {
      setSelectedValue(value);
      setMinPrice(501);
      setMaxPrice(700);
    }
    if (value === "range5") {
      setSelectedValue(value);
      setMinPrice(701);
      setMaxPrice(null);
    }
  };

  return (
    <Select
      value={maxPrice === null && minPrice === null ? "" : selectedValue}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Filer by price" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Price Range</SelectLabel>
          <SelectItem value="range1">0 - 100৳</SelectItem>
          <SelectItem value="range2">101৳ - 300৳</SelectItem>
          <SelectItem value="range3">301৳ - 500৳</SelectItem>
          <SelectItem value="range4">501৳ - 700৳</SelectItem>
          <SelectItem value="range5">701৳+</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterByPrice;
