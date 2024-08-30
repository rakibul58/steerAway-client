/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePaymentMutation } from "@/redux/features/booking/bookingApi";

const PaymentPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [payment] = usePaymentMutation();

  const handlePayment = async () => {
    const toastId = toast.loading("Status updating....", { duration: 3000 });
    try {
      const res = await payment(id).unwrap();
      window.location.href = res.data.payment_url;
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (err: any) {
      toast.error(err.message || "Payment failed, please try again.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-8">Payment Details</h1>

      <div className="space-y-6">
        {/* Payment Details */}
        <div className="border p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Car:</span>
            <span>{state?.car.name}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Booking Date:</span>
            <span>{state?.date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Start Time:</span>
            <span>{state?.startTime}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>End Time:</span>
            <span>{state?.endTime || "N/A"}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Rental Cost:</span>
            <span>৳{Math.floor(state?.rentingCost) || 0}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Insurance:</span>
            <span>৳{state.insuranceCost}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>GPS:</span>
            <span>৳{state.gpsCost}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Child Seat:</span>
            <span>৳{state.childSeatCost}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>৳{Math.floor(state?.totalCost)}</span>
          </div>
        </div>

        {/* Payment Form */}
        <div className="border p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
          {/* Replace the following with your actual payment form */}
          <Button onClick={handlePayment} className="w-full">
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
