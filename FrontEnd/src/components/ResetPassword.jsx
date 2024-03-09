import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [status,setStatus] = useState(null);
    const {token} = useParams();

    const submitHandler = async(e) => {
        e.preventDefault();

        if(password===confirmPassword){
            setStatus("pending");
            const response = await fetch(`${process.env.SERVER_URL}/users/reset-password/${token}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({password})
            })

            const out = await response.json();

            if(out.success){
                setStatus("success");
            }else{
                setStatus("rejected");
            }
        }
    }

    return (
        <div className="bg-primary flex flex-col justify-center w-full min-h-[50vh] px-8 py-2">
            {status === 'rejected' && <p>
                Please try again later
            </p>}

            {status === 'success' && <p>
                Password is changed Successfully
            </p>}
            <form
                onSubmit={submitHandler}
                className="w-1/2 grid grid-cols-2 mt-4 self-center gap-4 boxShadow-lg"
            >
                <h1 className="col-span-2 text-center text-2xl text-black font-bold font-[monospace] pb-2 border-b-2 border-black">Reset Password</h1>
                <input type="password" placeholder="New Password" value={password} className="col-span-2 text-center text-black placeholder-black py-1 border-2 border-black" onChange={(e)=>setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} className="col-span-2 text-center text-black placeholder-black py-1 border-2 border-black" onChange={(e)=>setConfirmPassword(e.target.value)} />
                <input type="submit" value={status==="pending"?"Pending":"Reset Password"} className="col-span-2 py-1 px-4 rounded-md bg-black text-white"/>
            </form>
        </div>
    )
}

export default ResetPassword;