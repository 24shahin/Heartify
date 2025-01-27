import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

function Friends({ Friends }) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-gilBold text-lg text-black">Friends</h1>
        </div>
        {Friends?.length > 4 && (
          <button className="font-gilBold text-sm px-3 py-1 rounded-md shadow-md bg-blue text-white">
            Show All Friends
          </button>
        )}
      </div>
      {loading ? (
        <Skeleton height={100} />
      ) : (
        <>
          <span className="font-gilNormal text-sm text-secondary_color my-2 inline-block">
            {Friends?.length} friends
          </span>
          <div className="grid grid-cols-2 gap-2">
            {Friends?.slice(0, 4).map((friend) => (
              <div key={friend?._id}>
                <img
                  src={friend?.profilePicture}
                  alt="profilePicture"
                  className="w-full h-[91%] object-cover"
                />
                <h1 className="py-1 text-black font-gilNormal">
                  {friend?.fname + " " + friend?.lname}
                </h1>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Friends;
