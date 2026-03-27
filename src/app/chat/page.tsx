"use client";

import { useState } from "react";
import { Send, User, Paperclip } from "lucide-react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alex D. (Seller)", text: "Hello! I saw your order for the CS assignment. Do you have the rubric?", time: "10:30 AM" },
    { id: 2, sender: "You", text: "Yes, I just uploaded it to the order files. Can you finish it by tomorrow?", time: "10:32 AM" },
    { id: 3, sender: "Alex D. (Seller)", text: "Looking at it now. Tomorrow evening works for me!", time: "10:35 AM" },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "You", text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setMessage("");
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-120px)] flex flex-col pt-4">
      <div className="flex flex-1 overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-xl">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r border-gray-100 hidden md:flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 font-sans">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 bg-indigo-50 border-r-4 border-indigo-500 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">AD</div>
                <div>
                  <div className="font-bold text-sm text-gray-900">Alex D.</div>
                  <div className="text-xs text-indigo-600 font-medium truncate w-40 italic">Active: CS Assignment</div>
                </div>
              </div>
            </div>
            {/* Mock other contact */}
            <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">ST</div>
                <div>
                  <div className="font-bold text-sm text-gray-900">Sarah T.</div>
                  <div className="text-xs text-gray-400 truncate w-40">Previous History Order</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/50 backdrop-blur-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">AD</div>
              <div>
                <h3 className="font-bold text-gray-900">Alex D. (Seller)</h3>
                <span className="text-xs text-green-500 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.sender === 'You' ? 'order-2' : ''}`}>
                  <div className={`p-4 rounded-2xl shadow-sm text-sm ${msg.sender === 'You' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] mt-1 text-gray-400 flex items-center px-1 ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200">
              <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <Paperclip className="w-5 h-5 text-gray-500" />
              </button>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message here..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
