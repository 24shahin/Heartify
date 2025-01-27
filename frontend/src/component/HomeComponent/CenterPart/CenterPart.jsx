import React, { useRef } from "react";
import { Livevideo } from "../../../svg/Livevideo";
import { Media } from "../../../svg/Media";
import { Facesvg } from "../../../svg/Facesvg";
import { useSelector } from "react-redux";

function CenterPart({ setCreatePostShow, profileState }) {
  const { userInfo } = useSelector((state) => state.user);
  const removefocus = useRef(null);
  const handlecreatepostShow = () => {
    setCreatePostShow(true);
    removefocus.current.blur();
  };

  return (
    <>
      <div
        className={` bg-white-100 rounded-md 2xl:mt-0 md:mb-0 mb-7 mt-5 ${
          profileState ? "p-2 md:p-4 shadow-md py-5" : "p-5 md:p-10"
        }`}>
        <div
          className={`bg-white rounded-full flex gap-x-2 md:gap-x-3 ${
            profileState ? "my-4 md:my-8 p-2" : " p-2 "
          }`}>
          <div className={`${profileState ? "" : "w-[60px]"}`}>
            <div
              className={`${
                profileState ? "w-10 h-10" : "md:w-14 md:h-14 w-12 h-12"
              } rounded-full bg-white-100 `}
              style={{
                backgroundImage: `url(${userInfo.profilePicture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}></div>
          </div>
          <input
            ref={removefocus}
            type="text"
            className="w-full focus:outline-none rounded-full text-xs md:text-base bg-white"
            placeholder="What's Up... Say Something For Your Friends"
            onClick={handlecreatepostShow}
          />
        </div>
        <div className="border-t border-white mt-5"></div>
        <div className="flex items-center justify-between mt-5 sm:mt-10 sm:mb-4">
          <div className="w-[30%] flex gap-x-1 md:gap-x-3 justify-center items-center cursor-pointer text-black">
            <Livevideo />
            <p
              className={` font-gilMedium  ${
                profileState ? "text-xs md:text-sm" : "text-xs md:text-base"
              }`}>
              live Video
            </p>
          </div>
          <div className="w-[30%] flex gap-x-1 md:gap-x-3 justify-center items-center cursor-pointer text-black">
            <Media />
            <p
              className={`font-gilMedium  ${
                profileState ? "text-xs md:text-sm" : "text-xs md:text-base"
              }`}>
              Photos/Gallery
            </p>
          </div>
          <div className="w-[30%] flex gap-x-1 md:gap-x-3 justify-center items-center cursor-pointer text-black ">
            <Facesvg />
            <p
              className={`font-gilMedium  ${
                profileState ? "text-xs md:text-sm" : "text-xs md:text-base"
              }`}>
              Activities
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CenterPart;
