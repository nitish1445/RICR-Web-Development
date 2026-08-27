import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/Api";
import ManagementTable from "./ManagementTable";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Riders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const fetchRider = async (showToast = false) => {
    setLoading(true);

    try {
      const res = await api.get("/admin/riders");
      setRiders(res.data.data || []);
      if (showToast) {
        toast.success("Partners refreshed successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRider();
  }, []);

  const handleRefresh = () => {
    fetchRider(true);
  };

  const handleDelete = async (rider) => {
    if (user.email === "admin@gmail.com") {
      return toast.error("Dummy Admin cannot perfom this action.");
    }

    const confirmDelete = window.confirm(
      `Delete delivery partner ${rider?.fullName}?`,
    );
    if (!confirmDelete) return;
    setDeletingId(rider._id);

    try {
      await api.delete(`/admin/rider/${rider._id}`);
      toast.success("Delivery partner deleted successfully");
      setRiders((prev) => prev.filter((item) => item._id !== rider._id));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete delivery partner",
      );
    } finally {
      setDeletingId("");
    }
  };
  const handleCreate = () => {
    if (user.email === "admin@gmail.com") {
      return toast.error("Dummy Admin cannot perfom this action.");
    }

    navigate("/admin-dashboard/add-user");
  };

  return (
    <ManagementTable
      title="Delivery Partners"
      description="Manage all delivery partner accounts."
      data={riders}
      loading={loading}
      deletingId={deletingId}
      onDelete={handleDelete}
      onRefresh={handleRefresh}
      onCreate={handleCreate}
      type="partner"
    />
  );
};

export default Riders;
