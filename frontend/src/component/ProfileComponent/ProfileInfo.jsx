import React, { useRef, useState } from "react";
import avatar from "../../assets/defaultImage/avatar.png";
import { Camera } from "../../svg/Camera";
import ProfilePicture from "./ProfilePicture";
import FriendShip from "./FriendShip";

function ProfileInfo({ profile, visitor, imageUserData, userInfo, otherName }) {
  const [imageModal, setImageModal] = useState(false);
  const uploadProfilePic = useRef(null);

  return (
    <div className="flex w-full flex-col sm:flex-row justify-between">
      <div className="flex gap-x-3 flex-col lg:flex-col xl:flex-row sm:flex-row sm:w-1/2 lg:w-auto mx-auto sm:mx-0 items-center">
        <div
          className="sm:w-32 sm:h-32 w-24 h-24 lg:w-24 lg:h-24 xl:w-32 xl:h-32  rounded-full border-4 border-white bg-red relative lg:mx-auto xl:mx-0"
          ref={uploadProfilePic}
          style={{
            backgroundImage: `url(${profile?.profilePicture || avatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          {visitor && (
            <div
              className="md:w-9 md:h-9 w-7 h-7 rounded-full bg-white justify-center items-center flex absolute -bottom-2 right-3 cursor-pointer text-black"
              onClick={() => setImageModal(true)}>
              <Camera />
            </div>
          )}
          {imageModal && (
            <ProfilePicture
              imageModal={imageModal}
              setImageModal={setImageModal}
              uploadProfilePic={uploadProfilePic}
              imageUserData={imageUserData}
              userInfo={userInfo}
            />
          )}
        </div>
        <div className="xl:mt-4 xs:mt-0 mt-2 lg:mx-auto xl:mx-0 text-center md:text-left">
          <p className="font-gilBold text-xl xl:text-3xl text-black">{`${
            profile?.fname + " " + profile?.lname
          }`}</p>
          <p className="font-gilMedium text-base lg:text-xl text-black text-center xl:text-left">{`${
            otherName ? `(${otherName})` : "(Other Name)"
          }`}</p>
        </div>
      </div>
      <div className="flex items-center w-auto justify-center mt-4 md:mt-0 md:justify-end">
        {!visitor && (
          <FriendShip
            friendShips={profile?.friendShip}
            profileId={profile?._id}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
