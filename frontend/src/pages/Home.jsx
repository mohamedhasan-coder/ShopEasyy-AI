import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/slices/productsSlice'
import ProductCard from '../components/ProductCard'
import Chatbot from '../components/Chatbot'

export default function Home(){
  const dispatch = useDispatch()
  const { list } = useSelector(s=>s.products)
  useEffect(()=>{ dispatch(fetchProducts()) }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <section className="md:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list?.map(p => <ProductCard key={p._id} p={p} />)}
        </div>
      </section>
      <aside className="md:col-span-1">
        <Chatbot />
      </aside>
    </div>
  )
}
