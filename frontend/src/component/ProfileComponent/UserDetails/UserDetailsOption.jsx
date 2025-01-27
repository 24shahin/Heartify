import React, { useEffect, useState } from "react";
import { Job } from "../../../svg/Job";
import { Location } from "../../../svg/Location";
import { HomeIcon } from "../../../svg/Home";
import { Learning } from "../../../svg/Learning";
import { Love } from "../../../svg/Love";
import { Instagram } from "../../../svg/Instagram";
import AddBio from "./AddBio";
import { useUploadUserDetailsMutation } from "../../../feature/api/authApi";
import EditDetails from "./EditDetails";
import { useDispatch } from "react-redux";
import { LogedInUser } from "../../../feature/userSlices/authSlice";

function UserDetailsOption({ profile, visitor, userInfo, setOtherName }) {
  const [details, setDetails] = useState(profile);
  const intialState = {
    bio: details?.bio ? details?.bio : "",
    nickName: details?.nickName ? details?.nickName : "",
    job: details?.job ? details?.job : "",
    workplace: details?.workplace ? details?.workplace : "",
    currentcity: details?.currentcity ? details?.currentcity : "",
    hometown: details?.hometown ? details?.hometown : "",
    college: details?.college ? details?.college : "",
    highschool: details?.highschool ? details?.highschool : "",
    relationship: details?.relationship ? details?.relationship : "",
    instagram: details?.instagram ? details?.instagram : "",
  };
  const [infos, setInfos] = useState(intialState);
  const [showInfo, setShowInfo] = useState(false);
  const [max, setMax] = useState(120);
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(120 - e.target.value.length);
  };
  const [uploadUserDetails] = useUploadUserDetailsMutation();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setDetails(profile);
    setInfos(profile);
  }, [profile]);
  const updateInfos = async () => {
    try {
      setLoading(true);
      const result = await uploadUserDetails({ infos }).unwrap();
      setDetails(result);
      setOtherName(result?.nickName);
      dispatch(LogedInUser({ ...userInfo, nickName: result?.nickName }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userInfo, nickName: result?.nickName })
      );
      setShowInfo(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      {visitor && details?.bio && (
        <div className="text-center mt-3">
          {!showInfo && (
            <div>
              {details?.bio ? (
                <p className="text-sm font-gilNormal text-black">
                  {details?.bio}
                </p>
              ) : (
                <p className="text-sm font-gilNormal text-secondary_color">
                  Add Bio
                </p>
              )}
              <button
                className="text-sm font-gilNormal text-black bg-white-100 inline-block w-full py-1 rounded-md my-3"
                onClick={() => {
                  setShowInfo(true);
                }}>
                Edit Bio
              </button>
            </div>
          )}
        </div>
      )}
      {visitor && !details?.bio && (
        <div className="text-center mt-3">
          {!showInfo && (
            <div>
              {details?.bio ? (
                <p className="md:text-sm text-xs font-gilNormal text-black">
                  {details?.bio}
                </p>
              ) : (
                <p className="text-sm font-gilNormal text-secondary_color">
                  Add Bio
                </p>
              )}
              <button
                className="text-sm font-gilNormal text-black bg-white-100 inline-block w-full py-1 rounded-md my-3"
                onClick={() => {
                  setShowInfo(true);
                }}>
                Add Bio
              </button>
            </div>
          )}
        </div>
      )}
      {showInfo && (
        <AddBio
          setShowInfo={setShowInfo}
          infos={infos}
          handleChnage={handleChnage}
          name="bio"
          max={max}
          updateInfos={updateInfos}
          loading={loading}
          placeholder={"Add Bio"}
        />
      )}
      <div className="flex place-items-start gap-x-1 md:gap-x-2">
        <div className="text-secondary_color mt-1">
          <Job />
        </div>
        <div>
          {details?.job && details?.workplace ? (
            <span className="md:text-sm text-xs font-gilNormal text-black">
              Works as a <b>{details?.job}</b> at <b>{details?.workplace}</b>
            </span>
          ) : details?.job && !details?.workplace ? (
            <span className="md:text-sm text-xs font-gilNormal text-black">
              Works as a <b>{details?.job}</b>
            </span>
          ) : !details?.job && details?.workplace ? (
            <span className="md:text-sm text-xs font-gilNormal text-black">
              Works as a <b>{details?.workplace}</b>
            </span>
          ) : (
            <span className="text-black font-gilNormal text-sm">
              Work Place & Jobs
            </span>
          )}
        </div>
      </div>
      <div className="flex place-items-start  gap-x-1 md:gap-x-2 mt-2">
        <div className="text-secondary_color mt-1">
          <Location />
        </div>
        <div>
          {details?.currentcity ? (
            <span className="md:text-sm text-xs font-gilNormal text-black">
              Lives in <b>{details?.currentcity}</b>
            </span>
          ) : (
            <span className="text-black font-gilNormal text-sm">
              Current City
            </span>
          )}
        </div>
      </div>
      <div className="flex place-items-start  gap-x-1 md:gap-x-2 mt-2">
        <div className="text-secondary_color mt-1">
          <HomeIcon />
        </div>
        <div>
          {details?.hometown ? (
            <span className="md:text-sm text-xs font-gilNormal text-black">
              From <b>{details?.hometown}</b>
            </span>
          ) : (
            <span className="text-black font-gilNormal text-sm">Home Town</span>
          )}
        </div>
      </div>
      <div className="flex place-items-start  gap-x-1 md:gap-x-2 mt-2">
        <div className="text-secondary_color mt-1">
          <Learning />
        </div>
        <div>
          {details?.college ? (
            <span className="md:text-sm text-xs font-gilNormal text-black">
              studied at <b>{details?.college}</b>
            </span>
          ) : (
            <span className="text-black font-gilNormal text-sm">
              Add School or College
            </span>
          )}
        </div>
      </div>
      <div className="flex place-items-start  gap-x-1 md:gap-x-2 mt-2 w-[90%] sm:w-auto">
        <div className="text-secondary_color mt-1">
          <Learning />
        </div>
        <div>
          {details?.highschool ? (
            <span className="md:text-sm text-xs font-gilNormal text-black ">
              Studied at <b>{details?.highschool}</b>
            </span>
          ) : (
            <span className="text-black font-gilNormal text-sm">
              Add High School
            </span>
          )}
        </div>
      </div>
      <div className="flex place-items-start  gap-x-1 md:gap-x-2 mt-2">
        <div className="text-secondary_color mt-1">
          <Love />
        </div>
        <div>
          {details?.relationship ? (
            <span className="md:text-sm text-xs font-gilNormal text-black">
              <b>{details?.relationship}</b>
            </span>
          ) : (
            <span className="text-black font-gilNormal text-sm">
              Add Relationship Status
            </span>
          )}
        </div>
      </div>
      <div className="flex place-items-start  gap-x-1 md:gap-x-2 mt-2">
        <div className="text-secondary_color mt-1">
          <Instagram />
        </div>
        <div>
          {details?.instagram ? (
            <span className="md:text-sm text-xs font-gilNormal text-black">
              <b>{details?.instagram}</b>
            </span>
          ) : (
            <span className="text-black font-gilNormal text-sm">
              Add Instagram
            </span>
          )}
        </div>
      </div>
      {visitor &&
      !details?.nickName &&
      !details?.job &&
      !details?.workplace &&
      !details?.currentcity &&
      !details?.hometown &&
      !details?.college &&
      !details?.highschool &&
      !details?.relationship &&
      !details?.instagram ? (
        <button
          className="text-sm font-gilNormal text-black bg-white-100 inline-block w-full py-1 rounded-md mt-3"
          onClick={() => setModal(true)}>
          Add Bio
        </button>
      ) : (
        visitor && (
          <button
            className="text-sm font-gilNormal text-black bg-white-100 inline-block w-full py-1 rounded-md mt-3"
            onClick={() => setModal(true)}>
            Edit Bio
          </button>
        )
      )}
      <div className="absolute top-0 left-0">
        {modal && (
          <EditDetails
            setModal={setModal}
            modal={modal}
            value={details}
            infos={infos}
            handleChnage={handleChnage}
            updateInfos={updateInfos}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

export default UserDetailsOption;
