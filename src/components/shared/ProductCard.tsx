
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Users, Fuel, Gauge, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  _id: string;
  name: string;
  brand: string;
  model: string;
  images: string[];
  specifications: {
    seatingCapacity: number;
    transmission: string;
    fuelType: string;
    mileage: number;
  };
  pricing: {
    hourlyRate: number;
    dailyRate: number;
  };
  status: string;
  ratingStats: {
    averageRating: number;
    totalRatings: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  _id,
  name,
  brand,
  model,
  images,
  specifications,
  pricing,
  status,
  ratingStats,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="p-4 h-full"
    >
      <Card className="h-full flex flex-col bg-card">
        <div className="relative">
          <img 
            src={images[0]} 
            alt={name} 
            className="w-full h-52 object-cover"
          />
          <Badge 
            className={`absolute top-4 right-4 ${
              status === 'available' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {status}
          </Badge>
        </div>

        <CardContent className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3 h-[70px]">
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{brand} {model}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">
                ${pricing.hourlyRate}
                <span className="text-sm text-muted-foreground">/hr</span>
              </p>
              <p className="text-sm text-muted-foreground">
                ${pricing.dailyRate}/day
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2 text-sm">
              <Users size={16} />
              <span>{specifications.seatingCapacity} seats</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Settings size={16} />
              <span>{specifications.transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Fuel size={16} />
              <span>{specifications.fuelType}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Gauge size={16} />
              <span>{specifications.mileage} km/l</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="ml-1 text-sm font-medium">
                {ratingStats.averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({ratingStats.totalRatings} reviews)
            </span>
          </div>

          <div className="mt-auto">
            <Link to={`/car-details/${_id}`} className="w-full">
              <Button className="w-full">View Details</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;