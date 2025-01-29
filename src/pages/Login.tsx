import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      const token = res.data.accessToken;
      dispatch(setUser({ user, token }));

      //   navigate(`/${user.role}/dashboard`);
    } catch (error) {
      console.log(error);
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
