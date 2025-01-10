/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetSingleCarQuery,
  useGetRelatedCarsQuery,
} from "@/redux/features/cars/carApi";
import { Card } from "@/components/ui/card";
import { CheckIcon, StarIcon } from "lucide-react";
import {
  useAddReviewMutation,
  useGetReviewsQuery,
} from "@/redux/reviews/reviewApi";
import { ICar } from "@/Types";
import ProductCard from "@/components/shared/ProductCard";
import ReviewSection from "@/components/CarListing/ReviewSection";
import { useProfileQuery } from "@/redux/features/auth/authApi";

interface Review {
  _id?: string;
  car: string;
  date: string;
  rating: number;
  comment: string;
  user: string;
}

const CarDetails = () => {
  const { id } = useParams();
  const { data: carData } = useGetSingleCarQuery(id as string);
  const { data: relatedCars } = useGetRelatedCarsQuery(id as string);
  const { data: reviews } = useGetReviewsQuery(id);
  const [addReview] = useAddReviewMutation();
  const { data: profile } = useProfileQuery(undefined);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState({
    insurance: false,
    gps: false,
    childSeat: false,
  });
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    if (carData?.data?.images?.length > 0) {
      setSelectedImage(carData.data.images[0]);
    }
  }, [carData]);

  const handleFeatureToggle = (feature: keyof typeof selectedFeatures) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const review: Review = {
      date: new Date().toLocaleDateString(),
      user: profile?.data?._id,
      car: id as string,
      ...reviewForm,
    };

    console.log({ review });
    try {
      await addReview(review).unwrap();
      toast.success("Review added successfully");
      setReviewForm({ rating: 0, comment: "" });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add review");
    }
  };

  const calculateTotalPrice = () => {
    const { pricing } = carData?.data || {};
    let total = pricing?.basePrice || 0;
    if (selectedFeatures.insurance) total += pricing?.insurancePrice;
    if (selectedFeatures.gps) total += pricing?.gpsPrice;
    if (selectedFeatures.childSeat) total += pricing?.childSeatPrice;
    return total;
  };

  return (
    <section className="py-16 mt-12 md:mt-24">
      <div className="mx-auto">
        {/* Car Title and Price Section */}
        <div className="flex justify-between flex-wrap items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{carData?.data?.name}</h1>
            <p className="text-lg text-gray-600">
              {carData?.data?.brand} {carData?.data?.model}{" "}
              {carData?.data?.year}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              ${carData?.data?.pricing?.basePrice}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-5 h-5 ${
                      star <= carData?.data?.ratingStats?.averageRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span>({carData?.data?.ratingStats?.totalRatings} reviews)</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <Zoom>
              <img
                src={selectedImage}
                alt={carData?.data?.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </Zoom>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {carData?.data?.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${carData?.data?.name} view ${index + 1}`}
                  className={`w-full h-24 object-cover rounded-lg cursor-pointer ${
                    selectedImage === image ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Details and Booking */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <Tabs defaultValue="specs" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="specs" className="w-full">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="features" className="w-full">
                    Features
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="specs">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Transmission</span>
                      <span className="font-semibold">
                        {carData?.data?.specifications?.transmission}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fuel Type</span>
                      <span className="font-semibold">
                        {carData?.data?.specifications?.fuelType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seating</span>
                      <span className="font-semibold">
                        {carData?.data?.specifications?.seatingCapacity} seats
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mileage</span>
                      <span className="font-semibold">
                        {carData?.data?.specifications?.mileage} km/l
                      </span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features">
                  <ul className="space-y-2">
                    {carData?.data?.features.map(
                      (feature: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckIcon className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                </TabsContent>
              </Tabs>

              {/* Additional Features */}
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold">Additional Features</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.insurance}
                      onChange={() => handleFeatureToggle("insurance")}
                      className="w-4 h-4"
                    />
                    <span>
                      Insurance (+${carData?.data?.pricing?.insurancePrice})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.gps}
                      onChange={() => handleFeatureToggle("gps")}
                      className="w-4 h-4"
                    />
                    <span>GPS (+${carData?.data?.pricing?.gpsPrice})</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.childSeat}
                      onChange={() => handleFeatureToggle("childSeat")}
                      className="w-4 h-4"
                    />
                    <span>
                      Child Seat (+${carData?.data?.pricing?.childSeatPrice})
                    </span>
                  </label>
                </div>
              </div>

              {/* Booking Button */}
              <div className="mt-6">
                <p className="text-xl font-bold mb-4">
                  Total: ${calculateTotalPrice()}
                </p>
                {carData?.data?.status === "available" ? (
                  <Link
                    to={`/booking/${id}`}
                    state={{ selectedFeatures }}
                    className="w-full"
                  >
                    <Button className="w-full">Book Now</Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full">
                    Currently Unavailable
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>

        <ReviewSection
          carData={carData}
          reviews={reviews}
          handleSubmitReview={handleSubmitReview}
          reviewForm={reviewForm}
          setReviewForm={setReviewForm}
        />

        {/* Related Cars Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Similar Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedCars?.data?.map((car: ICar) => (
              <div key={car?._id}>
                <ProductCard {...car} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
