import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend, IoMdShare } from "react-icons/io";
import { IoCalendarOutline, IoWalletOutline, IoPeopleOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip?.userSelection?.location) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    setLoading(true);
    const data = {
      textQuery: trip?.userSelection?.location
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative rounded-3xl overflow-hidden shadow-2xl dark:shadow-indigo-900/20 mb-16"
    >
      {/* Placeholder during loading */}
      {loading && (
        <div className="h-[500px] w-full bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
      )}
      
      {/* Background Image */}
      {!loading && (
        <div className="h-[500px] relative">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="h-full w-full object-cover"
            src={photoUrl || "/placeholder.png"}
            alt={trip?.userSelection?.location}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
      )}

      {/* Content Container - Position at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          {/* Left side - Title & Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {trip?.userSelection?.location}
            </h1>
            
            <div className="flex flex-wrap gap-3">
              {trip?.userSelection?.noOfDays && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 dark:bg-gray-900/40 backdrop-blur-sm text-white">
                  <IoCalendarOutline />
                  {trip.userSelection.noOfDays} Days
                </span>
              )}
              
              {trip?.userSelection?.budget && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  <IoWalletOutline />
                  {trip.userSelection.budget} Budget
                </span>
              )}
              
              {trip?.userSelection?.traveler && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  <IoPeopleOutline />
                  {trip.userSelection.traveler} Travelers
                </span>
              )}
            </div>
          </motion.div>
          
          {/* Right side - Action Buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-3"
          >
            <Button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center gap-2 px-5 py-2.5 shadow-lg">
              <IoMdShare />
              Share
            </Button>
            
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 dark:from-indigo-600 dark:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800 text-white rounded-full flex items-center gap-2 px-5 py-2.5 shadow-lg">
              <IoIosSend />
              Send
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoSection;
