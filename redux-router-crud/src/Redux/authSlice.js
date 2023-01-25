import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{userId:1,isLoggedIn:true}
})

export default authSlice.reducer