import React from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import Error from "../../assets/error/Error.json";
import { FaArrowLeftLong } from "react-icons/fa6";

function NotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center items-center h-screen w-full px-10">
      <div>
        <h2 className="font-gilBold text-black sm:text-2xl md:text-3xl lg:text-5xl">
          No Page Found on This Route ...
        </h2>
        <Lottie options={defaultOptions} height={400} width={400} />
        <Link
          to={"/"}
          className="px-4 py-2 bg-cyan-100 rounded-sm shadow-md font-gilBold text-black flex gap-x-2 items-center w-[120px]">
          <FaArrowLeftLong />
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
