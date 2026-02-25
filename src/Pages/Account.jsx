import React, { useContext } from "react";
import { UserContext } from "../UserContext.jsx";
import "../index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  async function logout() {
    await axios.post(`${BASE_URL}/logout`);
    setUser(null);
    navigate('/');
  }

  return (
    <div className="flex flex-col justify-center items-center mx-auto my-10 gap-6 max-w-96 ">
      <p>Logged as : {user?.name} <span className="text-rose-400">( {user?.email} )</span></p>
      <button className="py-2.5 px-8 text-sm rounded-xl cursor-pointer border transition-colors duration-200 bg-rose-400 hover:bg-rose-500 text-white border-rose-400" onClick={logout}>Logout</button>
    </div>
  );
};

export default Account;
