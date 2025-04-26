import React, { useState } from "react";
import { FaPlus, FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Navbar() {
  const [showDropdown, setShowDropDown] = useState(false);
  const { logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="nav_left">Tweetz</h1>
      <div className="nav_right">
        <div className="nav_add_tweet">
          <FaPlus />
        </div>
        <div
          className="nav_profile"
          onMouseOver={() => setShowDropDown(true)}
          onMouseLeave={() => setShowDropDown(false)}
        >
          <div className="nav_profile_user">
            <FaUser />
          </div>
          <div
            className="nav_dropdown"
            style={{
              display: `${showDropdown ? "flex" : "none"}`,
            }}
          >
            <ul>
              <li onClick={() => nav("/profile")}>profile</li>
              <li onClick={logout}>logout</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
