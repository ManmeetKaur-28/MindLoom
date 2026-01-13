import React from "react";
import logoName from "../../assets/LOGO_Name.png";
import logoImage from "../../assets/logo_withoutName.png";
function Logo() {
  return (
    <span className="flex mx-auto">
      <img className="h-11 " src={logoImage} alt="Logo Image" />
      <img className="h-8 mt-4" src={logoName} alt="MINDLOOM" />
    </span>
  );
}

export default Logo;
