import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModals";

const UserProfile = () => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const { user } = useAuth();
  return (
    <>
      <div className="flex flex-col justify-between px-10 py-5">
        <div className="flex justify-between mb-2">
          <div className="text-2xl">My Profile</div>
          <button
            className="border px-5 py-2 bg-yellow-400 rounded cursor-pointer"
            onClick={() => setIsEditProfileModalOpen(true)}
          >
            Edit Profile
          </button>
        </div>
        <hr />
        <div className="flex justify-between px-5 shadow-xl rounded-2xl bg-amber-50 py-4 mt-3">
          <div>
            <span>Name : </span>
            <span>{user.fullName}</span>
          </div>
          <div>
            <span>Email : </span>
            <span>{user.email}</span>
          </div>
          <div>
            <span>Mobile Number : </span>
            <span>{user.phone}</span>
          </div>
        </div>
      </div>
      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;
