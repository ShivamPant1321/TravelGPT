import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoLocationOutline, IoCalendarOutline, IoWalletOutline } from "react-icons/io5";

// Array of fallback travel images - you need to ensure these exist in your public folder
const fallbackImages = [
  "/images/travel1.jpg",
  "/images/travel2.jpg",
  "/images/travel3.jpg",
  "/images/travel4.jpg",
  "/images/travel5.jpg",
];

// Get a random image from the fallback array
const getRandomFallbackImage = () => {
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)] || "/placeholder.png";
};

const UserTripCard = ({ trip, onDeleteClick }) => {
  const [photoUrl, setphotoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip) {
      getDestinationPhoto();
    }
  }, [trip]);

  const getDestinationPhoto = async () => {
    setLoading(true);
    try {
      const location = trip?.userSelection?.location || "travel destination";
      
      // First attempt: Try using Unsplash Source API
      const unsplashUrl = `https://source.unsplash.com/featured/800x600?${encodeURIComponent(location + ',travel,tourism')}`;
      
      const img = new Image();
      
      // Set a timeout to prevent waiting too long
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), 5000); // 5 second timeout
      });
      
      const loadPromise = new Promise((resolve, reject) => {
        img.onload = () => resolve(unsplashUrl);
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = unsplashUrl;
      });
      
      try {
        // Race between image loading and timeout
        const url = await Promise.race([loadPromise, timeoutPromise]);
        setphotoUrl(url);
      } catch (error) {
        // If Unsplash fails, use fallback image
        console.log("Using fallback image for:", location);
        setphotoUrl(getRandomFallbackImage());
      }
    } catch (error) {
      console.error("Error fetching location image:", error);
      setphotoUrl(getRandomFallbackImage());
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault(); // Prevent navigation to trip view
    onDeleteClick(trip.id);
  };

  return (
    <Link to={'/view-trip/'+trip?.id}>
      <motion.div 
        whileHover={{ y: -8 }}
        className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
      >
        <div className="relative overflow-hidden group h-[220px]">
          {loading ? (
            <div className="h-full w-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
          ) : (
            <>
              <img
                src={photoUrl}
                alt={trip?.userSelection?.location || "Trip Image"}
                className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          )}
          
          {trip?.userSelection?.budget && (
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm flex items-center gap-1">
              <IoWalletOutline className="text-indigo-500 dark:text-indigo-400" />
              {trip.userSelection.budget}
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h2 className="font-bold text-xl text-gray-800 dark:text-white mb-2 line-clamp-1">
            {trip?.userSelection?.location || "Unknown Location"}
          </h2>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            {trip?.userSelection?.noOfDays && (
              <div className="flex items-center gap-1">
                <IoCalendarOutline className="text-indigo-500 dark:text-indigo-400" />
                <span>{trip.userSelection.noOfDays} Days</span>
              </div>
            )}
            
            {trip?.userSelection?.traveler && (
              <div className="flex items-center gap-1">
                <span>👥</span>
                <span>{trip.userSelection.traveler} Travelers</span>
              </div>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Created on {new Date(parseInt(trip.id)).toLocaleDateString()}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">View Details →</span>
              <button 
                onClick={handleDeleteClick}
                className="p-1.5 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default UserTripCard;
