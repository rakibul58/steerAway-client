import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "../ui/button";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import { ICar } from "@/Types";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import SkeletonCard from "../shared/SkeletonCard";
import NoDataFound from "../shared/NoDataFound";
import ProductCard from "../shared/ProductCard";
import { useEffect } from "react";

const Featured = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const {
    data: cars,
    isFetching,
    isLoading,
  } = useGetAllCarsQuery([
    { name: "status", value: "available" },
    { name: "limit", value: "5" },
  ]);

  useEffect(() => {
    if (isFetching || isLoading) {
      toast.loading("Fetching Cars", { duration: 3000 });
    } else {
      toast.dismiss();
      toast.success("Cars Fetched Successfully", { duration: 1000 });
    }
  }, [isFetching, isLoading]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Title and Subtitle */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold">Featured Cars</h2>
          <p className="text-lg text-foreground mt-4">
            Explore our range of top-rated vehicles, ready for your next
            adventure.
          </p>
        </div>

        <div>
          {isFetching || isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : cars?.data && cars?.data?.result?.length ? (
            <>
              <Slider {...settings}>
                {cars?.data?.result?.map((car: ICar) => (
                  <ProductCard key={car._id} {...car} />
                ))}
              </Slider>
              <div className="text-center mt-12">
                <Link to={"car-listings"}>
                  <Button className="px-8 py-3 text-lg rounded">
                    Show All
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <NoDataFound message="No cars available at the moment." />
          )}
        </div>

        {/* Carousel */}
      </div>
    </section>
  );
};

export default Featured;
