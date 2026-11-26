import { Outlet } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;