import React, { useEffect, useRef, useState } from "react";
import { CrossBtnSvg } from "../../svg/CrossBtnSvg";
import { Plus } from "../../svg/Plus";
import OutSideClick from "../../functions/click";
import ProfilePictureUploads from "./ProfilePictureUploads";
import PostError from "../HomeComponent/CenterPart/CreatePostPopUp/PostError";

function ProfilePicture({
  imageModal,
  setImageModal,
  uploadProfilePic,
  imageUserData,
  userInfo,
}) {
  const [imageStore, setImageStore] = useState("");
  const [imageShow, setImageShow] = useState("profile_pictures");
  const [imageError, setImageError] = useState("");
  const profilePopUp = useRef(null);
  const chooseFile = useRef(null);
  OutSideClick(profilePopUp, () => {
    setImageModal(false);
  });

  const handleImage = (e) => {
    const files = e.target.files[0];
    if (
      files.type !== "image/webp" &&
      files.type !== "image/jpeg" &&
      files.type !== "image/gif" &&
      files.type !== "image/png"
    ) {
      setImageError(
        `${files.name} is not supported ! Only gpj, webp, png, gif files are supported.`
      );
      return;
    } else if (files.size > 1024 * 1024 * 5) {
      setImageError(
        `${files.name} is too large. Please choose file atlest under 5MB file`
      );
      return;
    }
    const renderFiles = new FileReader();
    renderFiles.readAsDataURL(files);
    renderFiles.onload = (UploadImage) => {
      setImageStore(UploadImage.target.result);
    };
  };
  useEffect(() => {
    const body = document.body;
    if (imageModal) {
      body.classList.add("scroll");
    } else {
      body.classList.remove("scroll");
    }
    return () => body.classList.remove("scroll");
  }, [imageModal]);
  return (
    <div className="fixed w-full h-full flex justify-center items-center bg-blur !z-20 overflow-hidden top-0 left-0">
      <div
        className="bg-white p-3 rounded-md shadow-md w-[95%] md:w-2/5"
        ref={profilePopUp}>
        <div className="border-b border-white-100 relative pb-3">
          {imageError && (
            <div className="bg-white flex justify-center items-center w-10/12 h-[70%] mt-20">
              {imageError && (
                <PostError setError={setImageError} error={imageError} />
              )}
            </div>
          )}
          <h3 className="font-gilBold text-lg text-center text-black">
            Upload Profile Picture
          </h3>
          <div
            className="absolute top-0 right-0 text-secondary_color cursor-pointer"
            onClick={() => setImageModal(false)}>
            {" "}
            <CrossBtnSvg />
          </div>
        </div>
        <div
          className="bg-blue w-1/2 justify-center items-center flex mx-auto px-3 py-2 rounded-md shadow-md md:my-3 mt-2 cursor-pointer text-white"
          onClick={() => chooseFile.current.click()}>
          <Plus />{" "}
          <span className="font-gilNormal text-base text-black">
            Upload Image
          </span>
          <input
            type="file"
            accept="image/jpeg,image/jpg, image/webp, image/gif, image/png"
            className="hidden"
            ref={chooseFile}
            onChange={handleImage}
          />
        </div>
        <div className="h-[280px] md:h-[300px] p-3 overflow-y-auto">
          <div>
            <div className=" flex gap-x-4">
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
                        `${userInfo.username.replace(/\s+/g, "_")}/post_images`
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
                    onClick={() => setImageStore(img.secure_url)}
                    className="cursor-pointer"
                  />
                ))}
            </div>
          </div>
        </div>
        {imageStore && (
          <ProfilePictureUploads
            imageStore={imageStore}
            setImageStore={setImageStore}
            setImageModal={setImageModal}
            uploadProfilePic={uploadProfilePic}
          />
        )}
      </div>
    </div>
  );
}

export default ProfilePicture;
