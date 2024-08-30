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
  const { data: users, isLoading, isFetching } = useGetAllUsersQuery([]);
  const [updateUser] = useUpdateUsersMutation();

  const handleDelete = async (userId: string) => {
    const toastId = toast.loading("Deleting User....", { duration: 3000 });
    try {
      const res = await updateUser({
        id: userId,
        data: { isDeleted: true },
      }).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className="px-6">
      <h1 className="text-2xl font-bold mb-8">Manage Users</h1>
      <div className="flex justify-end mb-4">
        <Link to="/admin/add-user">
          <Button>Add New User</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full shadow-lg border rounded-md">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Deleted</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.length > 0 ? (
              users?.data?.map((user: any) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.isDeleted == true ? "Deleted" : "Active" }</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link to={`/admin/edit-user/${user._id}`}>
                      <Button size="sm">Edit</Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center">
                  No users available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
