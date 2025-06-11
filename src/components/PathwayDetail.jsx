// src/components/PathwayDetail.jsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'

const dummyPathways = [
  'Canada: Express Entry Program',
  'Germany: Skilled Worker Visa',
  'Australia: General Skilled Migration',
  'UK: Temporary Work Visa',
  'France: Student Visa with Path to Work',
  'New Zealand: Essential Skills Work Visa',
  'South Africa: Visit Visa',
  'Ghana: Family Reunification Visa',
  'Kenya: Tourism Visa',
]

export default function PathwayDetail() {
  const { id } = useParams()
  const pathway = dummyPathways[id] || 'Unknown Pathway'

  return (
    <div className="max-w-xl mx-auto text-center space-y-6">
      <h2 className="text-3xl font-bold text-blue-700">{pathway}</h2>
      <p className="text-lg">
        Detailed steps and guidance for this pathway will appear here.
      </p>
      <p>
        This section will include: required documents, process steps, timelines,
        links to forms, and tips.
      </p>

      <Link
        to="/results"
        className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Results
      </Link>
    </div>
  )
}
