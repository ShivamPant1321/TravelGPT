import React from "react";
import HotelCardItem from "./HotelCardItem";
import { motion } from "framer-motion";

const Hotels = ({ trip }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="p-10 rounded-xl shadow-lg bg-gradient-to-b from-pink-100 to-blue-50 backdrop-blur-lg"
    >
      {/* Header */}
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-extrabold text-4xl text-center text-gray-900 mb-8 tracking-wide"
      >
        🏨 Hotel Recommendations
      </motion.h2>

      {/* Hotel Cards */}
      {trip?.tripData?.hotels?.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {trip.tripData.hotels.map((hotel, index) => (
            <motion.div 
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="hover:scale-105 transition-transform duration-300"
            >
              <HotelCardItem hotel={hotel} index={index} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-gray-600 text-lg mt-6"
        >
          No hotels available. Try searching for a different location.
        </motion.p>
      )}
    </motion.div>
  );
};

export default Hotels;
