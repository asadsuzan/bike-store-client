import React from "react";
import { FieldValues } from "react-hook-form";
import {  useRegisterMutation } from "../redux/features/auth/authApi";

import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import AuthForm from "../components/form/AuthForm";
import { ArrowRight } from "lucide-react";

const Registration = () => {

  const [register] = useRegisterMutation()

  const navigate = useNavigate();


  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait...", {});

    try {
      const res = await register(data).unwrap()
   if(res?.success){
    //  setInterval(() => {
    //   toast.success("Registered success", {
    //     id: toastId,
    //   });

    //   navigate('/login')
    //  }, 2000);
setTimeout(() => {
  toast.success("Registered success", {
    id: toastId,
  });

  navigate('/login')
}, 2000);
   }else{
     toast.error("Failed to register", {
        id: toastId,
      });
  
   }
    
    } catch (error) {
      const message =
        (error as { data: { message: string } }).data.message ||
        "Something went wrong";
      toast.error(message, {
        id: toastId,
      });
    
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
