import React from "react";
import logoWithoutName from "../../assets/logo_withoutName.png";
import logoName from "../../assets/LOGO_Name.png";
function Logo() {
  return (
    <span className="flex mx-auto">
      <img className="h-11 " src={logoWithoutName} alt="Logo Image" />
      <img className="h-8 mt-4" src={logoName} alt="MINDLOOM" />
    </span>
  );
}

export default Logo;
