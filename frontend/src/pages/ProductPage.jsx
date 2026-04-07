import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api'

export default function ProductPage(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  useEffect(()=>{ api.get(`/products/${id}`).then(r=>setProduct(r.data)) }, [id])
  if (!product) return <div>Loading...</div>
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <img src={product.images?.[0]?.url || 'https://via.placeholder.com/600'} alt={product.name} className="w-full rounded" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-xl text-green-700">${product.price}</p>
        <p className="mt-4">{product.description}</p>
      </div>
    </div>
  )
}
