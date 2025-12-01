import React from "react";
import { Logo, LogoutBtn } from "../index.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const authStatus = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Dashboard",
      slug: "/dashboard",
      active: authStatus,
    },
    {
      name: "Create",
      slug: "/create",
      active: authStatus,
    },
    {
      name: "Register",
      slug: "/register",
      active: authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ];
  const navigate = useNavigate();
  return (
    <header className="bg-black">
      <nav className="text-white flex justify-between ">
        <div className="py-4 px-5 ">
          <Logo />
        </div>
        <div>
          <ul className="flex px-5 py-3 align-middle">
            {navItems.map((item) =>
              item.active ? (
                <li
                  key={item.name}
                  className={`px-3 my-3 flex align-center hover:text-indigo-500/80 transition  ${
                    location.pathname == item.slug ? "text-indigo-500/80" : ""
                  }`}
                >
                  <button onClick={() => navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && <LogoutBtn />}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
