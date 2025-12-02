import React from "react";

function Footer() {
  return (
    <footer className="text-white py-3 bg-black ">
      <p className="text-center">
        &copy; {new Date().getFullYear()} MindLoom : All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
