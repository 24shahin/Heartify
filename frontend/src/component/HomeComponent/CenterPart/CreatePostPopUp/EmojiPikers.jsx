import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { EmojiSvg } from "../../../../svg/EmojiSvg";
import { postBackgrounds } from "./postBackground";
import { useSelector } from "react-redux";

function EmojiPikers({
  textRef,
  text,
  setText,
  changePart,
  setBackground,
  background,
}) {
  const [emoji, setEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(false);
  const [showBg, setShowbg] = useState(false);
  const themeMode = useSelector((state) => state?.thememode?.mode);

  const handleEmoji = ({ emoji }, e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const bgref = useRef(null);
  const handleBgShow = () => {
    setShowbg(true);
    textRef.current.focus();
  };
  const handlebg = (index) => {
    bgref.current.style.backgroundImage = `url(${postBackgrounds[index]})`;
    setBackground(postBackgrounds[index]);
    bgref.current.classList.add("bgClass");
    textRef.current.focus();
  };
  const handlebgRemove = () => {
    setShowbg(false);
    bgref.current.style.backgroundImage = "";
    bgref.current.classList.remove("bgClass");
    textRef.current.focus();
    setBackground("");
  };

  return (
    <>
      <div className="my-3">
        <div className={`flex justify-between `}>
          <div className={` w-full`} ref={bgref}>
            <textarea
              name=""
              id=""
              placeholder="What's Up Say Something !"
              className={`text-black ${
                changePart
                  ? "w-[95%] h-full outline-none p-2 resize-none bg-transparent"
                  : "w-full h-full outline-none p-2 resize-none bg-transparent"
              }`}
              ref={textRef}
              onChange={(e) => setText(e.target.value)}
              value={text}
              style={{
                paddingTop: `${
                  background
                    ? Math.abs(textRef.current.value.length * 0.07 - 20)
                    : "0"
                }%`,
              }}></textarea>
          </div>
          <div className={`${changePart ? "block mt-3 relative" : "hidden"}`}>
            <div
              onClick={() => setEmoji((prev) => !prev)}
              className="cursor-pointer text-black">
              <EmojiSvg />
            </div>
            {emoji && (
              <div className="absolute top-[-20px] right-[-370px]">
                <EmojiPicker
                  onEmojiClick={handleEmoji}
                  theme={themeMode ? "dark" : "light"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          !changePart
            ? "relative flex items-center justify-between mb-3"
            : "hidden"
        }>
        <div className="flex gap-x-1 overflow-x-scroll sm:overflow-auto">
          <div
            onClick={handleBgShow}
            className={`w-10 h-10 bg-gradient-to-r from-cyan-100 to-pink-100 rounded-md cursor-pointer shadow-md ${
              showBg ? "hidden" : "block"
            }`}></div>
          <div
            className={`md:w-10 md:h-10 p-2 md:p-0 bg-white text-black justify-center items-center rounded-md cursor-pointer shadow-md border border-line_color ${
              !showBg ? "hidden" : "flex"
            }`}
            onClick={() => handlebgRemove()}>
            <span className="h-6 w-6 rounded-full border-2"></span>
          </div>

          {showBg &&
            postBackgrounds.map((item, index) => (
              <img
                src={item}
                alt=""
                className="w-10 h-10 rounded-md cursor-pointer shadow-md object-cover bg-no-repeat"
                onClick={() => handlebg(index)}
                key={index}
              />
            ))}
        </div>
        <div
          onClick={() => setEmoji((prev) => !prev)}
          className="cursor-pointer text-black">
          <EmojiSvg />
        </div>
        {emoji && (
          <div className="absolute top-[-300px] right-[-370px]">
            <EmojiPicker
              onEmojiClick={handleEmoji}
              theme={themeMode ? "dark" : "light"}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default EmojiPikers;
