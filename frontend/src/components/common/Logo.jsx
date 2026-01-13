import React from "react";
function Logo() {
  return (
    <span className="flex mx-auto">
      {" "}
      <img
        className="h-11 "
        src="/assets/logo_icon.png"
        alt="Logo Image"
      />{" "}
      <img className="h-8 mt-4" src="/assets/logo_name.png" alt="MINDLOOM" />{" "}
    </span>
  );
}
export default Logo;
