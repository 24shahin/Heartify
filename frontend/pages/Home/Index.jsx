import React from "react";
import { Helmet } from "react-helmet-async";
import CenterPart from "../../component/HomeComponent/CenterPart/CenterPart";
import ReAuth from "../../component/HomeComponent/ReAuth";
import { useSelector } from "react-redux";
import ShowPost from "../../component/HomeComponent/CenterPart/ShowPost";

function Home({ setCreatePostShow, allpostData }) {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <>
      <Helmet>
        <title className="font-gilBold text-black text-base">Home</title>
      </Helmet>
      {userInfo.verify === false && <ReAuth userInfo={userInfo} />}
      <CenterPart
        setCreatePostShow={setCreatePostShow}
        allpostData={allpostData}
      />
      <div className="mt-10 w-full">
        {allpostData?.map((item) => (
          <ShowPost key={item._id} post={item} />
        ))}
      </div>
    </>
  );
}

export default Home;
