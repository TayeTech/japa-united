// src/components/AdminPanel.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AdminPanel() {
  const [assessments, setAssessments] = useState([])
  const [schoolClicks, setSchoolClicks] = useState([])
  const [schools, setSchools] = useState([])
  const [showSchoolClicks, setShowSchoolClicks] = useState(false)
  const [showManageSchools, setShowManageSchools] = useState(false)
  const [goalFilter, setGoalFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [user, setUser] = useState(null)
  const [newSchool, setNewSchool] = useState({
    name: '',
    country: '',
    tuition: '',
    application_fee: '',
    scholarship_likelihood: '',
    gre_score: '',
    gmat_score: '',
    sat_score: '',
    act_score: '',
    toefl_score: '',
    ielts_score: '',
    proof_of_funds: '',
    website: '',
  })

  useEffect(() => {
    getUser()
    fetchAssessments()
    fetchSchoolClicks()
    fetchSchools()
  }, [])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchAssessments = async () => {
    const { data, error } = await supabase.from('assessments').select('*').order('id', { ascending: false })
    if (error) {
      console.error('Error fetching assessments:', error)
    } else {
      setAssessments(data)
    }
  }

  const fetchSchoolClicks = async () => {
    const { data, error } = await supabase.from('school_clicks').select('*').order('clicked_at', { ascending: false })
    if (error) {
      console.error('Error fetching school clicks:', error)
    } else {
      setSchoolClicks(data)
    }
  }

  const fetchSchools = async () => {
    const { data, error } = await supabase.from('schools').select('*').order('id', { ascending: false })
    if (error) {
      console.error('Error fetching schools:', error)
    } else {
      setSchools(data)
    }
  }

  const addSchool = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('schools').insert([newSchool])
    if (error) {
      console.error('Error adding school:', error)
    } else {
      fetchSchools()
      setNewSchool({
        name: '',
        country: '',
        tuition: '',
        application_fee: '',
        scholarship_likelihood: '',
        gre_score: '',
        gmat_score: '',
        sat_score: '',
        act_score: '',
        toefl_score: '',
        ielts_score: '',
        proof_of_funds: '',
        website: '',
      })
    }
  }

  const deleteSchool = async (id) => {
    const { error } = await supabase.from('schools').delete().eq('id', id)
    if (error) {
      console.error('Error deleting school:', error)
    } else {
      fetchSchools()
    }
  }

  const filteredAssessments = assessments.filter((assessment) => {
    return (
      (goalFilter ? assessment.goal === goalFilter : true) &&
      (countryFilter ? assessment.countryOfCitizenship === countryFilter : true)
    )
  })

  if (!user || user.email !== 'taiwonorticlasisi@gmail.com') {
    return <p className="text-center text-red-600 mt-10">Access Denied. Admins Only.</p>
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Admin Panel</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Filter by Goal:</label>
          <select
            value={goalFilter}
            onChange={(e) => setGoalFilter(e.target.value)}
            className="block w-full p-2 border rounded"
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
          <label className="block text-sm font-medium mb-1">Filter by Country:</label>
          <input
            type="text"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="block w-full p-2 border rounded"
            placeholder="Country of Citizenship"
          />
        </div>
      </div>

      {/* Toggle buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setShowSchoolClicks(!showSchoolClicks)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showSchoolClicks ? 'Hide' : 'Show'} School Click Logs
        </button>
        <button
          onClick={() => setShowManageSchools(!showManageSchools)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {showManageSchools ? 'Hide' : 'Show'} Manage Schools
        </button>
      </div>

      {/* Assessments Table */}
      {!showSchoolClicks && !showManageSchools && (
        <div>
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
              {filteredAssessments.map((assessment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{assessment.name}</td>
                  <td className="border p-2">{assessment.age}</td>
                  <td className="border p-2">{assessment.education}</td>
                  <td className="border p-2">{assessment.goal}</td>
                  <td className="border p-2">{assessment.countryOfCitizenship}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* School Click Logs Table */}
      {showSchoolClicks && (
        <div>
          <h3 className="text-2xl font-bold mb-4">School Click Logs</h3>
          <table className="min-w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">User Email</th>
                <th className="border p-2">School Name</th>
                <th className="border p-2">Clicked At</th>
              </tr>
            </thead>
            <tbody>
              {schoolClicks.map((click, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{click.user_email}</td>
                  <td className="border p-2">{click.school_name}</td>
                  <td className="border p-2">{new Date(click.clicked_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Manage Schools */}
      {showManageSchools && (
        <div>
          <h3 className="text-2xl font-bold mb-4">Manage Schools</h3>
          <form onSubmit={addSchool} className="space-y-4 mb-6">
            {Object.keys(newSchool).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1 capitalize">{key.replace(/_/g, ' ')}:</label>
                <input
                  type="text"
                  value={newSchool[key]}
                  onChange={(e) =>
                    setNewSchool((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="block w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add School
            </button>
          </form>

          <table className="min-w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Country</th>
                <th className="border p-2">Tuition</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50">
                  <td className="border p-2">{school.name}</td>
                  <td className="border p-2">{school.country}</td>
                  <td className="border p-2">${school.tuition}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => deleteSchool(school.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

