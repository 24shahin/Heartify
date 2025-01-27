import React from "react";
import { Media } from "../../../../svg/Media";
import { Livevideo } from "../../../../svg/Livevideo";
import { Facesvg } from "../../../../svg/Facesvg";

function AddPost({ imageShow, setImageShow }) {
  return (
    <div className="border border-line_color p-3 flex items-center justify-between rounded-md mt-1">
      <h3 className="font-gilMedium text-base text-black">Add Post</h3>
      <div className="flex gap-x-3">
        <div
          className={`w-10 h-10 hover:bg-white-100 transition-all ease-linear duration-100 cursor-pointer rounded-full flex justify-center items-center text-black ${
            imageShow && "bg-white-100"
          }`}
          onClick={() => setImageShow(true)}>
          <Media />
        </div>
        <div className="w-10 h-10 hover:bg-white-100 transition-all ease-linear duration-100 cursor-pointer rounded-full flex justify-center items-center text-black">
          <Livevideo />
        </div>
        <div className="w-10 h-10 hover:bg-white-100 transition-all ease-linear duration-100 cursor-pointer rounded-full flex justify-center items-center text-black">
          <Facesvg />
        </div>
      </div>
    </div>
  );
}

export default AddPost;
