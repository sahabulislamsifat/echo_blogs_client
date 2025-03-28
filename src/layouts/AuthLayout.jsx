import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import FooterComponent from "../pages/shared/FooterComponent";

const AuthLayout = () => {
  return (
    <div className="container mx-auto">
      <header>
        <Navbar></Navbar>
      </header>
      <main className="my-8">
        <Outlet></Outlet>
      </main>
      <footer className="mt-16">
        <FooterComponent></FooterComponent>
      </footer>
    </div>
  );
};

export default AuthLayout;
