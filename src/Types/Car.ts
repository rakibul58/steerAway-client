export interface ICarForm {
  name: string;
  brand: string;
  model: string;
  year: string;
  description: string;
  color: string;
  isElectric: boolean;
  status?: 'available' | 'reserved' | 'booked';
  features: string[];
  specifications: {
    transmission: 'automatic' | 'manual';
    fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
    seatingCapacity: number;
    mileage: number;
  };
  pricing: {
    basePrice: number;
    hourlyRate: number;
    dailyRate: number;
    weeklyRate: number;
    monthlyRate: number;
    insurancePrice?: number;
    childSeatPrice?: number;
    gpsPrice?: number;
  };
  images: string[];
  ratingStats?: {
    averageRating: number;
    totalRatings: number;
    ratingDistribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  };
  isDeleted?: boolean;
}