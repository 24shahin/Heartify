import React from "react";

function PostError({ setError, error }) {
  return (
    <div className="p-4 postanimition bg-blur absolute top-0 left-0 w-full h-full z-[1] flex items-center justify-center">
      <div className="text-center">
        <p className="font-gilBold text-xl text-red mb-3 w-96 mx-auto">{error}</p>
        <button className="px-5 py-2 bg-[#703236] rounded-md shadow-md text-white" onClick={()=>setError("")}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default PostError;
