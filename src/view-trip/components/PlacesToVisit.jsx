import React from "react";
import PlaceCardItem from "./PlaceCardItem";
import { motion } from "framer-motion";

const PlacesToVisit = ({ trip }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="p-10 bg-gradient-to-r from-blue-200 to-pink-100 backdrop-blur-xl min-h-screen rounded-lg shadow-lg"
    >
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-extrabold text-4xl text-center mb-10 text-gray-900"
      >
        🌍 Places to Visit
      </motion.h2>

      <div className="space-y-10">
        {trip.tripData?.itinerary.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow"
          >
            <h2 className="font-bold text-3xl text-gray-800 mb-6">
              🗓 Day {item.day}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {item.plan.map((place, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="hover:scale-105 transform transition-transform"
                >
                  <div className="p-6 border border-gray-200 rounded-xl bg-gray-50 shadow-md">
                    <h2 className="font-semibold text-md text-orange-700 mb-2">
                      ⏰ {place.time}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PlacesToVisit;
