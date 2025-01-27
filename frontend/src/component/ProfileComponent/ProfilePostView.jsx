import React from "react";
import { List } from "../../svg/List";
import { Grid } from "../../svg/Grid";

function ProfilePostView({ viewMood, setViewMood }) {
  return (
    <div className="flex justify-between items-center rounded-md shadow-md overflow-hidden">
      <div
        className={`w-[48%] flex items-center justify-center gap-x-3 border-b-4  cursor-pointer py-3 ${
          viewMood === "List" ? "border-blue text-blue" : "border-white text-black"
        }`}
        onClick={() => setViewMood("List")}
      >
        <List /> <span className="font-gilBold text-base">List View</span>
      </div>
      <div
        className={`w-[48%] flex items-center justify-center gap-x-3 border-b-4  cursor-pointer py-3 ${
          viewMood === "Grid" ? "border-blue text-blue" : "border-white text-black"
        }`}
        onClick={() => setViewMood("Grid")}
      >
        <Grid /> <span className="font-gilBold text-base">Grid View</span>
      </div>
    </div>
  );
}

export default ProfilePostView;
