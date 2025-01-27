import React from "react";
import avater from "../../../assets/defaultImage/avatar.png";

function RightFriendShow({ friends }) {
  return (
    <>
      <div className="mb-6">
        <h3 className="font-gilBold text-base leading-none text-black">
          All Friends
        </h3>
      </div>
      <div>
        {friends?.length > 0 ? (
          friends?.map((friendsUser) => (
            <div className="flex items-center gap-x-2" key={friendsUser._id}>
              <div className="w-10 h-10 rounded-full bg-secondary_color overflow-hidden">
                <img
                  src={friendsUser?.profilePicture || avater}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="">
                <p className="font-gilBold text-base text-black leading-none">
                  {friendsUser?.fname} {friendsUser?.lname}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <span className="font-gilBold text-base text-black">
              Friend friends Not Available
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default RightFriendShow;
