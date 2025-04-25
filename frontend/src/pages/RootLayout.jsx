import React from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <nav>navBar</nav>
      <Outlet />
    </div>
  );
}

export default RootLayout;
