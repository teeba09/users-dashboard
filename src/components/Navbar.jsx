import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../store/useApp";

function Navbar() {
  const navigate = useNavigate();
  const { setIisLogin } = useApp();

  return (
    <div>
      <div>
        <button
          onClick={() => {
            localStorage.clear();
            setIisLogin(false);
            navigate("/login");
          }}
          className="bg-red-400 p-2 m-2 hover:bg-red-700 text-white flex justify-end items-center"
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center items-center gap-9">
        <h1
          className="underline hover:text-purple-800"
          onClick={() => {
            navigate("/");
          }}
        >
          Users
        </h1>
        <h1
          className="underline  hover:text-purple-800"
          onClick={() => {
            navigate("/analytics");
          }}
        >
          Analytics
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
