import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/images/airbnb_large_logo.png";
import hamburger from "../assets/images/hamburger.png";
import userpic from "../assets/images/user_icon.png";
import search from "../assets/images/search.png";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

const Navbar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useContext(UserContext);

  // 1. Create a ref for the profile menu container
  const menuRef = useRef(null);

  // 2. Add event listener to detect clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={"/"} className="flex-shrink-0 flex items-center">
            <img src={logo} alt="Airbnb" className="w-24" />
          </Link>

          {/* Search Bar - Center */}
          <div className="hidden md:flex items-center justify-center flex-1 ">
            <div
              className={`${isSearchActive ? "w-full max-w-md" : "w-auto"} transition-all duration-300`}
            >
              <div className="bg-white border relative border-gray-300 rounded-full shadow-md p-3 flex items-center hover:shadow-lg transition-shadow">
                <div className="border-r border-gray-300 px-2">Anywhere</div>
                <div className="border-r border-gray-300 px-2 ">Any Week</div>
                <input
                  type="text"
                  placeholder={
                    isSearchActive ? "Where are you going?" : "Add guests"
                  }
                  className="ml-3 outline-none text-sm w-40 placeholder-gray-400"
                  onFocus={() => setIsSearchActive(true)}
                  onBlur={() => setIsSearchActive(false)}
                />
                <div className="w-8 h-8 absolute right-3 cursor-pointer bg-[#ff595f] flex justify-center items-center rounded-full">
                  <img src={search} className="w-5 h-5" alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            {/* Become Host */}
            {/* <button className='hidden cursor-pointer sm:block text-gray-700 text-sm font-medium hover:bg-gray-100 px-4 py-2 rounded-full transition'>
              Become a host
            </button> */}

            {/* Language/Currency */}
            {/* <button className='hidden cursor-pointer sm:block p-2 text-gray-700 hover:bg-gray-100 rounded-full transition'>
              <img src={language} className='' alt="" />
            </button> */}

            {/* Profile Menu */}
            <div className="relative" ref={menuRef}>
              <div className="flex items-center cursor-pointer space-x-2 border border-gray-300 rounded-full py-2 px-4 hover:shadow-md transition">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className=""
                >
                  <img src={hamburger} className="cursor-pointer" alt="" />
                  {/* <Link to={user ? "/account" : "/auth/signin"}>
                  <div className="flex flex-row gap-1">
                  <img src={userpic} className="cursor-pointer" alt="" />
                  {!!user && <div>{user.name}</div>}
                  </div>
                  </Link> */}
                </button>
                <div className="border-l border-gray-400 h-5"></div>
                <Link to={user ? "/account" : "/auth/signin"}>
                  <div className="flex flex-row gap-1">
                    <img src={userpic} className="cursor-pointer" alt="" />
                    {!!user && <div>{user.name}</div>}
                  </div>
                </Link>
              </div>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 py-1">
                  {!user ? (
                    <>
                      <Link
                        to="/auth/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Up
                      </Link>
                      <Link
                        to="/auth/signin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log In
                      </Link>
                      <hr className="my-1" />
                    </>
                  ) : (
                    <div>
                    </div>
                  )}
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Become a host
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Help center
                  </a>
                </div>
              )}
            </div>
            {/* {!!user && (
              <div>
                {user.name}
              </div>
            )} */}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="bg-gray-50 rounded-full px-4 py-2 flex items-center">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Where are you going?"
              className="ml-2 outline-none text-sm bg-transparent w-full placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
