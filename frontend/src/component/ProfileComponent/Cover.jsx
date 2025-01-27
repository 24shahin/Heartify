import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera } from "../../svg/Camera";
import coverDefaultImge from "../../assets/defaultImage/defaultcover.jpg";
import { Media } from "../../svg/Media";
import { Upload } from "../../svg/Upload";
import OutSideClick from "../../functions/click";
import PostError from "../HomeComponent/CenterPart/CreatePostPopUp/PostError";
import Cropper from "react-easy-crop";
import getCroppedProfileImage from "../../functions/getCropImages";
import {
  useCreatePostMutation,
  useUploadCoverPictureMutation,
  useUploadPostImagesMutation,
} from "../../feature/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { LogedInUser } from "../../feature/userSlices/authSlice";
import { PulseLoader } from "react-spinners";
import OldCoverImages from "./OldCoverImages";

function Cover({ coverImage, visitor, imageUserData }) {
  const [uploadPostImages] = useUploadPostImagesMutation();
  const [createPost] = useCreatePostMutation();
  const [uploadCoverPicture] = useUploadCoverPictureMutation();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [croppedPixelImages, setCroppedPixelImages] = useState(null);
  const [option, setOption] = useState(false);
  const [oldCover, setOldCover] = useState(false);
  const [imageStore, setImageStore] = useState("");
  const [imageError, setImageError] = useState("");
  const [width, setWidth] = useState();
  const optionref = useRef(null);
  const chossefile = useRef(null);
  const coverwidth = useRef(null);
  const coverPic = useRef(null);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  OutSideClick(optionref, () => {
    setOption(false);
  });
  useEffect(() => {
    setWidth(coverwidth.current.clientWidth);
  }, [window.innerWidth]);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedPixelImages(croppedAreaPixels);
  }, []);
  const handleCroppedImage = useCallback(
    async (profileImage) => {
      try {
        const croppedImages = await getCroppedProfileImage(
          imageStore,
          croppedPixelImages
        );
        if (profileImage) {
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setImageStore(croppedImages);
        } else return croppedImages;
      } catch (error) {
        console.log(error);
      }
    },
    [croppedPixelImages]
  );

  const uploadCoverImage = async () => {
    try {
      setLoading(true);
      const img = await handleCroppedImage();
      const blob = await fetch(img).then((b) => b.blob());

      const path = `${userInfo.username.replace(/\s+/g, "_")}/cover_pictures`;
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      const resCoverpic = await uploadPostImages({ formData, path }).unwrap();
      const uploadCoverpic = await uploadCoverPicture({
        url: resCoverpic[0].url,
      }).unwrap();

      if (uploadCoverpic.status === "done") {
        setLoading(false);
        const CoverPicPost = await createPost({
          type: "coverPicture",
          text: null,
          images: resCoverpic,
          background: null,
          user: userInfo.id,
          token: userInfo.token,
        }).unwrap();
        if (CoverPicPost.status === "done") {
          setLoading(false);
          coverPic.current.src = resCoverpic[0].url;
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userInfo,
              coverPicture: resCoverpic[0].url,
            })
          );
          dispatch(
            LogedInUser({ ...userInfo, coverPicture: resCoverpic[0].url })
          );
          setOption(false);
          setImageStore("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = (e) => {
    const files = e.target.files[0];
    if (
      files.type !== "image/webp" &&
      files.type !== "image/jpeg" &&
      files.type !== "image/jpg" &&
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
  return (
    <>
      <div
        className="relative overflow-hidden rounded-tr-md rounded-tl-md h-48 xl:h-56 w-full"
        ref={coverwidth}>
        {imageError && (
          <div className="bg-white flex justify-center items-center w-full h-full ">
            {imageError && (
              <PostError setError={setImageError} error={imageError} />
            )}
          </div>
        )}
        {imageStore && (
          <div className="absolute bottom-3 items-center justify-end right-3 flex gap-x-2 z-[3]">
            <button
              disabled={loading}
              className="px-3 py-1 rounded-md shadow-md text-white bg-blue font-gilNormal"
              onClick={() => uploadCoverImage()}>
              {loading ? <PulseLoader color="#fff" size={5} /> : "Upload Cover"}
            </button>
            <button
              className="px-3 py-1 rounded-md shadow-md text-black bg-white font-gilNormal"
              onClick={() => setImageStore(null)}>
              Cancle
            </button>
          </div>
        )}

        <input
          type="file"
          name=""
          id=""
          className="hidden"
          accept="image/jpeg,image/jpg, image/webp, image/gif, image/png"
          ref={chossefile}
          onChange={handleImage}
        />
        <div className="cropCoverImages ">
          {imageStore && (
            <Cropper
              image={imageStore}
              crop={crop}
              zoom={zoom}
              aspect={width / 224}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              objectFit="horizontal-cover"
            />
          )}
        </div>
        <div className="w-full  bg-white-100">
          <img
            src={coverImage || coverDefaultImge}
            alt="coverPhoto"
            ref={coverPic}
            className="w-full h-full object-cover"
          />
          {visitor && (
            <button
              className="flex gap-x-2 items-center absolute top-2 md:top-3 right-2 md:right-3 px-1 md:px-3 py-1 bg-white rounded-md shadow-md text-black"
              onClick={() => setOption(true)}>
              <Camera />
              <span className={"text-sm md:text-base font-gilNormal"}>
                Edit Photo
              </span>
            </button>
          )}
        </div>
        {option && (
          <div
            className="flex gap-y-1 flex-col absolute top-0 md:top-12 right-0 md:right-3 bg-white rounded-md overflow-hidden"
            ref={optionref}>
            <button
              className="px-3 text-black py-1 hover:bg-black hover:text-white ease-linear duration-150 flex gap-x-2 items-center"
              onClick={() => setOldCover(true)}>
              <Media />
              <span className={"font-base font-gilNormal"}>Select Cover</span>
            </button>
            <button
              className="px-3 text-black py-1 hover:bg-black hover:text-white ease-linear duration-150 flex gap-x-2 items-center"
              onClick={() => chossefile.current.click()}
              disabled={loading}>
              {" "}
              {loading ? (
                <PulseLoader color="#fff" size={5} />
              ) : (
                <>
                  <Upload />
                  <span className={"font-base font-gilNormal"}>
                    Upload File
                  </span>
                </>
              )}
            </button>
          </div>
        )}
        {oldCover && (
          <OldCoverImages
            setImageStore={setImageStore}
            setOldCover={setOldCover}
            imageUserData={imageUserData}
            userInfo={userInfo}
          />
        )}
      </div>
    </>
  );
}

export default Cover;
