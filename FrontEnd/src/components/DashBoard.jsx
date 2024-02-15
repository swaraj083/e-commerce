import React, { useEffect } from "react";
import StatCard from "./StatCard";
import { useSelector,useDispatch } from "react-redux";
import { fetchIconicProductAndFeatured } from "../redux/features/product/productSlice"
import { Link } from "react-router-dom";

const DashBoardTable = ({heading,data}) => {
  return (
    <section className="mt-5">
        <h1 className="text-2xl text-slate-gray font-bold p-2 border-b-2 border-slate-gray">{heading}</h1>
        <section className="my-2 mx-4">
          <div className="flex flex-row items-center text-black text-lg py-2 px-4 border-2 border-slate-gray shadow-lg">
            <p className="w-1/6">Sr No.</p>
            <p>Title</p>
          </div>
          {
            data.map((item,index)=>{
              return (
                <div key={index} className="flex flex-row items-center text-black text-lg py-2 px-4  border-b-2 border-slate-200">
              <p className="w-1/6">{index}</p>
              <p className="w-4/6">{item.title}</p>
              <div className="w-1/6 flex justify-center items-center gap-2">
                <Link to={`featured/update/${item._id}`} className="px-3 py-2 bg-green-400 text-white rounded-full">Update</Link>
                <Link className="px-3 py-2 bg-red-400 text-white rounded-full">Delete</Link>
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
  }, [])

  return (
    <section className="mt-10 mx-6">
      {/* <section className="grid grid-cols-4 gap-2">
        <StatCard statTitle="Products" statValue="1000+" className="col-span-1"/>
        <StatCard statTitle="Products" statValue="1000+" className="col-span-1"/>
        <StatCard statTitle="Products" statValue="1000+" className="col-span-1"/>
        <StatCard statTitle="Products" statValue="1000+" className="col-span-1"/>
        <StatCard statTitle="Products" statValue="1000+" className="col-span-1"/>
        <StatCard statTitle="Products" statValue="1000+" className="col-span-1"/>
      </section> */}
      <DashBoardTable heading="Featured" data={featured} />
      <DashBoardTable heading="Products" data={allProducts} />
    </section>
  );
}

export default DashBoard;
