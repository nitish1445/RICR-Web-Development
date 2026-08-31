import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaRotateRight,
  FaUtensils,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa6";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FiEdit, FiEye } from "react-icons/fi";
import { ImBlocked } from "react-icons/im";
import toast from "react-hot-toast";
import api from "../../config/Api";
import AddMenuItemModal from "./modals/AddMenuItemModal";
import ViewItemModal from "./modals/ViewItemModal";
import EditItemModal from "./modals/EditItemModal";

const RestaurantMenu = () => {
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMenuItem = async (showToast = false) => {
    try {
      if (showToast) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const res = await api.get("/restaurant/menuItems");
      setMenuItems(res?.data?.data || []);
      if (showToast) {
        toast.success(res?.data?.message || "Menu refreshed successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch menu items",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMenuItem();
  }, []);

  // Refresh menu after Add/Edit modal closes
  // useEffect(() => {
  //   if (!addItemModalOpen && !isEditItemModalOpen) {
  //     fetchMenuItem();
  //   }
  // }, [addItemModalOpen, isEditItemModalOpen]);

  const getAvailabilityStyle = (availability) => {
    if (availability === "available") {
      return "bg-[#6B8E4E]/15 text-[#6B8E4E]";
    }
    if (availability === "unavailable") {
      return "bg-[#E8491D]/10 text-[#E8491D]";
    }
    return "bg-[#1F1811]/10 text-[#5F5143]";
  };

  const getItemImage = (item) => {
    return item?.images?.[0]?.url || "";
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="size-8 animate-spin rounded-full border-2 border-[#E8491D] border-t-transparent" />
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#8A7C6A]">
            Loading Menu...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-full bg-[#FBF3E7]">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              Restaurant Management
            </p>
            <h1 className="mt-1 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
              Menu
            </h1>
            <p className="mt-2 text-sm text-[#8A7C6A]">
              Manage your food items, pricing and availability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Refresh */}
            <button
              type="button"
              onClick={() => fetchMenuItem(true)}
              disabled={refreshing}
              className="flex cursor-pointer items-center justify-center gap-2 bg-[#1F1811] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#E8491D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaRotateRight className={refreshing ? "animate-spin" : ""} />

              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            {/* Add Item */}
            <button
              type="button"
              onClick={() => setAddItemModalOpen(true)}
              className="flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#C93B16]"
            >
              <FaPlus />
              Add Item
            </button>
          </div>
        </div>

        {/* Menu Count */}
        <div className="mb-5 flex items-center gap-3 bg-[#1F1811] px-5 py-4">
          <div className="flex size-10 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
            <FaUtensils />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
              Total Menu Items
            </p>
            <p className="text-xl font-bold text-[#FBF3E7]">
              {menuItems.length}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {menuItems.length === 0 ? (
          <div className="flex min-h-105 flex-col items-center justify-center bg-white px-6 text-center">
            <div className="flex size-16 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
              <FaUtensils className="text-2xl" />
            </div>
            <h2 className="mt-5 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
              No Menu Items
            </h2>
            <p className="mt-2 max-w-sm text-sm text-[#8A7C6A]">
              Start building your restaurant menu by adding your first food
              item.
            </p>

            <button
              type="button"
              onClick={() => setAddItemModalOpen(true)}
              className="mt-5 flex cursor-pointer items-center gap-2 bg-[#E8491D] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]"
            >
              <FaPlus />
              Add Your First Item
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto bg-white lg:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1F1811]">
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]">
                      #
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]">
                      Item
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]">
                      Price
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]">
                      Type
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]">
                      Cuisine
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]">
                      Status
                    </th>
                    <th className="px-5 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {menuItems.map((item, idx) => {
                    const image = getItemImage(item);
                    return (
                      <tr
                        key={item?._id || idx}
                        className="border-b border-[#1F1811]/10 transition hover:bg-[#FBF3E7]"
                      >
                        {/* Number */}
                        <td className="px-5 py-4 text-sm font-bold text-[#8A7C6A]">
                          {String(idx + 1).padStart(2, "0")}
                        </td>

                        {/* Item */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden bg-[#FBF3E7] text-[#E8491D]">
                              {image ? (
                                <img
                                  src={image}
                                  alt={item?.itemName}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              ) : (
                                <FaUtensils />
                              )}
                            </div>

                            <div>
                              <p className="font-bold capitalize text-[#1F1811]">
                                {item?.itemName}
                              </p>
                              <p className="mt-1 max-w-45 truncate text-[10px] text-[#8A7C6A]">
                                {item?.servingSize || "Standard serving"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 font-bold text-[#1F1811]">
                            <MdOutlineCurrencyRupee />
                            {item?.price || 0}
                          </div>
                        </td>

                        {/* Food Type */}
                        <td className="px-5 py-4">
                          <span className="bg-[#1F1811]/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#5F5143]">
                            {item?.type || "N/A"}
                          </span>
                        </td>

                        {/* Cuisine */}
                        <td className="px-5 py-4">
                          <p className="capitalize text-sm font-medium text-[#5F5143]">
                            {item?.cuisine || "N/A"}
                          </p>
                        </td>

                        {/* Availability */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {item?.availability === "available" ? (
                              <FaToggleOn className="text-lg text-[#6B8E4E]" />
                            ) : item?.availability === "unavailable" ? (
                              <FaToggleOff className="text-lg text-[#E8491D]" />
                            ) : (
                              <ImBlocked className="text-sm text-[#5F5143]" />
                            )}

                            <span
                              className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider ${getAvailabilityStyle(
                                item?.availability,
                              )}`}
                            >
                              {item?.availability || "Unknown"}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              title="View Item"
                              onClick={() => {
                                setSelectedItem(item);
                                setIsViewItemModalOpen(true);
                              }}
                              className="flex size-9 cursor-pointer items-center justify-center bg-[#1F1811]/10 text-[#1F1811] transition hover:bg-[#1F1811] hover:text-[#FBF3E7]"
                            >
                              <FiEye />
                            </button>

                            <button
                              type="button"
                              title="Edit Item"
                              onClick={() => {
                                setSelectedItem(item);
                                setIsEditItemModalOpen(true);
                              }}
                              className="flex size-9 cursor-pointer items-center justify-center bg-[#E8491D]/10 text-[#E8491D] transition hover:bg-[#E8491D] hover:text-[#FBF3E7]"
                            >
                              <FiEdit />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 lg:hidden">
              {menuItems.map((item, idx) => {
                const image = getItemImage(item);
                return (
                  <div key={item?._id || idx} className="bg-white p-5">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden bg-[#FBF3E7] text-[#E8491D]">
                        {image ? (
                          <img
                            src={image}
                            alt={item?.itemName}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <FaUtensils className="text-xl" />
                        )}
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                              Item {String(idx + 1).padStart(2, "0")}
                            </p>
                            <h3 className="mt-1 truncate font-bold capitalize text-[#1F1811]">
                              {item?.itemName}
                            </h3>
                          </div>
                          <span
                            className={`shrink-0 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider ${getAvailabilityStyle(
                              item?.availability,
                            )}`}
                          >
                            {item?.availability}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="bg-[#1F1811]/5 px-2 py-1 text-[9px] font-bold uppercase text-[#5F5143]">
                            {item?.type}
                          </span>
                          <span className="text-xs capitalize text-[#8A7C6A]">
                            {item?.cuisine}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-4 flex items-center justify-between border-t border-[#1F1811]/10 pt-4">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                          Price
                        </p>
                        <p className="mt-1 flex items-center font-bold text-[#1F1811]">
                          <MdOutlineCurrencyRupee />
                          {item?.price || 0}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsViewItemModalOpen(true);
                          }}
                          className="flex size-9 cursor-pointer items-center justify-center bg-[#1F1811] text-[#FBF3E7]"
                        >
                          <FiEye />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsEditItemModalOpen(true);
                          }}
                          className="flex size-9 cursor-pointer items-center justify-center bg-[#E8491D] text-[#FBF3E7]"
                        >
                          <FiEdit />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Add Item Modal */}
      {addItemModalOpen && (
        <AddMenuItemModal onClose={() => setAddItemModalOpen(false)} />
      )}

      {/* View Item Modal */}
      {isViewItemModalOpen && selectedItem && (
        <ViewItemModal
          onClose={() => {
            setIsViewItemModalOpen(false);
            setSelectedItem(null);
          }}
          selectedItem={selectedItem}
        />
      )}

      {/* Edit Item Modal */}
      {isEditItemModalOpen && selectedItem && (
        <EditItemModal
          onClose={() => {
            setIsEditItemModalOpen(false);
            setSelectedItem(null);
          }}
          selectedItem={selectedItem}
        />
      )}
    </>
  );
};

export default RestaurantMenu;
