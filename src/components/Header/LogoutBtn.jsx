import React from "react";
import authService from "../../services/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logoutUser()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log("Problem, while logout! :: ", error);
      });
  };

  return (
    <button
      className="bg-[#343131] text-[#F5F5F5] font-bold inline-bock px-6 py-2 duration-200 hover:bg-[#666] rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
