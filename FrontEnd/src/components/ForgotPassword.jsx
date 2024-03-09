import { useState } from "react";

const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [status,setStatus] = useState(null);

    const submitHandler = async(e) => {
        e.preventDefault();

        setStatus("pending");
        const response = await fetch(`${process.env.SERVER_URL}/users/reset-password-link/${email}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        })

        const out = await response.json();

        if(out.success){
            setStatus("success");
        }else{
            setStatus("rejected");
        }

    }

    return (
        <div className="bg-primary flex flex-col justify-center w-full min-h-[50vh] px-8 py-2">
            {status === 'rejected' && <p>
                Enter valid email
            </p>}

            {status === 'success' && <p>
                Email sent Successfully
            </p>}
            <form
                onSubmit={submitHandler}
                className="w-1/2 grid grid-cols-2 mt-4 self-center gap-4 boxShadow-lg"
            >
                <h1 className="col-span-2 text-center text-2xl text-black font-bold font-[monospace] pb-2 border-b-2 border-black">Forgot Password</h1>
                <input type="email" placeholder="Email" value={email} className="col-span-2 text-center text-black placeholder-black py-1 border-2 border-black" onChange={(e)=>setEmail(e.target.value)} />
                <input type="submit" value={status==="pending"?"Pending":"Send Link"} className="col-span-2 py-1 px-4 rounded-md bg-black text-white"/>
            </form>
        </div>
    )
}

export default ForgotPassword;