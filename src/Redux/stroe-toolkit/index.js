// https://juejin.cn/post/7106114834957074439#comment
import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = {
  name: 'PROGRESS',
  data: 20
}

const userReducer = createSlice({
  name: 'Progress',
  initialState,
  reducer: {
    setPregress(state, action) {
      state.age = action.payload
    }
  }
})

const store = configureStore({
  reducer: {
    progress: userReducer.reducer
  },
  devTools: true
})

export const { setPregress } = userReducer.actions
export default store
