// src/components/AdminPanel.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AdminPanel() {
  const [assessments, setAssessments] = useState([])
  const [filteredGoal, setFilteredGoal] = useState('')
  const [filteredCountry, setFilteredCountry] = useState('')
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    fetchUser()
    fetchAssessments()
  }, [])

  const fetchUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error fetching user:', error)
    } else {
      setUser(user)
    }
    setLoadingUser(false)
  }

  const fetchAssessments = async () => {
    const { data, error } = await supabase.from('assessments').select('*')
    if (error) {
      console.error('Error fetching assessments:', error)
    } else {
      setAssessments(data)
    }
  }

  const filteredAssessments = assessments.filter((item) => {
    return (
      (filteredGoal ? item.goal === filteredGoal : true) &&
      (filteredCountry ? item.countryOfCitizenship === filteredCountry : true)
    )
  })

  if (loadingUser) {
    return <p className="text-center mt-10 text-lg text-gray-600">Loading...</p>
  }

  if (!user || user.email !== 'taiwonorticlasisi@gmail.com') {
    return (
      <p className="text-center mt-10 text-lg text-red-600">
        Access Denied — Admin Only
      </p>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Admin Panel - Assessments</h2>

      <div className="flex space-x-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Filter by Goal:</label>
          <select
            value={filteredGoal}
            onChange={(e) => setFilteredGoal(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="">All</option>
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Asylum">Asylum</option>
            <option value="Family">Family Sponsorship</option>
            <option value="Temporary Visit / Vacation">Temporary Visit / Vacation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Filter by Country:</label>
          <input
            type="text"
            value={filteredCountry}
            onChange={(e) => setFilteredCountry(e.target.value)}
            placeholder="e.g. Nigeria"
            className="block w-full mt-1 p-2 border rounded"
          />
        </div>
      </div>

      <table className="min-w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Education</th>
            <th className="border p-2">Goal</th>
            <th className="border p-2">Country of Citizenship</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssessments.length > 0 ? (
            filteredAssessments.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.age}</td>
                <td className="border p-2">{item.education}</td>
                <td className="border p-2">{item.goal}</td>
                <td className="border p-2">{item.countryOfCitizenship}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-4 text-center text-gray-500">
                No assessments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
