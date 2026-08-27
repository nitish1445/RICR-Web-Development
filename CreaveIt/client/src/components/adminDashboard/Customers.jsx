import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../config/Api";
import ManagementTable from "./ManagementTable";
import { useAuth } from "../../context/AuthContext";

const Customers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCustomers = async (showToast = false) => {
    setLoading(true);

    try {
      const res = await api.get("/admin/customers");
      setCustomers(res.data.data || []);
      if (showToast) {
        toast.success("Customers refreshed successfully");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch customers",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleRefresh = () => {
    fetchCustomers(true);
  };

  const handleCreate = () => {
    if (user.email === "admin@gmail.com") {
      return toast.error("Dummy Admin cannot perfom this action.");
    }

    navigate("/admin-dashboard/add-user");
  };

  const handleDelete = async (customer) => {
    if (user.email === "admin@gmail.com") {
      return toast.error("Dummy Admin cannot perfom this action.");
    }

    const confirmDelete = window.confirm(`Delete ${customer.fullName}?`);
    if (!confirmDelete) return;

    setDeletingId(customer._id);

    try {
      await api.delete(`/admin/customer/${customer._id}`);
      setCustomers((prev) => prev.filter((item) => item._id !== customer._id));
      toast.success("Customer deleted successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete customer",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ManagementTable
      title="Customers"
      description="Manage all customer accounts."
      data={customers}
      loading={loading}
      deletingId={deletingId}
      onDelete={handleDelete}
      onRefresh={handleRefresh}
      onCreate={handleCreate}
      type="customer"
    />
  );
};

export default Customers;
