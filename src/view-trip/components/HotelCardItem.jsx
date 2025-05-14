import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoLocationOutline, IoStarOutline, IoWalletOutline } from "react-icons/io5";

const HotelCardItem = ({ hotel, index }) => {
  const [photoUrl, setphotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hotel?.HotelName) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    setLoading(true);
    const data = {
      textQuery: hotel?.HotelName + " hotel",
    };
    
    try {
      const result = await GetPlaceDetails(data);
      if (result.data.places[0]?.photos?.[0]) {
        const photoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          result.data.places[0].photos[0].name
        );
        setphotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.HotelName + ' ' + hotel.HotelAddress)}`}
      target="_blank"
    >
      <motion.div 
        whileHover={{ y: -8 }}
        className="group h-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex flex-col"
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {loading ? (
            <div className="h-full w-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
          ) : (
            <>
              <img
                src={photoUrl || "/placeholder.png"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={hotel.HotelName}
              />
              
              {/* Rating Badge */}
              {hotel?.rating && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-yellow-600 dark:text-yellow-400 shadow-sm">
                  <IoStarOutline className="text-yellow-500 dark:text-yellow-400" />
                  {hotel.rating}
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white line-clamp-1">
            {hotel.HotelName}
          </h3>
          
          <div className="mt-2 flex items-start gap-1 text-gray-500 dark:text-gray-400 text-sm line-clamp-2 flex-grow">
            <IoLocationOutline className="text-lg text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
            <span>{hotel.HotelAddress}</span>
          </div>
          
          {/* Price & Description */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            {hotel.Price && (
              <div className="flex items-center gap-2 mb-2">
                <IoWalletOutline className="text-green-500 dark:text-green-400" />
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {hotel.Price}
                </span>
              </div>
            )}
            
            {hotel.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                {hotel.description}
              </p>
            )}
          </div>
        </div>
        
        {/* View on Map label */}
        <div className="p-3 text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border-t border-indigo-100 dark:border-indigo-800">
          View on Maps
        </div>
      </motion.div>
    </Link>
  );
};

export default HotelCardItem;
