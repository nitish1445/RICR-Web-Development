import React, { useEffect, useState } from "react";
import { FaXmark, FaLock, FaKey, FaSpinner } from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../../config/Api";
import { useAuth } from "../../../context/AuthContext";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const resetForm = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    // Don't prevent closing unnecessarily
    resetForm();
    setLoading(false);
    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user?.email === "partner@gmail.com") {
      return toast.error("Dummy Partner cannot update profile");
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await api.put("/rider/reset-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      onClose?.();
      toast.success(response?.data?.message || "Failed to reset password");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end bg-black/80 sm:items-center sm:justify-center sm:p-5">
      <div className="w-full bg-[#FBF3E7] sm:max-w-md">
        <div className="flex items-center justify-between bg-[#1F1811] px-5 py-4 text-[#FBF3E7]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Account Security
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase">
              Reset Password
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex size-9 cursor-pointer items-center justify-center transition hover:bg-white/10"
          >
            <FaXmark />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="flex size-12 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
            <FaLock />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[#8A7C6A]">
            Update your password to keep your account secure.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A7C6A]">
                Current Password
              </label>

              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handleChange}
                required
                className="mt-2 w-full border border-[#1F1811]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#E8491D]"
              />
            </div>

            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A7C6A]">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="mt-2 w-full border border-[#1F1811]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#E8491D]"
              />
            </div>

            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A7C6A]">
                Confirm New Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="mt-2 w-full border border-[#1F1811]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#E8491D]"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer border border-[#1F1811]/20 px-4 py-3 text-[10px] font-bold uppercase"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-4 py-3 text-[10px] font-bold uppercase text-[#FBF3E7] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Updating
                </>
              ) : (
                <>
                  <FaKey />
                  Update
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
