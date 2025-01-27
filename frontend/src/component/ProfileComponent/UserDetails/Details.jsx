import React, { useState } from "react";
import { Plus } from "../../../svg/Plus";
import AddBio from "./AddBio";
import { EditPost } from "../../../svg/EditPost";

function Details({
  text,
  placeholder,
  detail,
  value,
  icon,
  infos,
  name,
  handleChnage,
  updateInfos,
  relationship,
  loading
}) {
  const [show, setShow] = useState(false);
  const Icon = () => {
    return icon;
  };
  return (
    <>
      {value ? (
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShow(true)}
        >
          <div>
            <div className="flex items-center gap-x-1 text-secondary_color cursor-pointer my-1 text-sm">
              <Icon />
              <span>{value}</span>
            </div>
          </div>
          <div>
            <EditPost />
          </div>
        </div>
      ) : (
        <div
          className="flex items-center gap-x-1 text-secondary_color cursor-pointer my-1 text-sm"
          onClick={() => setShow(true)}
        >
          <Plus />
          <span>Add {text}</span>
        </div>
      )}
      {show && (
        <AddBio
          placeholder={placeholder}
          detail={detail}
          setShow={setShow}
          infos={infos}
          name={name}
          handleChnage={handleChnage}
          updateInfos={updateInfos}
          relationship={relationship}
          loading={loading}
        />
      )}
    </>
  );
}

export default Details;
