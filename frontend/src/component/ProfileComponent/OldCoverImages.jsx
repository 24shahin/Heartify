import React, { useState } from "react";
import { CrossBtnSvg } from "../../svg/CrossBtnSvg";

function OldCoverImages({
  setImageStore,
  setOldCover,
  imageUserData,
  userInfo,
}) {
  const [imageShow, setImageShow] = useState("cover_pictures");
  const [imageError, setImageError] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  return (
    <div>
      <div className="fixed w-full h-full flex justify-center items-center z-20 overflow-hidden top-0 left-0 bg-blur">
        <div className="bg-white p-3 rounded-md shadow-md w-[95%] md:w-3/6 h-[370px]">
          <div className="border-b border-white-100 relative pb-3">
            <h3 className="font-gilBold text-lg text-center text-black">
              Select Cover Picture
            </h3>
            <div
              className="absolute top-0 right-0 text-secondary_color cursor-pointer"
              onClick={() => {
                setOldCover(false);
                setImageStore("");
              }}>
              {" "}
              <CrossBtnSvg />
            </div>
          </div>
          {/* heading end */}
          <div className="h-[300px] p-3 overflow-y-auto">
            <div>
              <div className=" flex gap-x-2 md:gap-x-4">
                <div
                  className={`cursor-pointer border-b-4 rounded-md ${
                    imageShow === "cover_pictures"
                      ? "border-blue text-blue"
                      : "border-white text-black"
                  }`}
                  onClick={() => setImageShow("cover_pictures")}>
                  <h3 className="font-gilBold text-base text-black">
                    Cover Photos
                  </h3>
                  <span className="font-gilLight text-sm text-secondary_color">
                    Total ({" "}
                    {
                      imageUserData?.filter(
                        (item) =>
                          item.asset_folder ===
                          `${userInfo.username.replace(
                            /\s+/g,
                            "_"
                          )}/cover_pictures`
                      ).length
                    }{" "}
                    )
                  </span>
                </div>
                <div
                  className={`cursor-pointer border-b-4 rounded-md ${
                    imageShow === "profile_pictures"
                      ? "border-blue text-blue"
                      : "border-white text-black"
                  }`}
                  onClick={() => setImageShow("profile_pictures")}>
                  <h3 className="font-gilBold text-base text-black">
                    Profile Photos
                  </h3>
                  <span className="font-gilLight text-sm text-secondary_color">
                    Total ({" "}
                    {
                      imageUserData?.filter(
                        (item) =>
                          item.asset_folder ===
                          `${userInfo.username.replace(
                            /\s+/g,
                            "_"
                          )}/profile_pictures`
                      ).length
                    }{" "}
                    )
                  </span>
                </div>
                <div
                  onClick={() => setImageShow("post_images")}
                  className={`cursor-pointer border-b-4 rounded-md ${
                    imageShow === "post_images"
                      ? "border-blue text-blue"
                      : "border-white text-black"
                  }`}>
                  <h3 className="font-gilBold text-base text-black">
                    Others Photos
                  </h3>
                  <span className="font-gilLight text-sm text-secondary_color">
                    Total ({" "}
                    {
                      imageUserData?.filter(
                        (item) =>
                          item.asset_folder ===
                          `${userInfo.username.replace(
                            /\s+/g,
                            "_"
                          )}/post_images`
                      ).length
                    }{" "}
                    )
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {imageUserData
                  ?.filter(
                    (item) =>
                      item.asset_folder ===
                      `${userInfo.username.replace(/\s+/g, "_")}/${imageShow}`
                  )
                  .map((img) => (
                    <img
                      src={img.secure_url}
                      alt="profile photos"
                      key={img.public_id}
                      onClick={() => {
                        setImageStore(img.secure_url);
                        setOldCover(false);
                      }}
                      className="cursor-pointer"
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OldCoverImages;
