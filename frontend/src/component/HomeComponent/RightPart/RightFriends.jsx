import React from "react";
import avater from "../../../assets/defaultImage/avatar.png";
import { Link } from "react-router-dom";
import {
  useAccpetRequestMutation,
  useDeletRequestMutation,
} from "../../../feature/api/authApi";
import TextLength from "../../../functions/textLength";

function RightFriends({ request, refetch }) {
  const [deletRequest] = useDeletRequestMutation();
  const [accpetRequest] = useAccpetRequestMutation();

  const handleDeletRequest = async (profileId) => {
    if (!profileId) {
      console.error("Invalid profileId");
      return;
    }
    try {
      const res = await deletRequest({ id: profileId }).unwrap();
      if (res.message === "Friend Request Delete") {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAcceptRequest = async (profileId) => {
    if (!profileId) {
      console.error("Invalid profileId");
      return;
    }
    try {
      const res = await accpetRequest({ id: profileId }).unwrap();
      if (res.message === "friend request has been accepted") {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-gilBold text-base leading-none text-black">
            Freind Requests
          </p>
        </div>
        <div>
          <Link
            className="font-gilMedium text-base px-4 py-2 text-black border border-black transition-all ease-linear duration-100  hover:text-white rounded-md hover:bg-secondary_bg"
            to={"/friends"}>
            See All
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        {request?.length > 0 ? (
          request?.map((requestUser) => (
            <div className="flex items-center gap-x-2" key={requestUser._id}>
              <div className="">
                <div className="w-10 h-10 rounded-full bg-secondary_color overflow-hidden">
                  <img
                    src={requestUser?.profilePicture || avater}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="font-gilBold text-base text-black leading-none">
                  {requestUser?.fname.length > 6
                    ? requestUser?.fname +
                      " " +
                      TextLength(requestUser?.lname, 4)
                    : requestUser?.fname + " " + requestUser?.lname}
                </p>
              </div>
              <div className="flex gap-x-2">
                <button
                  className="font-gilBold text-sm px-3 py-1 bg-green rounded-[4px] shadow-md text-white"
                  onClick={() => handleAcceptRequest(requestUser._id)}>
                  Accept
                </button>
                <button
                  className="font-gilBold text-sm px-3 py-1 bg-red rounded-[4px] shadow-md text-white"
                  onClick={() => handleDeletRequest(requestUser._id)}>
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <span className="font-gilBold text-base text-black">
              Friend Request Not Available
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default RightFriends;
