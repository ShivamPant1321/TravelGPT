import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location || "Default Location",
    };
    try {
      const result = await GetPlaceDetails(data).then((resp) => {
        const photoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );
        setPhotoUrl(photoUrl);
      });
    } catch (error) {
      console.error("Error fetching place photo:", error.message || error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.8 }} 
      className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Background Image */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-[450px] w-full object-cover rounded-2xl brightness-75"
        src={photoUrl ? photoUrl : "/placeholder.png"}
        alt={trip?.userSelection?.location}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 rounded-2xl" />

      {/* Information Content */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-10 left-10 text-white space-y-4"
      >
        <h2 className="font-extrabold text-5xl drop-shadow-lg tracking-wide">
          {trip?.userSelection?.location}
        </h2>
        <div className="flex space-x-4 text-lg">
          <span className="bg-gray-800 bg-opacity-75 px-5 py-2 rounded-full shadow-lg">
            📆 {trip?.userSelection?.noOfDays} Day
          </span>
          <span className="bg-gray-800 bg-opacity-75 px-5 py-2 rounded-full shadow-lg">
            💰 {trip?.userSelection?.budget} Budget
          </span>
          <span className="bg-gray-800 bg-opacity-75 px-5 py-2 rounded-full shadow-lg">
            🥂 {trip?.userSelection?.traveler} Traveler
          </span>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute top-6 right-6"
      >
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105">
          <IoIosSend className="text-xl" />
          Send
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default InfoSection;
