import React, { useRef, useState } from "react";
import OutSideClick from "../../../../../functions/click";
import MenuItem from "./MenuItem";
import { PinPost } from "../../../../../svg/PinPost";
import { EditPost } from "../../../../../svg/EditPost";
import { SavePost } from "../../../../../svg/SavePost";
import { EnterFullScreen } from "../../../../../svg/EnterFullScreen";
import { Download } from "../../../../../svg/Download";
import { Trash } from "../../../../../svg/Trash";
import {
  useRemovePostMutation,
  useSavePostMutation,
} from "../../../../../feature/api/authApi";
import { saveAs } from "file-saver";

function Menu({
  setMenuShow,
  postUserId,
  userInfoId,
  images,
  postId,
  checkSavedPost,
  setCheckSavedPost,
}) {
  const [userMenu, setUserMenu] = useState(
    postUserId === userInfoId ? true : false
  );
  const menuref = useRef(null);
  OutSideClick(menuref, () => {
    setMenuShow(false);
  });
  const [savePost] = useSavePostMutation();
  const [removePost] = useRemovePostMutation();
  const handleSavePost = async () => {
    savePost(postId);
    if (checkSavedPost) {
      setCheckSavedPost(false);
    } else {
      setCheckSavedPost(true);
    }
    setMenuShow(false);
  };
  const handleDownload = () => {
    images.map((item) => {
      saveAs(item.url, " image.jpg");
    });
    setMenuShow(false);
  };
  const handleRemovePost = () => {
    removePost(postId);
    setMenuShow(false);
  };
  return (
    <div>
      <div
        className="absolute top-5 right-0 w-52 px-3 py-2 shadow-md bg-white z-10"
        ref={menuref}>
        {userMenu && <MenuItem icon={PinPost} title={"Pin Post"} />}
        <div onClick={() => handleSavePost()}>
          {checkSavedPost == true ? (
            <MenuItem icon={SavePost} title={"Unsave Post"} />
          ) : (
            <MenuItem icon={SavePost} title={"Save Post"} />
          )}
        </div>
        {userMenu && <MenuItem icon={EditPost} title={"Edit Post"} />}
        {images && images.length && (
          <div onClick={() => handleDownload()}>
            <MenuItem icon={Download} title={"Download"} />
          </div>
        )}
        {images && images.length && (
          <MenuItem icon={EnterFullScreen} title={"Enter Full Screen"} />
        )}
        {userMenu && (
          <div onClick={() => handleRemovePost()}>
            <MenuItem icon={Trash} title={"Remove Post"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
