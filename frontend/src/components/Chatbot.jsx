import React, { useState } from 'react'
import api from '../utils/api'

export default function Chatbot(){
  const [msg, setMsg] = useState('')
  const [history, setHistory] = useState([])

  const send = async () => {
    if (!msg) return
    const userMsg = { from: 'user', text: msg }
    setHistory(h => [...h, userMsg])
    setMsg('')
    const res = await api.post('/ai/chat', { message: userMsg.text })
    setHistory(h => [...h, { from: 'bot', text: res.data.reply || JSON.stringify(res.data) }])
  }

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return alert('Speech API not supported')
    const r = new SpeechRecognition(); r.lang = 'en-US'
    r.onresult = (e) => { setMsg(e.results[0][0].transcript) }
    r.start()
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold">ShopEasyy Assistant</h4>
      <div className="h-64 overflow-auto my-2 p-2 border rounded bg-gray-50">
        {history.map((h,i)=> <div key={i} className={h.from==='user'? 'text-right':'text-left'}>{h.text}</div>)}
      </div>
      <div className="flex gap-2">
        <input value={msg} onChange={e=>setMsg(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Ask me to find a product..." />
        <button onClick={startVoice} className="px-3 py-2 bg-indigo-500 text-white rounded">🎤</button>
        <button onClick={send} className="px-3 py-2 bg-green-500 text-white rounded">Send</button>
      </div>
    </div>
  )
}
