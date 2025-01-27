import React, { useRef, useState } from "react";
import SearchBox from "./SearchBox";
import { SearchSvg } from "../../../../svg/SearchSvg";
import OutSideClick from "../../../../functions/click";
import { LeftData } from "../../LeftPart/Data";
import { Link, useLocation, useParams } from "react-router-dom";
import LeftHomeData from "../../LeftPart/LeftHomeData";
import { useSelector } from "react-redux";

function Header() {
  const [showSerachBox, setShowSearchBox] = useState(false);
  const ClickRef = useRef(null);
  OutSideClick(ClickRef, () => {
    setShowSearchBox(false);
  });
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();
  const { username } = useParams();
  const getTitle = () => {
    if (location.pathname === "/") {
      return "News Feed";
    } else if (location.pathname === "/friends") {
      return "Friends";
    } else if (location.pathname === "/profile") {
      return "Profile";
    } else if (location.pathname.startsWith("/profile/") && username) {
      return "Profile";
    } else if (location.pathname === "/messages") {
      return "Messages";
    } else if (location.pathname === "/media") {
      return "Media";
    } else {
      return "Heartify";
    }
  };
  return (
    <div className="flex items-center md:justify-between justify-around bg-white md:p-5 mb-5 pb-3 ">
      <Link to={`/profile/${userInfo.username}`} className="lg:hidden">
        <div
          className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-cyan-100 lg:mx-auto lg:hidden"
          style={{
            backgroundImage: `url(${userInfo.profilePicture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}></div>
      </Link>
      <div className="hidden lg:block font-gilBold text-base text-black">
        {getTitle()}
      </div>
      <div className="lg:hidden  flex gap-x-1 sm:gap-x-6 items-center justify-center">
        {LeftData.map((data, index) => (
          <LeftHomeData data={data} key={index} />
        ))}
      </div>
      <div className="relative ">
        <div
          className=" flex border-secondary_color border py-1 px-1 lg:py-2 lg:px-4 lg:w-[360px] gap-x-2 rounded-full lg:rounded-md "
          onClick={() => setShowSearchBox(true)}>
          <div className="cursor-pointer text-secondary_color">
            <SearchSvg />
          </div>
          <div className="w-[91%] hidden lg:block">
            <input
              type="text"
              placeholder="Search"
              className="w-full focus:outline-none bg-transparent"
              disabled={showSerachBox ? true : false}
            />
          </div>
        </div>
        {showSerachBox && (
          <div
            className="absolute top-0 z-10 right-0 md:right-[60px] lg:left-0 bg-transparent w-48 xs:w-[200px] sm:w-[300px]"
            ref={ClickRef}>
            <SearchBox />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
