import { createSlice } from '@reduxjs/toolkit'
import axios from '../../../config/'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    followingCategory: []
  },
  reducers: {
    fetchAllUser: (state, action) =>{
        state.data = action.payload
    },
    fetchAllFollowingCategory: (state, action) =>{
        state.followingCategory = action.payload
    },
  }
})

export function fetchUser(){
    return async (dispatch) => {
        try {
            const {data} = await axios({
                method: 'get',
                url: '/user',
                headers:{
                    authorization: `Bearer ${localStorage.access_token}`
                }
            })
            dispatch(fetchAllFollowingCategory(data.data.Categories))
            dispatch(fetchAllUser(data.data));
        } catch (error) {
            console.log("DUH ERROR GAN >>>>>>>>>>>>>>>",error);
        }
    }
}

export const { fetchAllUser, fetchAllFollowingCategory } = userSlice.actions;

export default userSlice.reducer