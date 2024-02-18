import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFeaturedByID, updateFeaturedByID } from "../redux/features/product/productSlice";

// Add alert
const ViewOrUpdateFeatured = () => {
    const [featured,setFeatured] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [imgInstance, setImgInstance] = useState(null);
    const {id} = useParams();
    const dispatch = useDispatch();
    const {currentFeatured,loading} = useSelector((state)=>state.product)
    const thumbnailInput = useRef(null);
    const host="http://localhost:5000/uploads/";

    const imgChangeHandler = (e) => {
        setThumbnail(e.target.files[0]);
        setImgInstance(URL.createObjectURL(e.target.files[0]));
      }

    const textChangeHandler = (e) => {
        setFeatured({...featured,[e.target.name]:e.target.value});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        if(featured.title !== currentFeatured.title || featured.destURL !== currentFeatured.destURL || thumbnail!==null){
            formData.append("title",featured.title);
            formData.append("destURL",featured.destURL);
            formData.append("thumbnail",thumbnail);
            dispatch(updateFeaturedByID({id,details:formData}));
        }

        setThumbnail(null);
        thumbnailInput.current.value = "";
        thumbnailInput.current.type = "file";
    }

    useEffect(()=>{
        setFeatured(currentFeatured);
        console.log(currentFeatured)
    },[loading])

    useEffect(()=>{
        dispatch(getFeaturedByID(id));
    },[])

    return (
        <div>
            { !loading &&
            <>
                <h1>Featured</h1>
                <form onSubmit={submitHandler} className="w-full px-8 py-4 flex flex-col justify-center items-center gap-4">
                    <div className="w-full">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" placeholder="Featured Title" className="w-3/4 ml-2 p-2 border-2 border-slate-gray" value={featured?.title} onChange={textChangeHandler} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="destURL">Destination URL:</label>
                        <input type="text" name="destURL" placeholder="Featured DestUrl" className="w-3/4 ml-2 p-2 border-2 border-slate-gray" value={featured?.destURL} onChange={textChangeHandler} />
                    </div>
                    <label className="block">
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
                        />
                        <img src={imgInstance?imgInstance:`${host}${featured?.thumbnail}`} className="w-80 h-auto my-4" />
                    </label>
                    <div className="flex items-center gap-2">
                        <button className="text-lg font-monsterrat">Cancel</button>
                        <input type="submit" value="Save Changes" className="px-3 py-1 bg-coral-red rounded-full text-lg text-white hover:cursor-pointer" />
                    </div>
                </form>
            </>
            }
        </div>
    )
}

export default ViewOrUpdateFeatured;