import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const { isLoggedIn, errorMessage, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginDetails));
    setLoginDetails({ email: "", password: "" })
  };
  return (
    <div className="bg-primary flex flex-col justify-center items-center w-full h-screen">
      {status === 'rejected' && <div>
        {errorMessage}
      </div>}
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-start items-center gap-4 boxShadow-lg"
      >
        <p className="text-2xl">Login</p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginDetails.email}
          required
          onChange={changeHandler}
          className="text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginDetails.password}
          required
          className="text-center text-coral-red placeholder-coral-red py-1  border-2 border-coral-red"
          onChange={changeHandler}
        />
        <input
          type="submit"
          value="Login"
          className="border-2 border-coral-red py-1 px-4 rounded-md bg-coral-red text-white"
        />
      </form>
    </div>
  );
}

export default Login;
