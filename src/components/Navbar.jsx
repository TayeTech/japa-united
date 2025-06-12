// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getUser()
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
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
    <header className="flex justify-between items-center p-6 bg-white shadow-md mb-6 border-b border-gray-200">
      <h1 className="text-xl font-bold text-blue-700">Japa United</h1>
      <nav className="space-x-4 text-sm font-medium">
        <Link to="/">Assessment</Link>
        <Link to="/results">Results</Link>
        <Link to="/admin">Admin</Link>

        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button
              onClick={handleSignOut}
              className="text-red-600 hover:underline"
            >
              Sign Out
            </button>
          </>
        )}

        {!user && (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  )
}
