import React, { useState } from "react";
import CenterPart from "../HomeComponent/CenterPart/CenterPart";
import ProfilePostView from "./ProfilePostView";
import ShowPost from "../HomeComponent/CenterPart/ShowPost";
import GridView from "./GridView";

function ProfileRight({ allpostData, setCreatePostShow, profile }) {
  const [profileState, setProfileState] = useState(true);
  const [viewMood, setViewMood] = useState("List");
  return (
    <div>
      <div>
        <CenterPart
          allpostData={allpostData}
          setCreatePostShow={setCreatePostShow}
          profileState={profileState}
        />
        <div className="mt-5 w-full ">
          <ProfilePostView setViewMood={setViewMood} viewMood={viewMood} />
        </div>
        <div className="mt-5 w-full">
          {profile?.posts && profile?.posts?.length ? (
            viewMood === "List" ? (
              profile.posts?.map((item) => (
                <ShowPost key={item._id} post={item} viewMood={viewMood} profileState={profileState} />
              ))
            ) : (
              <div className="w-full bg-white rounded-md shadow-md flex justify-between items-center flex-wrap gap-y-3 overflow-hidden">
                {viewMood === "Grid" &&
                  profile.posts?.map((item) => (
                    <GridView key={item._id} post={item} />
                  ))}
              </div>
            )
          ) : (
            <div className="w-full h-[150px] bg-white-100 rounded-md shadow-md flex items-center justify-center">
              <h1 className="text-black font-gilBold text-base capitalize">
                User don't have any Posts
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileRight;
