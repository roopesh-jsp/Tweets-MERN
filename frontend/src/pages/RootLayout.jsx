import React from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <h1>root</h1>
      <Outlet />
    </div>
  );
}

export default RootLayout;
