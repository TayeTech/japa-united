// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Assessment from './components/Assessment'
import Results from './components/Results'
import PathwayDetail from './components/PathwayDetail'
import AdminPanel from './components/AdminPanel'

function App() {
  return (
    <Router>
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
            <Route path="/pathway/:id" element={<PathwayDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
