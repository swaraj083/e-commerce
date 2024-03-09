import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../redux/features/user/userSlice";
import { resetCart } from "../redux/features/cart/cartSlice";
import { navElements } from "../constants/NavBarElements";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const { userInfo, isLoggedIn } = useSelector((state) => state.user)
  const { value } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const menuOpenHandler = () => {
    setMenu(true);
  };

  const menuCloseHandler = () => {
    setMenu(false);
  };

  return (
    <nav className="flex flex-row justify-between items-center p-2 m-0">
      <div className="flex flex-row gap-4 items-center max-sm:hidden">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 48 48"
          >
            <path
              fill="#F4511E"
              d="M6,16c-3.1,3.7-6,7.6-6,11.1c0,2,1.7,4.9,5.9,4.9c2.3,0,4.5-0.9,6.3-1.6c3-1.2,35.7-15.1,35.7-15.1c0.3-0.2,0.3-0.4-0.1-0.3c-0.2,0-35.6,9.4-35.6,9.4c-0.7,0.2-1.4,0.3-2.1,0.3c-3.1,0-5.1-1.5-5.1-4.7C4.9,18.7,5.1,17.8,6,16L6,16z"
            ></path>
          </svg>
        </Link>
        {
          navElements?.map((element)=>{
            return (
              <Link
                to={element.url}
                className="text-black m-0 text-md font-montserrat font-medium hover:pointer hover:text-blue-400 textShadow montserrat"
              >
                {element.title}
              </Link>
            )
          })
        }
        {
          isLoggedIn && userInfo.isAdmin && <Link
            to="/admin"
            className="text-black m-0 text-md font-montserrat font-medium hover:pointer hover:text-blue-400 textShadow montserrat"
          >
            Dashboard
          </Link>

        }
      </div>
      {
        !isLoggedIn && <div className="flex flex-row gap-3 m-0 max-sm:hidden">
          <Link
            to="/signup"
            className="px-3 py-1 m-0 font-montserrat font-medium text-black hover:pointer hover:text-blue-400 textShadow montserrat"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-3 py-1 m-0 font-montserrat font-medium text-white bg-blue-400 rounded-xl hover:pointer hover:text-black textShadow montserrat"
          >
            Login
          </Link>
        </div>
      }
      {
        isLoggedIn && <div className="flex flex-row gap-3 m-0 max-sm:hidden">
          <Link
          to={`/profile/${userInfo.id}`}
          className="text-black m-0 text-md font-montserrat font-medium hover:pointer hover:text-blue-400 textShadow montserrat"
        >
          My Profile
        </Link>
          <Link to="/cart" className="flex flex-row justify-center items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
            <p className="text-black m-0 text-md font-montserrat font-medium hover:pointer hover:text-blue-400 textShadow montserrat">{value}</p>
          </Link>
          <p onClick={() => {
            dispatch(resetCart());
            dispatch(logOutUser());
          }}
            className="px-3 py-1 m-0 font-montserrat font-medium text-white bg-blue-400 rounded-xl hover:pointer hover:text-black textShadow montserrat"
          >
            Log out
          </p>
        </div>
      }
      <div className="p-4 md:hidden flex flex-row justify-center items-center gap-4 z-[30]">
        <Link to="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 48 48"
          >
            <path
              fill="#F4511E"
              d="M6,16c-3.1,3.7-6,7.6-6,11.1c0,2,1.7,4.9,5.9,4.9c2.3,0,4.5-0.9,6.3-1.6c3-1.2,35.7-15.1,35.7-15.1c0.3-0.2,0.3-0.4-0.1-0.3c-0.2,0-35.6,9.4-35.6,9.4c-0.7,0.2-1.4,0.3-2.1,0.3c-3.1,0-5.1-1.5-5.1-4.7C4.9,18.7,5.1,17.8,6,16L6,16z"
            ></path>
          </svg>
        </Link>
        <p className="text-2xl text-blue-400 font-montserrat">Nike</p>
      </div>
      <div className="p-4 md:hidden">
        <img
          src="./Linkssets/icons/hamburger.svg"
          className="w-8 h-8"
          onClick={menuOpenHandler}
        />
      </div>
      {
        menu && (
          <div className="fixed w-screen h-screen top-0 left-0 bg-blue-400 z-[30] transition duration-500 ease-in-out">
            <div
              className="text-white-400 m-0 text-2xl font-montserrat font-medium hover:pointer hover:text-black p-8"
              onClick={menuCloseHandler}
            >
              X
            </div>
            <div
              className="flex flex-col gap-3 p-4 m-0 justify-center
            items-center"
            >
              {
                navElements?.map((element)=>{
                  return (
                    <Link
                      to={element.url}
                      className="text-white-400 m-0 text-2xl font-montserrat font-medium hover:pointer hover:text-black"
                      onClick={()=>{setMenu(false)}}
                    >
                      {element.title}
                    </Link>
                  )
                })
              }
              
              <hr />
              {
                !isLoggedIn &&
                  <Link
                    to="/signup"
                    className="text-white-400 m-0 text-2xl font-montserrat font-medium hover:pointer hover:text-black"
                    onClick={()=>{setMenu(false)}}  
                  >
                    Sign Up
                  </Link>
                  
              }
              { !isLoggedIn &&
                  <Link
                    to="/login"
                    className="text-white-400 m-0 text-2xl font-montserrat font-medium hover:pointer hover:text-black"
                    onClick={()=>{setMenu(false)}}  
                  >
                    Login
                  </Link>
              }
            </div>
          </div>
        )
      }
    </nav >
  );
}

export default NavBar;
