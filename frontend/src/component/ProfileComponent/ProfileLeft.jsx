import React from "react";
import UserPhotos from "./UserPhotos";
import UserDetails from "./UserDetails";
import Friends from "./UserDetails/Friends";

function ProfileLeft({
  imageUserData,
  imageLoading,
  profile,
  visitor,
  userInfo,
  setOtherName,
}) {
  return (
    <>
      <div className="w-full bg-white rounded-md shadow-md p-1 md:p-3 ">
        <UserDetails
          profile={profile?.details}
          visitor={visitor}
          userInfo={userInfo}
          setOtherName={setOtherName}
        />
      </div>
      <div className="w-full bg-white rounded-md shadow-md p-1 md:p-3 mt-5">
        <UserPhotos imageUserData={imageUserData} imageLoading={imageLoading} />
      </div>
      <div className="w-full bg-white rounded-md shadow-md p-3 md:p-3 mt-5">
        <Friends Friends={profile?.friends} />
      </div>
    </>
  );
}

export default ProfileLeft;
