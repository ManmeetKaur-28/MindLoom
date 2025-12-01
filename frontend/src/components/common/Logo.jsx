import React from "react";

function Logo() {
  return (
    <span className="flex mx-auto">
      <img
        className="h-11 "
        src="\src\assets\logo_withoutName.png"
        alt="Logo Image"
      />
      <img
        className="h-8 mt-4"
        src="\src\assets\LOGO_Name.png"
        alt="MINDLOOM"
      />
    </span>
  );
}

export default Logo;
