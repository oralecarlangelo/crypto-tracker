import React from "react";
import { Outlet } from "react-router-dom";

const Market = () => {
  return (
    <div className="w-full h-screen bg-gray-50">
      <h1 className="p-5 text-5xl font-semibold text-center">Coin Tracker</h1>
      <Outlet />
    </div>
  );
};

export default Market;
