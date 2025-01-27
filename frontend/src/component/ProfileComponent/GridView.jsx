import React from "react";
import { Link } from "react-router-dom";
import avater from "../../assets/defaultImage/avatar.png";
import { formatDistance } from "date-fns";

function GridView({ post }) {
  return (
    <>
      {post?.images && post?.images?.length && (
        <div className="w-[48%]">
          {post?.images && (
            <div className="flex items-center gap-x-3 mb-2">
              <div className="w-12 h-12 rounded-full">
                <Link to={`/profile/${post?.user?.username}`}>
                  <img
                    src={post.user.profilePicture || avater}
                    alt="profile picture"
                    className="object-cover w-full h-full rounded-full"
                  />
                </Link>
              </div>
              <div>
                <Link
                  to={`/profile/${post?.user?.username}`}
                  className="text-sm"
                >
                  {post?.user?.fname + " " + post?.user?.lname}
                </Link>
                <span className="font-gilLight text-xs text-secondary_color block">
                  {formatDistance(post.createdAt, new Date(), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          )}
          <div
            className={`relative ${
              post?.images?.length === 1
                ? "overflow-hidden h-[150px] w-full"
                : post?.images?.length === 2
                ? "overflow-hidden grid grid-cols-2 h-[150px] gap-2 w-full"
                : post?.images?.length === 3
                ? "overflow-hidden grid grid-cols-2 h-[150px] gap-2 w-full"
                : post?.images?.length === 4
                ? "overflow-hidden grid grid-cols-2 h-[150px] gap-2 w-full"
                : post?.images?.length >= 5
                ? "overflow-hidden grid grid-cols-2 h-[150px] gap-2 w-full"
                : "overflow-hidden"
            }`}
          >
            {post?.images?.slice(0, 4).map((img, index) => (
              <div className="relative h-full w-full object-cover" key={index}>
                <img
                  src={img.url}
                  alt=""
                  key={index}
                  className={`w-full h-full object-cover ${
                    post?.images?.length === 3
                      ? " [&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3 "
                      : post?.images?.length === 4 &&
                        " [&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3 "
                  }`}
                />
              </div>
            ))}
            {post?.images?.length >= 5 && (
              <div className="w-9 h-9 bg-[#ffffff9f] absolute right-28 bottom-6 flex items-center justify-center font-gilBold rounded-full text-base -translate-x-1/2 -translate-y-1/2">
                +{post.images.length - 4}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default GridView;
