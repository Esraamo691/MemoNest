import React, { useState } from "react";
import registerImg from "../../../assets/Mobile login-bro.svg";
import { Link, Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { schema } from "../../../lib/schema/authsc";
import { AythApi } from "../../../lib/constans/auth";
import { callRegisterApi } from "../../../lib/apis/authApi";

export default function Register() {
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(null);
  const route = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: zodResolver(schema) });

  function handelRegister(data) {
    console.log(data);
    setisloading(true);

    callRegisterApi(data)
      .then((res) => {
        console.log(res);
        seterror(null);
        route("/login");
      })
      .catch((err) => {
        console.log(err);
        seterror(err.response.data.msg);
      })
      .finally(() => setisloading(false));
  }

  return (
    <>
      <div className="flex justify-around items-center w-full py-3">
        <div>
          <img src={registerImg} className="w-[300px] hidden md:flex" alt="" />
        </div>

        <div className=" md:w-[40%] w-full mx-4 md:mx-0 py-10 px-12 border-2 border-[#1ebbcc55] rounded-lg ">
          <h1 className="text-black font-bold  text-2xl text-center ">
            Sign Up
          </h1>

          <form
            onSubmit={handleSubmit(handelRegister)}
            action=""
            className="mt-6"
          >
            <div>
              <input
                {...register("name")}
                placeholder="Name"
                type="text"
                className="py-3 px-6 w-full bg-[#f7f7f7] rounded-lg"
              />
              <p className="text-red-600">
                {errors.name?.message ? errors.name.message : ""}
              </p>
            </div>
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

            <div className="mt-6">
              <input
                {...register("age")}
                placeholder="Age"
                type="number"
                className="py-3 px-6 w-full bg-[#f7f7f7] rounded-lg"
              />
              <p className="text-red-600">
                {errors.age?.message ? errors.age?.message : ""}
              </p>
            </div>
            <div className="mt-6">
              <input
                {...register("phone")}
                placeholder="Phone"
                type="tel"
                className="py-3 px-6 w-full bg-[#f7f7f7] rounded-lg"
              />
              <p className="text-red-600">
                {errors.phone?.message ? errors.phone?.message : ""}
              </p>
            </div>

            <button className="rounded-2xl py-3 bg-[#92E3A9] w-full mt-6 cursor-pointer hover:bg-green-400">
              {isloading ? (
                <>
                  <span class="loader"></span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
            <p className="text-red-500">{error}</p>
            <Link to={"/login"} className="underline">
              Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
