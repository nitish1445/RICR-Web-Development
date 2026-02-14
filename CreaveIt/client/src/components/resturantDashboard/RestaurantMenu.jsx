import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../config/Api";
import AddMenuItemModal from "./modals/AddMenuItemModal";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FiEdit, FiEye } from "react-icons/fi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import ViewItemModal from "./modals/ViewItemModal";
import EditItemModal from "./modals/EditItemModal";

const RestaurantMenu = () => {
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  let [selectedItem, setSelectedItem] = useState();

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
  }, [addItemModalOpen, isEditItemModalOpen]);

  return (
    <>
      <div className="p-6 h-full overflow-y-auto">
        <div className="shadow-md border px-8 py-6 rounded-3xl border-gray-300 bg-white">
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

          <div className="border mt-3 mb-5" />

          {/* Item table */}

          <div>
            <table className="w-full">
              <thead>
                <tr className="grid grid-cols-8 justify-content-center text-lg bg-(--color-secondary) text-white p-2 rounded-t">
                  <th className="font-semibold">S.No.</th>
                  <th className="font-semibold col-span-2">Item Name</th>
                  <th className="font-semibold">Price</th>
                  <th className="font-semibold">Food Type</th>
                  <th className="font-semibold">Cuisine</th>
                  <th className="font-semibold">Availability</th>
                  <th className="font-semibold">Button</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.length > 0 ? (
                  <div>
                    {menuItems.map((items, idx) => (
                      <div key={idx}>
                        <tr className="grid grid-cols-8 items-center text-center py-1.5 border-b border-gray-300 bg-gray-200/40 ">
                          <td>{idx + 1}</td>
                          <td className="col-span-2 capitalize">{items.itemName}</td>
                          <td className="flex gap-1 justify-center items-center">
                            <MdOutlineCurrencyRupee />
                            {items.price}
                          </td>
                          <td>{items.type.toUpperCase()}</td>
                          <td className="capitalize">{items.cuisine}</td>
                          <td className="flex justify-center items-center ">
                            {items.availability === "available" ? (
                              <FaToggleOn
                                className="text-green-500 text-2xl"
                                title="Available"
                              />
                            ) : items.availability === "unavailable" ? (
                              <FaToggleOff
                                className="text-red-500 text-2xl"
                                title="Unavailable"
                              />
                            ) : (
                              <ImBlocked
                                className="text-black text-xl"
                                title="Removed"
                              />
                            )}
                          </td>
                          <td className="flex justify-center items-center gap-5">
                            <button
                              className="cursor-pointer text-xl text-gray-500 p-2 rounded-full bg-gray-300/60 shadow"
                              onClick={() => {
                                setSelectedItem(items);
                                setIsViewItemModalOpen(true);
                              }}
                            >
                              <FiEye />
                            </button>
                            <button
                              className="cursor-pointer text-xl text-blue-500 p-2 rounded-full bg-gray-300/50 shadow"
                              onClick={() => {
                                setSelectedItem(items);
                                setIsEditItemModalOpen(true);
                              }}
                            >
                              <FiEdit />
                            </button>
                          </td>
                        </tr>
                      </div>
                    ))}
                  </div>
                ) : (
                  <tr className="text-center pt-5">There is no Menu Item.</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {addItemModalOpen && (
        <AddMenuItemModal onClose={() => setAddItemModalOpen(false)} />
      )}
      {isViewItemModalOpen && (
        <ViewItemModal
          onClose={() => setIsViewItemModalOpen(false)}
          selectedItem={selectedItem}
        />
      )}
      {isEditItemModalOpen && (
        <EditItemModal
          onClose={() => setIsEditItemModalOpen(false)}
          selectedItem={selectedItem}
        />
      )}
    </>
  );
};

export default RestaurantMenu;
