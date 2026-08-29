import React, { useEffect, useState } from "react";

import {
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaLock,
  FaShieldHalved,
  FaXmark,
} from "react-icons/fa6";

import api from "../../../config/Api";
import { toast } from "react-hot-toast";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    cfNewPassword: "",
  });

  const [validError, setValidError] = useState({});
  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Lock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      cfNewPassword: "",
    });

    setValidError({});
  };

  const handleClose = () => {
    if (loading) return;

    handleClear();
    onClose();
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

    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setLoading(true);

    try {
      const res = await api.patch("/user/resetPassword", formData);

      toast.success(res?.data?.message || "Password updated successfully");

      handleClear();
      onClose();
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Unable to reset password",
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
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#1F1811]/60 px-4 py-6 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden bg-[#FFF9F2] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F1811]/10 bg-[#1F1811] px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
              <FaKey className="text-xs" />
            </div>

            <div>
              <h2 className="font-[Archivo_Black] text-base uppercase text-[#FBF3E7]">
                Reset Password
              </h2>

              <p className="text-[9px] font-medium uppercase tracking-wider text-[#C9BEB0]">
                Account Security
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex size-8 cursor-pointer items-center justify-center text-[#C9BEB0] transition hover:bg-white/10 hover:text-[#E8491D] disabled:cursor-not-allowed"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Content */}
          <div className="p-5 sm:p-6">
            {/* Info */}
            <div className="mb-6 flex items-start gap-3 bg-[#E8491D]/8 p-3">
              <div className="mt-0.5 text-[#E8491D]">
                <FaShieldHalved />
              </div>

              <p className="text-xs leading-5 text-[#5F5143]">
                Use a strong password that you don't use for other accounts.
                Your password must contain at least{" "}
                <span className="font-bold text-[#1F1811]">
                  6 characters.
                </span>
              </p>
            </div>

            <div className="space-y-5">
              {/* Old Password */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                  Current Password
                </label>

                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#8A7C6A]" />

                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                    className={`w-full bg-white py-3 pl-10 pr-12 text-sm text-[#1F1811] outline-none transition placeholder:text-[#8A7C6A]/60 focus:ring-1 ${
                      validError.oldPassword
                        ? "border border-[#E8491D] focus:ring-[#E8491D]"
                        : "border border-[#1F1811]/15 focus:border-[#E8491D] focus:ring-[#E8491D]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-[#8A7C6A] transition hover:text-[#E8491D]"
                  >
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {validError.oldPassword && (
                  <p className="mt-1.5 text-[10px] font-medium text-[#E8491D]">
                    {validError.oldPassword}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-[#1F1811]/15" />

              {/* New Password */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                  New Password
                </label>

                <div className="relative">
                  <FaKey className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#8A7C6A]" />

                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Create a new password"
                    className={`w-full bg-white py-3 pl-10 pr-12 text-sm text-[#1F1811] outline-none transition placeholder:text-[#8A7C6A]/60 focus:ring-1 ${
                      validError.newPassword
                        ? "border border-[#E8491D] focus:ring-[#E8491D]"
                        : "border border-[#1F1811]/15 focus:border-[#E8491D] focus:ring-[#E8491D]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-[#8A7C6A] transition hover:text-[#E8491D]"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {validError.newPassword && (
                  <p className="mt-1.5 text-[10px] font-medium text-[#E8491D]">
                    {validError.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                  Confirm New Password
                </label>

                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#8A7C6A]" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="cfNewPassword"
                    value={formData.cfNewPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your new password"
                    className={`w-full bg-white py-3 pl-10 pr-12 text-sm text-[#1F1811] outline-none transition placeholder:text-[#8A7C6A]/60 focus:ring-1 ${
                      validError.cfNewPassword
                        ? "border border-[#E8491D] focus:ring-[#E8491D]"
                        : "border border-[#1F1811]/15 focus:border-[#E8491D] focus:ring-[#E8491D]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-[#8A7C6A] transition hover:text-[#E8491D]"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {validError.cfNewPassword && (
                  <p className="mt-1.5 text-[10px] font-medium text-[#E8491D]">
                    {validError.cfNewPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-[#1F1811]/10 bg-[#F3E9DB]/50 px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="cursor-pointer px-5 py-2.5 text-xs font-bold text-[#5F5143] transition hover:text-[#E8491D] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-w-36 cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Updating...
                </>
              ) : (
                <>
                  Update Password
                  <FaArrowRight className="text-[10px]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;