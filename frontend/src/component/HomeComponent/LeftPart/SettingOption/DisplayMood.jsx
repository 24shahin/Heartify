import React from "react";
import { Moon } from "../../../../svg/MoonSvg";
import { BackButton } from "../../../../svg/BackButtonSvg";
import { useDispatch, useSelector } from "react-redux";
import {
  themeSwitch,
  themeSwitchOff,
} from "../../../../feature/modeSlice/darkModeSlice";

function DisplayMood({ setDisplayMood }) {
  const themeMode = useSelector((state) => state?.thememode?.mode);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex items-center gap-x-5 mb-2 ">
        <div
          className=" text-black hover:text-secondary_color transition-all ease-linear duration-75 cursor-pointer"
          onClick={() => setDisplayMood(false)}>
          {" "}
          <BackButton />
        </div>
        <h2 className="font-gilBold text-xs md:text-base text-black">
          Display & Accessablity
        </h2>
      </div>
      <div className=" bg-white rounded-md flex gap-x-4 justify-between text-black">
        <div className="w-10 h-10 rounded-full hidden md:flex items-center justify-center bg-white-100 text-black">
          <Moon />
        </div>

        <div className="md:w-[210px] w-full">
          <h4 className="font-gilBold text-sm lg:text-base "> Dark Mode</h4>
          <p className="font-gilLight text-secondary_color text-xs my-1">
            You can change your device mode
          </p>
          <div className="">
            <div
              className="flex justify-between"
              onClick={() => {
                dispatch(themeSwitchOff());
                localStorage.removeItem("mode");
              }}>
              <label
                htmlFor="off"
                className="font-gilBold  pr-[140px] lg:pr-[150px] cursor-pointer bg-transparent text-sm">
                Off
              </label>
              <input
                type="radio"
                id="off"
                name="darkmode"
                checked={themeMode == null}
              />
            </div>
            <div
              className="flex justify-between"
              onClick={() => {
                dispatch(themeSwitch(true));
                localStorage.setItem("mode", true);
              }}>
              <label
                htmlFor="on"
                className="font-gilBold  pr-[144px] lg:pr-[154px] cursor-pointer bg-transparent mt-1 text-sm">
                on
              </label>
              <input type="radio" id="on" name="darkmode" checked={themeMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayMood;
