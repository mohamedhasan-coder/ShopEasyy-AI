import { createSlice } from '@reduxjs/toolkit'

const initial = JSON.parse(localStorage.getItem('cart') || '[]')

const slice = createSlice({
  name: 'cart',
  initialState: { items: initial },
  reducers: {
    addItem(state, action) {
      const item = action.payload
      const idx = state.items.findIndex(i => i.product === item.product)
      if (idx > -1) state.items[idx].qty += item.qty
      else state.items.push(item)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.product !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearCart(state){
      state.items = []
      localStorage.removeItem('cart')
    }
  }
})

export const { addItem, removeItem, clearCart } = slice.actions
export default slice.reducer
