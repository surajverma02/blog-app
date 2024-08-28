import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../stores/authSlice'

export const store = configureStore({
  reducer: {
    authReducer,
  },
})