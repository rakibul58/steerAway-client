/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Car, CreditCard, Calendar, ClockIcon } from "lucide-react";
import { useUserDashboardQuery } from "@/redux/features/dashboard/dashboardApi";

const Overview = () => {
  const {
    data: userDashboard,
    isFetching,
    isLoading,
    isError,
  } = useUserDashboardQuery(undefined);

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error: Failed to fetch</div>;
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const spendingData = Object.entries(userDashboard?.data?.userStats.spending.byType).map(
    ([key, value]) => ({
      name: key.replace("Costs", ""),
      value,
    })
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const featureUsage = userDashboard?.data?.userStats.activeRentals.reduce((acc: Record<string, number>, rental: any) => {
    Object.entries(rental.additionalFeatures).forEach(([feature, used]) => {
      if (used) acc[feature] = (acc[feature] || 0) + 1;
    });
    return acc;
  }, {});

  const rentalHistory = userDashboard?.data?.userStats.activeRentals.map((rental: any) => ({
    car: rental.car,
    cost: rental.cost,
    features: Object.values(rental.additionalFeatures).filter(Boolean).length
  }));

  return (
    <div className="px-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <h3 className="text-2xl font-bold">
                    ${userDashboard?.data?.overview.totalSpent.toLocaleString()}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Car className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Rentals</p>
                  <h3 className="text-2xl font-bold">
                    {userDashboard?.data?.overview.activeBookings}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Bookings</p>
                  <h3 className="text-2xl font-bold">
                    {userDashboard?.data?.overview.completedBookings}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <ClockIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Payments</p>
                  <h3 className="text-2xl font-bold">
                    {userDashboard?.data?.overview.pendingPayments}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

       
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Spending History</CardTitle>
              <CardDescription>Monthly spending overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userDashboard?.data?.userStats.spending.monthly}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Spending Breakdown</CardTitle>
              <CardDescription>Cost distribution by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {spendingData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4">
                  {spendingData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        ><Card>
        <CardHeader>
          <CardTitle>Spending Pattern</CardTitle>
          <CardDescription>Cost breakdown and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userDashboard?.data?.userStats.spending.monthly}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card></motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        ><Card>
        <CardHeader>
          <CardTitle>Feature Usage Analysis</CardTitle>
          <CardDescription>Additional features utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={Object.entries(featureUsage).map(([feature, count]) => ({
                feature,
                count
              }))}>
                <PolarGrid />
                <PolarAngleAxis dataKey="feature" />
                <PolarRadiusAxis />
                <Radar
                  name="Features"
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card></motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        ><Card>
        <CardHeader>
          <CardTitle>Booking Timeline</CardTitle>
          <CardDescription>Historical booking activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userDashboard?.data?.bookingStats.timeline}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card></motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        > <Card>
        <CardHeader>
          <CardTitle>Rental Cost Analysis</CardTitle>
          <CardDescription>Cost comparison across rentals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rentalHistory}>
                <XAxis dataKey="car" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" name="Rental Cost" fill="#8884d8" />
                <Bar dataKey="features" name="Features Added" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card></motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Active Rentals</CardTitle>
              <CardDescription>Currently rented vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userDashboard?.data?.userStats.activeRentals.map((rental: any) => (
                  <div
                    key={rental.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{rental.car}</h4>
                      <p className="text-sm text-gray-500">
                        Return by: {rental.returnDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${rental.cost}</p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          rental.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {rental.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Your scheduled rentals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userDashboard?.data?.userStats.upcomingBookings.map((booking: any) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{booking.car}</h4>
                      <p className="text-sm text-gray-500">
                        Start: {booking.startDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${booking.cost}</p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          booking.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
