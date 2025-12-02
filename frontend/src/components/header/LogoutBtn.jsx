import React from "react";
import { Button } from "../index";
import { logout } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { BASE_URL } from "../../import";
function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutSession = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(logout());
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Button
      className="px-2  
                hover:bg-purple-500/80 hover:border-purple-400"
      onClick={logoutSession}
    >
      Logout
    </Button>
  );
}

export default LogoutBtn;
