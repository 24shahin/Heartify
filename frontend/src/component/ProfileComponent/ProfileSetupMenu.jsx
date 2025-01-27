import React from "react";

function ProfileSetupMenu({ profile, imageUserData }) {
  return (
    <>
      <div className=" flex justify-center md:justify-around  gap-x-3">
        <div className="text-center w-[70px] sm:w-[100px] md:w-auto">
          <p className="font-gilBold text-sm text-black">Followers</p>
          <span className="font-gilBold text-base text-black">
            {profile?.followers?.length.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="text-center w-[70px] sm:w-[100px] md:w-auto">
          <p className="font-gilBold text-sm text-black">Followings</p>
          <span className="font-gilBold text-base text-black">
            {profile?.following?.length.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="text-center w-[70px] sm:w-[100px] md:w-auto">
          <p className="font-gilBold text-sm text-black">Posts</p>
          <span className="font-gilBold text-base text-black">
            {profile?.posts?.length.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="text-center w-[70px] sm:w-[100px] md:w-auto">
          <p className="font-gilBold text-sm text-black">Friends</p>
          <span className="font-gilBold text-base text-black">
            {profile?.friends?.length.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="text-center w-[70px] sm:w-[100px] md:w-auto">
          <p className="font-gilBold text-sm text-black">Photos</p>
          <span className="font-gilBold text-base text-black">
            {imageUserData?.length
              ? imageUserData?.length.toString().padStart(2, "0")
              : 0}
          </span>
        </div>
      </div>
    </>
  );
}

export default ProfileSetupMenu;
