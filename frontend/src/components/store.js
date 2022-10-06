import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/userSlice'
import todolistReducer from '../redux/userSlice'
import taskReducer from '../redux/userSlice'


export default configureStore({
    reducer:{
        user: userReducer
    },
    reducer:{
        todolist: todolistReducer
    },
    reducer:{
        task: taskReducer
    }
})
