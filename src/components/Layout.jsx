import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <main className="flex flex-col md:flex-row w-full bg-green-800">
      <Sidebar />
      <div className="flex flex-col w-full md:w-4/5">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
