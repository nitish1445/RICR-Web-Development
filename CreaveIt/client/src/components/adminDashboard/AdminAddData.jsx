import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaUser,
  FaStore,
  FaMotorcycle,
  FaArrowLeft,
  FaPlus,
  FaArrowRotateRight,
} from "react-icons/fa6";
import api from "../../config/Api";
import { useAuth } from "../../context/AuthContext";

const AdminAddData = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
    dob: "",
    gender: "",
    address: "",
    city: "",
    pin: "",
    restaurantName: "",
    cuisine: "",
    lat: "",
    lon: "",
    upi: "",
    account_number: "",
    IFSC: "",
    gst: "",
    fssai: "",
    rc: "",
    dl: "",
    uidai: "",
    pan: "",
    isActive: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          lat: position.coords.latitude.toString(),
          lon: position.coords.longitude.toString(),
        }));

        toast.success("Location updated successfully");
      },
      (error) => {
        console.error("Geolocation error:", error);

        toast.error(
          error.code === 1
            ? "Location permission denied"
            : "Unable to fetch your location",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.email === "admin@gmail.com") {
      return toast.error("Dummy Admin cannot add users.");
    }

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        pin: formData.pin,

        restaurantName:
          formData.role === "manager" ? formData.restaurantName : null,

        cuisine: formData.role === "manager" ? formData.cuisine : null,

        isActive: formData.isActive || "active",
        geolocation: {
          lat: formData.lat || "",
          lon: formData.lon || "",
        },
        paymentDetail: {
          upi: formData.upi || "",
          account_number: formData.account_number || "",
          IFSC: formData.IFSC || "",
        },
        document: {
          gst: formData.gst || "",
          fssai: formData.fssai || "",
          rc: formData.rc || "",
          dl: formData.dl || "",
          uidai: formData.uidai || "",
          pan: formData.pan || "",
        },
      };

      console.log("Sending Payload:", payload);
      const res = await api.post("/admin/add-user", payload);
      toast.success(res.data.message || "User added successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to add user");
    }
  };
  const roleOptions = [
    {
      value: "customer",
      label: "Customer",
      icon: FaUser,
    },
    {
      value: "manager",
      label: "Restaurant",
      icon: FaStore,
    },
    {
      value: "partner",
      label: "Delivery Partner",
      icon: FaMotorcycle,
    },
  ];

  return (
    <section>
      {/* Header */}

      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-dashed border-[#1F1811]/20 pb-5">
        <div>
          <h1 className="font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
            Add New User
          </h1>

          <p className="mt-2 text-sm text-[#8A7C6A]">
            Create a customer, restaurant or delivery partner account.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 bg-[#1F1811] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-[#FBF3E7]"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white p-5 shadow-[0_12px_30px_-18px_rgba(31,24,17,0.3)]"
      >
        {/* Role */}

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
            Select Role
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {roleOptions.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleRoleChange(item.value)}
                  className={`flex cursor-pointer items-center gap-3 p-4 text-left transition ${
                    formData.role === item.value
                      ? "bg-[#1F1811] text-[#FBF3E7]"
                      : "bg-[#FBF3E7] text-[#1F1811]"
                  }`}
                >
                  <Icon />

                  <span className="text-sm font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Basic Information */}

        <div className="mt-6">
          <h2 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
            Basic Information
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            >
              <option value="">Select Gender</option>

              <option value="male">Male</option>

              <option value="female">Female</option>

              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Address */}

        <div className="mt-6">
          <h2 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
            Address
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />

            <input
              type="text"
              name="pin"
              placeholder="PIN Code"
              value={formData.pin}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />
          </div>
        </div>

        {/* Restaurant Details */}

        {formData.role === "manager" && (
          <div className="mt-6">
            <h2 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
              Restaurant Details
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="restaurantName"
                placeholder="Restaurant Name"
                value={formData.restaurantName}
                onChange={handleChange}
                className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
              />

              <input
                type="text"
                name="cuisine"
                placeholder="Cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
              />

              <input
                type="text"
                name="gst"
                placeholder="GST Number"
                value={formData.gst}
                onChange={handleChange}
                className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
              />

              <input
                type="text"
                name="fssai"
                placeholder="FSSAI Number"
                value={formData.fssai}
                onChange={handleChange}
                className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>
        )}

        {/* Delivery Partner Details */}

        {formData.role === "partner" && (
          <div className="mt-6">
            <h2 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
              Delivery Partner Details
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="rc"
                placeholder="Vehicle RC Number"
                value={formData.rc}
                onChange={handleChange}
                className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
              />

              <input
                type="text"
                name="dl"
                placeholder="Driving License Number"
                value={formData.dl}
                onChange={handleChange}
                className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
              />

              <input
                type="text"
                name="uidai"
                placeholder="UIDAI Number"
                value={formData.uidai}
                onChange={handleChange}
                className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
              />

              <input
                type="text"
                name="pan"
                placeholder="PAN Number"
                value={formData.pan}
                onChange={handleChange}
                className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>
        )}

        {/* Location */}

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
              Location
            </h2>

            <button
              type="button"
              onClick={handleGetLocation}
              className="flex cursor-pointer items-center gap-2 bg-[#1F1811] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#FBF3E7] transition-opacity hover:opacity-90"
            >
              <FaArrowRotateRight />
              Refresh Location
            </button>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="lat"
              placeholder="Latitude"
              value={formData.lat}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />

            <input
              type="text"
              name="lon"
              placeholder="Longitude"
              value={formData.lon}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />
          </div>
        </div>

        {/* Payment */}

        <div className="mt-6">
          <h2 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
            Payment Details
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <input
              type="text"
              name="upi"
              placeholder="UPI ID"
              value={formData.upi}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />

            <input
              type="text"
              name="account_number"
              placeholder="Account Number"
              value={formData.account_number}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />

            <input
              type="text"
              name="IFSC"
              placeholder="IFSC Code"
              value={formData.IFSC}
              onChange={handleChange}
              className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
            />
          </div>
        </div>

        {/* Status */}

        <div className="mt-6">
          <select
            name="isActive"
            value={formData.isActive}
            onChange={handleChange}
            className="bg-[#FBF3E7] px-4 py-3 text-sm outline-none"
          >
            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Submit */}

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex cursor-pointer items-center gap-2 bg-[#E8491D] px-5 py-3 text-sm font-bold text-[#FBF3E7] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaPlus />

            {loading
              ? "Adding..."
              : `Add ${
                  formData.role === "manager"
                    ? "Restaurant"
                    : formData.role === "partner"
                      ? "Delivery Partner"
                      : "Customer"
                }`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminAddData;
