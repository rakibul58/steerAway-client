/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar as CalendarIcon, Clock as ClockIcon } from "lucide-react";

export const RecentActivity = ({
  activities,
}: {
  activities: Record<string, any>[];
}) => (
  <div className="space-y-4 mt-8">
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-secondary" />

      <ul className="space-y-6 pl-10">
        {activities?.map((activity, index) => (
          <li key={index} className="relative flex items-start space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-foreground">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-base font-semibold">
                {activity?.user?.name}
              </p>
              <p className="text-sm text-foreground">
                Requested for <strong>{activity?.car?.name}</strong> -{" "}
                <span className={`font-semibold ${getStatusColor(activity?.status)}`}>
                  {activity?.status}
                </span>
              </p>
              <p className="text-xs text-gray-400 flex items-center space-x-1">
                <ClockIcon className="w-4 h-4" />
                <span>{activity?.date}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Helper function to return appropriate color class based on status
const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "text-green-600";
    case "Pending":
      return "text-yellow-600";
    case "Cancelled":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};
