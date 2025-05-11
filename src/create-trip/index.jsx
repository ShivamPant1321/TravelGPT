import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/service/firebaseconfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setplace] = useState();
  const [formData, setformData] = useState([]);
  const [openDialog, setopenDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setformData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setopenDialog(true);
      return;
    }

    const requiredFields = ["location", "noOfDays", "budget", "traveler"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast(`Please fill out: ${missingFields.join(", ")}`);
      return;
    }

    if (formData.noOfDays > 5) {
      toast("Number of days should be less than or equal to 5.");
      return;
    }

    setloading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setloading(false);
    SaveAiTrip(result?.response?.text());
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setopenDialog(false);
        onGenerateTrip();
      });
  };

  const SaveAiTrip = async (TripData) => {
    setloading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setloading(false);
    navigate("/view-trip/" + docId);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-100 to-blue-100">
      <div className="bg-white m-3 bg-opacity-90 p-8 rounded-3xl shadow-2xl w-full max-w-5xl">
        <h2 className="font-bold text-4xl text-gray-900 text-center">Plan Your Dream Trip ✈️🌍</h2>
        <p className="mt-3 text-gray-600 text-lg text-center">Fill in the details and let our AI create a perfect itinerary for you!</p>
        <div className="mt-10 flex flex-col gap-7">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Where do you want to go?</h2>
            <Input placeholder="Enter your destination" type="text" value={formData.location || ""} onChange={(e) => handleInputChange("location", e.target.value)} className="border-gray-300 shadow-sm p-4 rounded-lg" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">How many days?</h2>
            <Input placeholder="Ex. 3" type="number" onChange={(e) => handleInputChange("noOfDays", e.target.value)} className="border-gray-300 shadow-sm p-4 rounded-lg" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Number of travelers?</h2>
            <Input placeholder="Ex. 2" type="number" onChange={(e) => handleInputChange("traveler", e.target.value)} className="border-gray-300 shadow-sm p-4 rounded-lg" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Select your budget</h2>
            <div className="grid grid-cols-3 gap-4">
              {SelectBudgetOptions.map((item, index) => (
                <div key={index} onClick={() => handleInputChange("budget", item.title)} className={`p-5 border rounded-lg cursor-pointer transition-all hover:shadow-lg hover:bg-blue-100 ${formData?.budget === item.title && "shadow-lg border-blue-600"}`}>
                  <h2 className="text-4xl text-center">{item.icon}</h2>
                  <h2 className="text-lg font-bold text-center">{item.title}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Button disabled={loading} onClick={onGenerateTrip} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg px-8 py-4 hover:opacity-90 transition flex items-center">
            {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : "Generate My Trip"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;