import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate(); // Initialize navigate
  const users = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setopenDialog] = useState(false);

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
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setopenDialog(false);
        window.location.reload();
      });
  };

  useEffect(() => {
    console.log(users);
  }, [users]); // Add users as a dependency

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/"); // Redirect to home
  };

  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <a href="/">
        <img className="w-48 cursor-pointer" src="/logo.png" alt="Logo" />
      </a>
      <div>
        {users ? (
          <div className="flex items-center gap-3">
            {" "}
            {/* Fixed gap attribute */}
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={users?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 onClick={handleLogout} className="cursor-pointer">
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setopenDialog(true)}>Sign In</Button>
        )}

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img className="w-48" src="src\assets\logo.png" alt="" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the App with Google authentication securely</p>

                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" /> Sign in With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
