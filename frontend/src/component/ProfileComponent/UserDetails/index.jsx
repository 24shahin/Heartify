import React from "react";
import UserDetailsOption from "./UserDetailsOption";

function UserDetails({ profile, visitor, userInfo, setOtherName }) {
  return (
    <>
      <h3 className="font-gilBold text-base text-black border-b border-line_color pb-1 mb-2">
        Infos
      </h3>
      <UserDetailsOption
        profile={profile}
        visitor={visitor}
        userInfo={userInfo}
        setOtherName={setOtherName}
      />
    </>
  );
}

export default UserDetails;
