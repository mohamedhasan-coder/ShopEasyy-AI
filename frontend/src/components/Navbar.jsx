import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">ShopEasyy AI</Link>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  )
}
