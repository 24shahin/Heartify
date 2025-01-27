import React from "react";
import RightFriends from "./RightFriends";
import Stories from "./Story";
import { useGetAllFriendsQuery } from "../../../feature/api/authApi";
import RightFriendShow from "./RightFriendShow";

function RightPart() {
  const { data: getAllFriends, refetch } = useGetAllFriendsQuery();
  return (
    <div className="w-auto">
      <div>
        <RightFriends request={getAllFriends?.request} refetch={refetch} />
      </div>
      <div className="mt-10">
        <Stories />
      </div>
      <div className="mt-10">
        <RightFriendShow friends={getAllFriends?.friends} refetch={refetch} />
      </div>
    </div>
  );
}

export default RightPart;
