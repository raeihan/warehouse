import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center w-full py-4 px-6 bg-green-800 border-t-1 border-yellow-200">
      <p className="text-white text-sm md:text-base">Copyright &copy; 2024</p>
      <p className="text-white text-sm md:text-base">
        Developed By <span className="text-yellow-200">Raihan Mahdy</span>
      </p>
    </footer>
  );
};

export default Footer;
