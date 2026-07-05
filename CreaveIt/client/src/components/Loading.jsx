import React from "react";
import loadingGif from "../assets/loading-icon.gif";

const Loading = () => {
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <img
          src={loadingGif}
          alt="loading"
          className="w-32 sm:w-40 md:w-48"
        />
      </div>
    </>
  );
};

export default Loading;
