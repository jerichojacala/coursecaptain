
// src/app/components/Login.tsx

import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mutate } from "swr";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const router = useRouter();

  const { login, storeToken } = AuthActions();

  const onSubmit = (data: FormData) => {
    login(data.username, data.password)
      .json(async (json) => {
        storeToken(json.access, "access");
        storeToken(json.refresh, "refresh");
        await mutate("/auth/users/me/"); //user data revalidation
        router.push("/");
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  return (
    <div className="flex items-center justify-center text-black">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
        <h3 className="text-2xl text-gray font-semibold">Login to your account</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div>
            <label className="block" htmlFor="username">
            </label>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.username && (
              <span className="text-xs text-red-600">Username is required</span>
            )}
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.password && (
              <span className="text-xs text-red-600">Password is required</span>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <button className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              Login
            </button>
          </div>
          {errors.root && (
            <span className="text-xs text-red-600">{errors.root.message}</span>
          )}
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/auth/password/reset-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );

};

export default Login;