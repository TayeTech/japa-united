// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('')
  const [savedSchools, setSavedSchools] = useState([])
  const [uploads, setUploads] = useState([])
  const [applicationStatus, setApplicationStatus] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUserEmail(user.email)
      fetchSavedSchools(user.email)
      fetchUploads(user.email)
      fetchApplicationStatus(user.email)
    }
  }

  const fetchSavedSchools = async (email) => {
    const { data, error } = await supabase.from('saved_schools').select('*').eq('user_email', email).order('saved_at', { ascending: false })
    if (error) {
      console.error('Error fetching saved schools:', error)
    } else {
      setSavedSchools(data)
    }
  }

  const fetchUploads = async (email) => {
    const { data, error } = await supabase.from('user_uploads').select('*').eq('user_email', email).order('uploaded_at', { ascending: false })
    if (error) {
      console.error('Error fetching uploads:', error)
    } else {
      setUploads(data)
    }
  }

  const fetchApplicationStatus = async (email) => {
    const { data, error } = await supabase.from('application_status').select('*').eq('user_email', email).order('updated_at', { ascending: false })
    if (error) {
      console.error('Error fetching application status:', error)
    } else {
      setApplicationStatus(data)
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) return
    const filePath = `${userEmail}/${Date.now()}-${selectedFile.name}`

    const { error: uploadError } = await supabase.storage.from('user-uploads').upload(filePath, selectedFile)

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
    } else {
      const { data } = supabase.storage.from('user-uploads').getPublicUrl(filePath)

      await supabase.from('user_uploads').insert([
        {
          user_email: userEmail,
          file_url: data.publicUrl,
          file_type: selectedFile.type,
        },
      ])

      setSelectedFile(null)
      fetchUploads(userEmail)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">My Dashboard</h2>

      {/* My Saved Schools */}
      <div>
        <h3 className="text-2xl font-bold mb-4">My Saved Schools</h3>
        {savedSchools.length > 0 ? (
          <ul className="list-disc list-inside">
            {savedSchools.map((school) => (
              <li key={school.id}>
                {school.school_name} <span className="text-gray-500 text-sm">({new Date(school.saved_at).toLocaleString()})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have not saved any schools yet.</p>
        )}
      </div>

      {/* My Uploads */}
      <div>
        <h3 className="text-2xl font-bold mb-4">My Uploads</h3>

        <div className="flex gap-4 mb-4">
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button
            onClick={handleFileUpload}
            disabled={!selectedFile}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Upload
          </button>
        </div>

        {uploads.length > 0 ? (
          <ul className="list-disc list-inside">
            {uploads.map((upload) => (
              <li key={upload.id}>
                <a href={upload.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {upload.file_url.split('/').pop()}
                </a>{' '}
                <span className="text-gray-500 text-sm">({new Date(upload.uploaded_at).toLocaleString()})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have not uploaded any documents yet.</p>
        )}
      </div>

      {/* My Application Status */}
      <div>
        <h3 className="text-2xl font-bold mb-4">My Application Status</h3>
        {applicationStatus.length > 0 ? (
          <ul className="list-disc list-inside">
            {applicationStatus.map((status) => (
              <li key={status.id}>
                {status.school_name} → <strong>{status.status}</strong>{' '}
                <span className="text-gray-500 text-sm">({new Date(status.updated_at).toLocaleString()})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have no application status updates yet.</p>
        )}
      </div>
    </div>
  )
}
