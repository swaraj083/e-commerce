import React from "react";

export default function Alert({type,message,setMessage}){
    return <div className={`absolute flex flex-row gap-3 top-2 right-2 ${type==="success"?"bg-green-100":type==="error"?"bg-red-100":"bg-blue-100"} rounded-lg text-${type==="success"?"bg-green-100":type==="error"?"bg-red-100":"bg-blue-100"}-800 py-2 px-4`}>
    <p>{message}</p>
    <p className="hover:cursor-pointer" onClick={()=>setMessage({type:null,message:""})}>X</p>
</div>
}