import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/features/user/userSlice";

const Users = () => {
    const {allUsers} = useSelector(state => state.user);
    const dispatch = useDispatch();

    console.log(allUsers)

    useEffect(()=>{
        dispatch(getAllUsers());
    },[])

    return (
        <div className="p-4 relative">
            <h1 className="text-3xl font-semibold pb-2 border-b-2 border-slate-400">Users</h1>
            <div className="my-4 text-center">
                <div className="grid grid-cols-12 text-lg font-medium">
                    <div className="col-span-1"><p>Sr. No.</p></div>
                    <div className="col-span-5"><p>Name</p></div>
                    <div className="col-span-5"><p>Email</p></div>
                    <div className="col-span-1"><p>Is Admin</p></div>
                </div>
            </div>

        {   
            allUsers?.map((user,idx)=>{
                return (
                    <div className="my-4 text-center">
                <div className="grid grid-cols-12 text-lg font-medium">
                    <div className="col-span-1"><p>{idx+1}</p></div>
                    <div className="col-span-5"><p>{user.firstName+" "+user.lastName}</p></div>
                    <div className="col-span-5"><p>{user.email}</p></div>
                    <div className="col-span-1"><p>{user.isAdmin.toString()}</p></div>
                </div>
            </div>
                )
            })
        }
        </div>
    )
}

export default Users;