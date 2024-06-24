import React, { useState } from 'react'
import { login } from '../services/api';

export default function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
  const handleLogin=(event)=>{
     event.preventDefault();
     const data=login(email,password);
     console.log(data);
     
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-600 text-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-6 text-center text-white">Login</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border text-black border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border text-black border-gray-300 rounded"
          />
        </div>
        
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account? Signup
          
        </p>
    
      </form>
    </div>
  )
}
