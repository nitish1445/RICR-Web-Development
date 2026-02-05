import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../config/Api";
import AddMenuItemModal from "./modals/AddMenuItemModal";

const RestaurantMenu = () => {
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState();

  const fetchMenuItem = async () => {
    try {
      const res = await api.get("/restaurant/menuItems");
      toast.success(res.data.message);
      setMenuItems(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add menu item");
    }
  };

  useEffect(() => {
    if (!addItemModalOpen) fetchMenuItem();
  }, [addItemModalOpen]);

  return (
    <>
      <div className="p-6 h-full">
        <div className="shadow-md border p-5 rounded-3xl border-gray-300 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-600">
                Menu Management
              </h2>
            </div>
            <div>
              <button
                className="flex gap-2 items-center border-2 py-1 px-4 rounded text-(--color-secondary) cursor-pointer text-md hover:bg-(--color-secondary) hover:border-2 hover:border-(--color-secondary) hover:text-white hover:duration-300 duration-300"
                onClick={() => setAddItemModalOpen(true)}
              >
                <FaPlus /> <span>Add Item</span>
              </button>
            </div>
          </div>
          <div>
            {menuItems && (
              <div>
                {menuItems.map((items, idx) => (
                  <div key={idx}>{items.itemName}</div>
                ))}
                Hi there.,
              </div>
            )}
          </div>
        </div>
      </div>
      {addItemModalOpen && (
        <AddMenuItemModal onClose={() => setAddItemModalOpen(false)} />
      )}
    </>
  );
};

export default RestaurantMenu;
