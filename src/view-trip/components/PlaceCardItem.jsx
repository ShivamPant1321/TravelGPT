import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoTimeOutline, IoTicketOutline, IoStarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { motion } from "framer-motion";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    setLoading(true);
    const data = {
      textQuery: place?.placeName,
    };

    try {
      const result = await GetPlaceDetails(data);
      if (result.data.places[0]?.photos?.[0]) {
        const photoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          result.data.places[0].photos[0].name
        );
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
      target="_blank"
      className="block"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative w-full sm:w-1/3 h-32 sm:h-auto overflow-hidden">
            {loading ? (
              <div className="h-full w-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            ) : (
              <img
                src={photoUrl || "/placeholder.png"}
                alt={place.placeName}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            )}
            
            {/* Rating Badge */}
            {place.rating && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-yellow-600 dark:text-yellow-400">
                <IoStarOutline className="text-yellow-500 dark:text-yellow-400" />
                {place.rating}
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">{place.placeName}</h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
              {place.placeDetails}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {place.travelTime && (
                <span className="inline-flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                  <IoTimeOutline />
                  {place.travelTime}
                </span>
              )}
              
              {place.ticketPricing && (
                <span className="inline-flex items-center gap-1 text-xs bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                  <IoTicketOutline />
                  {place.ticketPricing}
                </span>
              )}
            </div>
            
            <Button
              size="sm"
              variant="outline"
              className="mt-auto bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 rounded-full flex items-center gap-1.5 text-xs"
            >
              <FaMapMarkerAlt className="text-indigo-500 dark:text-indigo-400" />
              View on Map
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PlaceCardItem;
