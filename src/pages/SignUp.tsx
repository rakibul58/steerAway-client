/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import signUpImg from "../assets/Sign up-bro.svg";

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  address?: string;
  termsAccepted: boolean;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(true);
  const [signUp] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISignUpForm>();

  const password = watch("password");

  const handleSignUp: SubmitHandler<ISignUpForm> = async (data) => {
    if (!data.termsAccepted) {
      return toast.error("You must accept the Terms & Conditions.");
    }

    const toastId = toast.loading("Creating your account...", {
      duration: 3000,
    });
    try {
      const res = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
      }).unwrap();

      toast.success(res.message, { id: toastId, duration: 2000 });
      navigate("/signIn");
    } catch (err: any) {
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center md:mt-32 mt-12 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-card rounded-lg shadow-xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Illustration */}
          <div className="relative hidden md:flex flex-col items-center justify-center p-12 bg-primary/10">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <img src={signUpImg} alt="Sign Up Illustration" />
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-3xl font-bold text-primary"
              >
                Join SteerAway
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-muted-foreground"
              >
                Start your premium car rental journey today
              </motion.p>
            </motion.div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="p-8">
            <div className="space-y-4">
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold">Create Account</h1>
                <p className="text-muted-foreground mt-2">
                  Please fill in your details to get started
                </p>
              </div>

              <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                {/* Name and Email row */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium leading-none">
                      Full Name
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid email format",
                        },
                      })}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="name@example.com"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password and Confirm Password row */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium leading-none">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...register("password", {
                          required: "Password is required",
                        })}
                        type={isHidden ? "password" : "text"}
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        placeholder="Create password"
                      />
                      <button
                        type="button"
                        onClick={() => setIsHidden(!isHidden)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {isHidden ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium leading-none">
                      Confirm Password
                    </label>
                    <input
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      type={isHidden ? "password" : "text"}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Confirm password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone and Address row */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium leading-none">
                      Phone Number (Optional)
                    </label>
                    <input
                      {...register("phone")}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium leading-none">
                      Address (Optional)
                    </label>
                    <input
                      {...register("address")}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Your address"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("termsAccepted")}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground"
                  >
                    I agree to the{" "}
                    <a href="/terms" className="text-primary hover:underline">
                      Terms & Conditions
                    </a>
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="text-primary"
                    onClick={() => navigate("/signin")}
                  >
                    Sign in
                  </Button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
