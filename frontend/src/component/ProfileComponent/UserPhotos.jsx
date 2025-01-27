import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

function UserPhotos({ imageUserData, imageLoading }) {
  const [showIncre, setShowIncre] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-gilBold text-lg text-black">User Photos</h1>
        </div>
        {imageUserData?.length > 4 && (
          <button
            className="font-gilBold text-sm px-3 py-1 rounded-md shadow-md bg-blue text-white"
            onClick={() => setShowIncre((prev) => !prev)}>
            {showIncre ? "Show Less" : "Show All"}
          </button>
        )}
      </div>
      <span className="font-gilNormal text-sm text-secondary_color my-2 inline-block">
        {imageUserData?.length} Photos
      </span>
      {imageLoading ? (
        <Skeleton height={200} />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {imageUserData?.length &&
            imageUserData
              .slice(0, showIncre ? imageUserData?.length : 4)
              .map((item) => (
                <img
                  src={item.secure_url}
                  alt=""
                  key={item.public_id}
                  className="w-full h-full object-cover"
                />
              ))}
        </div>
      )}
    </>
  );
}

export default UserPhotos;
