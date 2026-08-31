// import React, { useEffect, useState } from "react";
// import api from "../../config/Api";
// import toast from "react-hot-toast";
// import Loading from "../Loading";
// import ViewReceivedOrder from "./modals/ViewRecievedOrder";

// const RestaurantOrder = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [orders, setOrders] = useState();
//   const [refresh, setRefresh] = useState(true);
//   const [isViewingOrder, setIsViewingOrder] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const fetchPlacedOrders = async () => {
//     setIsLoading(true);
//     try {
//       const res = await api.get("/restaurant/placedOrders");
//       setOrders(res.data.data);
//       toast.success(res.data.message);
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Failed to fetch orders");
//     } finally {
//       setIsLoading(false);
//       setRefresh(false);
//     }
//   };

//   useEffect(() => {
//     console.log("Fetching Placed Orders...");
//     console.log({ refresh, isViewingOrder });

//     if (refresh || !isViewingOrder) {
//       fetchPlacedOrders();
//     }
//   }, [refresh, isViewingOrder]);

//   if (isLoading) {
//     return (
//       <div className="w-full">
//         <Loading />
//       </div>
//     );
//   }

//   // console.log(orders);

//   return (
//     <>
//       <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto">
//         <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Orders</h2>
//             <button
//               onClick={() => setRefresh(!refresh)}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={isLoading}
//             >
//               Refresh Orders
//             </button>
//           </div>
//           <div className="border mt-3" />

//           {!orders || orders.length === 0 ? (
//             <div className="text-center text-gray-500 py-12">
//               <p className="text-lg">No orders placed yet</p>
//             </div>
//           ) : (
//             <div className="mt-6 overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100 border-b-2 border-gray-300">
//                     <th className="text-left px-4 py-3 font-semibold text-gray-700">
//                       Order Number
//                     </th>
//                     <th className="text-left px-4 py-3 font-semibold text-gray-700">
//                       Customer
//                     </th>
//                     <th className="text-left px-4 py-3 font-semibold text-gray-700">
//                       Status
//                     </th>
//                     <th className="text-left px-4 py-3 font-semibold text-gray-700">
//                       Total Amount
//                     </th>
//                     <th className="text-left px-4 py-3 font-semibold text-gray-700">
//                       Items
//                     </th>
//                     <th className="text-left px-4 py-3 font-semibold text-gray-700">
//                       Date
//                     </th>
//                     <th className="text-left px-4 py-3 font-semibold text-gray-700">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((order, idx) => (
//                     <tr
//                       key={idx}
//                       className="border-b border-gray-200 hover:bg-gray-50 transition"
//                     >
//                       <td className="px-4 py-3 text-gray-800 font-medium">
//                         {order.orderNumber || order._id?.substring(0, 8)}
//                       </td>
//                       <td className="px-4 py-3 text-gray-700">
//                         {order.userId?.fullName || "Unknown"}
//                       </td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                             order.status === "completed"
//                               ? "bg-green-100 text-green-800"
//                               : order.status === "cancelled"
//                                 ? "bg-red-100 text-red-800"
//                                 : order.status === "pending"
//                                   ? "bg-yellow-100 text-yellow-800"
//                                   : "bg-blue-100 text-blue-800"
//                           }`}
//                         >
//                           {order.status || "Pending"}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-gray-800 font-semibold">
//                         ₹{order.orderValue.total || 0}
//                       </td>
//                       <td className="px-4 py-3 text-gray-600">
//                         {order.items?.length || 0} item
//                         {order.items?.length !== 1 ? "s" : ""}
//                       </td>
//                       <td className="px-4 py-3 text-gray-600">
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="ps-4 py-3 text-gray-600">
//                         <button
//                           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
//                           onClick={() => {
//                             setSelectedOrder(order);
//                             setIsViewingOrder(true);
//                           }}
//                         >
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {isViewingOrder && selectedOrder && (
//         <ViewReceivedOrder
//           order={selectedOrder}
//           onClose={() => setIsViewingOrder(false)}
//         />
//       )}
//     </>
//   );
// };
// export default RestaurantOrder;

import React, { useEffect, useState } from "react";
import api from "../../config/Api";
import toast from "react-hot-toast";
import Loading from "../Loading";
import ViewReceivedOrder from "./modals/ViewRecievedOrder";
import { FaRotateRight, FaClipboardList, FaEye } from "react-icons/fa6";

const RestaurantOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isViewingOrder, setIsViewingOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const fetchPlacedOrders = async (showToast = false) => {
    setIsLoading(true);

    try {
      const res = await api.get("/restaurant/placedOrders");
      setOrders(res.data.data || []);
      if (showToast) {
        toast.success(res.data.message || "Orders refreshed successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacedOrders();
  }, []);

  const handleRefresh = () => {
    fetchPlacedOrders(true);
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "accepted":
      case "preparing":
      case "ready":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading && orders.length === 0) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-full bg-[#FBF3E7]">
        <div className="mx-auto w-full max-w-7xl">
          {/* Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                Restaurant Management
              </p>

              <h2 className="mt-1 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
                Orders
              </h2>

              <p className="mt-2 text-sm text-[#8A7C6A]">
                Manage and track all incoming customer orders.
              </p>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-5 py-3 text-sm font-bold text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaRotateRight className={isLoading ? "animate-spin" : ""} />

              {isLoading ? "Refreshing..." : "Refresh Orders"}
            </button>
          </div>

          {/* Orders Container */}
          <div className="bg-white">
            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-[#1F1811]/10 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
                  <FaClipboardList />
                </div>

                <div>
                  <h3 className="font-bold text-[#1F1811]">All Orders</h3>

                  <p className="text-xs text-[#8A7C6A]">
                    {orders?.length || 0} total orders
                  </p>
                </div>
              </div>
            </div>

            {!orders || orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex size-16 items-center justify-center bg-[#FBF3E7] text-2xl text-[#E8491D]">
                  <FaClipboardList />
                </div>

                <h3 className="text-lg font-bold text-[#1F1811]">
                  No Orders Yet
                </h3>

                <p className="mt-2 text-sm text-[#8A7C6A]">
                  New customer orders will appear here.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#1F1811]/10 bg-[#1F1811]">
                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#FBF3E7]">
                          Order
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#FBF3E7]">
                          Customer
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#FBF3E7]">
                          Status
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#FBF3E7]">
                          Amount
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#FBF3E7]">
                          Items
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#FBF3E7]">
                          Date
                        </th>

                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#FBF3E7]">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b border-[#1F1811]/10 transition hover:bg-[#FBF3E7]"
                        >
                          <td className="px-5 py-4">
                            <p className="font-bold text-[#1F1811]">
                              #{order.orderNumber || order._id?.substring(0, 8)}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-medium text-[#1F1811]">
                              {order.userId?.fullName || "Unknown"}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-bold capitalize ${getStatusStyle(
                                order.status,
                              )}`}
                            >
                              {order.status || "pending"}
                            </span>
                          </td>

                          <td className="px-5 py-4 font-bold text-[#1F1811]">
                            ₹{order.orderValue?.total || 0}
                          </td>

                          <td className="px-5 py-4 text-sm text-[#8A7C6A]">
                            {order.items?.length || 0} item
                            {order.items?.length !== 1 ? "s" : ""}
                          </td>

                          <td className="px-5 py-4 text-sm text-[#8A7C6A]">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : "-"}
                          </td>

                          <td className="px-5 py-4 text-center">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsViewingOrder(true);
                              }}
                              className="inline-flex cursor-pointer items-center gap-2 bg-[#E8491D] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#C93B16]"
                            >
                              <FaEye />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="divide-y divide-[#1F1811]/10 lg:hidden">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="p-5 transition hover:bg-[#FBF3E7]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-bold text-[#1F1811]">
                            #{order.orderNumber || order._id?.substring(0, 8)}
                          </p>

                          <p className="mt-1 text-sm text-[#8A7C6A]">
                            {order.userId?.fullName || "Unknown"}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 text-[10px] font-bold uppercase ${getStatusStyle(
                            order.status,
                          )}`}
                        >
                          {order.status || "pending"}
                        </span>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                            Amount
                          </p>

                          <p className="mt-1 font-bold text-[#1F1811]">
                            ₹{order.orderValue?.total || 0}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                            Items
                          </p>

                          <p className="mt-1 font-bold text-[#1F1811]">
                            {order.items?.length || 0} Items
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <p className="text-xs text-[#8A7C6A]">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "-"}
                        </p>

                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsViewingOrder(true);
                          }}
                          className="flex cursor-pointer items-center gap-2 bg-[#1F1811] px-4 py-2 text-xs font-bold text-[#FBF3E7]"
                        >
                          <FaEye />
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isViewingOrder && selectedOrder && (
        <ViewReceivedOrder
          order={selectedOrder}
          onClose={() => setIsViewingOrder(false)}
        />
      )}
    </>
  );
};

export default RestaurantOrder;
