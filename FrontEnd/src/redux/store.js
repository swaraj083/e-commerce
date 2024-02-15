import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
import transactionReducer from "./features/transaction/transactionSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    transaction: transactionReducer,
  },
});
