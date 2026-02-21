import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
  return (
    <div>
      <Navbar />
        <main className="h-[calc(100vh-81px)]">
            <Outlet />
        </main>
      <Footer />
    </div>
  )
}

export default MainLayout
