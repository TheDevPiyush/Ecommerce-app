import { createSlice } from '@reduxjs/toolkit'

export const userData = createSlice({
    name: 'userData',
    initialState: {
        name: '',
        email: '',
        photoURL: '',
    },
    reducers: {
        setUserData: (state, action) => { },
        clearUserData: (state, action) => { }
    },
})

export const { setUserData, clearUserData } = userData.actions
export default userData.reducer