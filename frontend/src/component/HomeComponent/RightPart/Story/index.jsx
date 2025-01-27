import React from "react";
import { storyData } from "./storyData";
import { Swiper, SwiperSlide } from "swiper/react";

function Stories() {
  return (
    <div>
      <h3 className="font-gilBold text-base leading-none text-black">
        Stories
      </h3>
      <div className="mt-4 flex justify-center gap-x-3 w-[300px]">
        <Swiper spaceBetween={10} slidesPerView={3}>
          {storyData.map((data, index) => (
            <SwiperSlide
              style={{ background: `url(${data.bgPicture})` }}
              key={index}
              className="w-[33%] h-[200px] border-2 border-secondary_color rounded-md bg-no-repeat bg-cover bg-center">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-hove_color mt-1 ml-1">
                <img src={data.picture} alt="" className="w-full object-top" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Stories;
