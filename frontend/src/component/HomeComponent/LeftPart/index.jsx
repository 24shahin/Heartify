import React, { useState } from "react";
import ProfilePart from "./ProfilePart";
import LeftHomeData from "./LeftHomeData";
import { LeftData } from "./Data";
import { Logout } from "../../../svg/Logout";
import { Moon } from "../../../svg/MoonSvg";
import { useDispatch } from "react-redux";
import {
  themeSwitch,
  themeSwitchOff,
} from "../../../feature/modeSlice/darkModeSlice";
import { useNavigate } from "react-router-dom";
import { LogedOutUser } from "../../../feature/userSlices/authSlice";

function LeftPart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState(() => {
    return JSON.parse(localStorage.getItem("mode")) == true;
  });
  const handleMode = () => {
    const newMode = !mode;
    setMode(newMode);
    if (newMode) {
      dispatch(themeSwitch(true));
      localStorage.setItem("mode", true);
    } else {
      dispatch(themeSwitchOff());
      localStorage.removeItem("mode");
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch(LogedOutUser());
    navigate("/login");
  };
  return (
    <div className="flex flex-col justify-between h-full xl:justify-normal">
      <div>
        <ProfilePart />
      </div>
      <div className="w-full xl:w-3/4  xl:mt-3 mx-auto flex flex-col items-center xl:flex-none xl:block gap-y-2">
        {LeftData.map((item, index) => (
          <LeftHomeData data={item} key={index} />
        ))}
      </div>
      <div className="flex flex-col gap-y-3 justify-end">
        <div
          className="w-10 h-10 rounded-full hidden md:flex items-center justify-center bg-white-100 xl:hidden mx-auto text-black cursor-pointer"
          onClick={handleMode}>
          <Moon />
        </div>
        <div
          className="w-7 md:w-10 md:h-10 h-7 rounded-full hidden lg:flex items-center justify-center bg-white-100 xl:hidden mx-auto text-black cursor-pointer"
          onClick={handleLogOut}>
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default LeftPart;
