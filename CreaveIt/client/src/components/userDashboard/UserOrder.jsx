// import React, { useEffect, useState } from "react";
// import api from "../../config/Api";
// import toast from "react-hot-toast";
// import Loading from "../Loading";

// const UserOrder = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [orders, setOrders] = useState();

//   const fetchAllPlacedOrder = async () => {
//     setIsLoading(true);
//     console.log("Fetching User Placed Orders...");
//     try {
//       const res = await api.get("/user/placedorders");
//       setOrders(res.data.data);
//       toast.success(res.data.message);
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Unknown Error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllPlacedOrder();
//     // const interval = setInterval(() => {
//     //   fetchAllPlacedOrder();
//     // }, 1000 * 10); // Refresh every 1 minutes
//     // return () => clearInterval(interval);
//   }, []);

//   // if (isLoading) {
//   //   return (
//   //     <div className="w-full">
//   //       <Loading />
//   //     </div>
//   //   );
//   // }
//   return (
//     <>
//       <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto">
//         <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Orders</h2>
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
//                       <td className="px-4 py-3">
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
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
//                         ₹ {order.orderValue.total.toFixed(2) || 0}
//                       </td>
//                       <td className="px-4 py-3 text-gray-600">
//                         {order.items?.length || 0} item
//                         {order.items?.length !== 1 ? "s" : ""}
//                       </td>
//                       <td className="px-4 py-3 text-gray-600">
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="ps-4 py-3 text-gray-600">
//                         <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
//                           Track Order
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
//       );
//     </>
//   );
// };

// export default UserOrder;

import React from "react";

import { FaBagShopping, FaArrowRight, FaClock, FaCheck } from "react-icons/fa6";

const MyOrders = () => {
  // Dummy data
  const orders = [
    {
      id: "#CRV-1024",
      restaurant: "Burger House",
      items: "Classic Burger, French Fries",
      total: "₹420",
      status: "Delivered",
      date: "Today",
    },
    {
      id: "#CRV-1023",
      restaurant: "Pizza Corner",
      items: "Margherita Pizza, Garlic Bread",
      total: "₹680",
      status: "On The Way",
      date: "Yesterday",
    },
    {
      id: "#CRV-1022",
      restaurant: "Spice Kitchen",
      items: "Paneer Butter Masala",
      total: "₹250",
      status: "Delivered",
      date: "20 Aug, 2026",
    },
  ];

  return (
    <main>
      {/* Header */}
      <section>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
          Order Management
        </p>

        <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
              My Orders
            </h1>

            <p className="mt-2 text-sm text-[#8A7C6A]">
              Track and manage all your food orders.
            </p>
          </div>

          <span className="text-xs font-bold text-[#8A7C6A]">
            {orders.length} Total Orders
          </span>
        </div>
      </section>

      {/* Orders */}
      <section className="mt-6 bg-white">
        {orders.map((order) => {
          const delivered = order.status === "Delivered";

          return (
            <div
              key={order.id}
              className="flex flex-col gap-5 border-b border-dashed border-[#1F1811]/10 p-5 last:border-none sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                  <FaBagShopping />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-bold text-[#1F1811]">
                      {order.restaurant}
                    </h3>

                    <span
                      className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${
                        delivered ? "text-[#6B8E4E]" : "text-[#D9952B]"
                      }`}
                    >
                      {delivered ? <FaCheck /> : <FaClock />}
                      {order.status}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-[#8A7C6A]">{order.items}</p>

                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                    {order.id} • {order.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 sm:block sm:text-right">
                <p className="font-bold text-[#1F1811]">{order.total}</p>

                <button
                  type="button"
                  className="mt-2 inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-[#E8491D]"
                >
                  View Details
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default MyOrders;
