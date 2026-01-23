import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";

const EditProfileModals = ({ onClose }) => {
  const [detail, setDetail] = useState();
  const [formDetail, setFormDetail] = useState({
    fullName: detail.fullName,
    email: detail.email,
    phone: detail.phone,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/user/update", formDetail);
      toast.success("Profile Updated Successfully");
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Unkown Error");
    }
  };

  return (
    <>
      <div className="z-100 fixed inset-50 rounded-2xl w-5xl px-10">
        <div className="flex justify-between items-center px-5 py-3">
          <div className="text-xl font-medium">Edit Profile</div>
          <button
            className="text-red-600 text-2xl cursor-pointer"
            onClick={() => onClose()}
          >
            <GiCancel />
          </button>
        </div>

        <hr />

        <div className="px-8 mt-5">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Full Name */}

              <div className="">
                <div>FULL NAME</div>
                <input
                  type="text"
                  name="fullName"
                  value={formDetail}
                  onChange={handleChange}
                  className="w-full h-fit px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                />
              </div>

              <div className="">
                <div>EMAIL </div>
                <input
                  type="email"
                  name="email"
                  value={formDetail}
                  onChange={handleChange}
                  className="w-full h-fit px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                />
              </div>

              {/* Phone  */}

              <div className="">
                <div>PHONE NUMBER</div>
                <input
                  type="tel"
                  name="phone"
                  maxLength="10"
                  value={formDetail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                />
              </div>
            </div>
            <div className="mt-5 flex gap-5">
              <button
                type="reset"
                disabled={isLoading}
                className="flex-1 bg-gray-300 text-(--color-primary) font-bold py-3 rounded-lg shadow-lg cursor-pointer hover:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 disabled:bg-(--color-secondary)"
              >
                {isLoading ? "Submitting" : "Clear"}
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-(--color-secondary) text-(--color-primary) font-bold py-3 rounded-lg hover:bg-(--color-secondary-hover) shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:scale-100 disabled:bg-(--color-secondary)"
              >
                {isLoading ? "Submitting" : "Submit Details"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileModals;
