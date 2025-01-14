/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Search,
  SlidersHorizontal,
  Clock,
  Car,
  CreditCard,
  Info
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useCancelBookingMutation,
  useGetMyBookingsQuery,
} from "@/redux/features/booking/bookingApi";
import { toast } from "sonner";

const BookingManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [page, setPage] = useState(1);

  const {
    data: bookings,
    isFetching,
    isLoading,
  } = useGetMyBookingsQuery([
    { name: "sort", value: "-createdAt" },
    { name: "page", value: page }
  ]);

  const [cancelBooking] = useCancelBookingMutation();

  useEffect(() => {
    if (isFetching || isLoading) {
      toast.loading("Loading bookings...", { duration: 2000 });
    }
  }, [isFetching, isLoading]);

  const handleCancel = async (bookingId: string) => {
    const toastId = toast.loading("Cancelling booking...");
    try {
      const res = await cancelBooking(bookingId).unwrap();
      toast.success(res.message, { id: toastId });
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to cancel booking", { id: toastId });
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      Approved: "bg-green-100 text-green-800 hover:bg-green-200",
      Cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
      Returned: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const BookingDetailsDialog = ({ booking }: { booking: any }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Booking Details</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Vehicle Information</h3>
            <p className="text-sm">{booking.car.name}</p>
            <p className="text-sm text-muted-foreground">{booking.car.brand} {booking.car.model} ({booking.car.year})</p>
          </div>
          <div>
            <h3 className="font-semibold">Booking Details</h3>
            <p className="text-sm">Date: {booking.date}</p>
            <p className="text-sm">Time: {booking.startTime} - {booking.endTime || 'N/A'}</p>
            <p className="text-sm">Duration: {booking.duration}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Cost Breakdown</h3>
            <p className="text-sm">Base Cost: {formatCurrency(booking.baseCost)}</p>
            <p className="text-sm">Insurance: {formatCurrency(booking.additionalCosts.insuranceCost)}</p>
            <p className="text-sm">GPS: {formatCurrency(booking.additionalCosts.gpsCost)}</p>
            <p className="text-sm">Child Seat: {formatCurrency(booking.additionalCosts.childSeatCost)}</p>
            <p className="text-sm font-semibold mt-2">Total: {formatCurrency(booking.totalCost)}</p>
          </div>
          <div>
            <h3 className="font-semibold">Additional Features</h3>
            <div className="flex gap-2 mt-1">
              {booking.additionalFeatures.insurance && (
                <Badge variant="secondary">Insurance</Badge>
              )}
              {booking.additionalFeatures.gps && (
                <Badge variant="secondary">GPS</Badge>
              )}
              {booking.additionalFeatures.childSeat && (
                <Badge variant="secondary">Child Seat</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  const filteredBookings = bookings?.data?.result?.filter((booking: any) => 
    (statusFilter === "all" || booking.status === statusFilter) &&
    (durationFilter === "all" || booking.duration === durationFilter) &&
    (booking.car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     booking.date.includes(searchTerm))
  );

  return (
    <Card className="mx-auto p-4 sm:p-4">
      <CardHeader className="px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <CardTitle className="text-2xl font-bold">Booking Management</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Bookings</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                        <SelectItem value="Returned">Returned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Select value={durationFilter} onValueChange={setDurationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Durations</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead className="hidden sm:table-cell">Date & Time</TableHead>
                <TableHead className="hidden md:table-cell">Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Total Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings?.length > 0 ? (
                filteredBookings.map((booking: any) => (
                  <TableRow key={booking._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{booking.car.name}</p>
                          <p className="text-sm text-muted-foreground">{booking.car.brand} {booking.car.model}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.startTime} - {booking.endTime || 'N/A'}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{booking.duration}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusBadgeStyle(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="space-y-1">
                        <p className="font-medium">{formatCurrency(booking.totalCost)}</p>
                        <Badge variant="outline" className={
                          booking.paymentStatus === "Paid" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }>
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Info className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <BookingDetailsDialog booking={booking} />
                        </Dialog>

                        {booking.status === "Pending" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleCancel(booking._id)}
                          >
                            Cancel
                          </Button>
                        )}
                        
                        {booking.status === "Returned" && booking.paymentStatus === "Pending" && (
                          <Link to={`/user/payment-receipt/${booking._id}`} state={booking}>
                            <Button size="sm" variant="secondary">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay Now
                            </Button>
                          </Link>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No bookings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {bookings?.data?.meta?.totalPage > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="px-4 py-2">
              Page {page} of {bookings.data.meta.totalPage}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => p + 1)}
              disabled={page >= bookings.data.meta.totalPage}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingManagement;