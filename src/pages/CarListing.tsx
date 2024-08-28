import FilterByCarType from "@/components/CarListing/FilterByCarType";
import FilterByPrice from "@/components/CarListing/FilterByPrice";
import FilterByFeatures from "@/components/CarListing/FiterByFeatures";
import SortPrice from "@/components/CarListing/SortPrice";
import NoDataFound from "@/components/shared/NoDataFound";
import Pagination from "@/components/shared/Pagination";
import ProductCard from "@/components/shared/ProductCard";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { Button } from "@/components/ui/button";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import { TCar } from "@/Types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CarListing = () => {
  const [page, setPage] = useState(1);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const [carType, setCarType] = useState<string | null>(null);
  const [feature, setFeature] = useState<string | null>(null);

  const {
    data: cars,
    isFetching,
    isLoading,
    error,
  } = useGetAllCarsQuery([
    { name: "limit", value: "6" },
    { name: "status", value: "available" },
    { name: "page", value: page },
    { name: "maxPrice", value: maxPrice },
    { name: "minPrice", value: minPrice },
    { name: "sort", value: sort },
    { name: "carType", value: carType },
    { name: "features", value: feature },
  ]);

  useEffect(() => {
    if (isFetching || isLoading) {
      toast.loading("Fetching Cars");
    } else {
      toast.dismiss();
      toast.success("Cars Fetched Successfully", { duration: 1000 });
    }
  }, [isFetching, isLoading]);

  const handleReset = () => {
    setCarType(null);
    setSort(null);
    setFeature(null);
    // setSearchTerm("");
    setMaxPrice(null);
    setMinPrice(null);
  };

  return (
    <div className="py-8 px-2 grid grid-cols-1 gap-5">
      <div className="w-full flex flex-col md:flex-row gap-4 p-4">
        {/* <SearchComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
       */}
        <FilterByFeatures feature={feature} setFeature={setFeature} />
        <FilterByCarType carType={carType} setCarType={setCarType} />
        <FilterByPrice
          maxPrice={maxPrice}
          minPrice={minPrice}
          setMaxPrice={setMaxPrice}
          setMinPrice={setMinPrice}
        />
        <SortPrice sort={sort} setSort={setSort} />
        <Button variant={"outline"} onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isFetching || isLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => <SkeletonCard key={index} />)
          : !error &&
            cars?.data &&
            cars?.data?.result?.length &&
            cars?.data?.result?.map((car: TCar) => (
              <ProductCard key={car._id} {...car} />
            ))}
      </div>
      {!(
        (!error && cars?.data && cars?.data?.result?.length) ||
        isFetching ||
        isLoading
      ) && <NoDataFound message={`No Cars available at the moment.`} />}
      {!error && cars?.data && cars?.data?.result?.length && (
        <Pagination
          totalPage={cars?.data?.meta?.totalPage}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default CarListing;
