/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetAllUsersQuery,
  useUpdateUsersMutation,
} from "@/redux/features/auth/authApi";

const UserManagement = () => {
  const { data: users, isLoading, isFetching } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUsersMutation();

  const handleDelete = async (userId: string) => {
    const toastId = toast.loading("Deleting User....", { duration: 3000 });
    try {
      const res = await updateUser({
        id: userId,
        data: { isDeleted: true },
      }).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (err: any) {
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (isFetching || isLoading) {
      toast.loading("Fetching Users", { duration: 3000 });
    } else {
      toast.dismiss();
      toast.success("Users Fetched Successfully", { duration: 1000 });
    }
  }, [isFetching, isLoading]);

  return (
    <section className="min-h-screen">
      <div className="px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 lg:mb-0">
            Manage Users
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/admin/add-user">
              <Button className="w-full sm:w-auto">Add New User</Button>
            </Link>
          </div>
        </div>

        <div className="w-full">
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full table-auto text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">User Details</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Contact</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Role</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.data?.length > 0 ? (
                  users.data.map((user: any) => (
                    <tr key={user._id} className="border-b">
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">ID: {user._id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm">{user.email}</p>
                          <p className="text-sm text-gray-600">
                            {user.phone || "No phone number"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            user.isDeleted
                              ? "bg-red-200 text-red-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {user.isDeleted ? "Deleted" : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-200 text-purple-800"
                              : "bg-blue-200 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link to={`/admin/edit-user/${user._id}`}>
                            <Button 
                              size="sm"
                            >
                              Edit
                            </Button>
                          </Link>
                          {!user.isDeleted && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(user._id)}
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No users available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserManagement;