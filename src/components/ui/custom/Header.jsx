import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { RiMapPinAddLine, RiSuitcaseLine } from "react-icons/ri";
import axios from "axios";
import { ThemeToggle } from "../theme-toggle";
import { useTheme } from "../theme-provider";

const Header = () => {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <motion.div
      className={`sticky top-0 z-50 mx-4 md:mx-6 lg:mx-8 my-2 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur-md" 
          : "bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm"
      } rounded-xl border border-white/40 dark:border-gray-700/40`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center px-4 py-2">
        {/* Logo with theme sensitivity */}
        <Link to="/" className="flex items-center">
          <img 
            className="h-9 cursor-pointer" 
            src={theme === 'dark' ? "/logo-dark.png" : "/logo-light.png"} 
            alt="Logo" 
          />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {users ? (
            <div className="flex items-center gap-2">
              <Link to="/create-trip">
                <Button variant="outline" size="sm" className="rounded-full px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-800/50 hover:text-blue-800 shadow-sm font-medium flex items-center gap-1 text-xs h-8">
                  <RiMapPinAddLine className="text-blue-600 dark:text-blue-400" />
                  <span className="hidden sm:inline">Create Trip</span>
                </Button>
              </Link>
              <Link to="/my-trips">
                <Button variant="outline" size="sm" className="rounded-full px-3 py-1 bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800 hover:bg-pink-200 dark:hover:bg-pink-800/50 hover:text-pink-800 shadow-sm font-medium flex items-center gap-1 text-xs h-8">
                  <RiSuitcaseLine className="text-pink-600 dark:text-pink-400" />
                  <span className="hidden sm:inline">My Trips</span>
                </Button>
              </Link>

              {/* User Profile Popover */}
              <Popover>
                <PopoverTrigger>
                  <div className="flex items-center gap-1 bg-white/80 dark:bg-gray-800/80 pl-1 pr-2 py-1 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer">
                    <img
                      src={users?.picture}
                      className="h-6 w-6 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
                      alt="User Avatar"
                    />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">{users?.name?.split(' ')[0]}</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4 text-center shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl border border-white/40 dark:border-gray-700/40">
                  <img
                    src={users?.picture}
                    className="h-14 w-14 rounded-full mx-auto mb-2 border-2 border-blue-100 dark:border-blue-900"
                    alt="User Avatar"
                  />
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-base">{users?.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">{users?.email}</p>
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    size="sm"
                    className="w-full mt-2 rounded-full text-xs h-8"
                  >
                    Sign Out
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button
              onClick={() => setOpenDialog(true)}
              size="sm"
              className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm hover:shadow-indigo-200/50 dark:hover:shadow-indigo-800/30 hover:scale-105 transition-all font-medium text-xs h-8"
            >
              Sign In
            </Button>
          )}

          {/* Sign-in Dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-sm rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-white/40 dark:border-gray-700/40 shadow-lg">
              <DialogHeader className="text-center">
                <DialogTitle className="sr-only">Welcome to TravelGPT</DialogTitle>
                <DialogDescription>
                  <img className="w-40 mx-auto mb-2"  src={theme === 'dark' ? "/logo-dark.png" : "/logo-light.png"}  alt="Logo" />
                  <div className="my-8 space-y-3">
                    <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200">Welcome to TravelGPT</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Sign in to create and manage your personalized travel plans
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
      </div>
    </motion.div>
  );
};

export default Header;
