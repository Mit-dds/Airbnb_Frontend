import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // if(!user){
    //     const {data} = axios.get('/profile');
    //     console.log(data+" data");
    //     setUser(data);
    //     // console.log(user);
    // }
    async function fetchUser() {
      try {
        const { data } = await axios.get(`${BASE_URL}/profile`, {
          withCredentials: true,
        });
        setUser(data);
        // console.log(data+"data");
      } catch (err) {
        setUser(null);
        // console.log(err+"user not login");
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
