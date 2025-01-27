import React, { useEffect, useRef, useState } from "react";
import { CrossBtnSvg } from "../../../../svg/CrossBtnSvg";
import EmojiPikers from "./EmojiPikers";
import ImageViewer from "./ImageViewer";
import AddPost from "./AddPost";
import OutSideClick from "../../../../functions/click";
import avater from "../../../../assets/defaultImage/avatar.png";
import {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useUploadPostImagesMutation,
} from "../../../../feature/api/authApi";
import { useSelector } from "react-redux";
import PostError from "./PostError";
import { PulseLoader } from "react-spinners";
import dataURLtoBlob from "../../../../functions/imagesConvertor";

function CreatePostPopUp({ setCreatePostShow, createPostShow }) {
  const { userInfo } = useSelector((state) => state.user);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [uploadPostImages] = useUploadPostImagesMutation();
  const { refetch: refetchPost } = useGetAllPostsQuery();
  const [text, setText] = useState("");
  const textRef = useRef(null);
  const [imageShow, setImageShow] = useState(false);
  const [background, setBackground] = useState("");
  const [error, setError] = useState("");
  const [imageStore, setImageStore] = useState([]);
  const createpostref = useRef(null);
  OutSideClick(createpostref, () => {
    setCreatePostShow(false);
  });
  useEffect(() => {
    const body = document.body;
    if (createPostShow) {
      body.classList.add("scroll");
    } else {
      body.classList.remove("scroll");
    }
    return () => body.classList.remove("scroll");
  }, [createPostShow]);
  const handlePostSubmit = async () => {
    try {
      let postRespons;
      if (background) {
        postRespons = await createPost({
          type: null,
          text: text,
          images: null,
          background,
          user: userInfo.id,
          token: userInfo.token,
        }).unwrap();
      } else if (imageStore && imageStore.length) {
        const postImages = imageStore.map((item) => dataURLtoBlob(item));
        const path = `${userInfo.username.replace(/\s+/g, "_")}/post_images`;
        let formData = new FormData();
        formData.append("path", path);
        postImages.forEach((img) => {
          formData.append("file", img);
        });

        const responsImage = await uploadPostImages({
          formData,
          path,
          token: userInfo.token,
        }).unwrap();
        postRespons = await createPost({
          type: null,
          text: text,
          images: responsImage,
          background: null,
          user: userInfo.id,
          token: userInfo.token,
        }).unwrap();
      } else if (text) {
        postRespons = await createPost({
          type: null,
          text: text,
          images: null,
          background: null,
          user: userInfo.id,
          token: userInfo.token,
        }).unwrap();
      } else {
        setError("Please Write Your Status Or Choose a File to Upload");
        return;
      }
      if (postRespons.status === "done") {
        await refetchPost();
        setCreatePostShow(false);
        setBackground("");
        setText("");
      }
    } catch (error) {
      setError(error.message || "Something is Wrong");
    }
  };
  return (
    <div className="fixed w-full h-full flex justify-center items-center bg-blur z-20 overflow-hidden">
      <div
        className="w-[90%] md:w-3/5 lg:w-2/5 bg-white shadow-md rounded-md p-4 relative"
        ref={createpostref}>
        {error && <PostError setError={setError} error={error} />}
        <div className="border-b border-white-100 relative pb-3">
          <h3 className="font-gilBold text-lg text-center text-black">
            Create Post
          </h3>
          <div
            className="absolute top-0 right-0 text-secondary_color cursor-pointer"
            onClick={() => setCreatePostShow(false)}>
            {" "}
            <CrossBtnSvg />
          </div>
        </div>
        <div className="mt-3 flex gap-x-3 items-center">
          <div
            className={`w-14 h-14 rounded-full  ${
              userInfo?.profilePicture ? "" : "bg-white-100"
            }`}>
            {" "}
            <img
              src={userInfo.profilePicture || avater}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h3 className="font-gilMedium text-base text-black">
            {userInfo?.fname + " " + userInfo?.lname}
          </h3>
        </div>
        {!imageShow ? (
          <EmojiPikers
            text={text}
            textRef={textRef}
            setText={setText}
            background={background}
            setBackground={setBackground}
          />
        ) : (
          <ImageViewer
            text={text}
            textRef={textRef}
            setText={setText}
            changePart
            imageStore={imageStore}
            setImageStore={setImageStore}
            setImageShow={setImageShow}
            setError={setError}
          />
        )}
        <div>
          <AddPost setImageShow={setImageShow} imageShow={imageShow} />
        </div>
        <div className="mt-3">
          {text == "" && imageStore.length == 0 ? (
            <button
              className="w-full rounded-md  text-black bg-white-100  text-base font-gilBold py-2 transition-all ease-linear duration-200"
              disabled>
              Post
            </button>
          ) : isLoading ? (
            <button
              className="w-full rounded-md hover:text-white text-black bg-white-100 hover:bg-black text-base font-gilBold py-2 transition-all ease-linear duration-200"
              onClick={handlePostSubmit}>
              <PulseLoader color="black" />
            </button>
          ) : (
            <button
              className="w-full rounded-md hover:text-white text-black bg-white-100 hover:bg-black text-base font-gilBold py-2 transition-all ease-linear duration-200"
              onClick={handlePostSubmit}>
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePostPopUp;
