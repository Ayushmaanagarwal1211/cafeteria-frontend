import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router'
// import { fetchCounterData } from '../slices/cafeteriaSlice'
export default function Landing() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container min-h-screen flex flex-col lg:flex-row items-stretch justify-center gap-8 p-4 lg:p-8 max-w-[1400px] mx-auto">
        {/* Left side - Image */}
        <div className="w-full lg:w-1/2 h-[80vh] lg:min-h-screen rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] animate-fade-in relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="Cozy cafeteria interior"
            className="w-full h-full object-cover animate-fade-in transform transition-transform duration-700 group-hover:scale-110"/>
        </div>
    {/* Right side - Content */}
    <div className="w-full lg:w-1/2 p-8 lg:p-12 space-y-8 flex flex-col justify-center animate-fade-in delay-150 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="space-y-4 animate-fade-in delay-300">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2 tracking-tight animate-slide-up">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-lg animate-slide-up delay-200">
          Please login or sign up to continue your journey
        </p>
      </div>
      <div className="space-y-4 animate-fade-in delay-500">
        <Link to={'/login'}>
        <button 
          className="cursor-pointer w-full py-6 text-lg bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-300/50 hover:-translate-y-0.5 animate-slide-up delay-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Login
        </button>
        </Link>
        <Link to={'/signup'}>
        <button 
          className="cursor-pointer w-full py-6 text-lg border-2 border-purple-200 text-purple-700 rounded-md hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-purple-200/50 hover:-translate-y-0.5 animate-slide-up delay-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Sign Up
        </button>
        </Link>
      </div>
    </div>
  </div>
</div>
  )
}
