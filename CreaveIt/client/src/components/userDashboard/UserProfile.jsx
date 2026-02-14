import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModals";
import ResetPasswordModal from "./modals/ResetPasswordModal";
import UserImage from "../../assets/userImage.jpg";
import { FaCamera } from "react-icons/fa";
import api from "../../config/Api";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const { user, setUser } = useAuth();
  const [preview, setPreview] = useState("");

  const changePhoto = async (photo) => {
    const form_Data = new FormData();

    form_Data.append("image", photo);
    // form_Data.append("imageURL", preview);

    try {
      const res = await api.patch("/user/changePhoto", form_Data);

      toast.success(res.data.message);

      setUser(res.data.data);
      sessionStorage.setItem("CraveItUser", JSON.stringify(res.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const newPhotoURL = URL.createObjectURL(file);
    //console.log(newPhotoURL);
    setPreview(newPhotoURL);
    setTimeout(() => {
      changePhoto(file);
    }, 5000);
  };

  return (
    <>
      <div className=" bg-gray-50 rounded-lg p-6 h-full overflow-y-auto space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex gap-6">
            {/* Photo Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="border-4 border-gray-300 rounded-full w-40 h-40 overflow-hidden bg-gray-100">
                  <img
                    src={preview || user?.photo?.url || UserImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-2 right-2 bg-(--color-secondary) text-white p-3 rounded-full hover:bg-(--color-secondary-hover) cursor-pointer transition transform hover:scale-110"
                >
                  <FaCamera size={18} />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Click camera to change photo
              </p>
            </div>

            {/* Basic Info Section */}
            <div className="flex justify-between w-full">
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-(--color-primary) mb-2">
                    {user?.fullName || "Manager Name"}
                  </h1>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-(--color-secondary) text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                      {user?.role || "manager"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user?.isActive === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user?.isActive || "active"}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">Email :</span>
                    <span className="text-gray-900">
                      {user?.email || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">Phone :</span>
                    <span className="text-gray-900">
                      {user?.phone || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditProfileModalOpen(true)}
                    className="cursor-pointer px-6 py-2 bg-(--color-secondary) text-white rounded-lg hover:bg-(--color-secondary-hover) transition font-semibold"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setIsResetPasswordModalOpen(true)}
                    className="cursor-pointer px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}
      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          onClose={() => setIsResetPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserProfile;
