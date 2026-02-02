import React from "react";
import { Outlet } from "react-router";
import logoImg from "../../assets/Notes-bro.svg";

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen flex justify-center bg-gradient-to-r from-[#ddf6ee] to-[#eaf3eb]">
        <div className="w-[90%] flex items-center border-2 my-16 relative rounded-2xl bg-[#F9FFFB] border-[#1ebbcc]">
          <div className="flex gap-1 absolute md:top-16 md:start-16 top-5 left-8">
            <h1 className="text-2xl font-bold">
              Note <span className="text-[#92E3A9]">Ap</span>p
            </h1>
            <img src={logoImg} className="w-[40px]" alt="" />
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
}
