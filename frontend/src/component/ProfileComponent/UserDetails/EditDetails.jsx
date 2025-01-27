import React, { useEffect, useRef } from "react";
import { CrossBtnSvg } from "../../../svg/CrossBtnSvg";
import OutSideClick from "../../../functions/click";
import Details from "./Details";
import { Job } from "../../../svg/Job";
import { HomeIcon } from "../../../svg/Home";
import { Learning } from "../../../svg/Learning";
import { Facesvg } from "../../../svg/Facesvg";
import { Love } from "../../../svg/Love";
import { Instagram } from "../../../svg/Instagram";

function EditDetails({
  modal,
  setModal,
  value,
  infos,
  handleChnage,
  updateInfos,
  loading,
}) {
  const model = useRef(null);
  OutSideClick(model, () => setModal(false));
  useEffect(() => {
    const body = document.body;
    if (modal) {
      body.classList.add("scroll");
    } else {
      body.classList.remove("scroll");
    }
    return () => body.classList.remove("scroll");
  }, [modal]);

  return (
    <>
      <div className="fixed w-full h-full flex justify-center items-center bg-blur z-20 overflow-hidden left-0 top-0">
        <div
          className="w-[90%] md:w-2/5 bg-white shadow-md rounded-md p-4 relative"
          ref={model}>
          <div className="border-b border-white-100 relative pb-3">
            <h3 className="font-gilBold text-lg text-center text-black">
              Customize User Details
            </h3>
            <div
              className="absolute top-0 right-0 text-secondary_color cursor-pointer"
              onClick={() => setModal(false)}>
              {" "}
              <CrossBtnSvg />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-gilMedium text-base text-black">Others name</h2>
            <Details
              text={"Others name"}
              placeholder={"Others name"}
              detail
              value={value?.nickName}
              icon={<Facesvg />}
              infos={infos}
              name="nickName"
              handleChnage={handleChnage}
              updateInfos={updateInfos}
              loading={loading}
            />
          </div>
          <div>
            <h2 className="font-gilMedium text-base text-black">
              Work Place & Jobs
            </h2>
            <Details
              text={"Jobs"}
              placeholder={"jobs"}
              detail
              value={value?.job}
              icon={<Job />}
              infos={infos}
              name="job"
              handleChnage={handleChnage}
              updateInfos={updateInfos}
              loading={loading}
            />
            <Details
              text={"Work Place"}
              placeholder={"Work Place"}
              detail
              value={value?.workplace}
              icon={<Job />}
              infos={infos}
              name="workplace"
              handleChnage={handleChnage}
              updateInfos={updateInfos}
              loading={loading}
            />
          </div>
          <div>
            <h2 className="font-gilMedium text-base text-black">
              Current City
            </h2>
            <Details
              text={"Current City"}
              placeholder={"Current City"}
              detail
              value={value?.currentcity}
              icon={<HomeIcon />}
              infos={infos}
              name="currentcity"
              handleChnage={handleChnage}
              updateInfos={updateInfos}
              loading={loading}
            />
          </div>
          <div>
            <h2 className="font-gilMedium text-base text-black">Home Town</h2>
            <Details
              text={"Home Town"}
              placeholder={"Home Town"}
              detail
              value={value?.hometown}
              icon={<HomeIcon />}
              infos={infos}
              name="hometown"
              handleChnage={handleChnage}
              updateInfos={updateInfos}
              loading={loading}
            />
          </div>
          <div>
            <h2 className="font-gilMedium text-base text-black">Educations</h2>
            <Details
              text={"College"}
              placeholder={"College"}
              detail
              value={value?.college}
              icon={<Learning />}
              infos={infos}
              name="college"
              handleChnage={handleChnage}
              updateInfos={updateInfos}
              loading={loading}
            />
            <Details
              text={"Hight School"}
              placeholder={"High School"}
              detail
              value={value?.highschool}
              icon={<Learning />}
              infos={infos}
              name="highschool"
              handleChnage={handleChnage}
              updateInfos={updateInfos}
              loading={loading}
            />
          </div>
          <div>
            <h2 className="font-gilMedium text-base text-black">
              Relationship Status
            </h2>
            <Details
              text={"Relationship Status"}
              placeholder={"Relationship Status"}
              detail
              value={value?.relationship}
              icon={<Love />}
              infos={infos}
              name="relationship"
              handleChnage={handleChnage}
              updateInfos={updateInfos}
              relationship
              loading={loading}
            />
          </div>
          <div>
            <h2 className="font-gilMedium text-base text-black">
              Instagram Account
            </h2>
            <Details
              text={"instagram"}
              placeholder={"instagram"}
              detail
              value={value?.instagram}
              icon={<Instagram />}
              infos={infos}
              name="instagram"
              handleChnage={handleChnage}
              updateInfos={updateInfos}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditDetails;
