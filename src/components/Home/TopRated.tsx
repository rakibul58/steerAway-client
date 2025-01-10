import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import SkeletonCard from "../shared/SkeletonCard";
import { ICar } from "@/Types";
import ProductCard from "../shared/ProductCard";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import NoDataFound from "../shared/NoDataFound";

export default function TopRated() {
  const {
    data: cars,
    isFetching,
    isLoading,
  } = useGetAllCarsQuery([
    { name: "status", value: "available" },
    { name: "limit", value: "4" },
    {name: "sort", value: "-ratingStats.averageRating"}
  ]);
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold">Top Rated Vehicles</h2>
          <p className="text-lg text-foreground mt-4">
            Discover our most loved cars with exceptional customer ratings
          </p>
        </div>

        <div>
          {isFetching || isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : cars?.data && cars?.data?.result?.length ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {cars?.data?.result?.map((car: ICar) => (
                  <ProductCard key={car._id} {...car} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link to={"car-listings?sort=-ratingStats.averageRating"}>
                  <Button className="px-8 py-3 text-lg rounded">
                    Show All
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <NoDataFound message="No cars available at the moment." />
          )}
        </div>
      </div>
    </section>
  );
}
