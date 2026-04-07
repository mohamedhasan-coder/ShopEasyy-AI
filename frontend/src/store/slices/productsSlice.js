import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'

export const fetchProducts = createAsyncThunk('products/fetch', async (params={}) => {
  const res = await api.get('/products', { params })
  return res.data
})

const slice = createSlice({
  name: 'products',
  initialState: { list: [], total: 0, status: 'idle' },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (s)=>{s.status='loading'})
    b.addCase(fetchProducts.fulfilled, (s,a)=>{s.list=a.payload.data; s.total=a.payload.total; s.status='idle'})
  }
})

export default slice.reducer
