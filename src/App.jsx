import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/Home";
import AuthLayout from "./Layouts/AuthLayout";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import NotFound from "./pages/NotFound";
import { UserContextProvider } from "./UserContext";
import Account from "./Pages/Account";
import MyBookings from "./Pages/MyBookings";
import MyAccommodations from "./Pages/MyAccommodations";
import AccountLayout from "./Layouts/AccountLayout";
// import NewPlace from "./Pages/NewPlace";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          {/* Main website layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="account" element={<AccountLayout />}>
              <Route index element={<Account />} />
              <Route path="bookings" element={<MyBookings />} />
              <Route path="places" element={<MyAccommodations />}/>
              <Route path="places/:action?" element={<MyAccommodations />} />
                {/* <Route path="new" element={<NewPlace />} /> */}
              {/* </Route> */}
            </Route>
            {/* <Route path="" element={</>} /> */}
          </Route>

          {/* Auth layout */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
