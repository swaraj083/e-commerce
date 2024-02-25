import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUpUser, setErrorMessage } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [userDetails, setUserDetails] = useState({ firstName: "", lastName: "", mobile: "", email: "", password: "", confirmPassword: "", address: "", landmark: "", city: "", state: "", country: "", pincode: "" });
    const { isLoggedIn, status, errorMessage,userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }else{
            setUserDetails(userInfo);
            console.log(userInfo)
        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        
    };
    return (
        <div className="bg-primary flex flex-col justify-center w-full px-8 py-2">
            {status === 'rejected' && <div>
                {errorMessage}
            </div>}
            <h1 className="text-6xl text-black font-bold font-[monospace]">My Profile</h1>
            <form
                onSubmit={submitHandler}
                className="w-1/2 grid grid-cols-2 mt-4 self-center gap-4 boxShadow-lg"
            >
                {/* <h1 className="col-span-2 text-center text-2xl text-black font-bold font-[monospace] pb-2 border-b-2 border-black">Sign Up</h1> */}
                <div className="col-span-2 grid grid-cols-2 items-center gap-2">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        required
                        value={userDetails.firstName}
                        onChange={changeHandler}
                        className="col-span-1 text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                        />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        value={userDetails.lastName}
                        onChange={changeHandler}
                        className="col-span-1 text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                        />
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={userDetails.email}
                    onChange={changeHandler}
                    className="col-span-2 text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    required
                    value={userDetails.mobile}
                    onChange={changeHandler}
                    className="col-span-2 text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    value={userDetails.address}
                    onChange={changeHandler}
                    className="col-span-1 text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark"
                    required
                    value={userDetails.landmark}
                    onChange={changeHandler}
                    className="col-span-1 text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={userDetails.city}
                    onChange={changeHandler}
                    className="col-span-1 text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    value={userDetails.state}
                    onChange={changeHandler}
                    className="col-span-1 text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    required
                    value={userDetails.country}
                    onChange={changeHandler}
                    className="col-span-1 text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    required
                    value={userDetails.pincode}
                    onChange={changeHandler}
                    className="col-span-1 text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="submit"
                    value="Update"
                    className="col-span-2 py-1 px-4 rounded-md bg-black text-white"
                />
            </form>
        </div>
    );
}

export default Profile;