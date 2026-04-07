import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'

const token = localStorage.getItem('token')

export const fetchMe = createAsyncThunk('auth/me', async () => {
  const res = await api.get('/auth/me')
  return res.data
})

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    setAuth(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

export const { logout, setAuth } = slice.actions
export default slice.reducer
