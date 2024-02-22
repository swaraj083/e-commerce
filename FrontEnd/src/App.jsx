import { useEffect } from "react";
// import "./App.css";
import "./index.css"
import { NavBar, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import {gettokens} from "./redux/features/user/userSlice"


export default function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(gettokens());
  },[])

  return (
    <main className="bg-primary">
      <NavBar />
      <section className="">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}
