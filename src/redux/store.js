import { configureStore } from "@reduxjs/toolkit";

import tokenReducer from "./tokenSlice";
import cartReducer from "./cartRedux";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    cart: cartReducer,
  },
});

export default store;