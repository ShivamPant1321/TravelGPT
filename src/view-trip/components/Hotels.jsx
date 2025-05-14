import React from "react";
import HotelCardItem from "./HotelCardItem";
import { motion } from "framer-motion";

const Hotels = ({ trip }) => {
  const hasHotels = trip?.tripData?.hotels?.length > 0;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 shadow-xl dark:shadow-indigo-900/10 border border-white/50 dark:border-indigo-900/20">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-5xl mb-4">🏨</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
            Where to Stay
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Carefully selected accommodations to make your stay comfortable and memorable
          </p>
        </motion.div>

        {/* Hotel Cards Grid */}
        {hasHotels ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {trip.tripData.hotels.map((hotel, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <HotelCardItem hotel={hotel} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl"
          >
            <div className="text-5xl mb-4">🏝️</div>
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">No hotels available</h3>
            <p className="text-gray-600 dark:text-gray-400">Try searching for a different location</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Hotels;
