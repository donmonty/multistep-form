import React from "react";

import logo from "../images/culina-logo.png";

export default function Header() {
  return (
    <div className="bg-white pt-2 pb-4 lg:pt-2.5 lg:pb-6 w-full h-[68px] lg:h-[75px] flex justify-center items-center">
      <img className="h-[40px]" src={logo} alt="culina logo"/>
    </div>
  );
}