import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import cartReducer from "../store/cartSlice"; // Import reducer của giỏ hàng
export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer, // Thêm giỏ hàng vào Redux store
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;