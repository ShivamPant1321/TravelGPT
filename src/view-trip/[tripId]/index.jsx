import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const Viewtrip = () => {
  const { tripId } = useParams();

  const [trip, settrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  /*
    Used to get trip information from firebase
    */

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      settrip(docSnap.data());
    } else {
      console.log("No Such Document");
      toast("No Trip Found");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information section */}
      <InfoSection trip={trip} />
      {/* Recommeded Hotels */}
      <Hotels trip={trip}/>
      {/* Daily Plan */}
      <PlacesToVisit trip={trip}/>
      {/* Footer  */}
      <Footer trip={trip}/>
    </div>
  );
};

export default Viewtrip;
