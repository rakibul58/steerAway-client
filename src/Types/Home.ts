export type TSellingPoints = {
  id: number;
  icon: JSX.Element;
  title: string;
  description: string;
};

export type TReview = {
  id: number;
  name: string;
  rating: number;
  comment: string;
};

interface Specifications {
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seatingCapacity: number;
  mileage: number;
}

interface Pricing {
  basePrice: number;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  insurancePrice?: number;
  childSeatPrice?: number;
  gpsPrice?: number;
}

export interface ICar {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: 'available' | 'reserved' | 'booked';
  features: string[];
  specifications: Specifications;
  pricing: Pricing;
  images: string[];
  ratingStats: {
    averageRating: number;
    totalRatings: number;
    ratingDistribution: {
      [key: number]: number;
    };
  };
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
