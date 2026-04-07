import React from 'react'

export default function AdminDashboard(){
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <p className="text-gray-600">Analytics, product management, and order tracking (scaffolded).</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-indigo-50 rounded">Users: 0</div>
        <div className="p-4 bg-green-50 rounded">Orders: 0</div>
        <div className="p-4 bg-yellow-50 rounded">Revenue: $0</div>
      </div>
    </div>
  )
}
