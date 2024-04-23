import { createSlice } from '@reduxjs/toolkit'
import axios from '../../../config/'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    data: [],
    dataById: {},
    top: [],
    category: [],
    following: [],
    commentByPost: [],
    postByCategory: []
  },
  reducers: {
    fetchAllPost: (state, action) =>{
        state.data = action.payload
    },
    fetchTopPost: (state, action) =>{
        state.top = action.payload
    },
    fetchAllCategory: (state, action) =>{
        state.category = action.payload
    },
    fetchAllFollowingPost: (state, action) =>{
        state.following = action.payload
    },
    fetchPostById: (state, action) =>{
        state.dataById = action.payload
    },
    fetchAllCommentByPost: (state, action) =>{
        state.commentByPost = action.payload
    },
    fetchAllPostByCategory: (state, action) =>{
        state.postByCategory = action.payload
    },
  }
})

export function fetchPost(){
    return async (dispatch) => {
        try {
            const {data} = await axios({
                method: 'get',
                url: '/post',
                headers:{
                    authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(fetchAllPost(data.data));
        } catch (error) {
            console.log("DUH ERROR GAN >>>>>>>>>>>>>>>",error);
        }
    }
}
export function fetchOnePost(id){
    return async (dispatch) => {
        try {
            const {data} = await axios({
                method: 'get',
                url: '/post/' + id,
                headers:{
                    authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(fetchPostById(data.data));
        } catch (error) {
            console.log("DUH ERROR GAN >>>>>>>>>>>>>>>",error);
        }
    }
}
export function fetchCommentByPost(id){
    return async (dispatch) => {
        try {
            const {data} = await axios({
                method: 'get',
                url: '/comment/' + id,
                headers:{
                    authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(fetchAllCommentByPost(data.data));
        } catch (error) {
            console.log("DUH ERROR GAN >>>>>>>>>>>>>>>",error);
        }
    }
}
export function fetchFollowingPost(){
    return async (dispatch) => {
        try {
            const {data} = await axios({
                method: 'get',
                url: '/post/follow',
                headers:{
                    authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(fetchAllFollowingPost(data.data));
        } catch (error) {
            console.log("DUH ERROR GAN >>>>>>>>>>>>>>>",error);
        }
    }
}
export function fetchTop5Post(){
    return async (dispatch) => {
        try {
            const {data} = await axios({
                method: 'get',
                url: '/post/top5',
                headers:{
                    authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(fetchTopPost(data.data));
        } catch (error) {
            console.log("DUH ERROR GAN >>>>>>>>>>>>>>>",error);
        }
    }
}
export function fetchCategory(){
    return async (dispatch) => {
        try {
            const {data} = await axios({
                method: 'get',
                url: '/category',
                headers:{
                    authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(fetchAllCategory(data.data));
        } catch (error) {
            console.log("DUH ERROR GAN >>>>>>>>>>>>>>>",error);
        }
    }
}
export function fetchPostByCategory(id){
    return async (dispatch) => {
        try {
            const {data} = await axios({
                method: 'get',
                url: '/category/' + id,
                headers:{
                    authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(fetchAllPostByCategory(data.data));
        } catch (error) {
            console.log("DUH ERROR GAN >>>>>>>>>>>>>>>",error);
        }
    }
}

export const { fetchAllPost, fetchTopPost, fetchAllCategory, fetchAllFollowingPost, fetchPostById, fetchAllCommentByPost, fetchAllPostByCategory } = postSlice.actions;

export default postSlice.reducer