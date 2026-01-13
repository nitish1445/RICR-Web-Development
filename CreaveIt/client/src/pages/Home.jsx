import React from "react";

const Home = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl text-amber-500 font-bold">Welcome,</h1>
        <h4 className="font-semibold text-2xl text-red-300">Nitish Kumar</h4>
        <div className="text-extrabold text-2xl text-(--color-primary)">
          Crave<span className="text-xl text-(--color-accent)">It</span> -
          We food you on demand.
        </div>
      </div>
    </>
  );
};

export default Home;
