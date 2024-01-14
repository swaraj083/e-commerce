import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUpUser, setErrorMessage } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [signUpDetails, setSignUpDetails] = useState({ firstName: "", lastName: "", mobile: "", email: "", password: "", confirmPassword: "", address: "", landmark: "", city: "", state: "", country: "", pincode: "" });
    const { isLoggedIn, status, errorMessage } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (isLoggedIn) {
            setSignUpDetails({ firstName: "", lastName: "", mobile: "", email: "", password: "", confirmPassword: "", address: "", landmark: "", city: "", state: "", country: "", pincode: "" });
            navigate("/");
        }
    }, [isLoggedIn])

    const submitHandler = (e) => {
        e.preventDefault();
        if (signUpDetails.password === signUpDetails.confirmPassword) {
            dispatch(signUpUser(signUpDetails));
        }else{
            setErrorMessage("Password and Confirm Password Does Not Match");
        }
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
                <p className="text-2xl">SignUp</p>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={signUpDetails.firstName}
                    onChange={changeHandler}
                    className="text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={signUpDetails.lastName}
                    onChange={changeHandler}
                    className="text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    required
                    value={signUpDetails.mobile}
                    onChange={changeHandler}
                    className="text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={signUpDetails.email}
                    onChange={changeHandler}
                    className="text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={signUpDetails.password}
                    className="text-center text-coral-red placeholder-coral-red py-1  border-2 border-coral-red"
                    onChange={changeHandler}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    value={signUpDetails.confirmPassword}
                    className="text-center text-coral-red placeholder-coral-red py-1  border-2 border-coral-red"
                    onChange={changeHandler}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    value={signUpDetails.address}
                    onChange={changeHandler}
                    className="text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark"
                    required
                    value={signUpDetails.landmark}
                    onChange={changeHandler}
                    className="text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={signUpDetails.city}
                    onChange={changeHandler}
                    className="text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    value={signUpDetails.state}
                    onChange={changeHandler}
                    className="text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    required
                    value={signUpDetails.country}
                    onChange={changeHandler}
                    className="text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    required
                    value={signUpDetails.pincode}
                    onChange={changeHandler}
                    className="text-center text-coral-red placeholder-coral-red py-1 border-2 border-coral-red"
                />
                <input
                    type="submit"
                    value="SignUp"
                    className="border-2 border-coral-red py-1 px-4 rounded-md bg-coral-red text-white"
                />
            </form>
        </div>
    );
}

export default SignUp;
