import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddMenuItemModal from "../resturantDashboard/modals/AddMenuItemModal";

const ResturantMenu = () => {
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
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
                className="flex gap-2 items-center border-2 py-1 px-4 rounded-2xl text-(--color-secondary) cursor-pointer text-md hover:bg-(--color-secondary) hover:border-2 hover:border-(--color-secondary) hover:text-white hover:duration-300 duration-300"
                onClick={()=>setAddItemModalOpen(true)}
              >
                <FaPlus /> <span>Add Items</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {addItemModalOpen && (
        <AddMenuItemModal onClose={() => setAddItemModalOpen(false)} />
      )}
    </>
  );
};

export default ResturantMenu;
