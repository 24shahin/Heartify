import React, { useEffect, useRef, useState } from "react";
import avater from "../../../../assets/defaultImage/avatar.png";
import { Media } from "../../../../svg/Media";
import { EmojiSvg } from "../../../../svg/EmojiSvg";
import EmojiPicker from "emoji-picker-react";
import OutSideClick from "../../../../functions/click";
import { CircleCross } from "../../../../svg/CircleCross";
import {
  useCreateCommentMutation,
  useUploadPostImagesMutation,
} from "../../../../feature/api/authApi";
import { BeatLoader } from "react-spinners";
import dataURLtoBlob from "../../../../functions/imagesConvertor";
import { useSelector } from "react-redux";

function Comments({
  userInfo,
  commentRef,
  commentText,
  setCommentText,
  setCommentImage,
  setCommentError,
  commentImage,
  commentError,
  viewMood,
  postId,
  setComment,
}) {
  const [emoji, setEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(false);
  const emojiref = useRef(null);
  const chooseFile = useRef(null);
  const [loading, setLoading] = useState(false);

  const [createComment] = useCreateCommentMutation();
  const [uploadPostImages] = useUploadPostImagesMutation();
  // emoji
  OutSideClick(emojiref, () => {
    setEmoji(false);
  });
  const handleEmoji = ({ emoji }, e) => {
    const ref = commentRef.current;
    ref.focus();
    const start = commentText.substring(0, ref.selectionStart);
    const end = commentText.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setCommentText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  useEffect(() => {
    commentRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const themeMode = useSelector((state) => state?.thememode?.mode);
  const handleImage = (e) => {
    const files = e.target.files[0];
    if (
      files.type !== "image/webp" &&
      files.type !== "image/jpeg" &&
      files.type !== "image/gif" &&
      files.type !== "image/png"
    ) {
      setCommentError(
        `${files.name} is not supported ! Only gpj, webp, png, gif files are supported.`
      );
      return;
    } else if (files.size > 1024 * 1024 * 5) {
      setCommentError(
        `${files.name} is too large. Please choose file atlest under 5MB file`
      );
      return;
    }
    const renderFiles = new FileReader();
    renderFiles.readAsDataURL(files);
    renderFiles.onload = (UploadImage) => {
      setCommentImage(UploadImage.target.result);
    };
  };

  const handlePostComment = async (e) => {
    try {
      if (e.key == "Enter") {
        if (commentImage !== "") {
          setLoading(true);
          const postCommentImages = dataURLtoBlob(commentImage);
          const path = `${userInfo.username.replace(
            /\s+/g,
            "_"
          )}/post_images/${postId}`;
          let formData = new FormData();
          formData.append("path", path);
          formData.append("file", postCommentImages);
          const responsCommentImage = await uploadPostImages({
            formData,
            path,
          }).unwrap();

          const commentresult = await createComment({
            comment: commentText,
            image: responsCommentImage[0].url,
            postId: postId,
          }).unwrap();
          setLoading(false);
          setComment(commentresult);
          setCommentText("");
          setCommentImage("");
        } else {
          setLoading(true);
          const commentresult = await createComment({
            comment: commentText,
            image: null,
            postId: postId,
          }).unwrap();
          setLoading(false);
          setComment(commentresult);
          setCommentText("");
          setCommentImage("");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 w-full relative">
        <div
          className={` ${
            viewMood === "List"
              ? "w-[15%] md:w-[10%]"
              : "w-[12%] sm:w-[8%] lg:w-[8%]  3xl:w-[5%]"
          }`}>
          <img
            src={userInfo.profilePicture || avater}
            alt=""
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div
          className={`relative flex items-center  justify-between bg-white-100 rounded-full px-3 py-2 md:p-3 ${
            viewMood === "List"
              ? "w-[85%] md:w-[90%]"
              : "w-[88%] sm:w-[92%] lg:w-[92%]  3xl:w-[95%]"
          }`}>
          <div className="w-[90%] ">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/webp, image/gif, image/png"
              ref={chooseFile}
              onChange={handleImage}
              className="hidden"
            />
            <input
              type="text"
              placeholder={`Comment as ${userInfo.username}`}
              className="w-full text-sm md:px-2 outline-none bg-transparent"
              ref={commentRef}
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              onKeyUp={handlePostComment}
            />
            {loading && (
              <div className="w-full bg-blur flex items-center justify-center z-10 absolute left-0 top-0 h-full">
                <BeatLoader size={10} color="black" />
              </div>
            )}
          </div>
          <div className="flex gap-x-3 relative">
            <div
              className="cursor-pointer text-black"
              onClick={() => chooseFile.current.click()}>
              <Media />
            </div>
            <div
              className="cursor-pointer text-black "
              onClick={() => setEmoji((prev) => !prev)}
              ref={emojiref}>
              <EmojiSvg />
              {emoji && (
                <div className="absolute bottom-[30px] -right-8 lg:right-[-250px] z-10">
                  <EmojiPicker
                    onEmojiClick={handleEmoji}
                    theme={themeMode ? "dark" : "light"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {commentError && (
          <div className="px-4 postanimition bg-blur absolute top-0 left-0 z-50  w-full h-full">
            <div className="flex items-center justify-between  w-full h-full">
              <p className="font-gilBold text-xl text-red w-4/5">
                {commentError}
              </p>
              <button
                className="px-3 py-1 bg-[#703236] rounded-md shadow-md text-white"
                onClick={() => setCommentError("")}>
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
      {commentImage && (
        <div className="pb-5">
          <div className="md:w-48 w-16 rounded-md relative overflow-hidden md:mt-5">
            <img
              src={commentImage}
              alt="commentImage"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute top-1 right-1 md:top-2  md:right-2 cursor-pointer"
              onClick={() => setCommentImage(null)}>
              <CircleCross />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Comments;
