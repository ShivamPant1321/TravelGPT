import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HotelCardItem = ({ hotel, index }) => {
  const [photoUrl, setphotoUrl] = useState();

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.HotelName || "Default Location",
    };
    try {
      const result = await GetPlaceDetails(data).then((resp) => {
        const photoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0]?.photos?.[0]?.name || ""
        );
        setphotoUrl(photoUrl);
      });
    } catch (error) {
      console.error("Error fetching place photo:", error.message || error);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.HotelName}`}
      target="_blank"
      key={index}
    >
      <div className="transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-300 rounded-2xl shadow-lg hover:shadow-2xl bg-white overflow-hidden flex flex-col min-h-[380px]">
        {/* Fixed height for images */}
        <img
          src={photoUrl || "/placeholder.png"}
          className="h-[200px] w-full object-cover"
          alt={hotel.HotelName}
        />

        {/* Card Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="font-semibold text-xl text-gray-900 truncate">
            {hotel.HotelName}
          </h2>

          {/* Address with truncation */}
          <p className="text-sm text-gray-600 flex-grow line-clamp-2">
            📍 {hotel.HotelAddress}
          </p>

          {/* Price & Rating Section */}
          <div className="flex justify-between items-center mt-auto">
            <span className="text-lg font-semibold text-green-600">
              💰 {hotel.Price}
            </span>
            <span className="text-md font-medium text-yellow-500 flex items-center">
              ⭐ {hotel?.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
