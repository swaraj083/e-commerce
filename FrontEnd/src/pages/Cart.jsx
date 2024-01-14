import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, resetCart, updateQuantity } from "../redux/features/cart/cartSlice";

const ProductRow = ({ productID, productName, quantity, amount, size, productThumbnail }) => {
    const dispatch = useDispatch();
    const host = "http://localhost:5000";

    const quantityUpdater = (e) => {
        if (e.target.value < 0) {

            return;
        }
        if(e.target.value===0){
            dispatch(removeFromCart(productID,size));
        }else{
            dispatch(updateQuantity({productID,quantity:e.target.value,size}));
        }
    }

    return (<div className="flex flex-row w-full gap-12 justify-center items-center font-monserrat text-slate-gray font-medium py-2 shadow-md bg-white-400">
        <div className="w-2/6">
            <img src={host + "/uploads/" + productThumbnail} className="w-full" />
        </div>
        <div className="w-3/6 flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center w-full text-2xl text-black">
                <p>{productName}</p>
                <p>MRP: &#8377; {amount}</p>
            </div>
            <div className="flex flex-row justify-start items-center gap-6 w-full text-lg">
                <p>Size: {size}</p>
                <span>
                    <label htmlFor="quantity">Quantity:</label>
                    <select name="quantity" defaultValue={quantity} className="w-12 text-center rounded-sm ml-2 bg-white-400" onChange={quantityUpdater}>
                        {

                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                                return (
                                    <option key={num} value={num}>{num}</option>
                                )

                            })
                        }
                    </select>
                </span>
            </div>
            <div>
            <span onClick={() => { dispatch(removeFromCart({ productID, size })) }}>
                 <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></span>

            </div>
        </div>
    </div>)
}

export default function Cart() {
    const { productList, totalAmount } = useSelector((state) => state.cart);
    const { isLoggedIn } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(()=>{},productList)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn])

    return <section className="min-h-[50vh] bg-primary">
        <h1 className="text-slate-gray m-0 text-4xl font-montserrat font-medium max-sm:text-2x">
            Cart
        </h1>
        <div className="flex flex-row justify-center gap-8">
        <div className="flex flex-col px-2 py-4 w-2/5 gap-2 justify-center items-center">
            {
                productList.map((product) => {
                    return <ProductRow key={product.productID + product.size} productID={product.productID} productName={product.productName} quantity={product.quantity} amount={product.amount} size={product.size} productThumbnail={product.productThumbnail} />
                })
            }
        </div>
        <div className="w-2/5">
            <div className="bg-white shadow-xl  py-4">
                <h1 className="text-3xl text-black font-medium font-monserrat my-3 text-center">Summary</h1>
                <div className="mx-4 py-4 my-2 border-b-2 border-slate-gray">
                <div className="flex flex-row justify-center items-center gap-8 text-center">
                    <h1 className="text-coral-red font-medium text-xl w-1/2">Subtotal:</h1>
                    <h1 className="text-black font-medium text-xl">&#8377; {totalAmount}</h1>
                </div>
                <div className="flex flex-row justify-center items-center gap-8 text-center">
                    <h1 className="text-coral-red font-medium text-xl w-1/2">Estimated Delivery Charge:</h1>
                    <h1 className="text-black font-medium text-xl">&#8377; 2000</h1>
                </div>
                <div className="flex flex-row justify-center items-center gap-8 text-center">
                    <h1 className="text-coral-red font-medium text-xl w-1/2">GST:</h1>
                    <h1 className="text-black font-medium text-xl">&#8377; {totalAmount*0.18}</h1>
                </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-8 text-center">
                    <h1 className="text-coral-red font-medium text-xl w-1/2">Total:</h1>
                    <h1 className="text-black font-medium text-xl">&#8377; {totalAmount*0.18+totalAmount+2000}</h1>
                </div>
            </div>

        </div>
        </div>
    </section>
}