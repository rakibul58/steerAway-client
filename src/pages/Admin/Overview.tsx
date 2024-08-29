import { StatCard } from "@/components/Admin/StatCard";

const Overview = () => {
  const data = {
    totalBookings: 120,
    availableCars: 45,
    revenue: {
      currentMonth: 5000,
      total: 150000,
      byCarModel: {
        sedan: 2000,
        suv: 1500,
        truck: 1500,
      },
    },
    activeReservations: 30,
    userActivity: {
      newUsers: 25,
      activeUsers: 200,
    },
    recentActivity: {
      bookings: ["Car1", "Car2"],
      returns: ["Car3"],
    },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={data.totalBookings} />
        <StatCard title="Available Cars" value={data.availableCars} />
        <StatCard title="Current Month Revenue" value={`৳${data.revenue.currentMonth}`} />
        <StatCard title="Total Revenue" value={`৳${data.revenue.total}`} />
        <StatCard title="Active Reservations" value={data.activeReservations} />
        <StatCard title="Active Users" value={data.userActivity.activeUsers} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Recent Bookings</h3>
          <ul>
            {data.recentActivity.bookings.map((booking, index) => (
              <li key={index} className="p-2 border-b">{booking}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Recent Returns</h3>
          <ul>
            {data.recentActivity.returns.map((returnItem, index) => (
              <li key={index} className="p-2 border-b">{returnItem}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
