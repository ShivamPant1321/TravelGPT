import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ui/theme-provider";

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mt-16 bg-gradient-to-r from-indigo-900 to-purple-900 dark:from-gray-900 dark:to-indigo-950 text-white py-12 rounded-t-3xl"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <img 
            src={theme === 'dark' ? "/logo-dark.png" : "/logo-light.png"} 
            alt="TravelGPT Logo" 
            className="h-12 mb-6" 
          />
          <p className="text-indigo-200 dark:text-indigo-300 mb-6 text-center max-w-md">
            AI-powered travel planning made easy. Create personalized itineraries based on your preferences.
          </p>
          <div className="flex space-x-4 mb-8">
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
              <FaFacebook className="text-white h-5 w-5" />
            </a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
              <FaTwitter className="text-white h-5 w-5" />
            </a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
              <FaInstagram className="text-white h-5 w-5" />
            </a>
          </div>
          <div className="text-center">
            <p className="text-indigo-200 dark:text-indigo-300 text-sm">
              © {new Date().getFullYear()} TravelGPT. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600"></div>
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-2xl">✈️</span>
      </div>
    </motion.footer>
  );
};

export default Footer;
