import React, { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import add from "../assets/images/add.png";
import upload from "../assets/images/add_photo.png";
import wifi from "../assets/images/wifi.png";
import parking from "../assets/images/parking.png";
import pool from "../assets/images/pool.png";
import gym from "../assets/images/gym.png";
import tv from "../assets/images/tv.png";
import pets from "../assets/images/pets.png";
import axios from "axios";

const MyAccommodations = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [addPhoto, setAddPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);


  const BASE_URL = import.meta.env.VITE_BASE_URL;

  function inputHandler(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-2xl mt-4">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHandler(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post(`${BASE_URL}/upload-by-link`, {
      link: photoLink,
    });
    setAddPhoto((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
    console.log("clicked!");
  }

  function handleCbClick(e) {
    const { checked, name } = e.target;
    if (checked) {
      setSelectedPerks([...selectedPerks, name]);
    } else {
      setSelectedPerks(selectedPerks.filter((selectedName) => selectedName !== name));
    }
  }

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    // for(const file of files){
    //   data.set('photos',file);
    // }
    for(let i = 0; i < files.length; i++){
      data.append('photos', files[i]);
    }
    try{
      const res = await axios.post(`${BASE_URL}/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setAddPhoto((prev) => [...prev, ...res.data]);
    }
    catch (err) {
    console.error(err);
  }
    
    // axios.post(`${BASE_URL}/upload`, data, {
    //   headers: {'Content-type':'multipart/form-data'}
    // }).then(response => {
    //   console.log(response);
    //   const {data:filenames} = response;
    //   setAddPhoto(prev => {
    //     return [...prev, ...filenames];
    //   });
    // })
    // console.log({files});
  }


  const perks = [
    { name: "Wifi", logo: wifi },
    { name: "Parking", logo: parking },
    { name: "Pool", logo: pool },
    { name: "Gym", logo: gym },
    { name: "Tv", logo: tv },
    { name: "Pets Allowed", logo: pets },
  ];

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
        <div className="flex justify-center align-middle max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
          <form className=" w-full mx-auto p-8 border border-gray-300 bg-white rounded-4xl shadow-lg space-y-6">
            {/* Title */}
            {/* {preInput('Title', 'Title for your place.')} */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Title
              </label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            {/* Photos */}
            {/* <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Photos
              </label>
              <input
                type="file"
                multiple
                accept=".jpg, .jpeg, .png, .image/jpeg, image/png"
                className="p-2 border text-[#b1b09c] border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold  file:bg-rose-50 file:text-rose-500 file:cursor-pointer hover:file:bg-rose-100 "
              />
            </div> */}

            {/* Photos */}
            <div className=" relative flex flex-col space-y-2 ">
              <label className="text-sm font-semibold text-gray-700">
                Photos
              </label>
              <div className="flex flex-row gap-5">
                <input
                  type="text"
                  value={photoLink}
                  onChange={(e) => setPhotoLink(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300 "
                  placeholder="Photo URL"
                  id=""
                />
                <button
                  onClick={addPhotoByLink}
                  className=" cursor-pointer px-6 w-40 hover:bg-rose-50 bg-rose-100 text-rose-500 rounded-xl "
                >
                  Add Photo
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-3 items-center">
              {addPhoto.length > 0 &&
                addPhoto.map((link, index) => 
                  <div key={index}>
                    <img className="w-[102.5px] h-24 rounded-3xl" src={`${BASE_URL}/uploads/`+link} alt="" />
                  </div>
                )}
              <label
                // value={addPhoto}
                // onChange={e => setAddPhoto(e.target.value)}
                className=" flex flex-col items-center justify-center p-[25px] rounded-3xl border border-[#dad8c1] text-[#47473f] cursor-pointer "
              >
                <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                <img src={upload} className="w-5 h-5 opacity-70 " alt="" />
                Upload
              </label>
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            {/* Perks */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Perks
              </label>
              {/* <input type="text" placeholder="Perks" className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300" /> */}

              <div className="grid grid-cols-3 gap-3 mt-2">
                {perks.map((perk) => {
                  return (
                    <label
                      key={perk}
                      className="flex items-center cursor-pointer select-none gap-2 group"
                    >
                      <input
                        type="checkbox"
                        name={perk.name}
                        // onChange={(e) => setSelectedPerks(e.target.value)}
                        onChange={handleCbClick}
                        value={perk.name}
                        className="h-4 w-4  accent-rose-400 "
                      />
                      <img
                        src={perk.logo}
                        className="w-5 h-5 opacity-70"
                        alt=""
                      />
                      <span className="">{perk.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Extra Info */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Extra Info
              </label>
              <input
                type="text"
                placeholder="Extra Info"
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
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
                  type="text"
                  placeholder="14:00"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>

              <div className="flex flex-col space-y-2 flex-1">
                <label className="text-sm font-semibold text-gray-700">
                  Check Out
                </label>
                <input
                  type="text"
                  placeholder="11:00"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>

              <div className="flex flex-col space-y-2 flex-1">
                <label className="text-sm font-semibold text-gray-700">
                  Max Guests
                </label>
                <input
                  type="text"
                  placeholder="1"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
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
