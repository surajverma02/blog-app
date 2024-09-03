import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../stores/authSlice'

const store = configureStore({
  reducer: authReducer,
})

export default store;