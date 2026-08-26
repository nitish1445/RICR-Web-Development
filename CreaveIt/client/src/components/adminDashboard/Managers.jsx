import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/Api";
import ManagementTable from "./ManagementTable";
import { useNavigate } from "react-router-dom";

const Managers = () => {
  const navigate = useNavigate();
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const fetchManagers = async (showToast = false) => {
    setLoading(true);

    try {
      const res = await api.get("/admin/managers");

      setManagers(res.data.data || []);

      if (showToast) {
        toast.success("Restaurants refreshed successfully");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch restaurants",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleRefresh = () => {
    fetchManagers(true);
  };

  const handleDelete = async (manager) => {
    const confirmDelete = window.confirm(
      `Delete ${manager?.restaurantName || manager?.fullName}?`,
    );
    if (!confirmDelete) return;
    setDeletingId(manager._id);

    try {
      await api.delete(`/admin/manager/${manager._id}`);
      toast.success("Restaurant manager deleted successfully");
      setManagers((prev) => prev.filter((item) => item._id !== manager._id));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete restaurant manager",
      );
    } finally {
      setDeletingId("");
    }
  };
  const handleCreate = () => {
    navigate("/admin-dashboard/add-user");
  };

  return (
    <ManagementTable
      title="Restaurants"
      description="Manage all restaurant accounts."
      data={managers}
      loading={loading}
      deletingId={deletingId}
      onDelete={handleDelete}
      onRefresh={handleRefresh}
      onCreate={handleCreate}
      type="manager"
    />
  );
};

export default Managers;
