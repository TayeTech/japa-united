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
    greScore: '',
    gmatScore: '',
    satScore: '',
    actScore: '',
    toeflScore: '',
    ieltsScore: '',
    fieldOfStudy: '',
    budgetMin: '',
    budgetMax: '',
    levelOfStudy: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    localStorage.setItem('assessment', JSON.stringify(formData))

    const { error } = await supabase.from('assessments').insert([
      {
        name: formData.name,
        age: formData.age,
        education: formData.education,
        goal: formData.goal,
        countryOfCitizenship: formData.countryOfCitizenship,
      },
    ])

    if (error) {
      console.error('Error saving assessment:', error)
    }

    navigate('/results')
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Japa United Assessment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Education:</label>
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
            required
          >
            <option value="">Select</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Goal:</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
            required
          >
            <option value="">Select</option>
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Asylum">Asylum</option>
            <option value="Family">Family Sponsorship</option>
            <option value="Temporary Visit / Vacation">Temporary Visit / Vacation</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Country of Citizenship:</label>
          <input
            type="text"
            name="countryOfCitizenship"
            value={formData.countryOfCitizenship}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
            required
          />
        </div>

        {formData.goal === 'Study' && (
          <>
            <div>
              <label className="block mb-1">GRE Score:</label>
              <input
                type="number"
                name="greScore"
                value={formData.greScore}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">GMAT Score:</label>
              <input
                type="number"
                name="gmatScore"
                value={formData.gmatScore}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">SAT Score:</label>
              <input
                type="number"
                name="satScore"
                value={formData.satScore}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">ACT Score:</label>
              <input
                type="number"
                name="actScore"
                value={formData.actScore}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">TOEFL Score:</label>
              <input
                type="number"
                name="toeflScore"
                value={formData.toeflScore}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">IELTS Score:</label>
              <input
                type="number"
                name="ieltsScore"
                value={formData.ieltsScore}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Desired Field of Study:</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Budget for Tuition (Min USD):</label>
              <input
                type="number"
                name="budgetMin"
                value={formData.budgetMin}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Budget for Tuition (Max USD):</label>
              <input
                type="number"
                name="budgetMax"
                value={formData.budgetMax}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Level of Study:</label>
              <select
                name="levelOfStudy"
                value={formData.levelOfStudy}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              >
                <option value="">Select</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
                <option value="Certification Course">Certification Course</option>
                <option value="Associate Degree">Associate Degree</option>
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
