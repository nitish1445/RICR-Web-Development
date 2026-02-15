import React from "react";
import loadingGif from "../assets/loading-icon.gif";

const Loading = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center ">
        <img src={loadingGif} alt="" />
      </div>
    </>
  );
};

export default Loading;
