import React from "react";
import { reactsEmoji } from "./reactsEmoji";

function ReactsMap({ setReactShow, handleReacts }) {
  return (
    <div
      className="flex items-center gap-x-1 "
      onMouseOver={() => {
        setTimeout(() => {
          setReactShow(true);
        }, 500);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setReactShow(false);
        }, 500);
      }}>
      {reactsEmoji.map((item, index) => (
        <img
          src={item.image}
          alt="reacts"
          key={index}
          className="md:w-12 w-8 md:h-12 h-8 rounded-full scale-100 hover:scale-[1.3] cursor-pointer transition-all ease-linear duration-200 "
          onClick={() => handleReacts(item.name)}
        />
      ))}
    </div>
  );
}

export default ReactsMap;
