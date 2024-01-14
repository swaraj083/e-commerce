import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
