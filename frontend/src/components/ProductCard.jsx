import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({p}){
  return (
    <div className="bg-white rounded shadow p-3">
      <Link to={`/product/${p._id}`}>
        <img src={p.images?.[0]?.url || 'https://via.placeholder.com/300'} alt={p.name} className="h-40 w-full object-cover rounded" />
        <h3 className="font-semibold mt-2">{p.name}</h3>
        <p className="text-sm text-gray-500">${p.price}</p>
      </Link>
    </div>
  )
}
