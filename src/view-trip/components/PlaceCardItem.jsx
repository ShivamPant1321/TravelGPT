import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName || "Default Location",
    };

    try {
      const result = await GetPlaceDetails(data);
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[3].name
      );
      setPhotoUrl(photoUrl);
    } catch (error) {
      console.error("Error fetching place photo:", error.message || error);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName},${place?.placeAddress}`}
      target="_blank"
      className="block"
    >
      <div className="border rounded-2xl p-4 flex gap-5 hover:scale-105 transition-transform cursor-pointer shadow-lg bg-white">
        <img
          src={photoUrl || "/placeholder.png"}
          alt={place.placeName}
          className="w-[150px] h-[150px] rounded-xl object-cover"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-lg text-gray-800">{place.placeName}</h2>
            <p className="text-sm text-gray-500">{place.placeDetails}</p>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-sm text-gray-700 flex items-center gap-1">
              ⏰ {place.travelTime}
            </span>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-md"
            >
              <FaMapMarkerAlt />
              View Map
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
