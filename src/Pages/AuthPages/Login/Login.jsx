import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/schema/authsc";
import loginimg from "../../../assets/Authentication-bro.svg";
import { callLoginApi } from "../../../lib/apis/authApi";
export default function Login() {
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(null);
  const route = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: zodResolver(loginSchema) });

  function handelLogin(data) {
    console.log(data);
    setisloading(true);

    callLoginApi(data)
      .then((res) => {
        console.log(res);
        seterror(null);
        localStorage.setItem("token", res.data.token);
        route("/");
      })
      .catch((err) => {
        console.log(err);
        seterror(err.response.data.msg);
      })
      .finally(() => setisloading(false));
  }

  return (
    <>
      <div className="flex justify-around items-center w-full">
        <div className="hidden md:flex">
          <img src={loginimg} className="w-[300px]" alt="" />
        </div>

        <div className=" md:w-[40%] w-full mx-4 md:mx-0 py-10 px-12 border-2 border-[#1ebbcc55] rounded-lg ">
          <h1 className="text-black font-bold text-2xl text-center">Log In</h1>

          <form onSubmit={handleSubmit(handelLogin)} action="" className="mt-6">
            <div className="mt-6">
              <input
                {...register("email")}
                placeholder="Email"
                type="email"
                className="py-3 px-6 w-full bg-[#f7f7f7] rounded-lg"
              />
              <p className="text-red-600">
                {errors.email?.message ? errors.email?.message : ""}
              </p>
            </div>
            <div className="mt-6">
              <input
                {...register("password")}
                placeholder="Passowrd"
                type="password"
                className="py-3 px-6 w-full bg-[#f7f7f7] rounded-lg"
              />
              <p className="text-red-600">
                {errors.password?.message ? errors.password?.message : ""}
              </p>
            </div>

            <button className="rounded-2xl py-3 bg-[#92E3A9] w-full mt-6 cursor-pointer hover:bg-green-400">
              {isloading ? (
                <>
                  <span class="loader"></span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
            <p className="text-red-500">{error}</p>
            <Link to={"/register"} className="underline">
              Sign Up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
