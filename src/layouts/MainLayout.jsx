import React from "react";
import Navbar from "../pages/shared/Navbar";
import { Outlet } from "react-router-dom";
import FooterComponent from "../pages/shared/FooterComponent";

const MainLayout = () => {
  return (
    <div className="container mx-auto">
      <header>
        <Navbar></Navbar>
      </header>
      <main className="min-h-[calc(100vh-306px)]">
        <Outlet></Outlet>
      </main>
      <footer>
        <FooterComponent></FooterComponent>
      </footer>
    </div>
  );
};

export default MainLayout;
