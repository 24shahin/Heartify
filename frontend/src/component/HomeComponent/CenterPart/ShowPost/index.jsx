import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import avater from "../../../../assets/defaultImage/avatar.png";
import { formatDistance } from "date-fns";
import { FaEllipsisH } from "react-icons/fa";
import { Like } from "../../../../svg/Like";
import { Comment } from "../../../../svg/Comment";
import { Share } from "../../../../svg/Share";
import ReactsMap from "./ReactsMap";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import Menu from "./menuBar/Menu";
import defaultCover from "../../../../assets/defaultImage/defaultcover.jpg";
import {
  useGetAllReactQuery,
  usePostReactsMutation,
} from "../../../../feature/api/authApi";
import CommentShow from "./CommentShow";

function ShowPost({ post, viewMood, profileState }) {
  const { userInfo } = useSelector((state) => state.user);
  const [menuShow, setMenuShow] = useState(false);
  const [reactShow, setReactShow] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [count, setCount] = useState(3);
  const [commentImage, setCommentImage] = useState("");
  const [commentError, setCommentError] = useState("");
  const [comment, setComment] = useState([]);
  const commentRef = useRef(null);
  const [postReacts] = usePostReactsMutation();
  const { data: getAllReact } = useGetAllReactQuery({ id: post._id });
  const [reacts, setReacts] = useState();
  const [reactTotal, setReactTotal] = useState();
  const [check, setCheck] = useState();
  const [checkSavedPost, setCheckSavedPost] = useState();

  useEffect(() => {
    if (getAllReact) {
      setReacts(getAllReact?.AllReacts);
      setCheck(getAllReact?.check);
      setReactTotal(getAllReact?.total);
      setCheckSavedPost(getAllReact?.isPostSaved);
    }
  }, [getAllReact]);
  useEffect(() => {
    setComment(post?.comments);
  }, [post]);

  const handleReacts = async (react) => {
    let prvCheck = check;
    let prvReacts = [...reacts];
    let prvTotal = reactTotal;
    if (check == react) {
      setCheck();
      const index = reacts.findIndex((x) => x.react == react);
      if (index !== -1) {
        const updateReacts = reacts.map((r, idx) =>
          idx === index ? { ...r, count: r.count - 1 } : r
        );
        setReacts(updateReacts);
        setReactTotal(reactTotal - 1);
      }
    } else {
      setCheck(react);
      const index = reacts.findIndex((x) => x.react == react);
      const index1 = reacts.findIndex((x) => x.react == check);
      const updateReacts = reacts.map((r, idx) =>
        idx === index
          ? { ...r, count: r.count + 1 }
          : idx === index1
          ? { ...r, count: r.count - 1 }
          : r
      );
      setReacts(updateReacts);
      setReactTotal(
        reactTotal + (index !== -1 ? 1 : 0) - (index1 !== -1 ? 1 : 0)
      );
    }
    try {
      await postReacts({ postId: post._id, react });
    } catch (error) {
      console.log(error);
      setReactTotal(prvTotal);
      setReacts(prvReacts);
      setCheck(prvCheck);
    }
  };

  return (
    <div className="w-full px-5 pt-5 shadow-lg rounded-md mb-5">
      <div className="flex items-center justify-between mb-2 md:mb-5">
        <div className="flex items-center gap-x-3 text-black">
          <div className="w-12 h-12 rounded-full">
            <Link to={`/profile/${post?.user?.username}`}>
              <img
                src={post.user.profilePicture || avater}
                alt="profile picture"
                className="object-cover w-full h-full rounded-full"
              />
            </Link>
          </div>
          <div>
            <div className="flex gap-x-1 items-center">
              <Link
                to={`/profile/${post?.user?.username}`}
                className="text-sm md:text-base">
                {post?.user?.fname + " " + post?.user?.lname}
              </Link>
              {post.type === "profilePicture" ? (
                <span className="font-gilMedium text-xs md:text-sm text-secondary_color">
                  {` Upload ${
                    post.gender === "male" ? "his" : "her"
                  } profile photo`}
                </span>
              ) : (
                post.type === "coverPicture" && (
                  <span className="font-gilMedium text-xs md:text-sm text-secondary_color">
                    {` Upload ${
                      post.gender === "male" ? "his" : "her"
                    } cover photo`}
                  </span>
                )
              )}
            </div>
            <span className="font-gilLight text-xs text-secondary_color block">
              {formatDistance(post.createdAt, new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="cursor-pointer ">
            <FaEllipsisH
              className="text-xl text-black"
              onClick={() => setMenuShow(true)}
            />
          </div>
          {menuShow && (
            <Menu
              setMenuShow={setMenuShow}
              postUserId={post.user._id}
              userInfoId={userInfo.id}
              images={post?.images}
              postId={post._id}
              checkSavedPost={checkSavedPost}
              setCheckSavedPost={setCheckSavedPost}
            />
          )}
        </div>
      </div>
      <div className="relative">
        {post.background ? (
          <div
            style={{
              width: "100% !important",
              backgroundImage: `url(${post.background})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="flex items-center justify-center h-[300px] w-full">
            <h4 className="font-gilBold text-lg text-white">{post.text}</h4>
          </div>
        ) : (
          <>
            <div>
              <h4 className="font-gilBold text-lg text-black">{post.text}</h4>
            </div>
            {post.images && post.images.length > 0 && (
              <div
                className={`mt-2 md:mt-5 relative ${
                  post?.images?.length === 1
                    ? "overflow-hidden h-full w-full"
                    : post?.images?.length === 2
                    ? "overflow-hidden grid grid-cols-2 h-full gap-2 w-full"
                    : post?.images?.length === 3
                    ? "overflow-hidden grid grid-cols-2 h-full gap-2 w-full"
                    : post?.images?.length === 4
                    ? "overflow-hidden grid grid-cols-2 h-full gap-2 w-full"
                    : post?.images?.length >= 5
                    ? "overflow-hidden grid grid-cols-2 h-full gap-2 w-full"
                    : "overflow-hidden"
                }`}>
                {post.type === "profilePicture" ? (
                  <div>
                    <div>
                      <img
                        src={userInfo.coverPicture || defaultCover}
                        alt=""
                        className={
                          profileState
                            ? "w-full h-[200px]"
                            : "w-full h-44 md:h-[300px]"
                        }
                      />
                    </div>
                    <div
                      className={
                        profileState
                          ? "w-[180px] h-[180px] mx-auto -mt-36"
                          : "w-44 h-44 md:w-[280px] md:h-[280px] mx-auto -mt-32 md:-mt-52"
                      }>
                      <img
                        src={post.user.profilePicture || avater}
                        alt=""
                        className="w-full h-full rounded-full object-cover "
                      />
                    </div>
                  </div>
                ) : (
                  post?.images?.slice(0, 4).map((img, index) => (
                    <div
                      className="relative h-full w-full object-cover"
                      key={index}>
                      <img
                        src={img.url}
                        alt=""
                        key={index}
                        className={`w-full h-full object-cover ${
                          post?.images?.length === 3
                            ? " [&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3 "
                            : post?.images?.length === 4 &&
                              " [&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3 "
                        }`}
                      />
                    </div>
                  ))
                )}

                {post?.images?.length >= 5 && (
                  <div className="w-12 h-12 bg-[#ffffff9f] absolute right-28 bottom-6 flex items-center justify-center font-gilBold rounded-full text-base -translate-x-1/2 -translate-y-1/2">
                    +{post.images.length - 4}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <div className="flex items-center my-3">
          <div className="w-1/2">
            <div className="flex items-center gap-x-1 md:gap-x-2">
              {reacts &&
                reacts
                  .slice()
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 3)
                  .map(
                    (react) =>
                      react.count > 0 && (
                        <img
                          src={`../../../../../src/assets/reacts/${react.react}.svg`}
                          alt=""
                          className="w-5 flex"
                          key={react.react}
                        />
                      )
                  )}
              <span className="font-gilLight text-xs text-black">
                {reactTotal ? `${reactTotal} reacts` : ""}{" "}
              </span>
            </div>
          </div>
          <div className="w-1/2 text-right ">
            <span className="font-gilNormal text-xs md:text-sm text-secondary_color ">
              {post?.comments.length} comments
            </span>
          </div>
        </div>
        {reactShow && (
          <div className=" absolute left-0 bottom-14 md:bottom-10 shadow-md  md:w-[310px] rounded-full z-10 bg-white">
            {
              <ReactsMap
                setReactShow={setReactShow}
                handleReacts={handleReacts}
              />
            }
          </div>
        )}
        <div className="border-y border-line_color flex items-center justify-between">
          <div className="w-[30%] justify-center flex py-2 px-4 my-2">
            <div
              className="flex items-center gap-x-1 md:gap-x-2 cursor-pointer font-gilNormal text-base"
              onMouseOver={() => {
                setTimeout(() => {
                  setReactShow(true);
                }, 500);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setReactShow(false);
                }, 500);
              }}
              onClick={() => handleReacts(check ? check : "like")}>
              {check ? (
                <img
                  src={`../../../../../src/assets/reacts/${check}.svg`}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover cursor-pointer "
                />
              ) : (
                <div className="text-black">
                  <Like />
                </div>
              )}
              <span
                className={`font-gilNormal text-sm md:text-base 
                ${
                  check === "haha"
                    ? "text-yellow"
                    : check === "love"
                    ? "text-red"
                    : check === "wow"
                    ? "text-yellow"
                    : check === "sad"
                    ? "text-yellow"
                    : check === "like"
                    ? "text-blue"
                    : check === "angry"
                    ? "text-yellow"
                    : "text-black"
                }`}>
                {check ? check : "Like"}
              </span>
            </div>
          </div>
          <div className="w-[30%] justify-center flex py-2 px-4 my-2">
            <div
              className="flex items-center gap-x-1 md:gap-x-3 cursor-pointer font-gilNormal text-base text-black"
              onClick={() => commentRef.current.focus()}>
              <Comment />
              <span className="font-gilNormal text-sm md:text-base">
                Comments
              </span>{" "}
            </div>{" "}
          </div>
          <div className="w-[30%] justify-center flex py-2 px-4 my-2">
            <div className="flex items-center gap-x-1 md:gap-x-3 cursor-pointer font-gilNormal text-base text-black">
              <Share />
              <span className="font-gilNormal text-sm md:text-base">Share</span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          {comment &&
            comment
              .slice(0, count)
              .sort((a, b) => {
                return new Date(b.commentAt) - new Date(a.commentAt);
              })
              .map((postComment) => (
                <CommentShow key={postComment._id} comment={postComment} />
              ))}
        </div>
        {count < comment.length && (
          <span
            className="text-black font-gilMedium text-base mt-3 cursor-pointer"
            onClick={() => setCount((prev) => prev + 3)}>
            View more comments
          </span>
        )}
        <div>
          <Comments
            userInfo={userInfo}
            commentRef={commentRef}
            commentText={commentText}
            setCommentText={setCommentText}
            setCommentImage={setCommentImage}
            setCommentError={setCommentError}
            commentError={commentError}
            commentImage={commentImage}
            viewMood={viewMood}
            postId={post._id}
            setComment={setComment}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowPost;
