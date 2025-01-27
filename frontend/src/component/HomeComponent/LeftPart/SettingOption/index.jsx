import React, { useState } from "react";
import { Display } from "../../../../svg/Displaysvg";
import { Logout } from "../../../../svg/Logout";
import DisplayMood from "./DisplayMood";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogedOutUser } from "../../../../feature/userSlices/authSlice";

function SettingOPtion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayMood, setDisplayMood] = useState(false);

  if (displayMood) {
    return <DisplayMood setDisplayMood={setDisplayMood} />;
  }
  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch(LogedOutUser());
    navigate("/login");
  };

  return (
    <div className=" bg-white rounded-md">
      <ul>
        <li
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => setDisplayMood(true)}>
          <div className="w-7 md:w-10 md:h-10 h-7 rounded-full hidden lg:flex items-center justify-center bg-white-100 text-black">
            <Display />
          </div>
          <div className="font-gilBold text-xs md:text-base hover:text-secondary_color transition-all ease-linear duration-75 text-black">
            Display & Accessablity
          </div>
        </li>
        <li
          onClick={handleLogOut}
          className="flex items-center gap-x-2 cursor-pointer mt-2">
          <div className="w-7 md:w-10 md:h-10 h-7 rounded-full hidden lg:flex items-center justify-center bg-white-100 text-black">
            <Logout />
          </div>
          <div className="font-gilBold text-xs md:text-base hover:text-secondary_color transition-all ease-linear duration-75 text-black">
            Log Out
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SettingOPtion;
