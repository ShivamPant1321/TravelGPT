import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React from "react";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const HotelCardItem = ({ hotel, index }) => {
  const [photoUrl, setphotoUrl] = useState();

  useEffect(() => {
    console.log("useEffect triggered, trip:", hotel);
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.HotelName || "Default Location",
    };
    console.log("Fetching data with:", data);

    try {
      const result = await GetPlaceDetails(data).then((resp) => {
        console.log(resp.data.places[0].photos[3].name);

        const photoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );
        setphotoUrl(photoUrl);
      });
      console.log("API response:", result.data);
    } catch (error) {
      console.error("Error fetching place photo:", error.message || error);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.HotelName}`}
      target="blank"
      key={index}
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl? photoUrl:'/placeholder.png'}
          className="rounded-xl h-[180px] w-full object-cover"
          alt=""
        />

        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium ">{hotel.HotelName}</h2>
          <h2 className="text-xs text-gray-500">📍{hotel.HotelAddress}</h2>

          <h2>💰 {hotel.Price}</h2>
          <h2>⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
