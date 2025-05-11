import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

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
        setOpenDialog(false);
        window.location.reload();
      });
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <motion.div
      className="p-4 shadow-md bg-white/50 backdrop-blur-md flex justify-between items-center px-8 rounded-xl border border-white/40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <a href="/">
        <img className="w-40 cursor-pointer" src="/logo.png" alt="Logo" />
      </a>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {users ? (
          <div className="flex items-center gap-5">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full px-5 py-2 bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold shadow-md">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full px-5 py-2 bg-pink-200 hover:bg-pink-300 text-pink-900 font-semibold shadow-md">
                My Trips
              </Button>
            </a>

            {/* User Profile Popover */}
            <Popover>
              <PopoverTrigger>
                <img
                  src={users?.picture}
                  className="h-10 w-10 rounded-full shadow-lg border border-gray-300 cursor-pointer"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent className="p-4 text-center shadow-lg bg-white/70 backdrop-blur-md rounded-lg border border-white/40">
                <p className="font-semibold text-gray-800">{users?.name}</p>
                <p className="text-gray-600 text-sm">{users?.email}</p>
                <Button
                  onClick={handleLogout}
                  className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md"
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg hover:scale-105 transition-all"
          >
            Sign In
          </Button>
        )}

        {/* Sign-in Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-sm rounded-lg bg-white/80 backdrop-blur-lg border border-white/40 shadow-lg">
            <DialogHeader className="text-center">
              <DialogDescription>
                <img className="w-40 mx-auto" src="/logo.png" alt="Logo" />
                <h2 className="font-bold text-xl mt-6 text-gray-800">Sign In With Google</h2>
                <p className="text-gray-600 text-sm">
                  Securely sign in to access your trips.
                </p>

                <Button
                  onClick={login}
                  className="w-full mt-5 flex items-center gap-4 justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
                >
                  <FcGoogle className="h-6 w-6" /> Sign in With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default Header;
