import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components";
import { useDispatch } from "react-redux";
import {gettokens} from "../redux/features/user/userSlice"

function Admin() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(gettokens());
  },[])

  return (
    <div className="bg-primary min-h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Admin;
