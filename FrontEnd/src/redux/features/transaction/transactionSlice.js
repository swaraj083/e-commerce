import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = "http://localhost:5000";

export const getKey = createAsyncThunk("/transactions/getkey",async()=>{
    try{
        const response = await fetch(`${host}/transactions/getkey`,{
            method:"GET",
        })

        const data = await response.json();
        return data;
    } catch (e) {
        return e.message;
      }
})

export const generateOrder = createAsyncThunk("transactions/generateorder",async(data)=>{
    try{
        console.log(data)
        const response = await fetch(`${host}/transactions/generateorder`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            "authtoken": localStorage.getItem("authtoken")
            },
            body:JSON.stringify(data)
          });
          const data = await response.json();
          console.log(data)
      return data;
    } catch (e) {
      return e.message;
    }
})

const transactionSlice = createSlice({
    name:"transaction",
    initialState:{
        order: null,
        key:null,
        products:[],
        generateOrderStatus:"idle"
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(generateOrder.pending,(state)=>{
                state.generateOrderStatus="pending;"
            })
            .addCase(generateOrder.fulfilled,(state,action)=>{
                state.generateOrderStatus="completed";
                if (action.payload.success) {
                    state.order = action.payload.order;
                }
            })
            .addCase(generateOrder.rejected,(state)=>{
                state.generateOrder="rejected";
            })
            .addCase(getKey.pending,(state)=>{
                
            })
            .addCase(getKey.fulfilled,(state,action)=>{
                if(action.payload.success){
                    state.key = action.payload.key;
                }
            })
    }
})

export default transactionSlice.reducer;