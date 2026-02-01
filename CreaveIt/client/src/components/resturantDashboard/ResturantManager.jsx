import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ManagerImage from "../../assets/userImage.jpg";
import { FaCamera } from "react-icons/fa";

const ResturantManager = () => {
  const { user, setUser } = useAuth();
  // const [preview, setPreview] = useState();
  return (
    <>
      <div className="p-6 h-full">
        <div className="flex justify-between items-center shadow-md border p-5 rounded-3xl border-gray-300 bg-white">
          <div className="flex gap-5 items-center">
            <div className="relative">
              <div className="border-2 border-black rounded-full w-36 h-36 overflow-hidden">
                <img
                  src={ManagerImage}
                  alt="image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 left-[75%] border bg-white p-2 rounded-full group flex gap-3">
                <label
                  htmlFor="imaheUplaod"
                  className="text-(--color-primary) group-hover:text-(--color-secondary) cursor-pointer"
                >
                  <FaCamera />
                </label>
                <input
                  type="file"
                  id="imageUplaod"
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="grid">
              <h2 className="text-3xl text-(--color-primary) font-bold">
                {user.fullName || "Manager Name"}{" "}
                <span className="text-xs">( {user.role} )</span>
              </h2>
              <div className="text-gray-600 text-lg font-semibold">
                {user.email || "example@xyz.com"}
              </div>
              <div className="text-gray-600 text-lg font-semibold">
                {user.phone || "999999XXXX"}
              </div>
            </div>
          </div>
          <div className="grid gap-5">
            <button className="px-4 py-2 rounded bg-(--color-secondary) text-white cursor-pointer">
              Edit Details
            </button>
            <button className="px-4 py-2 rounded bg-(--color-secondary) text-white cursor-pointer">
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResturantManager;
