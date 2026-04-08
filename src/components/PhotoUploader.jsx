import axios from "axios";
import React, { useState } from "react";
import upload from "../assets/images/add_photo.png";


const PhotoUploader = ({addPhoto, onChange}) => {
    
  const BASE_URL = import.meta.env.VITE_BASE_URL;


    // const [addPhoto, setAddPhoto] = useState([]);
    const [photoLink, setPhotoLink] = useState("");

    async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post(`${BASE_URL}/upload-by-link`, {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
    console.log("clicked!");
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
      onChange((prev) => [...prev, ...res.data]);
      }
      catch (err) {
      console.error(err);
    }
}

  return (
    <div className="">
      <div className=" relative flex flex-col space-y-2">
        <label className="text-sm font-semibold text-gray-700">Photos</label>
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
      <div className="flex flex-wrap gap-3 items-center mt-2">
        {addPhoto.length > 0 &&
          addPhoto.map((link, index) => (
            <div key={index} className="w-[108px] h-[108px]">
              <img
                className="w-full h-full object-cover rounded-3xl"
                src={`${BASE_URL}/uploads/` + link}
                alt=""
              />
            </div>
          ))}

        <label className="flex flex-col items-center justify-center w-[108px] h-[108px] rounded-3xl border border-[#dad8c1] text-[#47473f] cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <img src={upload} className="w-5 h-5 opacity-70" alt="" />
          <span className="text-xs mt-1">Upload</span>
        </label>
      </div>
    </div>
  );
};

export default PhotoUploader;
