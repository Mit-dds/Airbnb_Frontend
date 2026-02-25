import React, { useContext } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
// import profile from "../assets/images/Account.jsx/index.js";
import { Account } from "../assets/images/Account.jsx";
import { Bookings } from "../assets/images/Bookings.jsx";
import { Accommodation } from "../assets/images/Accommodation.jsx";
import "../index.css";

const AccountLayout = () => {
  const { ready, user } = useContext(UserContext);

  const baseclasses =
    "py-3 px-5 text-sm rounded-full flex flex-row items-center gap-2 border transition-colors duration-200";
  const navLinkClasses = ({ isActive }) =>
    `${baseclasses} ${isActive ? "bg-rose-400 text-white border-rose-400" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`;

  if (!ready) {
    return (
      <>
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </>
    );
  }

  if (ready && !user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="py-2">
      <nav className="w-full h-10 flex justify-center items-center my-4 gap-4">
        <NavLink end className={navLinkClasses} to=".">
          <Account className="" height={20} width={20} />
          My Profile
        </NavLink>
        <NavLink className={navLinkClasses} to="bookings">
          {/* <img src={bookings} className="h-5 w-5" alt="Profile" /> */}
          <Bookings className="" height={20} width={20} />
          My Bookings
        </NavLink>
        <NavLink className={navLinkClasses} to="places">
          {/* <img src={accommodations} className="h-5 w-5" alt="Profile" /> */}
          <Accommodation className="" height={20} width={20} />
          My accommodations
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default AccountLayout;
