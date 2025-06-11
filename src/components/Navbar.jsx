// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getUser()

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    navigate('/signin')
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow mb-6">
      <div className="text-xl font-bold text-blue-700">
        <Link to="/">Japa United</Link>
      </div>

      <div className="flex space-x-6 items-center">
        <Link to="/" className="text-blue-700 hover:underline">Home</Link>
        <Link to="/admin" className="text-blue-700 hover:underline">Admin Panel</Link>

        {!user && (
          <>
            <Link to="/signin" className="text-blue-700 hover:underline">Sign In</Link>
            <Link to="/signup" className="text-blue-700 hover:underline">Sign Up</Link>
          </>
        )}

        {user && (
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  )
}
