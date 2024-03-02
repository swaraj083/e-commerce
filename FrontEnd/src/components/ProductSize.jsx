import { useEffect, useState } from "react"

const Size = ({size,modifier,allSizes}) => {
    const [curSize,setCurSize] = useState(size);
    useEffect(()=>{
        setCurSize(size)
    },[allSizes])

    const updateValues = (e) =>{
        const update = {...curSize,[e.target.name]:e.target.value};
        setCurSize(update)
        const newState = allSizes.map((size)=>{
            if(size.size===curSize.size){
                return update;
            }

            return size
        })
        modifier(newState);
    }

    return (
        <div className="col-span-1 grid grid-cols-3 py-2 border-b-2 border-slate-300">
            <h1 name="size" className="col-span-1 text-lg font-medium">{curSize.size}</h1>
            <input type="number" name="quantity" value={curSize.quantity} className="col-span-1 text-lg font-medium" onChange={updateValues}/>
            <input type="number" name="price" value={curSize.price} className="col-span-1 text-lg font-medium" onChange={updateValues} />
        </div>
    )
}

const ProductSize = ({sizes,setSizes}) =>{
  return (
      <div className="col-span-3">
            <div className="col-span-1 grid grid-cols-3">
                <h1 className="col-span-1 text-lg font-medium">Size</h1>
                <h1 className="col-span-1 text-lg font-medium">Quantity</h1>
                <h1 className="col-span-1 text-lg font-medium">Price (in INR)</h1>
            </div>
            
            {
                sizes?.map((size)=>{
                    return (<Size size={size} modifier={setSizes} allSizes={sizes} />)
                })
            }
        </div>
  )
}

export default ProductSize;