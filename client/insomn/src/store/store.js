import { configureStore } from '@reduxjs/toolkit'
import postSlice from './features/post/Post'
import userSlice from './features/user/User'

const store = configureStore({
  reducer: {
    post: postSlice,
    user: userSlice,
  },
})

export default store
