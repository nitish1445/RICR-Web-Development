// import React, { useState } from "react";
// import { GiCancel } from "react-icons/gi";
// import { useAuth } from "../../../context/AuthContext";
// import api from "../../../config/Api";

// const EditProfileModal = ({ onClose }) => {
//   const { user, setUser, setIsLogin } = useAuth();
//   const [formDetail, setFormDetail] = useState({
//     fullName: user.fullName,
//     email: user.email,
//     phone: user.phone,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("form Submitted");
//     console.log(formDetail);

//     try {
//       const res = await api.put("/user/update", formDetail);
//       sessionStorage.setItem("CraveIt", JSON.stringify(res.data.data));
//       setUser(res.data.data);
//       setIsLogin(true);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <>
//       <div className="z-100 fixed inset-50 rounded-2xl w-5xl px-10">
//         <div className="flex justify-between items-center px-5 py-3">
//           <div className="text-xl font-medium">Edit Profile</div>
//           <button
//             className="text-red-600 text-2xl cursor-pointer"
//             onClick={() => onClose()}
//           >
//             <GiCancel />
//           </button>
//         </div>

//         <hr />

//         <div>
//           <div className="px-8 mt-5">
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 {/* Full Name */}

//                 <div className="">
//                   <div>FULL NAME</div>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formDetail.fullName}
//                     onChange={(e) =>
//                       setFormDetail({ ...formDetail, fullName: e.target.value })
//                     }
//                     className="w-full h-fit px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
//                   />
//                 </div>

//                 <div className="">
//                   <div>EMAIL </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formDetail.email}
//                     onChange={(e) =>
//                       setFormDetail({ ...formDetail, email: e.target.value })
//                     }
//                     className="w-full h-fit px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
//                   />
//                 </div>

//                 {/* Phone  */}

//                 <div className="">
//                   <div>PHONE NUMBER</div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     maxLength="10"
//                     value={formDetail.phone}
//                     onChange={(e) =>
//                       setFormDetail({ ...formDetail, phone: e.target.value })
//                     }
//                     className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
//                   />
//                 </div>
//               </div>
//               <div className="px-6 py-6 flex justify-end space-x-4 border-t border-gray-300">
//                 <button
//                   type="button"
//                   onClick={() => onClose()}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditProfileModal;



import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/Api";
import { GiCancel } from "react-icons/gi";

const EditProfileModal = ({ onClose }) => {
  const { user, setUser, setIsLogin } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    gender:user.gender,
    dob:user.dob,
    address:user.address,
    city:user.city,
    pin:user.pin,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form Submitted");
    console.log(formData);

    try {
      const res = await api.put("/user/update", formData);
      console.log("Done");
      sessionStorage.setItem("CraveItUser", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
      // sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100">
        <div className="bg-white w-5xl max-h-[85vh] rounded-md overflow-y-auto">
          <div className="flex justify-between px-5 py-3 border-b border-gray-300 items-center">
            <div>Edit Profile</div>
            <button
              onClick={() => onClose()}
              className="text-red-400 hover:text-red-700 text-2xl cursor-pointer"
            >
              <GiCancel/>
            </button>
          </div>
          
          <div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 cursor-not-allowed "
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    name="dob"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    name="pin"
                    value={formData.pin}
                    onChange={(e) =>
                      setFormData({ ...formData, pin: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>                                
              </div>
              <div className="px-6 py-6 flex justify-end space-x-4 border-t border-gray-300">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="cursor-pointer px-4 py-2 text-(--color-primary) bg-(--color-background) rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 bg-(--color-secondary) text-(--color-text) rounded transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;