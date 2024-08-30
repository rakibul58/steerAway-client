import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  console.log({ user });

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="px-6">
      <h1 className="text-2xl font-bold mb-8">
        {id ? "Edit User" : "Add New User"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <Input
            id="name"
            defaultValue={user?.data?.name}
            placeholder="Enter Name"
            {...register("name", { required: "Name is required" })}
            className="py-2 px-3 w-full border rounded-md"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
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
            className="py-2 px-3 w-full border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        {!id && (
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
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
              className="py-2 px-3 w-full border rounded-md"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
        )}
        <div>
          <label htmlFor="role" className="block mb-1 font-medium">
            Role
          </label>
          <select
            id="role"
            {...register("role", { required: "Role is required" })}
            className="py-2 px-3 w-full border rounded-md bg-background"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}
        </div>
        <div>
          <Button type="submit">{id ? "Update User" : "Add User"}</Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
