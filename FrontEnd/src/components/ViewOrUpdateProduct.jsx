import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateProduct } from "../redux/features/product/productSlice";

// const ProductSize = () =>{
//   return (
//       <div className="col-span-3">
//             <div className="col-span-1 grid grid-cols-4">
//                 <h1 className="col-span-1 text-lg font-medium">Size</h1>
//                 <h1 className="col-span-1 text-lg font-medium">Quantity</h1>
//                 <h1 className="col-span-1 text-lg font-medium">Price (in INR)</h1>
//             </div>
            
//             {
//                 productDetails?.sizes.map((size)=>{
//                     return (
//                         <div className="col-span-1 grid grid-cols-4 py-2 border-b-2 border-slate-300">
//                             <h1 className="col-span-1 text-lg font-medium">{size.size}</h1>
//                             <input type="number" value={size.quantity} className="col-span-1 text-lg font-medium" onChange={(e)=>{}}/>
//                             <input type="number" value={size.price} className="col-span-1 text-lg font-medium" />
//                             <span className="col-span-1" onClick={()=>{
//                                 let sizes = productDetails.sizes.filter((element)=>{return element.size!==size.size})
//                                 setProductDetails({...productDetails,sizes});
//                             }}>
//                             <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
//                             </span>
//                         </div>
//                     )
//                 })
//             }

//             {
//                 addedSizes.map((size)=>{
//                     return (
//                         <div className="col-span-1 grid grid-cols-4 py-2 border-b-2 border-slate-300">
//                             <h1 className="col-span-1 text-lg font-medium">{size.size}</h1>
//                             <input type="number" value={size.quantity} className="col-span-1 text-lg font-medium" />
//                             <input type="number" value={size.price} className="col-span-1 text-lg font-medium" />
//                             <span className="col-span-1" onClick={()=>{
//                                 let sizes = addedSizes.filter((element)=>{return element.size!==size.size})
//                                 setAddedSizes(sizes);
//                             }}>
//                             <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
//                             </span>
//                         </div>
//                     )
//                 })
//             }
//         </div>
        
//         <div className="col-span-3 grid grid-cols-4 gap-4 pb-2 border-b-2 border-slate-200">
//             <input type="text" name="size" value={newSize.size} placeholder="Enter Size" className="col-span-1 text-lg font-medium" onChange={newSizeChangeHandler} />
//             <input type="number" name="quantity" value={newSize.quantity} className="col-span-1 text-lg font-medium" onChange={newSizeChangeHandler} />
//             <input type="number" name="price" value={newSize.price} className="col-span-1 text-lg font-medium" onChange={newSizeChangeHandler} />
//             <span className="col-span-1 bg-blue-400 text-white text-medium rounded-lg" onClick={()=>{
//                 let sizes = addedSizes;
//                 addedSizes.push(newSize);
//                 setAddedSizes(sizes);
//                 setNewSize({size:"",quantity:0,price:0});
//             }}>Add Size</span>
//         </div>
//   )
// }

const ViewOrUpdateProduct = () => {
  const {id} = useParams();
  let [idx,setIdx] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [addedSizes,setAddedSizes] = useState([]);
  const [newSize,setNewSize] = useState({_id:null,size:"",quantity:0,price:0});
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

  const newSizeChangeHandler = (e) => {
    setNewSize({...newSize,[e.target.name]:e.target.value});
  }

  const submitHandler = (e) => {
    e.preventDefault();

    // FormData
    const formData = new FormData();

    console.log(productDetails.isIconic)

    if(productDetails.name!==allProducts[idx].name){
      formData.append("name", productDetails.name);
    }

    if(productDetails.gender!==allProducts[idx].gender){
      formData.append("gender", JSON.stringify(productDetails.gender));
    }

    if(productDetails.category!==allProducts[idx].category){
      formData.append("category", productDetails.category);
    }

    if(productDetails.sizes!==allProducts[idx].sizes){
      formData.append("sizes", JSON.stringify(productDetails.sizes));
    }

    if(addedSizes.length>0){
      formData.append("addedSizes", JSON.stringify(addedSizes));
    }

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