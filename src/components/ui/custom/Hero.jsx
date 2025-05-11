import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-6 md:px-20 lg:px-56 gap-8 text-center min-h-screen bg-gradient-to-r from-pink-100 to-blue-100">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl rounded-lg shadow-lg"></div>

      {/* Content */}
      <motion.h1
        className="relative text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight drop-shadow-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
          Plan Your Perfect Getaway with AI:
        </span>{" "}
        Personalized Itineraries Just for You
      </motion.h1>

      <motion.p
        className="relative text-lg md:text-xl text-gray-600 max-w-2xl opacity-90"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Your personal AI-powered trip planner, creating customized itineraries tailored to your style and budget.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link to="/create-trip">
          <Button className="px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
            Start Planning Now
          </Button>
        </Link>
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-12 left-16 w-24 h-24 bg-pink-300 opacity-40 rounded-full filter blur-3xl"
        animate={{ x: [0, 20, -20, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-14 right-16 w-32 h-32 bg-blue-300 opacity-40 rounded-full filter blur-3xl"
        animate={{ x: [0, -20, 20, 0], y: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
    </div>
  );
};

export default Hero;
