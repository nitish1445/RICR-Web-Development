import React from "react";

import {
  FaTrash,
  FaArrowRotateRight,
  FaUser,
  FaStore,
  FaMotorcycle,
  FaPlus,
  FaPenToSquare,
} from "react-icons/fa6";

const ManagementTable = ({
  title,
  description,
  data = [],
  loading = false,
  deletingId = null,
  onDelete,
  onRefresh,
  onCreate,
  type = "customer",
}) => {
  const isManager = type === "manager";
  const isPartner = type === "partner";

  const getLoadingText = () => {
    if (isManager) return "Loading restaurants...";
    if (isPartner) return "Loading delivery partners...";

    return "Loading customers...";
  };

  const getEmptyText = () => {
    if (isManager) return "No restaurants available.";
    if (isPartner) return "No delivery partners available.";

    return "No customers available.";
  };

  const getIcon = () => {
    if (isManager) return FaStore;
    if (isPartner) return FaMotorcycle;

    return FaUser;
  };

  const getAddButtonText = () => {
    if (isManager) return "Add Restaurant";
    if (isPartner) return "Add Partner";

    return "Add Customer";
  };

  const UserIcon = getIcon();

  return (
    <section>
      {/* Header */}

      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-dashed border-[#1F1811]/20 pb-5">
        <div>
          <h1 className="font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
            {title}
          </h1>

          <p className="mt-2 text-sm text-[#8A7C6A]">{description}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Button */}

          {onCreate && (
            <button
              type="button"
              onClick={onCreate}
              className="flex cursor-pointer items-center gap-2 bg-[#E8491D] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition-opacity hover:opacity-90"
            >
              <FaPlus />

              {getAddButtonText()}
            </button>
          )}

          {/* Refresh Button */}

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="flex cursor-pointer items-center gap-2 bg-[#1F1811] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaArrowRotateRight className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="mt-5 overflow-x-auto bg-white shadow-[0_12px_30px_-18px_rgba(31,24,17,0.3)]">
        <table className="w-full min-w-225 text-left">
          <thead className="border-b border-[#1F1811]/10 bg-[#1F1811] text-[#FBF3E7]">
            <tr>
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider">
                {isManager
                  ? "Restaurant Name"
                  : isPartner
                    ? "Delivery Partner"
                    : "Customer Name"}
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider">
                Contact Details
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider">
                {isManager
                  ? "Restaurant Details"
                  : isPartner
                    ? "Vehicle / Location"
                    : "Customer Address"}
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider">
                Status
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider">
                Quick Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-5 py-10 text-center text-sm text-[#8A7C6A]"
                >
                  {getLoadingText()}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-5 py-10 text-center text-sm text-[#8A7C6A]"
                >
                  {getEmptyText()}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-dashed border-[#1F1811]/10 last:border-0"
                >
                  {/* User / Restaurant */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden bg-[#1F1811] text-sm font-bold text-[#FBF3E7]">
                        {item?.photo?.url ? (
                          <img
                            src={item.photo.url}
                            alt={
                              isManager
                                ? item.restaurantName || item.fullName
                                : item.fullName
                            }
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          item?.fullName?.charAt(0)?.toUpperCase() || (
                            <UserIcon />
                          )
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#1F1811]">
                          {isManager
                            ? item.restaurantName || "Unnamed Restaurant"
                            : item.fullName || "Unknown User"}
                        </p>

                        <p className="mt-1 text-xs text-[#8A7C6A]">
                          {isManager
                            ? `Manager: ${item.fullName || "N/A"}`
                            : isPartner
                              ? item.gender || "Delivery Partner"
                              : item.gender || "N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}

                  <td className="px-5 py-4">
                    <p className="text-sm text-[#1F1811]">
                      {item.email || "N/A"}
                    </p>

                    <p className="mt-1 text-xs text-[#8A7C6A]">
                      {item.phone || "N/A"}
                    </p>
                  </td>

                  {/* Details */}

                  <td className="px-5 py-4">
                    {isManager ? (
                      <>
                        <p className="text-sm font-medium text-[#1F1811]">
                          {item.cuisine || "Cuisine not available"}
                        </p>

                        <p className="mt-1 text-xs text-[#8A7C6A]">
                          {item.address || "No address"}

                          {item.city && item.city !== "N/A"
                            ? `, ${item.city}`
                            : ""}
                        </p>
                      </>
                    ) : isPartner ? (
                      <>
                        <p className="text-sm font-medium text-[#1F1811]">
                          {item.address || "Location not available"}
                        </p>

                        <p className="mt-1 text-xs text-[#8A7C6A]">
                          {item.city || "N/A"}

                          {item.pin && item.pin !== "N/A"
                            ? ` - ${item.pin}`
                            : ""}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-[#1F1811]">
                          {item.address && item.address !== "N/A"
                            ? item.address
                            : "No address"}
                        </p>

                        {item.city && item.city !== "N/A" && (
                          <p className="mt-1 text-xs text-[#8A7C6A]">
                            {item.city}

                            {item.pin && item.pin !== "N/A"
                              ? ` - ${item.pin}`
                              : ""}
                          </p>
                        )}
                      </>
                    )}
                  </td>

                  {/* Status */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2 rounded-full ${
                          item.isActive === "active"
                            ? "bg-[#6B8E4E]"
                            : "bg-[#E8491D]"
                        }`}
                      />

                      <span
                        className={`text-[10px] font-bold uppercase ${
                          item.isActive === "active"
                            ? "text-[#6B8E4E]"
                            : "text-[#E8491D]"
                        }`}
                      >
                        {item.isActive}
                      </span>
                    </div>
                  </td>

                  {/* Edit And Delete */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        disabled={deletingId === item._id}
                        className="flex h-9 cursor-pointer items-center justify-center gap-2 bg-[#E8491D]/10 px-3 text-xs font-bold text-[#E8491D] transition hover:bg-[#E8491D] hover:text-[#FBF3E7] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <FaTrash />

                        {deletingId === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManagementTable;
