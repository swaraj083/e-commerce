import { createSlice, current } from "@reduxjs/toolkit";

const CARTVALUE = localStorage.getItem("cartValue") !== null ? JSON.parse(localStorage.getItem("cartValue")) : 0;
const CARTPRODUCT = localStorage.getItem("cartProduct") !== null ? JSON.parse(localStorage.getItem("cartProduct")) : [];
const CARTPRICE = localStorage.getItem("cartPrice") !== null ? JSON.parse(localStorage.getItem("cartPrice")) : 0;

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: CARTVALUE,
        productList: CARTPRODUCT || [],
        totalAmount: CARTPRICE
    },
    reducers: {
        addToCart: (state, action) => {
            /*
                product:{productName,productID,quantity,size,amount,productThumbnail}
            */

            let found = false;

            for (let i = 0; i < state.productList.length; i++) {
                if (state.productList[i].productID === action.payload.productID && state.productList[i].size === action.payload.size) {
                    state.productList[i].quantity += 1;
                    state.productList[i].amount += action.payload.amount;
                    found = true;
                    break;
                }
            }
            if (!found) {
                state.productList.push({ ...action.payload, quantity: 1 });
            }
            state.value += 1;
            state.totalAmount += action.payload.amount;
            localStorage.setItem("cartValue", state.value);
            localStorage.setItem("cartProduct", JSON.stringify(state.productList));
            localStorage.setItem("cartPrice", state.totalAmount);

        },
        updateQuantity: (state, action) => {
            /*
                payload:{productID,quantity,size}
            */
            for (let i = 0; i < state.productList.length; i++) {
                if (action.payload.productID === state.productList[i].productID && action.payload.size === state.productList[i].size) {
                    let difference = action.payload.quantity - state.productList[i].quantity;
                    state.value += difference;
                    state.totalAmount += difference * (state.productList[i].amount / state.productList[i].quantity);
                    state.productList[i].amount += difference * (state.productList[i].amount / state.productList[i].quantity);
                    state.productList[i].quantity += difference;
                    if (state.productList[i].quantity === 0) {
                        state.productList.splice(i, 1);
                    }
                    break;
                }
            }

            if (state.value === 0) {
                localStorage.removeItem("cartValue");
                localStorage.removeItem("cartProduct");
                localStorage.removeItem("cartPrice");
            } else {
                localStorage.setItem("cartValue", state.value);
                localStorage.setItem("cartProduct", JSON.stringify(state.productList));
                localStorage.setItem("cartPrice", state.totalAmount);
            }
        }
        ,
        removeFromCart: (state, action) => {
            /*
                payload:{productID,productsize}
            */
            for (let i = 0; i < state.productList.length; i++) {
                if (action.payload.productID === state.productList[i].productID && action.payload.size === state.productList[i].size) {
                    state.value -= state.productList[i].quantity;
                    state.totalAmount -= state.productList[i].amount;
                    state.productList.splice(i, 1);
                    break;
                }
            }

            if (state.value === 0) {
                localStorage.removeItem("cartValue");
                localStorage.removeItem("cartProduct");
                localStorage.removeItem("cartPrice");
            } else {
                localStorage.setItem("cartValue", state.value);
                localStorage.setItem("cartProduct", JSON.stringify(state.productList));
                localStorage.setItem("cartPrice", state.totalAmount);
            }
        },
        resetCart: (state) => {
            localStorage.removeItem("cartValue");
            localStorage.removeItem("cartProduct");
            localStorage.removeItem("cartPrice");
            state.value = 0;
            state.productList = [];
            state.totalAmount = 0;
        }
    }
})

export const { addToCart, removeFromCart, resetCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;