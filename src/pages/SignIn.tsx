import loginImg from "@/assets/loginImg (2).jpg";
import logo from "@/assets/steer-away-high-resolution-logo-transparent.png";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { TLoginUser } from "@/Types/LoginUserInfo";
import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isHidden, setIsHidden] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginUser>();

  const [login] = useLoginMutation();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  // handling login user
  const handleLogin: SubmitHandler<TLoginUser> = async (data: TLoginUser) => {
    const toastId = toast.loading("Logging in");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.token) as TUser;
      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success(res.message, { id: toastId, duration: 2000 });
      navigate(from || `/${user.role}/overview`, { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <section className="">
      <div className="lg:grid lg:min-h-[80vh] lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src={loginImg}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <img src={logo} alt="" />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome Back!
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Sign in to access your account and continue your journey with
              Steer Away. Explore our range of vehicles, manage your bookings,
              and enjoy a seamless rental experience.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center py-8 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-background sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <img src={logo} alt="" />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Welcome Back!
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                Sign in to access your account and continue your journey with
                Steer Away. Explore our range of vehicles, manage your bookings,
                and enjoy a seamless rental experience.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleLogin)}
              className="mt-8 w-full flex flex-col gap-6"
            >
              <div className="col-span-12">
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email
                </label>

                <input
                  id="email"
                  placeholder="xyz@gmail.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  })}
                  className="py-3 px-2 w-full rounded-sm bg-secondary shadow-md mb-2"
                />
                {errors.email && (
                  <span className="text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="col-span-12">
                <label htmlFor="password" className="block mb-1 font-medium">
                  Password
                </label>

                <div className="flex items-center py-3 px-2 w-full rounded-sm bg-secondary shadow-md mb-2">
                  <input
                    placeholder="password"
                    type={isHidden ? "password" : "text"}
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="h-full w-full rounded-sm bg-transparent focus:outline-none"
                  />
                  <span onClick={() => setIsHidden(!isHidden)}>
                    {isHidden ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
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
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-destructive mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="w-full sm:flex sm:items-center lg: justify-between sm:gap-4">
                <Button size={"lg"}>Sign In</Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signUp"
                    className="font-bold underline hover:text-primary"
                  >
                    Sign Up
                  </Link>
                  .
                </p>

                <p className="mt-4 sm:mt-0 hover:text-primary cursor-pointer">
                  Forgot Password
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default SignIn;
