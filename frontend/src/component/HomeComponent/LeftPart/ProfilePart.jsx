import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfilePart() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <>
      <Link to={`/profile/${userInfo.username}`}>
        <div className="w-20 h-20 xl:w-28 xl:h-28 rounded-full bg-cyan-100 mx-auto">
          <img
            src={userInfo.profilePicture}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </Link>
      <div className="text-center">
        <Link
          to={`/profile/${userInfo.username}`}
          className="font-gilBold text-xl text-black mt-3 hidden xl:block">
          {userInfo?.fname + " " + userInfo?.lname}
        </Link>
        <Link
          to={`/profile/${userInfo.username}`}
          className="font-gilNormal text-base text-secondary_color hidden xl:block">
          {userInfo.email}
        </Link>
      </div>
    </>
  );
}

export default ProfilePart;
