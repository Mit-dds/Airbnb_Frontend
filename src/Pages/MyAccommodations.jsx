import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import add from "../assets/images/add.png";

const MyAccommodations = () => {
  const { action } = useParams();

  if (action !== "new") {
    return (
      <div className="my-10">
        <div className="flex flex-row justify-center items-center text-center">
          <Link className="flex flex-row items-center transition-colors duration-200 bg-rose-400 hover:bg-rose-500 py-3 px-4 text-sm gap-1 rounded-4xl">
            <img src={add} className="h-5 w-5" alt="" />
            <p className=" text-white">Add New Place</p>
          </Link>
        </div>
        {/* <Outlet/> */}
      </div>
    );
  }

  if (action === "new") {
    return (
      <div className="my-10">
        <h1 className="text-center text-2xl font-semibold my-10">
          Add New Place
        </h1>
        <div className="flex justify-center align-middle max-w-2xl mx-auto">
          <form className="max-w-4xl mx-auto p-8 border border-gray-300 bg-white rounded-4xl shadow-lg space-y-6">
            {/* Title */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Title
              </label>
              <input
                type="text"
                placeholder="Title"
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Address
              </label>
              <input
                type="text"
                placeholder="Address"
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            {/* Photos */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Photos
              </label>
              <input
                type="file"
                multiple
                accept=".jpg, .jpeg, .png, .image/jpeg, image/png"
                className="p-2 border text-[#b1b09c] border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300 file:mr-4 file:py-2 file:px-4 
                 file:rounded-lg file:border-0 
                 file:text-sm file:font-semibold 
                 file:bg-rose-50 file:text-rose-500 file:cursor-pointer  
                 hover:file:bg-rose-100 "
              />
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Description"
                rows="4"
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            {/* Perks */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Perks
              </label>
              <input
                type="text"
                placeholder="Perks"
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            {/* Extra Info */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Extra Info
              </label>
              <input
                type="text"
                placeholder="Extra Info"
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            {/* Check-in / Check-out / Max Guests */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col space-y-2 flex-1">
                <label className="text-sm font-semibold text-gray-700">
                  Check In
                </label>
                <input
                  type="number"
                  placeholder="14"
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>

              <div className="flex flex-col space-y-2 flex-1">
                <label className="text-sm font-semibold text-gray-700">
                  Check Out
                </label>
                <input
                  type="number"
                  placeholder="11"
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>

              <div className="flex flex-col space-y-2 flex-1">
                <label className="text-sm font-semibold text-gray-700">
                  Max Guests
                </label>
                <input
                  type="number"
                  placeholder="2"
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-rose-400 text-white py-3 rounded-2xl cursor-pointer font-semibold hover:bg-rose-500 transition duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default MyAccommodations;
