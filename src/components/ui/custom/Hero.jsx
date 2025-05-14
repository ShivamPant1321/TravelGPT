import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-6 md:px-20 lg:px-56 gap-8 text-center min-h-screen bg-gradient-to-r from-pink-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-indigo-950 dark:to-blue-950">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg"></div>
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-[10%] w-64 h-64 bg-pink-200 dark:bg-pink-700 opacity-30 rounded-full filter blur-3xl"
        animate={{ 
          x: [0, 20, -20, 0], 
          y: [0, -20, 20, 0],
          scale: [1, 1.1, 0.9, 1] 
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-[10%] w-80 h-80 bg-blue-200 opacity-30 rounded-full filter blur-3xl"
        animate={{ 
          x: [0, -30, 30, 0], 
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.1, 1] 
        }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[25%] w-40 h-40 bg-indigo-200 opacity-30 rounded-full filter blur-3xl"
        animate={{ 
          x: [0, 40, -40, 0], 
          y: [0, -40, 40, 0] 
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-white leading-tight tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            Plan Your Perfect Getaway
          </span>{" "}
          <span className="block mt-2">with AI-Powered Itineraries</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your personal AI travel assistant, creating customized journeys tailored to your preferences and budget.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <Link to="/create-trip">
            <Button 
              className="px-8 py-6 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-full shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-300/50 dark:hover:shadow-indigo-800/50 transform hover:scale-105"
              size="lg"
            >
              Start Planning Your Journey
            </Button>
          </Link>
        </motion.div>
        
        {/* Features */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Personalized Itineraries</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Customized plans based on your preferences</p>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Budget Friendly</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Options for every price point</p>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">AI Powered</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Smart recommendations that get better over time</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
