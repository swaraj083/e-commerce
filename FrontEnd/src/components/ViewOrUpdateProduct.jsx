import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateProduct } from "../redux/features/product/productSlice";
import ProductSize from "./ProductSize";


const ViewOrUpdateProduct = () => {
  const {id} = useParams();
  let [idx,setIdx] = useState(null);
  const [productDetails, setProductDetails] = useState(undefined);
  const [thumbnailInstance,setThumbnailInstance] = useState(null);
  const [thumbnail,setThumbnail] = useState(null);
  const [gender,setGender] = useState("")  
  const {allProducts} = useSelector(state=>state.product)
  const dispatch = useDispatch();
  const host="http://localhost:5000/uploads/";
  const thumbnailRef = useRef(null);
  const iconicRef = useRef(null);
  const sportsRef = useRef(null);
  const categoryRef = useRef(null);

  console.log(productDetails)
  useEffect(()=>{
    for(let i=0;i<allProducts.length;i++){
        if(allProducts[i]._id === id){
            setProductDetails(allProducts[i])
            setGender(allProducts[i].gender.join(","))
            categoryRef.current.value = String(allProducts[i].category)
            iconicRef.current.value = String(allProducts[i].isIconic)
            sportsRef.current.value = String(allProducts[i].isSports)
            setIdx(i);
            break;
        }
    }
  },[])

  const imgChangeHandler=(e) => {
    setThumbnail(e.target.files[0]);
    setThumbnailInstance(URL.createObjectURL(e.target.files[0]));
  }

  const textChangeHandler = (e) => {
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const sizeModifier = (updatedSize) => {
    setProductDetails({...productDetails,sizes:updatedSize})
  }

  const submitHandler = (e) => {
    e.preventDefault();

    // FormData
    const formData = new FormData();

    if(productDetails.name!==allProducts[idx].name){
      formData.append("name", productDetails.name);
    }

    if(productDetails.gender!==allProducts[idx].gender){
      formData.append("gender", JSON.stringify(productDetails.gender));
    }

    if(productDetails.category!==allProducts[idx].category){
      formData.append("category", productDetails.category);
    }

    formData.append("sizes", JSON.stringify(productDetails.sizes));

    if(productDetails.isIconic!==String(allProducts[idx].isIconic)){
      formData.append("isIconic", productDetails.isIconic);
    }

    if(productDetails.isSports!==String(allProducts[idx].isSports)){
      formData.append("isSports", productDetails.isSports);
    }

    if(thumbnail){
      console.log("hi")
      formData.append("thumbnail", thumbnail);
    }

    dispatch(updateProduct({product:formData,productID:id}));
    thumbnailRef.current.value = "";
    }

  return (
    <div className="p-4 relative h-[92vh] overflow-y-scroll">
      {

      }
      <h1 className="text-3xl font-bold pb-2 border-b-2 border-black">Update Product</h1>
      <form onSubmit={submitHandler} className="grid grid-cols-3 w-full gap-2 my-4">
        <div className="col-span-3 flex items-center gap-2">
            <label htmlFor="name" className="text-lg font-semibold">Product Name:</label>
            <input type="text" id="name" name="name" value={productDetails?.name} onChange={textChangeHandler} className="w-3/4 bg-white px-3 py-1 border-2 border-black"/>
        </div>
        <div className="col-span-3 grid grid-cols-3 items-center gap-2">

          <div className="col-span-3 flex flex-row items-center gap-2">
            <label htmlFor="gender" className="w-fit px-2 text-slate-gray text-lg font-medium font-monserrat">Select Gender</label>
            <input type="text" name="gender" value={gender} className="w-3/4 bg-white py-1 px-3 border border-gray-300 rounded-lg" onChange={(e)=>{
                setGender(e.target.value)
              setProductDetails({...productDetails,gender:e.target.value.split(",")})
            }} />
          </div>

          <div className="col-span-1 flex flex-row items-center gap-2">
            <label htmlFor="category" className="w-fit px-2 text-slate-gray text-lg font-medium font-monserrat">Select Sub-Category</label>
            <select
              name="category"
              className="w-fit p-2 border border-gray-300 rounded-lg"
              // defaultValue={productDetails?.category}
              ref={categoryRef}
              onChange={textChangeHandler}
            >
              <option value="T-Shirts">T-Shirts</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>

          <div className="col-span-1 flex flex-row items-center gap-2">
            <label htmlFor="isIconic" className="w-fit px-2 text-slate-gray text-lg font-medium font-monserrat">Iconic</label>
            <select
              name="isIconic"
              className="w-fit p-2 border border-gray-300 rounded-lg"
              ref={iconicRef}
              onChange={textChangeHandler}
            >
              <option value="true">True</option>
              <option value="false">False</option>
              <option value="na">NA</option>
            </select>
          </div>

          <div className="col-span-1 flex flex-row items-center gap-2">
            <label htmlFor="isSports" className="w-fit px-2 text-slate-gray text-lg font-medium font-monserrat">Sports</label>
            <select
              name="isSports"
              className="w-fit p-2 border border-gray-300 rounded-lg"
              // defaultValue={productDetails?.isSports===true?"true":"false"}
              ref={sportsRef}
              onChange={textChangeHandler}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>

        <ProductSize sizes={productDetails?.sizes} setSizes={sizeModifier} />

        <div className="col-span-3">
        <input
            type="file"
            name="thumbnail"
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
        "
            ref={thumbnailRef}
            onChange={imgChangeHandler}
        />
          <img src={thumbnailInstance?thumbnailInstance:`${host}${productDetails?.thumbnail}`} className="w-80 h-auto my-4" />
        </div>
        <input type="submit" value="Save" className="col-span-3 bg-black text-lg text-white font-medium py-2 px-8 rounded-lg place-self-center" />
      </form>
    </div>
  );
}

export default ViewOrUpdateProduct;