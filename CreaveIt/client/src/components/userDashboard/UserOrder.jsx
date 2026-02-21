import React, { useEffect } from "react";
import toast from "react-hot-toast";

const UserOrder = () => {
  const fetchedAllPlacedOrder = async () => {
    try {
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  useEffect(() => {
    fetchedAllPlacedOrder;
  }, []);
  return <div>UserOrder</div>;
};

export default UserOrder;
