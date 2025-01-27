import React, { useEffect, useRef, useState } from "react";
import Frequest from "../../svg/Frequest";
import { Friends } from "../../svg/Friends";
import OutSideClick from "../../functions/click";
import {
  useAccpetRequestMutation,
  useAddFriendRequestsMutation,
  useCancleRequestMutation,
  useDeletRequestMutation,
  useFollowMutation,
  useUnFollowMutation,
  useUnFriendMutation,
} from "../../feature/api/authApi";

function FriendShip({ friendShips, profileId }) {
  const [friendShip, setFriendShip] = useState(friendShips);
  const [addFriendRequests] = useAddFriendRequestsMutation();
  const [unFriend] = useUnFriendMutation();
  const [unFollow] = useUnFollowMutation();
  const [follow] = useFollowMutation();
  const [cancleRequest] = useCancleRequestMutation();
  const [deletRequest] = useDeletRequestMutation();
  const [accpetRequest] = useAccpetRequestMutation();
  const [friendShipMenu, setFriendShipMenu] = useState(false);
  const [friendReponsMenu, setFriendReponsMenu] = useState(false);
  const firendmenuRef = useRef(null);
  const firendresponsmenuRef = useRef(null);
  OutSideClick(firendmenuRef, () => setFriendShipMenu(false));
  OutSideClick(firendresponsmenuRef, () => setFriendReponsMenu(false));

  const handleAddFriend = async () => {
    if (!profileId) {
      console.error("Invalid profileId");
      return;
    }
    try {
      await addFriendRequests({ id: profileId }).unwrap();
      setFriendShip({ ...friendShip, following: true, request: true });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnFriend = async () => {
    if (!profileId) {
      console.error("Invalid profileId");
      return;
    }
    try {
      await unFriend({ id: profileId }).unwrap();
      setFriendShip({
        ...friendShip,
        following: false,
        request: false,
        friend: false,
        requestReceived: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnFollow = async () => {
    if (!profileId) {
      console.error("Invalid profileId");
      return;
    }
    try {
      await unFollow({ id: profileId }).unwrap();
      setFriendShip({
        ...friendShip,
        following: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async () => {
    if (!profileId) {
      console.error("Invalid profileId");
      return;
    }
    try {
      await follow({ id: profileId }).unwrap();
      setFriendShip({
        ...friendShip,
        following: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancleRequest = async () => {
    if (!profileId) {
      console.error("Invalid profileId");
      return;
    }
    try {
      await cancleRequest({ id: profileId }).unwrap();
      setFriendShip({
        ...friendShip,
        following: false,
        request: false,
        friend: false,
        requestReceived: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletRequest = async () => {
    if (!profileId) {
      console.error("Invalid profileId");
      return;
    }
    try {
      await deletRequest({ id: profileId }).unwrap();
      setFriendShip({
        ...friendShip,
        following: false,
        request: false,
        friend: false,
        requestReceived: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleAcceptRequest = async () => {
    if (!profileId) {
      console.error("Invalid profileId");
      return;
    }
    try {
      await accpetRequest({ id: profileId }).unwrap();
      setFriendShip({
        ...friendShip,
        following: true,
        request: false,
        friend: true,
        requestReceived: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFriendShip(friendShips);
  }, [friendShips]);
  return (
    <div className="flex sm:flex-row flex-col gap-y-1 items-center xl:mb-3">
      {friendShip?.friend ? (
        <div className="relative" ref={firendmenuRef}>
          <div
            className="px-3 py-1 rounded-sm bg-white text-black font-gilNormal flex items-center gap-x-1 cursor-pointer"
            onClick={() => setFriendShipMenu(true)}>
            <Friends />
            <span className="font-gilNormal text-xs md:text-sm lg:text-base">
              See Friendship
            </span>
          </div>
          {friendShipMenu && (
            <div className="absolute top-10 right-0 bg-white shadow-md px-2 py-1">
              <div
                className="px-3 py-1 rounded-sm hover:bg-blue hover:text-white font-gilNormal flex items-center gap-x-1 cursor-pointer"
                onClick={() => handleUnFriend()}>
                <Friends />
                <span className="font-gilNormal text-xs md:text-sm lg:text-base">
                  Unfriend
                </span>
              </div>
              <div
                className="px-3 py-1 rounded-sm hover:bg-blue hover:text-white font-gilNormal flex items-center gap-x-1 cursor-pointer"
                onClick={() => handleUnFollow()}>
                <Friends />
                <span className="font-gilNormal text-xs md:text-sm lg:text-base">
                  Unfollow
                </span>
              </div>
              <div className="px-3 py-1 rounded-sm hover:bg-blue hover:text-white font-gilNormal flex items-center gap-x-1 cursor-pointer">
                <Friends />
                <span className="font-gilNormal text-xs md:text-sm lg:text-base">
                  Block
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendShip?.request &&
        !friendShip?.requestReceived && (
          <button
            className="px-3 py-1 rounded-sm bg-blue text-white font-gilNormal flex items-center gap-x-1"
            onClick={() => handleAddFriend()}>
            <Frequest width={18} height={18} />
            Add Friend
          </button>
        )
      )}
      {/* request part */}

      {friendShip?.request ? (
        <div
          className="px-3 py-1 rounded-sm bg-white text-black font-gilNormal flex items-center gap-x-1 cursor-pointer"
          onClick={() => handleCancleRequest()}>
          <Friends />
          <span className="font-gilNormal text-xs md:text-sm lg:text-base">
            Cancle Request
          </span>
        </div>
      ) : (
        friendShip?.requestReceived && (
          <div className="relative" ref={firendresponsmenuRef}>
            <div
              className="px-3 py-1 rounded-sm bg-blue text-white font-gilNormal flex items-center gap-x-1 cursor-pointer"
              onClick={() => setFriendReponsMenu(true)}>
              <Friends />
              <span className="font-gilNormal text-xs md:text-sm lg:text-base">
                Respons
              </span>
            </div>
            {friendReponsMenu && (
              <div className="absolute top-10 right-0 bg-white shadow-md px-2 py-1">
                <div
                  className="px-3 py-1 rounded-sm hover:bg-blue hover:text-white font-gilNormal flex items-center gap-x-1 cursor-pointer"
                  onClick={() => handleAcceptRequest()}>
                  <Friends />
                  <span className="font-gilNormal text-xs md:text-sm lg:text-base">
                    Accept
                  </span>
                </div>
                <div
                  className="px-3 py-1 rounded-sm hover:bg-blue hover:text-white font-gilNormal flex items-center gap-x-1 cursor-pointer"
                  onClick={() => handleDeletRequest()}>
                  <Friends />
                  <span className="font-gilNormal text-xs md:text-sm lg:text-base">
                    Delete
                  </span>
                </div>
              </div>
            )}
          </div>
        )
      )}
      {friendShip?.following ? (
        <div
          className="sm:ml-2 px-3 py-1 rounded-sm bg-white text-black font-gilNormal flex items-center gap-x-1 cursor-pointer"
          onClick={() => handleUnFollow()}>
          <Friends />
          <span className="font-gilNormal text-xs md:text-sm lg:text-base">
            Following
          </span>
        </div>
      ) : (
        <div
          className="sm:ml-2 px-3 py-1 rounded-sm bg-blue text-white font-gilNormal flex items-center gap-x-1 cursor-pointer"
          onClick={() => handleFollow()}>
          <Friends />
          <span className="font-gilNormal text-xs md:text-sm lg:text-base">
            Follow
          </span>
        </div>
      )}
    </div>
  );
}

export default FriendShip;
