// import React, { useState } from "react";
// import { GiCancel } from "react-icons/gi";
// import api from "../../../config/Api";
// import { toast } from "react-hot-toast";

// const RestaurantResetPassword = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     cfNewPassword: "",
//   });

//   const handleClear = () => {
//     setFormData({
//       oldPassword: "",
//       newPassword: "",
//       cfNewPassword: "",
//     });
//   };

//   const [validError, setValidError] = useState({});
//   const [loading, setLoading] = useState(false);

//   const validate = () => {
//     let Error = {};

//     //old password error
//     if (formData.oldPassword.length == 0) {
//       Error.oldPassword = "Please enter your old password";
//     }

//     //new password error
//     if (formData.newPassword.length == 0) {
//       Error.newPassword = "Please enter your new password";
//     } else {
//       if (formData.newPassword.length < 6) {
//         Error.newPassword = "Password should contain atleast 6 digits";
//       } else {
//         if (formData.oldPassword === formData.newPassword) {
//           Error.cfNewPassword = "Use different password";
//         }
//       }
//     }

//     // Confirm new Password
//     if (formData.cfNewPassword.length == 0) {
//       Error.cfNewPassword = "Please confirm your password";
//     } else {
//       if (formData.newPassword != formData.cfNewPassword) {
//         Error.cfNewPassword = "Please enter the same password";
//       }
//     }

//     setValidError(Error);
//     return Object.keys(Error).length > 0 ? true : false;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log(formData);
//     handleClear();

//     //validation code
//     // if (validate) {
//     //   toast.error("Enter correct password");
//     //   setLoading(false);
//     //   return;
//     // }

//     try {
//       const res = await api.patch("/user/resetPassword", formData);
//       toast.success(res.data.message);
//       handleClear();
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Unknown Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   return (
//     <>
//       <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
//         <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
//           <div className="flex justify-between px-6 py-4 border-b border-gray-300 items-center sticky top-0 bg-white">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Reset Password
//             </h2>
//             <button
//               onClick={() => onClose()}
//               className="text-red-400 hover:text-red-700 text-2xl cursor-pointer"
//             >
//               <GiCancel />
//             </button>
//           </div>

//           {/* we will be taking old and new Password here */}

//           <form onSubmit={handleSubmit} className="p-6 space-y-6">
//             {/* Personal Information Section */}
//             <div>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Old Password *
//                   </label>
//                   <input
//                     type="password"
//                     name="oldPassword"
//                     value={formData.oldPassword}
//                     onChange={handleInputChange}
//                     className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                       validError.oldPassword
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     }`}
//                     placeholder="Enter your old password"
//                   />
//                   {validError.oldPassword && (
//                     <p className="text-red-600 text-xs mt-1">
//                       {validError.oldPassword}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     New Password *
//                   </label>
//                   <input
//                     type="password"
//                     name="newPassword"
//                     value={formData.newPassword}
//                     onChange={handleInputChange}
//                     className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                       validError.newPassword
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     }`}
//                     placeholder="Enter your new password"
//                   />
//                   {validError.newPassword && (
//                     <p className="text-red-600 text-xs mt-1">
//                       {validError.newPassword}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Confirm New Password *
//                   </label>
//                   <input
//                     type="password"
//                     name="cfNewPassword"
//                     value={formData.cfNewPassword}
//                     onChange={handleInputChange}
//                     className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                       validError.cfNewPassword
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     }`}
//                     placeholder="Confirm new password"
//                   />
//                   {validError.cfNewPassword && (
//                     <p className="text-red-600 text-xs mt-1">
//                       {validError.cfNewPassword}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-end space-x-4 pt-6 border-t border-gray-300">
//               <button
//                 type="button"
//                 onClick={() => onClose()}
//                 disabled={loading}
//                 className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition disabled:opacity-50 cursor-pointer"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
//               >
//                 {loading ? (
//                   <>
//                     <span className="animate-spin">⟳</span> Saving...
//                   </>
//                 ) : (
//                   "Save Changes"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RestaurantResetPassword;

import React, { useState, useEffect } from "react";
import { FaXmark, FaLock, FaKey, FaShieldHalved } from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../../config/Api";
import { useAuth } from "../../../context/AuthContext";

const RestaurantResetPassword = ({ onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    cfNewPassword: "",
  });

  const [validError, setValidError] = useState({});
  const [loading, setLoading] = useState(false);

  // Disable background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClear = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      cfNewPassword: "",
    });

    setValidError({});
  };

  const validate = () => {
    const errors = {};

    if (!formData.oldPassword.trim()) {
      errors.oldPassword = "Please enter your current password";
    }

    if (!formData.newPassword.trim()) {
      errors.newPassword = "Please enter a new password";
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = "Password must contain at least 6 characters";
    } else if (formData.oldPassword === formData.newPassword) {
      errors.newPassword = "New password must be different";
    }

    if (!formData.cfNewPassword.trim()) {
      errors.cfNewPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.cfNewPassword) {
      errors.cfNewPassword = "Passwords do not match";
    }

    setValidError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.email === "manager@gmail.com") {
      return toast.error("Dummy Manager can't process this task.");
    }

    if (!validate()) return;

    try {
      setLoading(true);
      const res = await api.patch("/user/resetPassword", formData);
      toast.success(res?.data?.message || "Password updated successfully");
      handleClear();
      onClose();
    } catch (error) {
      console.log("Reset password error:", error);
      toast.error(
        error?.response?.data?.message || "Unable to update password",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validError[name]) {
      setValidError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-lg bg-[#FBF3E7] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#1F1811]/10 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
              <FaShieldHalved />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                Security Settings
              </p>

              <h2 className="mt-1 font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                Change Password
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex size-9 cursor-pointer items-center justify-center text-[#8A7C6A] transition hover:bg-[#1F1811] hover:text-[#FBF3E7]"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-5 py-6 sm:px-6">
            <div className="mb-6 bg-white px-4 py-3">
              <p className="text-sm font-medium text-[#1F1811]">
                Keep your restaurant account secure
              </p>

              <p className="mt-1 text-xs text-[#8A7C6A]">
                Choose a strong password that you don't use elsewhere.
              </p>
            </div>

            <div className="space-y-5">
              {/* Current Password */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#5F5143]">
                  <FaLock className="text-[#E8491D]" />
                  Current Password
                </label>

                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your current password"
                  className="w-full bg-white px-4 py-3 text-sm outline-none ring-0 focus:ring-1 focus:ring-[#E8491D]"
                />

                {validError.oldPassword && (
                  <p className="mt-2 text-xs text-[#E8491D]">
                    {validError.oldPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#5F5143]">
                  <FaKey className="text-[#E8491D]" />
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-white px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#E8491D]"
                />

                {validError.newPassword && (
                  <p className="mt-2 text-xs text-[#E8491D]">
                    {validError.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#5F5143]">
                  <FaShieldHalved className="text-[#E8491D]" />
                  Confirm New Password
                </label>

                <input
                  type="password"
                  name="cfNewPassword"
                  value={formData.cfNewPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter your new password"
                  className="w-full bg-white px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#E8491D]"
                />

                {validError.cfNewPassword && (
                  <p className="mt-2 text-xs text-[#E8491D]">
                    {validError.cfNewPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#1F1811]/10 px-5 py-5 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#5F5143]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="size-3 animate-spin rounded-full border-2 border-[#FBF3E7] border-t-transparent" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantResetPassword;
