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
  DialogTitle,              // added
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoLocationOutline, IoCalendarOutline, IoPersonOutline } from "react-icons/io5";
import { useTheme } from "@/components/ui/theme-provider";

const CreateTrip = () => {
  const [place, setplace] = useState();
  const [formData, setformData] = useState([]);
  const [openDialog, setopenDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

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
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
      <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm"></div>
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-[10%] w-72 h-72 bg-indigo-200 dark:bg-indigo-700 opacity-20 rounded-full filter blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0] 
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-[10%] w-80 h-80 bg-pink-200 dark:bg-pink-700 opacity-20 rounded-full filter blur-3xl"
        animate={{ 
          scale: [1, 0.8, 1],
          x: [0, -20, 0],
          y: [0, 20, 0] 
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      
      <div className="relative container mx-auto py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 sm:p-12 rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50"
        >
          <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Plan Your Dream Trip ✈️
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg text-center">
            Fill in the details and let our AI create a perfect itinerary for you!
          </p>
          
          <div className="mt-10 space-y-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                <IoLocationOutline className="text-indigo-500 dark:text-indigo-400" />
                Where do you want to go?
              </label>
              <Input 
                placeholder="Enter your destination" 
                type="text" 
                value={formData.location || ""} 
                onChange={(e) => handleInputChange("location", e.target.value)} 
                className="border-gray-200 dark:border-gray-700 shadow-sm rounded-xl p-6 text-lg focus-visible:ring-indigo-400 dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                <IoCalendarOutline className="text-indigo-500 dark:text-indigo-400" />
                How many days?
              </label>
              <Input 
                placeholder="Ex. 3" 
                type="number" 
                onChange={(e) => handleInputChange("noOfDays", e.target.value)} 
                className="border-gray-200 dark:border-gray-700 shadow-sm rounded-xl p-6 text-lg focus-visible:ring-indigo-400 dark:bg-gray-800 dark:text-white" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                <IoPersonOutline className="text-indigo-500 dark:text-indigo-400" />
                Number of travelers?
              </label>
              <Input 
                placeholder="Ex. 2" 
                type="number" 
                onChange={(e) => handleInputChange("traveler", e.target.value)} 
                className="border-gray-200 dark:border-gray-700 shadow-sm rounded-xl p-6 text-lg focus-visible:ring-indigo-400 dark:bg-gray-800 dark:text-white" 
              />
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                <span className="text-indigo-500 dark:text-indigo-400">💰</span>
                Select your budget
              </label>
              <div className="grid grid-cols-3 gap-4">
                {SelectBudgetOptions.map((item, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInputChange("budget", item.title)} 
                    className={`p-5 border rounded-xl cursor-pointer transition-all hover:shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 ${
                      formData?.budget === item.title 
                        ? "shadow-md border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/50" 
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="text-4xl text-center mb-2">{item.icon}</div>
                    <h2 className="text-lg font-bold text-center text-gray-800 dark:text-white">{item.title}</h2>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button 
              disabled={loading} 
              onClick={onGenerateTrip} 
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 dark:from-indigo-600 dark:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg px-8 py-6 hover:shadow-indigo-300/50 dark:hover:shadow-indigo-900/50 transition flex items-center gap-2 text-lg"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
              ) : (
                <>Generate My Trip</>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Sign-in Dialog */}
      <Dialog open={openDialog} onOpenChange={setopenDialog}>
        <DialogContent className="max-w-sm rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-white/40 dark:border-gray-700/40 shadow-lg">
          <DialogHeader className="text-center">
            <DialogTitle className="sr-only">Sign In Required</DialogTitle>  {/* added */}
            <DialogDescription>
              <img 
                className="w-40 mx-auto mb-2" 
                src={theme === 'dark' ? "/logo-dark.png" : "/logo-light.png"} 
                alt="Logo" 
              />
              <div className="my-8 space-y-3">
                <h2 className="font-bold text-2xl text-gray-800 dark:text-white">Sign In Required</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Please sign in to create your personalized trip plan
                </p>
              </div>

              <Button
                onClick={login}
                variant="outline"
                className="w-full mt-2 flex items-center justify-center gap-3 py-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 rounded-xl shadow-sm transition-all"
              >
                <FcGoogle className="h-6 w-6" /> Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;