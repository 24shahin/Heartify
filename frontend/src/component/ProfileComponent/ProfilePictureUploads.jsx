import React, { useCallback, useEffect, useRef, useState } from "react";
import { CrossBtnSvg } from "../../svg/CrossBtnSvg";
import Cropper from "react-easy-crop";
import { Minus } from "../../svg/Minus";
import { Plus } from "../../svg/Plus";
import getCroppedProfileImage from "../../functions/getCropImages";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreatePostMutation,
  useUploadPostImagesMutation,
  useUploadProfilePictureMutation,
} from "../../feature/api/authApi";
import { LogedInUser } from "../../feature/userSlices/authSlice";
import { PulseLoader } from "react-spinners";

function ProfilePictureUploads({
  imageStore,
  setImageStore,
  setImageModal,
  uploadProfilePic,
}) {
  const { userInfo } = useSelector((state) => state.user);
  const [uploadPostImages] = useUploadPostImagesMutation();
  const [createPost] = useCreatePostMutation();
  const [uploadProfilePicture] = useUploadProfilePictureMutation();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [croppedPixelImages, setCroppedPixelImages] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const body = document.body;
    if (imageStore) {
      body.classList.add("scroll");
    } else {
      body.classList.remove("scroll");
    }
    return () => body.classList.remove("scroll");
  }, [imageStore]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedPixelImages(croppedAreaPixels);
  }, []);

  const zoomref = useRef(null);
  const handlezoomOut = () => {
    zoomref.current.stepDown();
    setZoom(zoomref.current.value);
  };
  const handlezoomIn = () => {
    zoomref.current.stepUp();
    setZoom(zoomref.current.value);
  };
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

  const handleUploadImage = async () => {
    try {
      setLoading(true);
      const img = await handleCroppedImage();
      const blob = await fetch(img).then((b) => b.blob());

      const path = `${userInfo.username.replace(/\s+/g, "_")}/profile_pictures`;
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      const resprofilepic = await uploadPostImages({ formData, path }).unwrap();
      const uploadprofilepic = await uploadProfilePicture({
        url: resprofilepic[0].url,
      }).unwrap();

      if (uploadprofilepic.status === "done") {
        setLoading(false);
        const profilePicPost = await createPost({
          type: "profilePicture",
          text: caption,
          images: resprofilepic,
          background: null,
          user: userInfo.id,
          token: userInfo.token,
        }).unwrap();
        if (profilePicPost.status === "done") {
          setLoading(false);
          uploadProfilePic.current.style.backgroundImage = `url(${resprofilepic[0].url})`;
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userInfo,
              profilePicture: resprofilepic[0].url,
            })
          );
          dispatch(
            LogedInUser({ ...userInfo, profilePicture: resprofilepic[0].url })
          );
          setImageModal(false);
          setImageStore("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed w-full h-full flex justify-center items-center z-20 overflow-hidden top-0 left-0">
      <div className="bg-white p-3 rounded-md shadow-md w-3/6 h-[570px]">
        <div className="border-b border-white-100 relative pb-3">
          <h3 className="font-gilBold text-lg text-center text-black">
            Upload Profile Picture
          </h3>
          <div
            className="absolute top-0 right-0 text-secondary_color cursor-pointer"
            onClick={() => setImageStore("")}>
            {" "}
            <CrossBtnSvg />
          </div>
        </div>
        <textarea
          name=""
          id=""
          placeholder="Write Something"
          onChange={(e) => setCaption(e.target.value)}
          className="w-full outline-none h-14 my-3 px-3 border border-line_color rounded-md resize-none bg-white text-black"></textarea>
        <div className="cropImages w-full h-[320px] flex items-center justify-center  relative">
          <Cropper
            image={imageStore}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="flex items-center justify-center gap-x-3 mt-3">
          <div
            className="w-7 h-7 bg-white-100 flex items-center justify-center cursor-pointer rounded-full text-black"
            onClick={handlezoomOut}>
            <Minus />
          </div>
          <input
            type="range"
            step={0.2}
            min={1}
            max={3}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="custom_range"
            ref={zoomref}
          />
          <div
            className="w-7 h-7 bg-white-100 flex items-center justify-center cursor-pointer rounded-full text-black"
            onClick={handlezoomIn}>
            <Plus />
          </div>
        </div>
        <div className="flex justify-end items-center gap-x-3 mt-5 px-5">
          <span className="text-sm font-gilBold shadow-md py-1 px-2 rounded-sm text-black">
            Save crop Image before Upload Image
          </span>
          <button
            disabled={loading}
            className="bg-white-100 text-base font-gilBold text-black px-3 py-1 rounded-md shadow-md"
            onClick={() => handleCroppedImage("profileImage")}>
            Save Crop Image
          </button>
          <button
            className="bg-blue text-base font-gilBold text-[#fff] px-3 py-1 rounded-md shadow-md"
            onClick={() => handleUploadImage()}
            disabled={loading}>
            {loading ? (
              <PulseLoader color="#fff" size={5} />
            ) : (
              "Upload Crop Image"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePictureUploads;
