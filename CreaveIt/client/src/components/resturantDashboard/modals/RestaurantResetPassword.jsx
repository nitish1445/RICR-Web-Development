import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
import api from "../../../config/Api";
import { toast } from "react-hot-toast";

const RestaurantResetPassword = ({ onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    cfNewPassword: "",
  });

  const handleClear = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      cfNewPassword: "",
    });
  };

  const [validError, setValidError] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let Error = {};

    //old password error
    if (formData.oldPassword.length == 0) {
      Error.oldPassword = "Please enter your old password";
    }

    //new password error
    if (formData.newPassword.length == 0) {
      Error.newPassword = "Please enter your new password";
    } else {
      if (formData.newPassword.length < 6) {
        Error.newPassword = "Password should contain atleast 6 digits";
      } else {
        if (formData.oldPassword === formData.newPassword) {
          Error.cfNewPassword = "Use different password";
        }
      }
    }

    // Confirm new Password
    if (formData.cfNewPassword.length == 0) {
      Error.cfNewPassword = "Please confirm your password";
    } else {
      if (formData.newPassword != formData.cfNewPassword) {
        Error.cfNewPassword = "Please enter the same password";
      }
    }

    setValidError(Error);
    return Object.keys(Error).length > 0 ? true : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    handleClear();

    //validation code
    // if (validate) {
    //   toast.error("Enter correct password");
    //   setLoading(false);
    //   return;
    // }

    try {
      const res = await api.patch("/user/resetPassword", formData);
      toast.success(res.data.message);
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
          <div className="flex justify-between px-6 py-4 border-b border-gray-300 items-center sticky top-0 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">
              Reset Password
            </h2>
            <button
              onClick={() => onClose()}
              className="text-red-400 hover:text-red-700 text-2xl cursor-pointer"
            >
              <GiCancel />
            </button>
          </div>

          {/* we will be taking old and new Password here */}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information Section */}
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Old Password *
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validError.oldPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your old password"
                  />
                  {validError.oldPassword && (
                    <p className="text-red-600 text-xs mt-1">
                      {validError.oldPassword}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password *
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validError.newPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your new password"
                  />
                  {validError.newPassword && (
                    <p className="text-red-600 text-xs mt-1">
                      {validError.newPassword}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    name="cfNewPassword"
                    value={formData.cfNewPassword}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validError.cfNewPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Confirm new password"
                  />
                  {validError.cfNewPassword && (
                    <p className="text-red-600 text-xs mt-1">
                      {validError.cfNewPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-300">
              <button
                type="button"
                onClick={() => onClose()}
                disabled={loading}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⟳</span> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RestaurantResetPassword;
