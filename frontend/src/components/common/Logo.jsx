import React from "react";
import logoName from "../../assets/LOGO_Name.png";
function Logo() {
  return (
    <span className="flex mx-auto">
      <img
        className="h-11 "
        src="frontend\src\assets\logo_withoutName.png"
        alt="Logo Image"
      />
      <img
        className="h-8 mt-4"
        src="frontend\src\assets\LOGO_Name.png"
        alt="MINDLOOM"
      />
    </span>
  );
}

export default Logo;
