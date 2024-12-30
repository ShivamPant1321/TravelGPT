import React from "react";
import {Button} from "../button";

const Header = () => {
  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <img className="w-48" src="src\assets\logo.png" alt="" />
      <div >
        <Button>Sign In</Button>
      </div>
    </div>
  );
};

export default Header;
