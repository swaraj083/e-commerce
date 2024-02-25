import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { useSelector,useDispatch } from "react-redux";
import { deleteFeaturedByID, deleteProductByID, fetchAllProducts, fetchIconicProductAndFeatured } from "../redux/features/product/productSlice"
import { Link } from "react-router-dom";

const DashBoardFeaturedTable = ({heading,data}) => {
  const dispatch = useDispatch();
  const deleteHandler = (id)=>{
    dispatch(deleteFeaturedByID(id))
  }

  return (
    <section className="mt-5">
        <h1 className="text-2xl text-slate-gray font-bold p-2 border-b-2 border-slate-gray">{heading}</h1>
        <section className="my-2 mx-4">
          <div className="flex flex-row items-center text-black text-lg font-semibold py-2 px-4 border-2 border-slate-gray rounded-lg shadow-lg">
            <p className="w-1/6">Sr No.</p>
            <p>Title</p>
          </div>
          {
            data?.map((item,index)=>{
              return (
                <div key={index} className="flex flex-row items-center text-black text-lg py-2 px-4  border-b-2 border-slate-200">
              <p className="w-1/6">{index}</p>
              <p className="w-4/6">{item.title}</p>
              <div className="w-1/6 flex justify-center items-center gap-2">
                <Link to={`featured/update/${item._id}`} className="px-3 py-2 bg-green-400 text-white rounded-full">Update</Link>
                <Link className="px-3 py-2 bg-red-400 text-white rounded-full" onClick={()=>{deleteHandler(item._id)}}>Delete</Link>
              </div>
            </div>
              )
            })
          }
        </section>
      </section>
  )
}

const DashBoardProductTable = ({heading,data}) => {
  const dispatch = useDispatch();
  const deleteHandler = (id)=>{
    dispatch(deleteProductByID(id))
  }

  return (
    <section className="mt-5">
        <h1 className="text-2xl text-slate-gray font-bold p-2 border-b-2 border-slate-gray">{heading}</h1>
        <section className="my-2 mx-4">
          <div className="flex flex-row items-center text-black text-lg font-semibold py-2 px-4 border-2 border-slate-gray rounded-lg shadow-lg">
            <p className="w-1/6">Sr No.</p>
            <p className="w-2/6">Name</p>
            <p className="w-2/6">Sizes : Quantity</p>
          </div>
          {
            data?.map((item,index)=>{
              return (
                <div key={index} className="flex flex-row items-center text-black text-lg py-2 px-4 gap-2  border-b-2 border-slate-200">
              <p className="w-1/6">{index}</p>
              <p className="w-2/6">{item.name}</p>
              <div className="w-2/6 flex flex-row flex-wrap gap-4">{item.sizes.map((size,idx)=>{
                return <p key={idx} className="bg-blue-400 text-white px-3 py-1 rounded-lg">{size.size} : {size.quantity}</p>
              })}</div>
              <div className="w-1/6 flex justify-center items-center gap-2">
                <Link to={`product/update/${item._id}`} className="px-3 py-2 bg-green-400 text-white rounded-full">Update</Link>
                <Link className="px-3 py-2 bg-red-400 text-white rounded-full" onClick={()=>{deleteHandler(item._id)}}>Delete</Link>
              </div>
            </div>
              )
            })
          }
        </section>
      </section>
  )
}

function DashBoard() {
  const {allProducts,featured} = useSelector((state)=>state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIconicProductAndFeatured())
    dispatch(fetchAllProducts())
  }, [allProducts,featured])

  return (
    <section className="pt-10 px-6 h-[92vh] overflow-y-auto">
      <DashBoardFeaturedTable heading="Featured" data={featured} />
      <DashBoardProductTable heading="Products" data={allProducts} />
    </section>
  );
}

export default DashBoard;
