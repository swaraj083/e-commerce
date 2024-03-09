import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gettokens } from "../redux/features/user/userSlice"
import { DisplayProducts } from "../components";
import { fetchAllProducts } from "../redux/features/product/productSlice";
// import { fetchProductsByCategory } from "../redux/features/product/productSlice";

// function Category({ categoryName }) {
//   // State Variables
//   const [isActive, setIsActive] = useState("");
//   const [currentProducts, setCurrentProducts] = useState([]);
  
//   // Redux
//   // const { allProductsByCategory, loading } = useSelector((state) => state.product);
//   const { loading } = useSelector((state) => state.product);
//   const dispatch = useDispatch();
  
//   // useEffects
//   useEffect(() => {
//     dispatch(gettokens());
//     // dispatch(fetchProductsByCategory(categoryName));
//   }, [categoryName])
  
//   // useEffect(() => {
//   //   setCurrentProducts(allProductsByCategory)
//   //   if (allProductsByCategory.length > 0) {
//   //     for(let i=0;i<allProductsByCategory.length;i++){
//   //       if(allProductsByCategory[i].products.length>0){
//   //         setIsActive(allProductsByCategory[i].subCategoryName)
//   //         break
//   //       }else{
//   //         setIsActive("")
//   //       }
//   //     }
//   //   }
//   // }, [allProductsByCategory])

//   // Click Handler
//   const clickHandler = (e) => {
//     setIsActive(e.target.innerText);
//   }

//   return (
//     <div className="min-h-[50vh]">
      
//       {!loading && <div className="">
//         <div className="z-50 bg-primary py-4 flex flex-row justify-center items-center gap-4 font-palanquin font-medium text-2xl text-slate-gray sticky top-0 relative">
//         <p className="absolute top-4 left-2 font-palanquin font-bold text-black font-medium max-sm:text-xl textShadow">{categoryName}</p>
//           {
//             currentProducts.map((subCategory) => {
//               if(subCategory.products.length){
//               return (
//                 <p key={subCategory._id} className={`hover:text-coral-red ${isActive === subCategory.subCategoryName ? "text-coral-red textShadow" : ""}`} onClick={clickHandler} name={subCategory.subCategoryName}>{subCategory.subCategoryName}</p>
//               )
//             } return<></>
//             })
//           }
//         </div>
//         {
//           currentProducts.map((subCategory) => {
//             if (subCategory.subCategoryName === isActive) {
//               return <div key={subCategory._id} className="my-4">
//                 <DisplayProducts products={subCategory.products} />
//               </div>
//             }
//           })
//         }
//       </div>
//       }
//       {
//         loading && <div className="w-full h-[50vh] text-black text-6xl">
//           Loading
//         </div>
//       }
//     </div>
//   );
// }

const filter = [
  {
    title:"Categories",
    options:["T-Shirts","Shoes"]
  },
  {
    title:"Gender",
    options:["Male","Female","Kids"]
  },
  {
    title:"Price",
    options:["Below 1000","1000 - 3000","3000 - 5000","5000 - 7000","7000 - 9000","Above 9000"]
  },
  {
    title:"Size",
    options:["6","7","8","9","10","11","12","S","M","L","XL","XXL"]
  },
  {
    title:"Others",
    options:["Iconic","Just Arrived"]
  }
]

const FilterElements = ({title,options})=>{
  const [display,setDisplay] = useState(false);

  const checkboxHander = () => {

  }
  
  return (
    <div className="relative py-4">
      <button className="py-1 px-3 bg-white text-lg font-medium border-2 border-black rounded-md" onClick={()=>{setDisplay(display=>!display)}}>{title}</button>
      <div className={`absolute ${!display?"hidden":""} w-40 max-h-60 overflow-y-auto bg-white top-full flex flex-col gap-2 text-lg font-medium p-2 rounded-md shadow-md transition duration-1000`}>
        {
          options.map((option)=>{
            return (
              <div className="flex gap-2">
                <input type="checkbox" name={option} value={option} onChange={checkboxHander} />
                <label htmlFor={option}>{option}</label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const Category = ({categoryName}) => {
  const [products,setProducts] = useState(null);
  const {allProducts} = useSelector(state=>state.product)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(categoryName!=="Sports"){
      setProducts(allProducts.filter((product)=>product.gender.includes(categoryName)));
    }else{
      setProducts(allProducts.filter((product)=>product.isSports===true));
    }
  },[categoryName,allProducts])

  useEffect(()=>{
    if(allProducts.length===0){
      dispatch(fetchAllProducts());
    }
  })

  return (
    <section className="min-h-[50vh]">
      <div className="m-8 text-lg font-semibold">
        <p>Home &#183; {categoryName}</p>
        <h1 className="my-4 text-4xl">{categoryName}</h1>
      </div>
      <div className="relative my-4 flex flex-row justify-center items-center gap-4 border-y-2 border-blue-200 max-sm:flex-wrap max-sm:gap-2">
        {
          filter.map((element)=>{
            return(
              <FilterElements title={element.title} options={element.options} />
            )
          })
        }
      </div>
      <div className="px-8 py-4">
        <DisplayProducts products={products} />
      </div>
    </section>
  )
}

export default Category;
