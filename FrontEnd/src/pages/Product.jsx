import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductByID } from "../redux/features/product/productSlice";
import { addToCart } from "../redux/features/cart/cartSlice";
import { Alert } from "../components";

export default function Product() {
    const host = "http://localhost:5000";
    const [sizeDetails, setSizeDetails] = useState({ size: "", quantity: "", price: "" });
    const [alertMessage, setAlertMessage] = useState({type:null,message:""});
    const { productID } = useParams();
    const { product, loading } = useSelector((state) => state.product)
    const { isLoggedIn } = useSelector((state) => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductByID(productID));
    }, [])

    const sizeClickHandler = ({ size, quantity, price }) => {
        setSizeDetails({ size, quantity, price });
    }

    const addToBagClickHandler = (e) => {
        if (sizeDetails.size===""){
            setAlertMessage({type:"error",message:"Select the Item Size"});
            return;
        }
        if (!isLoggedIn) {
            setAlertMessage({type:"error",message:"Please Login to Add item to Bag"});
            return;
        }
        dispatch(addToCart({ productID: product._id, productName: product.name, size: sizeDetails.size, amount: sizeDetails.price, productThumbnail:product.thumbnail }));
        setAlertMessage({type:"success",message:"Item succesfully added to cart"});
    }

    return <div className="relative">
        {alertMessage.type !== null &&
            <Alert type={alertMessage.type} message={alertMessage.message} setMessage={setAlertMessage} />
        }
        {
            (!loading && product) && <div className="flex flex-row gap-5 px-8 py-4">
                <div className="w-2/5">
                    <img src={host + "/uploads/" + product.thumbnail} />
                </div>
                <div className="w-2/5 flex flex-col gap-2">
                    <h1 className="text-4xl text-slate-gray font-bold font-monserrat">{product.name}</h1>
                    <div className="flex flex-row gap-2 ">
                        {
                            (Date.now() - Date.parse(product.createdAt)) < 604800000 && <p className="text-sm py-2 px-4 text-white bg-coral-red font-bold font-monserrat rounded-full">
                                Just Arrived
                            </p>
                        }
                        {
                            product.isIconic && <p className="text-sm py-2 px-4 text-white bg-coral-red font-bold font-monserrat rounded-full">
                                Iconic
                            </p>
                        }
                    </div>
                    <div>
                        <h1 className="text-xl text-slate-gray font-monserrat font-bold">Sizes</h1>
                        <div className="flex flex-row flex-wrap gap-2 justify-start p-4">
                            {
                                product.sizes.map((size) => {
                                    if (size.quantity > 0) {
                                        return <div key={size._id} className="text-xl border-2 border-slate-gray rounded-lg py-1 px-4" onClick={() => { sizeClickHandler(size) }}>{size.size}</div>
                                    }
                                })
                            }
                        </div>
                    </div>

                    {
                        (sizeDetails.quantity === "" && sizeDetails.price == "") && <p className="text-coral-red text-xl font-bold">Select the Size to Show MRP</p>
                    }
                    {sizeDetails.quantity !== "" && <p className="text-slate-gray text-lg">MRP : {sizeDetails.price}</p>}
                    <button className={`text-2xl py-2 px-4 ${(sizeDetails.quantity !== "" && sizeDetails.quantity > 0) ? "bg-coral-red" : "bg-slate-gray"} text-white rounded-full w-fit hover:bg-slate-gray`} onClick={addToBagClickHandler}>Add to Bag</button>
                </div>
            </div>
        }
    </div>
}