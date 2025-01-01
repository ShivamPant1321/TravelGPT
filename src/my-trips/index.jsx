import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserTripCard from "@/my-trips/components/UserTripCard";

const MyTrips = () => {
  const navigate = useNavigate(); // Corrected to useNavigate
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    const fetchUserTrips = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/");
        return;
      }

      try {
        const q = query(
          collection(db, "AITrips"),
          where("userEmail", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        setUserTrips([])
        const trips = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserTrips(trips);
      } catch (error) {
        console.error("Error fetching user trips:", error);
      }
    };

    fetchUserTrips();
  }, []); // Added dependency

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid grid-cols-2 mt-2 md:grid-cols-3 gap-5">
      {userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <UserTripCard key={trip.id} trip={trip} />
          ))
        ) : (
          [1,2,3,4,5,6].map((item, index)=>(
            <div key={index} className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl" >

            </div>
          ))
      )}
      </div>
    </div>
  );
};

export default MyTrips;
