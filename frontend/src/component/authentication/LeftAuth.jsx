import React from "react";

function LeftAuth({ regIcon, tittle, description }) {
  return (
    <div>
      <div>{regIcon}</div>
      <h3 className="font-gilBold text-5xl text-green">{tittle}</h3>
      <p className="font-gilNormal text-base mt-4 text-black">{description}</p>
    </div>
  );
}

export default LeftAuth;
