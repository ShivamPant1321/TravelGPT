import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 absolute right-0 w-full text-white py-6 mt-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Created by Team Travel.GPT</h2>
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
        {/* <div className="flex justify-center space-x-4 mt-2">
          <FaFacebook className="text-blue-500 text-xl cursor-pointer hover:scale-110 transition-transform" />
          <FaTwitter className="text-blue-400 text-xl cursor-pointer hover:scale-110 transition-transform" />
          <FaInstagram className="text-pink-500 text-xl cursor-pointer hover:scale-110 transition-transform" />
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
