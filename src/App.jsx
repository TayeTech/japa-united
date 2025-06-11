// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Assessment from './components/Assessment'
import Results from './components/Results'
import PathwayGuide from './components/PathwayGuide'
import AdminPanel from './components/AdminPanel'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'


function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
          <h1 className="text-xl font-bold text-blue-700">Japa United</h1>
          <nav className="space-x-6">
            <Link to="/">Assessment</Link>
            <Link to="/results">Results</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
            <Route path="/pathway/:id" element={<PathwayGuide />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/signin" element={<SignIn />} />
	    <Route path="/signup" element={<SignUp />} />

          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
