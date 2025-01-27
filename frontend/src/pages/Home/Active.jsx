import React from "react";
import { PuffLoader } from "react-spinners";

function Active({ type, Loading, text, head }) {
  return (
    <div className="w-full h-screen fixed bg-blur top-0 left-0 z-10 flex items-center justify-center">
      <div className="w-[400px] p-4 rounded-md shadow-lg bg-white text-center">
        <h2
          className={`font-gilMedium text-lg ${
            type == "error" ? "text-red" : "text-green"
          }`}>
          {head}
        </h2>
        <h5
          className={`mt-3 font-gilNormal text-base  ${
            type == "error" ? "text-red" : "text-green"
          }`}>
          {text}
        </h5>
        {type == "success" && (
          <PuffLoader
            className="mx-auto"
            color="#21D997"
            loading={Loading}
            size={40}
          />
        )}
      </div>
    </div>
  );
}

export default Active;
