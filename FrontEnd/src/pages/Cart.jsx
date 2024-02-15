import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

const ConfirmDetails = ({userInfo,setCheckout})=>{
    console.log(userInfo)
    const { productList, totalAmount } = useSelector((state) => state.cart);
    const host = "http://localhost:5000"

    const getKey = async()=>{
        try{
            const response = await fetch(`${host}/transactions/getkey`,{
                method:"GET",
            })
    
            const data = await response.json();
            
            if(data.success){
                console.log(data.key)
                return data.key
            }
        } catch (e) {
             console.log(e.message);
             return ""
        }
    }

    const generateOrder = async(details) =>{
        try{
            console.log(details)
            const response = await fetch(`${host}/transactions/generateorder`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                "authtoken": localStorage.getItem("authtoken")
                },
                body:JSON.stringify(details)
              });
              const data = await response.json();
              if(data.success){
                  return data.order;
              }
        } catch (e) {
          return e.message;
        }
    }

    
    const confirmHandler = async() =>{
        setCheckout(false);
        const products = [];

        for(let i=0;i<productList.length;i++){
            let product = {name:productList[i].productName,pID:productList[i].productID,size:productList[i].size,quantity:productList[i].quantity}
            products.push(product);
        }

        const key = await getKey();
        const order= await generateOrder({amount:(totalAmount*0.18+totalAmount+2000).toFixed(2),productList,products});
        
        const options = {
            "key": key, // Enter the Key ID generated from the Dashboard
            "amount": (totalAmount*0.18+totalAmount+2000).toFixed(2), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Nike",
            "description": "Test Transaction",
            "image": "/favicon.ico",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${host}/transactions/verification`,
            "prefill": {
                "name": userInfo.firstName+" "+userInfo.lastName,
                "email": userInfo.email,
                "contact": userInfo.mobile
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    }

    return (
        <div className="fixed w-[60vw] height-auto flex flex-col justify-center items-center gap-4 bg-slate-100 z-[2] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 py-8 rounded-xl shadow-2xl">
            <h1 className="text-4xl text-slate-gray font-bold">Deleiver to:</h1>
            <div className="text-slate-900 text-xl font-mono self-start px-4">
                <p>Address : {userInfo.address}</p>
                <p>LandMark : {userInfo.landmark}</p>
                <p>Pincode : {userInfo.pincode}</p>
                <p>Mobile Number : {userInfo.mobile}</p>
                <p>City : {userInfo.city}</p>
                <p>State : {userInfo.state}</p>
                <p>Country : {userInfo.country}</p>
            </div>
            <div className="flex flex-row justify-center items0center gap-4">
                <Link to={`/profile/${userInfo.id}`} className="bg-transparent text-xl text-slate-gray px-4 py-2 rounded shadow-lg">Edit</Link>
                <button className="bg-transparent text-xl px-4 py-2 rounded shadow-lg" onClick={()=>{setCheckout(false)}}>Cancel</button>
                <button className="bg-green-300 text-xl px-4 py-2 rounded shadow-lg" onClick={confirmHandler}>Confirm</button>
            </div>
        </div>
    )
}

const SummaryContent = ({title,amount})=>{
    return (
        <div className="flex flex-row justify-center items-center gap-8 text-center">
            <h1 className="text-coral-red font-medium text-xl w-1/2">{title}:</h1>
            <h1 className="text-black font-medium text-xl">&#8377; {amount}</h1>
        </div>
    )
}

export default function Cart() {
    const [checkout,setCheckout] = useState(false);
    const { productList, totalAmount } = useSelector((state) => state.cart);
    const { isLoggedIn,userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(()=>{},productList)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn])

    return( 
    <>
    {checkout && <ConfirmDetails userInfo={userInfo} setCheckout={setCheckout} />}
    <section className="min-h-[50vh] bg-primary">
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
                    <SummaryContent title="Subtotal" amount={totalAmount} />
                    <SummaryContent title="Estimated Delivery Charge" amount={2000} />
                    <SummaryContent title="GST" amount={totalAmount*0.18} />
                </div>
                    <SummaryContent title="Total" amount={(totalAmount*0.18+totalAmount+2000).toFixed(2)} />
                {
                    productList.length>0 &&
                    <div className="flex justify-center items-center my-2">
                        <button className="text-white text-xl bg-coral-red py-1 px-4 rounded-full" onClick={()=>{setCheckout(true);}}>Check Out</button>
                    </div>
                }
            </div>

        </div>
        </div>
    </section>
    </>
    )
}