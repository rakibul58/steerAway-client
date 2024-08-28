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

export type TCar = {
  carType: string | null;
  _id: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: string;
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
  createdAt?: string;
  updatedA?: string;
  image: string;
};
