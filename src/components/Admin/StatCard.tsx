import { Card } from '../ui/card';

// StatCard component remains the same
type TStatCardProps = {
  title: string;
  value: string | number;
};

export const StatCard = ({ title, value }: TStatCardProps) => {
  return (
    <Card className="p-4 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </Card>
  );
};