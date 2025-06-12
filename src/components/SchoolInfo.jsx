// src/components/SchoolInfo.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function SchoolInfo() {
  const { schoolName } = useParams()
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUserEmail(user?.email || 'Anonymous')
  }

  const handleLeadSubmit = async () => {
    await supabase.from('school_clicks').insert([
      {
        user_email: userEmail,
        school_name: decodeURIComponent(schoolName) + ' (Lead Submitted)',
      },
    ])
    setShowConfirm(true)
  }

  const handleProceed = () => {
    // In future → you can store school URLs dynamically.
    const knownLinks = {
      'University of Toronto': 'https://www.utoronto.ca/',
      'Harvard University': 'https://www.harvard.edu/',
      'University of Lagos': 'https://unilag.edu.ng/',
    }
    const url = knownLinks[decodeURIComponent(schoolName)] || 'https://google.com'

    window.location.href = url
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 text-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">School Info</h2>

      <p className="text-lg mb-2">
        You are about to visit <strong>{decodeURIComponent(schoolName)}</strong>.
      </p>

      <p className="text-lg mb-4 text-gray-600">
        Would you like Japa United to assist you with your application to this school?
      </p>

      {!showConfirm ? (
        <>
          <button
            onClick={handleLeadSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4"
          >
            YES — I want Japa United to assist me
          </button>
          <br />
          <button
            onClick={handleProceed}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            NO — Continue to School Website
          </button>
        </>
      ) : (
        <>
          <p className="text-green-700 mb-4">
            Thank you! Your interest has been recorded. We will contact you soon.
          </p>
          <button
            onClick={handleProceed}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Proceed to School Website
          </button>
        </>
      )}
    </div>
  )
}
