// src/components/Assessment.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Assessment() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    education: '',
    goal: '',
    countryOfCitizenship: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.age ||
      formData.age < 0 ||
      !formData.education ||
      !formData.goal ||
      !formData.countryOfCitizenship
    ) {
      alert('Please fill in all fields with valid data.')
      return
    }

    const { data, error } = await supabase.from('assessments').insert([formData])
    if (error) {
      alert('Submission failed: ' + error.message)
    } else {
      localStorage.setItem('assessment', JSON.stringify(formData))
      navigate('/results')
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Start Your Assessment</h2>

      <label className="block">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block">
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block">
        Education Level:
        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="block w-full mt-1 p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="No Education">No Education</option>
          <option value="High School">High School</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
        </select>
      </label>

      <label className="block">
        Migration Goal:
        <select
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="block w-full mt-1 p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Asylum">Asylum</option>
          <option value="Family">Family Sponsorship</option>
          <option value="Temporary Visit / Vacation">Temporary Visit / Vacation</option>
        </select>
      </label>

      <label className="block">
        Country of Citizenship:
        <input
          type="text"
          name="countryOfCitizenship"
          value={formData.countryOfCitizenship}
          onChange={handleChange}
          placeholder="e.g. Nigeria"
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
      >
        Submit Assessment
      </button>
    </div>
  )
}
