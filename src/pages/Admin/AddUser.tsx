/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetSingleUsersQuery,
  useSignUpMutation,
  useUpdateUsersMutation,
} from "@/redux/features/auth/authApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
}

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserFormValues>();
  const [signUp] = useSignUpMutation();
  const [updateUsers] = useUpdateUsersMutation();
  const { data: user } = useGetSingleUsersQuery(id);

  // Pre-fill the form when editing a user
  if (user && id) {
    setValue("name", user.data.name);
    setValue("email", user.data.email);
    setValue("role", user.data.role);
  }

  const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
    const toastId = toast.loading("User updating....", { duration: 3000 });
    try {
      if (id) {
        const res = await updateUsers({ id, data }).unwrap();
        toast.success(res.message, { id: toastId, duration: 2000 });
      } else {
        const res = await signUp(data).unwrap();
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
      navigate("/admin/user-management");
    } catch (err: any) {
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="mx-auto px-4">
      <Card className="mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {id ? "Edit User" : "Add New User"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  defaultValue={user?.data?.name}
                  placeholder="Enter Name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="Enter Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              {!id && (
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="w-full"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <select
                  id="role"
                  {...register("role", { required: "Role is required" })}
                  className="w-full h-10 px-3 rounded-md border bg-background"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit" className="w-full md:w-auto">
                {id ? "Update User" : "Add User"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;
