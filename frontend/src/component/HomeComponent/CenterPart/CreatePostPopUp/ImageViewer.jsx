import React, { useRef } from "react";
import EmojiPikers from "./EmojiPikers";
import { Media } from "../../../../svg/Media";
import { CrossBtnSvg } from "../../../../svg/CrossBtnSvg";

function ImageViewer({
  text,
  textRef,
  setText,
  setImageStore,
  imageStore,
  setImageShow,
  setError,
}) {
  const imgRef = useRef(null);
  const handleImage = (e) => {
    const File = Array.from(e.target.files);
    File.forEach((img) => {
      if (
        img.type !== "image/webp" &&
        img.type !== "image/jpeg" &&
        img.type !== "image/gif" &&
        img.type !== "image/png"
      ) {
        File.filter((item) => item.name !== img.name);
        setError(
          `${img.name} is not supported ! Only gpj, webp, png, gif files are supported.`
        );
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        File.filter((item) => item.name !== img.name);
        setError(
          `${img.name} is too large. Please choose file atlest under 5MB file`
        );
        return;
      }
      const renderFiles = new FileReader();
      renderFiles.readAsDataURL(img);
      renderFiles.onload = (UploadImage) => {
        setImageStore((PrevImage) => [...PrevImage, UploadImage.target.result]);
      };
    });
  };
  return (
    <>
      <div>
        {" "}
        <EmojiPikers
          text={text}
          textRef={textRef}
          setText={setText}
          changePart
        />
      </div>
      <div className="p-2 border border-line_color rounded-md ">
        <div className="w-full bg-white-100 h-[230px] rounded-md">
          <input
            type="file"
            multiple
            accept="image/jpeg,image/webp, image/gif, image/png"
            ref={imgRef}
            onChange={handleImage}
            className="hidden"
          />
          {imageStore && imageStore.length ? (
            <div className="relative h-full">
              <div
                className={`${
                  imageStore.length === 1
                    ? "overflow-hidden h-full w-full"
                    : imageStore.length === 2
                    ? "overflow-hidden grid grid-cols-2 h-full gap-2 w-full"
                    : imageStore.length === 3
                    ? "overflow-hidden grid grid-cols-2 h-full gap-2 w-full"
                    : imageStore.length === 4
                    ? "overflow-hidden grid grid-cols-2 h-full gap-2 w-full"
                    : imageStore.length >= 5
                    ? "overflow-hidden grid grid-cols-2 h-full gap-2 w-full"
                    : "overflow-hidden"
                }`}>
                <div
                  className="text-sm absolute top-0 right-0 text-secondary_color cursor-pointer z-30"
                  onClick={() => setImageStore([])}>
                  {" "}
                  <CrossBtnSvg />
                </div>
                <span
                  className="absolute z-10 px-2 py-1 bg-secondary_color rounded-md text-xs left-1 top-1 cursor-pointer flex gap-x-1"
                  onClick={() => imgRef.current.click()}>
                  <Media />
                  Add More Photos/Videos
                </span>
                {imageStore.slice(0, 4).map((img, index) => (
                  <div
                    className="relative h-full w-full object-cover"
                    key={index}>
                    <img
                      src={img}
                      alt=""
                      className={`w-full h-full object-cover ${
                        imageStore.length === 3
                          ? " [&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3 "
                          : imageStore.length === 4 &&
                            " [&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3 "
                      }`}
                    />
                  </div>
                ))}
                {imageStore.length >= 5 && (
                  <div className="w-12 h-12 bg-[#ffffff9f] absolute right-14 bottom-8 flex items-center justify-center font-gilBold rounded-full text-base -translate-x-1/2 -translate-y-1/2">
                    +{imageStore.length - 4}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <div className="w-[25px] h-[25px]">
                <div
                  className=" absolute top-0 right-0 text-secondary_color cursor-pointer z-30"
                  onClick={() => setImageShow(false)}>
                  {" "}
                  <CrossBtnSvg />
                </div>
              </div>
              <div
                className="flex justify-center items-center h-full w-full flex-col cursor-pointer text-black"
                onClick={() => imgRef.current.click()}>
                <Media />
                <p className=" font-gilBold text-black text-base mt-3">
                  Add Photos/Videos
                </p>
                <p className=" font-gilBold text-black text-base">
                  or Drag and Drop
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ImageViewer;
