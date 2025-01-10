/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ReviewForm {
  rating: number;
  comment: string;
}

interface ReviewSectionProps {
  carData: any;
  reviews: any;
  handleSubmitReview: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  reviewForm: ReviewForm;
  setReviewForm: React.Dispatch<React.SetStateAction<ReviewForm>>;
}

const ReviewSection = ({
  carData,
  reviews,
  handleSubmitReview,
  reviewForm,
  setReviewForm,
}: ReviewSectionProps) => {
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const calculatePercentage = (count: number) => {
    return ((count / carData?.data?.ratingStats?.totalRatings) * 100).toFixed(
      1
    );
  };

  return (
    <div className="mt-16">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Rating Statistics */}
        <Card className="lg:col-span-4 p-6">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold mb-2">
              {carData?.data?.ratingStats?.averageRating.toFixed(1)}
            </h3>
            <div className="flex justify-center mb-2">
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
            <p className="text-gray-600">
              {carData?.data?.ratingStats?.totalRatings} total reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center w-20">
                  <span className="text-sm">{rating}</span>
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-1" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={animateStats ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <Progress
                      value={Number(
                        calculatePercentage(
                          carData?.data?.ratingStats?.ratingDistribution[rating]
                        )
                      )}
                      className="h-2"
                    />
                  </motion.div>
                </div>
                <div className="w-16 text-right text-sm">
                  <span>
                    {calculatePercentage(
                      carData?.data?.ratingStats?.ratingDistribution[rating]
                    )}
                    %
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Review Form and List */}
        <div className="lg:col-span-8">
          {/* Add Review Form */}
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setReviewForm((prev) => ({ ...prev, rating: star }))
                    }
                    className="focus:outline-none"
                  >
                    <StarIcon
                      className={`w-8 h-8 ${
                        star <= reviewForm.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              <textarea
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                placeholder="Share your experience with this car..."
                className="w-full p-4 border rounded-lg mb-4 min-h-[120px]"
                required
              />
              <Button type="submit" className="w-full">
                Submit Review
              </Button>
            </form>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews?.data?.map((review: any) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold">{review.user.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <motion.div
                      className="flex"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </motion.div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
