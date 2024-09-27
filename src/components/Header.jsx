import React from "react";
import DropdownUser from "./nextui/DropdownUser";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/table":
        return "Item Table";
      case "/allproduct":
        return "All Product";
      case "/supplier":
        return "Supplier";
    }
  };

  return (
    <header className="h-20 shadow-lg flex items-center px-4 md:px-8 bg-green-700">
      <h2 className="text-lg md:text-2xl text-yellow-200">{getTitle()}</h2>
      <div className="ml-auto">
        <DropdownUser />
      </div>
    </header>
  );
};

export default Header;
