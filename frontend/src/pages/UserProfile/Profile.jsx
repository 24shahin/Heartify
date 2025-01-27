import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserImagesMutation,
  useGetUserInfoQuery,
} from "../../feature/api/authApi";
import Cover from "../../component/ProfileComponent/Cover";
import ProfileInfo from "../../component/ProfileComponent/ProfileInfo";
import ProfileSetupMenu from "../../component/ProfileComponent/ProfileSetupMenu";
import { Helmet } from "react-helmet-async";
import ProfileRight from "../../component/ProfileComponent/ProfileRight";
import ProfileLeft from "../../component/ProfileComponent/ProfileLeft";

function Profile({ allpostData, setCreatePostShow }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const userProfile = username === undefined ? userInfo.username : username;
  const { data: profile } = useGetUserInfoQuery(userProfile);
  const visitor = userProfile !== userInfo.username ? false : true;
  const [getUserImages, { data: imageUserData, isLoading: imageLoading }] =
    useGetUserImagesMutation();
  const path = `${userProfile.replace(/\s+/g, "_")}/*`;
  const sort = "desc";
  const max = 30;
  const [otherName, setOtherName] = useState("");
  useEffect(() => {
    if (profile?.message === "User not Found") {
      navigate("/");
    } else {
      getUserImages({ path, sort, max }).unwrap();
    }
    setOtherName(profile?.details?.nickName);
  }, [profile]);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width:1400px)",
  });
  const profilTop = useRef(null);
  const profileLeftRef = useRef(null);
  const [height, setHight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();

  useEffect(() => {
    setHight(profilTop.current.clientHeight + 20);
    setLeftHeight(profileLeftRef.current.clientHeight);
    window.addEventListener("scroll", getScrool, { passive: true });

    return () => {
      window.removeEventListener("scroll", getScrool, { passive: true });
    };
  }, [scrollHeight]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getScrool = () => {
    setScrollHeight(window.scrollY);
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="rounded-md bg-white-100">
        <div className=" relative" ref={profilTop}>
          <Cover
            coverImage={profile?.coverPicture}
            visitor={visitor}
            imageUserData={imageUserData?.resources}
          />
          <div className="absolute sm:-bottom-7 lg:-bottom-14 xl:-bottom-12 left-0 px-2  xs:-bottom-12 w-full">
            <ProfileInfo
              profile={profile}
              visitor={visitor}
              imageUserData={imageUserData?.resources}
              userInfo={userInfo}
              otherName={otherName}
            />
          </div>
        </div>
        <div className="sm:w-3/5 lg:w-[310px] mx-auto md:mx-0 md:ml-auto py-3 w-full mt-14 md:mt-0 overflow-hidden px-2 xl:mr-2">
          <ProfileSetupMenu
            allpostData={allpostData}
            profile={profile}
            imageUserData={imageUserData?.resources}
          />
        </div>
      </div>
      <div
        className={`mx-auto w-[90%] 2xl:w-full 2xl:grid grid-cols-1 2xl:grid-cols-[2fr,3fr] mt-5 gap-x-4 relative ${
          isDesktopOrLaptop && scrollHeight >= height && leftHeight > 800
            ? "scrollFixed showLess"
            : isDesktopOrLaptop &&
              scrollHeight >= height &&
              leftHeight < 800 &&
              "scrollFixed showMore"
        }`}>
        <div className="profileLeft" ref={profileLeftRef}>
          <ProfileLeft
            imageUserData={imageUserData?.resources}
            imageLoading={imageLoading}
            profile={profile}
            visitor={visitor}
            userInfo={userInfo}
            setOtherName={setOtherName}
          />
        </div>
        <div className="profileRight ">
          <ProfileRight
            setCreatePostShow={setCreatePostShow}
            allpostData={allpostData}
            profile={profile}
          />
        </div>
      </div>
    </>
  );
}

export default Profile;
