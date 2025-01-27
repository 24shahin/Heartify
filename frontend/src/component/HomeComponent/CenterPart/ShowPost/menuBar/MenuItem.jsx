import React from "react";

function MenuItem({ icon, title }) {
    const Icon = icon
    return <div className="flex items-center gap-x-3 text-base text-secondary_color cursor-pointer my-2 py-1 hover:text-black">
        <Icon /> <span className="font-gilNormal">{title }</span>
  </div>;
}

export default MenuItem;
