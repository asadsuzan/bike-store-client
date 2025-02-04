import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: { email: "admin@gmail.com", password: "adminadmin" },
  });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait...", {});

    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      const token = res.data.accessToken;
      dispatch(setUser({ user, token }));
      toast.success("Logged in success", {
        id: toastId,
      });
      // navigate(`/`);
      // Navigate back to the protected page or home
      navigate(from, { replace: true });
    } catch (error) {
      const message =
        (error as { data: { message: string } }).data.message ||
        "Something went wrong";
      toast.error(message, {
        id: toastId,
      });
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto  flex flex-col items-center justify-center  min-h-[100vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="border border-b-blue-300 outline-0 "
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block">
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="border border-b-blue-300 outline-0"
          />
        </div>

        <input
          type="submit"
          value="Submit"
          className="bg-blue-500 py-2  px-5 cursor-pointer rounded shadow-sm "
        />
      </form>
    </div>
  );
};

export default Login;
