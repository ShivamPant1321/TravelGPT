import React, { useState } from "react";
import PlaceCardItem from "./PlaceCardItem";
import { motion } from "framer-motion";

const PlacesToVisit = ({ trip }) => {
  const hasItinerary = trip?.tripData?.itinerary?.length > 0;
  const [activeDay, setActiveDay] = useState(1);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 shadow-xl dark:shadow-blue-900/10 border border-white/50 dark:border-blue-900/20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-5xl mb-4">🗺️</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
            Your Itinerary
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Day-by-day plan with the best attractions and activities
          </p>
        </motion.div>

        {hasItinerary ? (
          <div className="w-full">
            {/* Custom Tab List */}
            <div className="flex justify-center mb-8 bg-white/50 dark:bg-gray-800/50 p-1 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm overflow-x-auto">
              {trip.tripData.itinerary.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(day.day)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeDay === day.day
                      ? "bg-indigo-600 dark:bg-indigo-700 text-white"
                      : "hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Day {day.day}
                </button>
              ))}
            </div>

            {/* Day Content */}
            {trip.tripData.itinerary.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`${activeDay === day.day ? "block" : "hidden"}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-8 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                        Day {day.day}: {day.theme}
                      </h3>
                      {day.bestTime && (
                        <p className="text-gray-600 dark:text-gray-300">
                          <span className="inline-flex items-center text-sm bg-yellow-100 dark:bg-yellow-900/60 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full">
                            🕒 Best time: {day.bestTime}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {day.plan.map((place, placeIndex) => (
                      <motion.div
                        key={placeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: placeIndex * 0.1 }}
                      >
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                          <div className="mb-3 inline-block bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                            {place.time}
                          </div>
                          <PlaceCardItem place={place} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl"
          >
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">No itinerary available</h3>
            <p className="text-gray-600 dark:text-gray-400">Try searching for a different location</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default PlacesToVisit;
