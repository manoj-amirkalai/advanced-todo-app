import { configureStore } from "@reduxjs/toolkit";
import todoReducers from "./Reducers";

const Store = configureStore({
    reducer: {
        todoStore: todoReducers
    },
})

export default Store;