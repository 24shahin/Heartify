import React, { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SettingOPtion from "./SettingOption";
import OutSideClick from "../../../functions/click";
import { useSelector } from "react-redux";

function LeftHomeData({ data }) {
  const { userInfo } = useSelector((state) => state.user);
  const dataLink = data.to;
  const IconData = data.icon;
  const [dropDown, setDropDown] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const clickOutside = useRef(null);
  OutSideClick(clickOutside, () => {
    setDropDown(false);
  });

  return (
    <>
      {dataLink === "undefined" ? (
        <div className="relative lg:hidden xl:block">
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="w-18 h-10 lg:w-10 lg:h-10 xl:w-auto xl:h-auto justify-center xl:justify-normal flex items-center md:gap-x-3 xl:my-2 rounded-full px-3 xl:px-4 lg:py-2 hover:bg-black  group transition-all ease-linear duration-100 cursor-pointer">
              <div className="text-black  group-hover:text-white">
                <IconData />
              </div>
              <div className="text-black font-gilNormal group-hover:text-white text-base hidden xl:block">
                {data.tittle}
              </div>
            </div>
          </div>
          <div className="absolute top-[43px] w-48 md:w-64 lg:w-[270px] rounded-md shadow-md bg-white -right-8 xl:-left-11">
            {dropDown && (
              <div className="p-2" ref={clickOutside}>
                {" "}
                <SettingOPtion />
              </div>
            )}
          </div>
        </div>
      ) : (
        <NavLink to={data.to}>
          <div
            className={`w-10 h-10 lg:w-10 lg:h-10 xl:w-auto xl:h-auto justify-center xl:justify-normal flex items-center md:gap-x-3 xl:my-2 rounded-full lg:px-4 lg:py-2 hover:bg-black  group transition-all ease-linear duration-100 cursor-pointer ${
              path === data.to ? "bg-black" : "text-white"
            }`}>
            <div
              className={`text-black group-hover:text-white ${
                path === data.to ? "text-white" : "text-black"
              }`}>
              <IconData />
            </div>
            <div
              className={`text-black font-gilNormal group-hover:text-white text-base hidden xl:block ${
                path === data.to ? "text-white" : "text-black"
              }`}>
              {data.tittle}
            </div>
          </div>
        </NavLink>
      )}
    </>
  );
}

export default LeftHomeData;
