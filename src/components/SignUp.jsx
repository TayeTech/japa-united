// src/components/SignUp.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      // After sign up → redirect to /signin after short delay
      setTimeout(() => {
        navigate('/signin')
      }, 2000)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-700">Sign Up</h2>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-600 text-center">Sign up successful! Redirecting...</p>}

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{' '}
        <Link to="/signin" className="text-blue-600 hover:underline">Sign In</Link>
      </p>
    </div>
  )
}
