import React from "react";
import { PulseLoader } from "react-spinners";

function AddBio({
  setShowInfo,
  infos,
  name,
  handleChnage,
  max,
  updateInfos,
  loading,
  placeholder,
  detail,
  setShow,
  relationship,
}) {
  return (
    <div>
      <div>
        {relationship ? (
          <select
            name={name}
            onChange={handleChnage}
            value={infos?.relationship}
            id=""
            className="outline-none border border-line_color rounded-md px-2 font-gilNormal py-1 w-full cursor-pointer"
          >
            <option value="Select Relationship Status">
              Select Relationship Status
            </option>
            <option value="Single">Single</option>
            <option value="in a relationship">in a relationship</option>
            <option value="it's complecated">it's complecated</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        ) : (
          <textarea
            id=""
            className="w-full h-12 outline-none border border-line_color rounded-md px-2 resize-none py-1 font-gilNormal"
            placeholder={placeholder}
            minLength={120}
            value={infos?.[name]}
            onChange={handleChnage}
            name={name}
          ></textarea>
        )}
        <div className="text-right">
          {!detail && (
            <span className="text-xs text-secondary_color font-gilNormal">
              {` ${max} Characters remaining`}
            </span>
          )}
        </div>
        <div className="flex items-center justify-end gap-x-3 mt-2 mb-3">
          <button
            className="px-3 text-sm py-1 rounded-md bg-white-100 text-black font-gilMedium"
            onClick={() => {
              detail ? setShow(false) : setShowInfo(false);
            }}
          >
            Cancle
          </button>
          <button
            className="px-3 text-sm py-1 rounded-md bg-blue text-white font-gilMedium"
            onClick={() => updateInfos()}
            disabled={loading}
          >
            {loading ? <PulseLoader color="#fff" size={5} /> : " Save Bio"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBio;
