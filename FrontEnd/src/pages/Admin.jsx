import React, {useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {gettokens} from "../redux/features/user/userSlice"
import { Link } from "react-router-dom";


const navigations = [
  // {
  //   title:"Featured",
  //   url:"featured",
  // },
  // {
  //   title:"Products",
  //   url:"products",
  // },
  {
    title:"Add Product",
    url:"add-product",
  },
  {
    title:"Add Featured",
    url:"add-featured",
  },
  {
    title:"Users",
    url:"users"
  }
]


function Admin() {
  const activeMenu = true;
  const { userInfo, isLoggedIn } = useSelector((state) => state.user)
  const navigate = useNavigate();

  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(gettokens());
    if(!isLoggedIn || userInfo?.isAdmin===false){
      navigate("/login");
    }
  },[])

  return (
      <div  className="grid grid-cols-5">
    <div className="col-span-1 h-screen bg-white md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 shadow-lg max-sm:hidden">
        {
          activeMenu && 
          <>
            <div className="flex justify-between items-center">
              <Link to="/admin" onClick={()=>{}} className="items-center gap-3 ml-3 mt-4 flex text-4xl font-extrabold text-slate-900"><span>Nike</span></Link>
            </div>
            <div className="mt-10 flex flex-col items-start">
              {
                navigations.map((link,index)=>{
                  return (
                    <Link to={link.url} key={index} className="text-gray-400 m-3 mt-4 uppercase">
                        {link.title}
                    </Link>
                  )
                })
              }
            </div>
          </>
        }
    </div>
    <div className="col-span-4 max-sm:col-span-5  max-sm:hidden">
        <nav className="w-full text-slate-gray flex flex-row justify-between items-center bg-white py-2 px-4 shadow-lg md:justify-end">
          <p className="md:hidden">Menu</p>
          <div className="flex justify-center items-center gap-4">
            <Link to="/">Site</Link>
          <Link
            to="/login"
            className="px-3 py-1 m-0 font-montserrat font-medium text-white bg-coral-red rounded-xl hover:pointer hover:text-slate-gray textShadow montserrat"
          >
            Logout
          </Link>
          </div>
        </nav>
        
        <Outlet />
    </div>
    <div className="md:hidden w-screen h-screen text-4xl font-bold text-center flex flex-col justify-center items-center">
        <h1>Only Availble on Desktop</h1>
        <Link to="/" className="text-2xl hover:text-blue-400">Click to Go to website</Link>
    </div>
    </div>
  );
}

export default Admin;
