import React from "react";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router";
import AuthForm from "../components/form/AuthForm";
import { ArrowRight } from "lucide-react";

const Registration = () => {

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <AuthForm isLogin={false} onSubmit={onSubmit} />
    <Link to={'/shop'} className="my-2 flex justify-center items-center gap-2 text-green-400 hover:text-green-700">Continue Shopping <ArrowRight size={15} color="green" className="mt-1"/> </Link>
  </div>
  );
};

export default Registration;
