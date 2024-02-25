import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/features/product/productSlice";

function AddProduct() {
  // State Variables
  const [productDetails, setProductDetails] = useState({ name: "", category: "T-Shirts",gender:[], isIconic: "false",isSports:"false" });
  const [individualSize, setIndividualSize] = useState({ size: "", quantity: 0, price: 0 });
  const [sizes, setSizes] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  // let gender = []

  // Reference Variables  
  const thumbnailInput = useRef(null);
  const categoryRef = useRef("T-Shirts");
  const iconicRef = useRef("false");
  const sportsRef = useRef("false");

  // Redux
  const dispatch = useDispatch();

  // Change Handlers
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  const sizeChangeHandler = (e) => {
    setIndividualSize({ ...individualSize, [e.target.name]: e.target.value });
  }

  const imgChangeHandler = (e) => {
    setThumbnail(e.target.files[0]);
    setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
  }

  // Click Handlers
  const clickHandler = (e) => {
    sizes.push(individualSize);
    setIndividualSize({ size: "", quantity: 0, price: 0 })
  }

  // const checkboxHandler = (e)=>{
  //   const present = gender.includes(String(e.target.name))
  //   if(present){
  //     gender.splice(gender.indexOf(e.target.name),1);
  //   }else{
  //     gender.push(e.target.name)
  //   }

  //   setProductDetails({...productDetails,gender})
  // }

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();

    // FormData
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("gender", JSON.stringify(productDetails.gender));
    formData.append("category", productDetails.category);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("isIconic", productDetails.isIconic);
    formData.append("isSports", productDetails.isSports);

    // if (productDetails.isIconic === 'isIconic') {
    //   formData.append("isIconic", false);
    // } else {
    //   formData.append("isIconic", productDetails.isIconic);
    // }

    formData.append("thumbnail", thumbnail);

    // console.log(productDetails,gender)

    // Redux
    dispatch(addProduct(formData));

    // ReInitialization
    setProductDetails({ name: "", gender: [], category: "T-Shirts", isIconic: false,isSports:false });
    setSizes([])
    setThumbnail(null);
    setThumbnailPreview("");
    thumbnailInput.current.value = "";
    thumbnailInput.current.type = "file";
    categoryRef.current.value = "T-Shirts";
    iconicRef.current.value = "false";
    sportsRef.current.value = "false";
  }

  return (
    <div className="p-4 relative">
      {

      }
      <h1 className="text-3xl ">Add Product</h1>
      <form onSubmit={submitHandler} className="flex flex-col w-full gap-2 flex-wrap my-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productDetails.name}
          onChange={changeHandler}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />

        {/* Instead of repeating same block use a map for code reuse  */}
        <div className="grid grid-cols-3 items-center gap-2">

          <div className="col-span-3 flex flex-row items-center gap-2">
            <label htmlFor="gender" className="w-fit px-2 text-slate-gray text-lg font-medium font-monserrat">Select Gender</label>
            <input type="text" name="gender" placeholder="Gender separated by commas (e.g Men,Women)" className="w-3/4 bg-white py-1 px-3 border border-gray-300 rounded-lg" onChange={(e)=>{
              setProductDetails({...productDetails,gender:e.target.value.split(",")})
            }} />
            {/* <div className="flex flex-row gap-8">
              <div className="flex gap-1 justify-center items-center">
                <input type="checkbox" name="Kids" onChange={checkboxHandler} />
                <label htmlFor="Kids" className="text-base font-medium">Kids</label>
              </div>
              <div className="flex gap-1 justify-center items-center">
                <input type="checkbox" name="Men"  onChange={checkboxHandler}/>
                <label htmlFor="Men" className="text-base font-medium">Men</label>
              </div>
              <div className="flex gap-1 justify-center items-center">
                <input type="checkbox" name="Women" onChange={checkboxHandler} />
                <label htmlFor="Women" className="text-base font-medium">Women</label>
              </div>
            </div> */}
          </div>

          <div className="col-span-1 flex flex-row items-center gap-2">
            <label htmlFor="category" className="w-fit px-2 text-slate-gray text-lg font-medium font-monserrat">Select Sub-Category</label>
            <select
              name="subCategory"
              className="w-fit p-2 border border-gray-300 rounded-lg"
              onChange={changeHandler}
              required
              defaultValue={"T-Shirts"}
              ref={categoryRef}
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
              onChange={changeHandler}
              required
              defaultValue={"false"}
              ref={iconicRef}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <div className="col-span-1 flex flex-row items-center gap-2">
            <label htmlFor="isSports" className="w-fit px-2 text-slate-gray text-lg font-medium font-monserrat">Sports</label>
            <select
              name="isSports"
              className="w-fit p-2 border border-gray-300 rounded-lg"
              onChange={changeHandler}
              required
              defaultValue={"false"}
              ref={sportsRef}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>

        <div className="my-4">
          <h1 className="text-slate-gray text-xl font-medium font-monserrat">Sizes</h1>
          <div className="flex flex-row gap-1 wrap">
            {
              sizes.map((size) => {
                return <div key={size} className="m-2 bg-coral-red w-1/3 flex flex-row justify-center items-center flex-wrap text-center rounded-full">
                  <p className="text-white-400 w-1/3 font-monserrat border-r-2 border-slate-gray">Size:{size.size}</p>
                  <p className="text-white-400 w-1/3 font-monserrat border-r-2 border-slate-gray">Quantity:{size.quantity}</p>
                  <p className="text-white-400 w-1/3 font-monserrat">Price:{size.price}</p>
                </div>
              })
            }
          </div>

          <div className="flex flex-row items-center gap-10">
            <input
              type="text"
              name="size"
              placeholder="Size"
              value={individualSize.size}
              onChange={sizeChangeHandler}
              className="w-1/4 p-2 border border-gray-300 rounded-lg"
            />

            <div className="flex flex-row items-center gap-2">
              <label htmlFor="quantity" className="w-fit px-2 text-slate-gray text-lg font-medium font-monserrat">Quantity</label>
              <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={individualSize.quantity}
                className="w-fit p-2 border border-gray-300 rounded-lg"
                onChange={sizeChangeHandler}
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <label htmlFor="price" className="w-fit px-2 text-slate-gray text-lg font-medium font-monserrat">Price</label>
              <input
                type="number"
                name="price"
                value={individualSize.price}
                placeholder="Price"
                className="w-fit p-2 border border-gray-300 rounded-lg"
                onChange={sizeChangeHandler}
              />
            </div>
          </div>
          <button onClick={clickHandler} className="mx-2 my-2 py-2 px-4 bg-coral-red text-white hover:bg-slate-gray rounded-lg">Add Size</button>
        </div>

        <label className="block">
          <span className="sr-only">Choose Product Image</span>
          <input
            name="thumbnail"
            type="file"
            onchange="loadFile(event)"
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
          "
            onChange={imgChangeHandler}
            ref={thumbnailInput}
            required
          />
          {thumbnail !== null &&
            <img src={thumbnailPreview} className="w-[300px] h-[300px]" />
          }
        </label>

        <input
          type="submit"
          value="Submit"
          className="py-1 px-3 w-fit bg-coral-red text-white text-lg rounded-lg"
        />
      </form>
    </div>
  );
}

export default AddProduct;
