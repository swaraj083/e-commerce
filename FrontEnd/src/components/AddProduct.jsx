import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/features/product/productSlice";

function AddProduct() {
  const [productDetails, setProductDetails] = useState({ name: "", category: "", subCategory: "", isIconic: "" });
  const [sizes, setSizes] = useState([]);
  const [individualSize, setIndividualSize] = useState({ size: "", quantity: 0, price: 0 });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const dispatch = useDispatch();

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

  const clickHandler = (e) => {
    sizes.push(individualSize);
    setIndividualSize({ size: "", quantity: 0, price: 0 })
  }

     const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("category", productDetails.category);
    formData.append("subCategory", productDetails.subCategory);
    formData.append("sizes", JSON.stringify(sizes));
    if (productDetails.isIconic === 'isIconic') {
      formData.append("isIconic", false);
    } else {
      formData.append("isIconic", productDetails.isIconic);
    }

    formData.append("thumbnail", thumbnail);

    dispatch(addProduct(formData));

    setProductDetails({ name: "", category: "", subCategory: "", isIconic: "" });
    setSizes([])
    setThumbnail(null);
    setThumbnailPreview("");
  }

  return (
    <div className="p-4">
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

        <select
          name="category"
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={changeHandler}
          required
        >
          <option value="no" default>
            Select Category
          </option>
          <option value="Kids">Kids</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Sports">Sports</option>
        </select>

        <select
          name="subCategory"
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={changeHandler}
          required
        >
          <option value="no" default>
            Select Sub-Category
          </option>
          <option value="TShirts">TShirts</option>
          <option value="Shoes">Shoes</option>
        </select>

        {
          (productDetails.subCategory == "TShirts" || productDetails.subCategory === "Shoes") && <div className="">
            <h1 className="text-slate-gray text-lg font-bold font-monserrat">Sizes</h1>
            <div className="flex flex-row gap-1 wrap">
              {
                sizes.map((size) => {
                  return <div key={size} className="m-2 bg-coral-red w-1/3 flex flex-row justify-center items-center text-center">
                    <p className="text-white w-1/3">Size:{size.size}</p>
                    <p className="text-white w-1/3">Quantity:{size.quantity}</p>
                    <p className="text-white w-1/3">Price:{size.price}</p>
                  </div>
                })
              }
            </div>

            <input
              type="text"
              name="size"
              placeholder="Size"
              value={individualSize.size}
              onChange={sizeChangeHandler}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />

            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={individualSize.quantity}
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={sizeChangeHandler}
            />

            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={individualSize.price}
              placeholder="Price"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={sizeChangeHandler}
            />

            <button onClick={clickHandler} className="mx-2 my-2 py-2 px-4 bg-coral-red text-white hover:bg-slate-gray rounded-lg">Add Size</button>
          </div>
        }

        <select
          name="isIconic"
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={changeHandler}
          required
        >
          <option value="no" default>
            Iconic
          </option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>

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
            required
          />
          <img src={thumbnailPreview} />
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
