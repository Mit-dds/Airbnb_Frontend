import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/Home";
import AuthLayout from "./Layouts/AuthLayout";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import NotFound from "./pages/NotFound";
import { UserContextProvider } from "./userContext";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          {/* Main website layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
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
