"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-indigo-500 transition-all">
                StudyMarket
              </span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link href="/gigs" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Find Writers</Link>
              <Link href="/orders" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Orders</Link>
              <Link href="/chat" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Messages</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/profile/setup" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors italic border-r border-gray-200 pr-4">Become a Seller</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="font-medium text-sm">{user.email?.split('@')[0]}</span>
                </Link>
                <button 
                  onClick={() => logout()}
                  className="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Log In</Link>
                <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-lg shadow-indigo-200">
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
