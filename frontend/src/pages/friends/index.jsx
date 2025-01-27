import React, { useEffect } from "react";
import FriendCard from "../../component/friendCard";
import { useGetAllFriendsQuery } from "../../feature/api/authApi";
import { useLocation } from "react-router-dom";

function Friends() {
  const { data: getAllFriends, refetch } = useGetAllFriendsQuery();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/friends") {
      refetch();
    }
  }, [location.pathname, refetch]);

  return (
    <>
      <div>
        <h1 className="font-gilBold text-base text-black border-b border-line_color pb-2">
          All Friends
        </h1>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          {getAllFriends?.friends?.map((friend) => (
            <div key={friend._id}>
              <FriendCard friend={friend} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <h1 className="font-gilBold text-base text-black border-b border-line_color pb-2">
          All Friends Request
        </h1>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          {getAllFriends?.request?.map((request) => (
            <div key={request._id}>
              <FriendCard friend={request} type={"request"} refetch={refetch} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <h1 className="font-gilBold text-base text-black border-b border-line_color pb-2">
          All Sent Request
        </h1>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          {getAllFriends?.sentrequest?.map((sentrequest) => (
            <div key={sentrequest._id}>
              <FriendCard
                friend={sentrequest}
                type={"sentrequest"}
                refetch={refetch}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Friends;
