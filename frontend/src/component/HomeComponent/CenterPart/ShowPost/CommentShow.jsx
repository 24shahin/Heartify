import { formatDistance } from "date-fns";
import React from "react";

function CommentShow({ comment }) {
  const { fname, lname, profilePicture } = comment?.commentedBy;
  return (
    <div className="mt-3">
      <div className="flex gap-x-2">
        <img
          src={profilePicture}
          alt=""
          className="w-7 h-7 rounded-full mt-1"
        />
        <div className="bg-white-100 p-2 rounded-md">
          <h3 className="font-gilBold text-sm text-black">
            {fname + " " + lname}
          </h3>
          <div>
            <p className="font-gilNormal text-base text-black">
              {comment?.comment}
            </p>
            <img
              src={comment?.image}
              alt=""
              className="w-32 mt-2 object-cover"
            />
          </div>
        </div>
      </div>
      <span className="font-gilLight text-xs text-secondary_color block mt-1">
        {formatDistance(comment.commentAt, new Date(), {
          addSuffix: true,
        })}
      </span>
    </div>
  );
}

export default CommentShow;
