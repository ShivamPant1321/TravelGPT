import { Button } from "@/components/ui/button";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useState, useEffect } from "react";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setphotoUrl] = useState();
  
    useEffect(() => {
      console.log("useEffect triggered, trip:", place);
      if (place) {
        GetPlacePhoto();
      }
    }, [place]);
  
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: place?.placeName || "Default Location",
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
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName},${place?.placeAddress}`}
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md">
        <img src={photoUrl? photoUrl:'/placeholder.png'} alt="" className="w-[130px] h-[130px] rounded-xl object-cover" />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-500">{place.placeDetails}</p>
          <h2 className="mt-2 text-[16px]">🕐{place.travelTime}</h2>
          {/* <Button size='sm'><FaMapLocationDot /></Button> */}
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;