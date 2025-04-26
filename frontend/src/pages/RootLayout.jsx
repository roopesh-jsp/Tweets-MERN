import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Protection from "../Protection";

function RootLayout() {
  return (
    <div>
      <Protection>
        <Navbar />
      </Protection>
      <Outlet />
    </div>
  );
}

export default RootLayout;
