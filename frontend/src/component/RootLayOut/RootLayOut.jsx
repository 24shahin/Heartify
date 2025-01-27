import React from "react";
import LeftPart from "../HomeComponent/LeftPart";
import { Outlet } from "react-router-dom";
import Header from "../HomeComponent/CenterPart/Header";
import RightPart from "../HomeComponent/RightPart/Index";

function RootLayOut() {
  return (
    <>
      <div className="grid grid-flow-col-1  lg:grid-cols-[1fr,7fr,1fr] xl:grid-cols-[1fr,3fr,1fr] md:mx-4 lg:mx-5 pt-5 gap-x-4 mx-1">
        <div className="hidden lg:block sticky top-4 left-0 h-[calc(100vh-60px)]">
          <LeftPart />
        </div>
        <div>
          <div className={` sticky top-0 left-0 z-[1] shadow-md rounded-md`}>
            <Header />
          </div>
          <Outlet />
        </div>
        <div className="hidden lg:block sticky top-4 left-0 h-[calc(100vh-60px)]">
          <RightPart />
        </div>
      </div>
    </>
  );
}

export default RootLayOut;
