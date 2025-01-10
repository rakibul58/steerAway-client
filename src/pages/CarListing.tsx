/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Sliders, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shared/ProductCard";
import SkeletonCard from "@/components/shared/SkeletonCard";
import NoDataFound from "@/components/shared/NoDataFound";
import Pagination from "@/components/shared/Pagination";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import { ICar } from "@/Types";
import { toast } from "sonner";

const CarListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  // Initialize filters from URL params including page
  const [filters, setFilters] = useState({
    page: searchParams.get("page") || "1",
    limit: "9",
    searchTerm: searchParams.get("searchTerm") || "",
    sort: searchParams.get("sort") || "",
    "specifications.fuelType":
      searchParams.get("specifications.fuelType") || "",
    "specifications.transmission":
      searchParams.get("specifications.transmission") || "",
    features: searchParams.get("features") || "",
    status: searchParams.get("status") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  // Convert filters to query parameters array
  const queryParams = Object.entries(filters)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => ({
      name: key,
      value: value.toString(),
    }));

  const {
    data: cars,
    isFetching,
    isLoading,
    error,
    refetch,
  } = useGetAllCarsQuery(queryParams);

  useEffect(() => {
    if (isFetching || isLoading) {
      toast.loading("Fetching Cars", { duration: 3000 });
    } else {
      toast.dismiss();
      if (cars?.data?.result?.length >= 0) {
        toast.success("Cars Fetched Successfully", { duration: 1000 });
      }
    }

    if (isFiltering) {
      refetch().then(() => {
        setIsFiltering(false);
      });
    }
  }, [isFetching, isLoading, cars?.data?.result?.length, isFiltering, refetch]);

  // Update URL params when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value.toString());
      }
    });
    setSearchParams(newSearchParams);
  }, [filters, setSearchParams]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setIsFiltering(true);
    setFilters((prev) => ({
      ...prev,
      [key]: value === prev[key] ? "" : value,
      page: "1", // Reset page when filters change
    }));
  };

  const handlePageChange = (newPage: number) => {
    setIsFiltering(true);

    setFilters((prev) => ({
      ...prev,
      page: newPage.toString(),
    }));
  };

  const handleReset = () => {
    setIsFiltering(true);

    setFilters({
      page: "1",
      limit: "9",
      searchTerm: "",
      sort: "",
      "specifications.fuelType": "",
      "specifications.transmission": "",
      features: "",
      status: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const filterOptions = {
    fuelTypes: ["petrol", "diesel", "electric", "hybrid"],
    transmission: ["automatic", "manual"],
    features: [
      "GPS",
      "Bluetooth",
      "Sunroof",
      "Leather Seats",
      "Child Seat",
      "WiFi",
    ],
    status: ["available", "reserved", "booked"],
    sortOptions: [
      { label: "Newest First", value: "-createdAt" },
      { label: "Price: Low to High", value: "pricing.basePrice" },
      { label: "Price: High to Low", value: "-pricing.basePrice" },
      { label: "Best Rated", value: "-ratingStats.averageRating" },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:mt-24 mt-12">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Available Cars</h1>
        <p className="text-gray-600">Find your perfect rental car</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`w-full md:w-64 shrink-0 ${!showFilters && "md:w-auto"}`}
        >
          <div className="sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                {showFilters ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Sliders className="h-4 w-4" />
                )}
              </Button>
              {showFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>

            {showFilters && (
              <div className="space-y-6 bg-primary/10 p-4 rounded-lg shadow-sm">
                {/* Search */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Search</h3>
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={filters.searchTerm}
                    onChange={(e) =>
                      handleFilterChange("searchTerm", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Price Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) =>
                        handleFilterChange("minPrice", e.target.value)
                      }
                      className="p-2 border rounded w-full"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        handleFilterChange("maxPrice", e.target.value)
                      }
                      className="p-2 border rounded w-full"
                    />
                  </div>
                </div>

                {/* Fuel Type */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Fuel Type</h3>
                  <div className="space-y-1">
                    {filterOptions.fuelTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <input
                          type="radio"
                          checked={filters["specifications.fuelType"] === type}
                          onChange={() =>
                            handleFilterChange("specifications.fuelType", type)
                          }
                          className="accent-blue-500"
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Transmission</h3>
                  <div className="space-y-1">
                    {filterOptions.transmission.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <input
                          type="radio"
                          checked={
                            filters["specifications.transmission"] === type
                          }
                          onChange={() =>
                            handleFilterChange(
                              "specifications.transmission",
                              type
                            )
                          }
                          className="accent-blue-500"
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Features</h3>
                  <div className="space-y-1">
                    {filterOptions.features.map((feature) => (
                      <label
                        key={feature}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={filters.features === feature.toLowerCase()}
                          onChange={() =>
                            handleFilterChange(
                              "features",
                              feature.toLowerCase()
                            )
                          }
                          className="accent-blue-500"
                        />
                        {feature}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Availability</h3>
                  <div className="space-y-1">
                    {filterOptions.status.map((stat) => (
                      <label
                        key={stat}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <input
                          type="radio"
                          checked={filters.status === stat}
                          onChange={() => handleFilterChange("status", stat)}
                          className="accent-blue-500"
                        />
                        {stat.charAt(0).toUpperCase() + stat.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Sort By</h3>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange("sort", e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Default</option>
                    {filterOptions.sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="flex-1">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-4"
          >
            {!isLoading && !error && (
              <p className="text-gray-600">
                Showing {cars?.data?.result?.length || 0} of{" "}
                {cars?.data?.meta?.total || 0} cars
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {isFetching || isLoading ? (
              Array(6)
                .fill(null)
                .map((_, index) => <SkeletonCard key={index} />)
            ) : cars?.data?.result?.length && !isLoading && !error ? (
              cars.data.result.map((car: ICar) => (
                <motion.div
                  key={car._id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard {...car} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full">
                <NoDataFound message="No cars found matching your criteria" />
              </div>
            )}
          </motion.div>

          {/* Pagination */}
          {!error && cars?.data?.result?.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-8"
            >
              <Pagination
                totalPage={cars?.data?.meta?.totalPage}
                page={parseInt(filters.page)}
                setPage={handlePageChange}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarListing;
