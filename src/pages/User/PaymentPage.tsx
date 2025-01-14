/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { usePaymentMutation } from "@/redux/features/booking/bookingApi";
import {
  Calendar,
  Clock,
  Car,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { useLocation, useParams } from "react-router-dom";

const PaymentPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [payment] = usePaymentMutation();



  const handlePayment = async () => {
    const toastId = toast.loading("Processing payment...", { duration: 3000 });
    try {
      const res = await payment(id).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
      console.log({res});
      // Uncomment below line for redirect to payment gateway
      window.location.href = res.data.payment_url;
    } catch (err: any) {
      toast.error(err.message || "Payment failed, please try again.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="px-4">
      <div className="mx-auto shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4  border-b">
          <h1 className="text-2xl font-semibold text-gray-800">
            Payment Details
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Transaction ID: <span className="font-medium">{state?.transactionId}</span>
          </p>
        </div>

        <div className="p-6 space-y-8">
          {/* Booking Details */}
          <div className="border rounded-lg p-6 ">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Booking Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-600 flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Vehicle:
                </p>
                <p className="font-medium">{state?.car.name}</p>
                <p className="text-sm text-gray-500">
                  {state?.car.brand} {state?.car.model} ({state?.car.year})
                </p>
              </div>

              <div>
                <p className="text-gray-600 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Booking Date:
                </p>
                <p className="font-medium">{state?.date}</p>
              </div>

              <div>
                <p className="text-gray-600 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time:
                </p>
                <p className="font-medium">
                  {state?.startTime} - {state?.endTime || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-600">Duration:</p>
                <Badge className="bg-gray-200 text-gray-800">{state?.duration}</Badge>
              </div>

              <div>
                <p className="text-gray-600">Status:</p>
                <Badge
                  className={`${
                    state?.status === "Returned"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {state?.status}
                </Badge>
              </div>

              <div>
                <p className="text-gray-600">Payment Status:</p>
                <Badge
                  className={`${
                    state?.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {state?.paymentStatus}
                </Badge>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="border rounded-lg p-6 ">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Cost Breakdown
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span>Base Cost:</span>
                <span className="font-medium">${state?.baseCost || 0}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Insurance:</span>
                <span className="font-medium">${state?.additionalCosts?.insuranceCost || 0}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>GPS:</span>
                <span className="font-medium">${state?.additionalCosts?.gpsCost || 0}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Child Seat:</span>
                <span className="font-medium">${state?.additionalCosts?.childSeatCost || 0}</span>
              </div>
              <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-gray-800 text-lg">
                <span>Total:</span>
                <span>${state?.totalCost || 0}</span>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <div className="text-center">
            {state?.paymentStatus !== "Paid" ? (
              <Button
                onClick={handlePayment}
                className="px-8 py-3 text-lg"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Pay Now
              </Button>
            ) : (
              <div className="flex items-center justify-center text-green-600 gap-2">
                <CheckCircle className="h-6 w-6" />
                <span className="text-lg font-semibold">Payment Complete</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
