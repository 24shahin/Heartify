import React from "react";
import avater from "../../assets/defaultImage/avatar.png";
import {
  useAccpetRequestMutation,
  useCancleRequestMutation,
  useDeletRequestMutation,
} from "../../feature/api/authApi";
import { useNavigate } from "react-router-dom";

function FriendCard({ friend, type, refetch }) {
  const navigate = useNavigate();
  const [cancleRequest] = useCancleRequestMutation();
  const [deletRequest] = useDeletRequestMutation();
  const [accpetRequest] = useAccpetRequestMutation();
  const handleCancleSentRequest = async (profileId) => {
    if (!profileId) {
      console.error("Invalid profileId");
      return;
    }
    try {
      const res = await cancleRequest({ id: profileId }).unwrap();
      if (res.message === "friend request has been canceled") {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  const handleReDirect = (username) => {
    navigate(`/profile/${username}`);
  };
  return (
    <div className="shadow-md p-2 rounded-md cursor-pointer">
      <div onClick={() => handleReDirect(friend?.username)}>
        <div>
          <img src={friend?.profilePicture || avater} alt="profile picture" />
        </div>
        <h3 className="font-gilNormal text-base text-black mt-1">
          {friend?.fname + " " + friend?.lname}
        </h3>
      </div>
      <div>
        {type == "request" ? (
          <div className="mt-2">
            <button
              className="w-full py-2 rounded-md bg-red text-white font-gilBold text-sm"
              onClick={() => handleAcceptRequest(friend._id)}>
              Accept
            </button>
            <button
              className="w-full py-2 rounded-md bg-black text-white font-gilBold text-sm mt-2"
              onClick={() => handleDeletRequest(friend._id)}>
              Reject
            </button>
          </div>
        ) : (
          type == "sentrequest" && (
            <div
              className="mt-2"
              onClick={() => handleCancleSentRequest(friend._id)}>
              <button className="w-full py-2 rounded-md bg-white-100 text-black font-gilBold text-sm">
                Cancle Request
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default FriendCard;
