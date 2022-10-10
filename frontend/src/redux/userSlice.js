import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "mathu",
    initialState:{
        user:null,
        todolist:[],
        task:[]

    },
    reducers:{
        login:(state, action) =>{
            state.user = action.payload;
        },
        todolist:(state, action) => {
            state.todolist = action.payload;
        },
        // task:(state, action) => {
        //     state.task = action.payload
        // }


    }
})

export const {login, todolist} =userSlice.actions;

export const getcurrentUser = (state) => state.user.user
export const getTodoData = (state) => state.todolist.todolist
// export const getTask = (state) => state.task.task


export default userSlice.reducer;