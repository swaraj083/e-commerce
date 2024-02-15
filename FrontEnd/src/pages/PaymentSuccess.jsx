import React, { useEffect } from "react";
import { checkAnimation } from "../assets";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/features/cart/cartSlice";

const PaymentSuccess = () => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(resetCart())
    },[])

    return (
        <div className="relative flex justify-center items-center">
            <img src={checkAnimation} />
            <p className="absolute z-[2] bottom-4 text-green-600 text-4xl">Your Payment was Successful</p>
        </div>
    )
}

export default PaymentSuccess;