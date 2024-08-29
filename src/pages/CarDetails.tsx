import { useGetSingleCarQuery } from "@/redux/features/cars/carApi";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Button } from "@/components/ui/button";
import { AdditionalFeatures } from "@/Constants/Car";

const CarDetails = () => {
  const { id } = useParams();
  const { data, isFetching, isLoading } = useGetSingleCarQuery(id as string);

  useEffect(() => {
    if (isFetching || isLoading) {
      toast.loading("Fetching Car Details");
    } else {
      toast.dismiss();
      toast.success("Car Details Fetched Successfully", { duration: 1000 });
    }
  }, [isFetching, isLoading]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Car Title and Price */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{data?.data?.name}</h1>
          <p className="text-xl font-semibold text-primary">
            ${data?.data?.pricePerHour}/Hour
          </p>
        </div>

        {/* Car Images with Zoom */}
        <div className="flex flex-col lg:flex-row mt-8 gap-6">
          <div className="lg:w-1/2">
            <Zoom>
              <img
                src={data?.data?.image}
                alt={data?.data?.name}
                className="rounded-lg w-full object-cover"
              />
            </Zoom>
            <div className="flex mt-4 gap-4">
              <img
                src={data?.data?.image}
                alt="Car Image 3"
                className={`w-1/4 cursor-pointer rounded-lg border-2 border-primary`}
                // onClick={() => setSelectedImage(carImage3)}
              />
            </div>
          </div>

          {/* Car Details and Features */}
          <div className="lg:w-1/2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Features</h2>
              <ul className="list-disc list-inside">
                {data?.data?.features.map(
                  (feature: string[], index: number) => (
                    <li key={index}>{feature}</li>
                  )
                )}
              </ul>
              <h2 className="text-2xl font-semibold mt-6">
                Additional Options
              </h2>
              <ul className="list-disc list-inside">
                {AdditionalFeatures?.slice(0, 5)?.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Book Now Button */}
            <div className="mt-12">
              <Link to={`/booking/${data?.data?._id}`}>
                {" "}
                <Button size="lg" className="w-full">
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Customer Reviews */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold">Customer Reviews</h2>
              <div className="space-y-4 mt-4">
                {/* {data?.data?.reviews?.map((review: Record<string,string | number>, index: string) => ( */}
                <div
                  // key={index}
                  className="p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center">
                    {/* <p className="font-bold">{review.name}</p> */}
                    <p className="font-bold">{"review.name"}</p>
                    <div className="flex gap-1">
                      {/* {[...Array(review.rating)].map((_, i) => ( */}
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="w-5 h-5 text-yellow-500"
                        >
                          <path d="M9.049 2.927a1 1 0 011.902 0l1.034 3.176 3.347.26c.555.043.791.725.38 1.078l-2.58 1.88.965 3.148c.171.558-.44.991-.931.683l-2.651-1.725-2.65 1.725c-.491.308-1.102-.125-.931-.683l.965-3.148-2.58-1.88c-.41-.353-.175-1.035.38-1.078l3.347-.26 1.034-3.176z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  {/* <p className="mt-2">{review.comment}</p> */}
                  <p className="mt-2">{"review.comment"}</p>
                </div>
                {/* ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
