import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { IoTrashOutline } from "react-icons/io5";

const Viewtrip = () => {
  const { tripId } = useParams();
  const [trip, settrip] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document:", docSnap.data());
        settrip(docSnap.data());
      } else {
        console.log("No Such Document");
        toast("No Trip Found");
        navigate("/my-trips");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Error loading trip details");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteDoc(doc(db, "AITrips", tripId));
      toast.success("Trip deleted successfully");
      navigate("/my-trips");
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip");
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading your trip details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-end mb-6">
        <Button
          onClick={handleDeleteClick}
          variant="destructive"
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 rounded-full px-4"
        >
          <IoTrashOutline />
          Delete Trip
        </Button>
      </div>
      <InfoSection trip={trip} />
      <Hotels trip={trip}/>
      <PlacesToVisit trip={trip}/>
      <Footer trip={trip}/>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 dark:text-red-400">Delete Trip</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this trip to {trip?.userSelection?.location}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              {deleteLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                "Delete Trip"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Viewtrip;
