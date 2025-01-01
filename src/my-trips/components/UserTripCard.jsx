import React, { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

const UserTripCard = ({ trip }) => {
  const [photoUrl, setphotoUrl] = useState();

  useEffect(() => {
    console.log("useEffect triggered, trip:", trip);
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location || "Default Location",
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
    <Link to={'/view-trip/'+trip?.id}>
      <div className="border rounded-xl shadow-lg p-4 hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl || "/placeholder.png"} // Dynamic image or fallback
          alt={trip?.userSelection?.location || "Trip Image"}
          className="object-cover rounded-xl h-[220px] w-full"
        />
        <div className="mt-2">
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location || "Unknown Location"}
          </h2>
          <p className="text-gray-600">
            {trip?.userSelection?.noOfDays || 0} Days trip with{" "}
            {trip?.userSelection?.budget || "Unknown Budget"} Budget
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCard;
