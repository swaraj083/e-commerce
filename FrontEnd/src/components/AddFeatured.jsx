import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addFeatured } from "../redux/features/product/productSlice"

function AddFeatured() {
  const [featuredDetails, setFeaturedDetails] = useState({ title: "", destURL: "" });
  const [thumbnail, setThumbnail] = useState(null);
  const [imgInstance, setImgInstance] = useState("");
  const dispatch = useDispatch();
  const thumbnailInput = useRef(null);

  const changeHandler = (e) => {
    setFeaturedDetails({ ...featuredDetails, [e.target.name]: e.target.value });
  }

  const imgChangeHandler = (e) => {
    setThumbnail(e.target.files[0]);
    setImgInstance(URL.createObjectURL(e.target.files[0]));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", featuredDetails.title);
    formData.append("thumbnail", thumbnail);
    formData.append("destURL", featuredDetails.destURL);
    dispatch(addFeatured(formData));
    setFeaturedDetails({ title: "", destURL: "" });
    setThumbnail(null);
    setImgInstance("");
    thumbnailInput.current.value = "";
    thumbnailInput.current.type = "file";

  }

  return (
    <div className="p-4">
      <h1 className="text-3xl ">Add Featured</h1>
      <form onSubmit={submitHandler} className="flex flex-row justify-center items-center w-full gap-2 flex-wrap my-4">
        <input
          type="text"
          name="title"
          placeholder="Featured Name"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={featuredDetails.title}
          onChange={changeHandler}
          required
        />

        <label className="block">
          <span className="sr-only">Choose Featured Image</span>
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
            ref={thumbnailInput}
            onChange={imgChangeHandler}
            required
          />
          {
            thumbnail !== null &&
            <img src={imgInstance} />
          }
        </label>

        <input
          type="text"
          name="destURL"
          placeholder="Destination Slug"
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={changeHandler}
          value={featuredDetails.destURL}
          required
        />

        <input
          type="submit"
          value="Submit"
          className="py-1 px-3 bg-coral-red text-white text-lg rounded-lg"
        />
      </form>
    </div>
  );
}

export default AddFeatured;
