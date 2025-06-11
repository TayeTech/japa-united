// src/components/SchoolResults.jsx
import React, { useState } from 'react'

const dummySchools = [
  {
    name: 'University of Toronto',
    country: 'Canada',
    tuition: 25000,
    applicationFee: 150,
    scholarshipLikelihood: 'High',
    requiredScores: {
      gre: 310,
      gmat: 650,
      sat: 1300,
      act: 28,
      toefl: 100,
      ielts: 7,
    },
    proofOfFunds: 30000,
    website: 'https://www.utoronto.ca/',
  },
  {
    name: 'Harvard University',
    country: 'USA',
    tuition: 55000,
    applicationFee: 85,
    scholarshipLikelihood: 'Medium',
    requiredScores: {
      gre: 320,
      gmat: 700,
      sat: 1450,
      act: 32,
      toefl: 105,
      ielts: 7.5,
    },
    proofOfFunds: 60000,
    website: 'https://www.harvard.edu/',
  },
  {
    name: 'University of Melbourne',
    country: 'Australia',
    tuition: 35000,
    applicationFee: 100,
    scholarshipLikelihood: 'High',
    requiredScores: {
      gre: 305,
      gmat: 640,
      sat: 1250,
      act: 27,
      toefl: 95,
      ielts: 6.5,
    },
    proofOfFunds: 35000,
    website: 'https://www.unimelb.edu.au/',
  },
  {
    name: 'University of Oxford',
    country: 'UK',
    tuition: 40000,
    applicationFee: 75,
    scholarshipLikelihood: 'Low',
    requiredScores: {
      gre: 325,
      gmat: 710,
      sat: 1500,
      act: 34,
      toefl: 110,
      ielts: 8,
    },
    proofOfFunds: 50000,
    website: 'https://www.ox.ac.uk/',
  },
  {
    name: 'University of Lagos',
    country: 'Nigeria',
    tuition: 1000,
    applicationFee: 50,
    scholarshipLikelihood: 'Medium',
    requiredScores: {
      gre: 0,
      gmat: 0,
      sat: 0,
      act: 0,
      toefl: 60,
      ielts: 5.5,
    },
    proofOfFunds: 5000,
    website: 'https://unilag.edu.ng/',
  },
  // Add more schools as needed → easy to expand
]

export default function SchoolResults() {
  const [maxTuition, setMaxTuition] = useState('')
  const [scholarshipFilter, setScholarshipFilter] = useState('')
  const [maxAppFee, setMaxAppFee] = useState('')
  const [maxProofOfFunds, setMaxProofOfFunds] = useState('')

  const filteredSchools = dummySchools.filter((school) => {
    return (
      (maxTuition ? school.tuition <= parseInt(maxTuition) : true) &&
      (scholarshipFilter ? school.scholarshipLikelihood === scholarshipFilter : true) &&
      (maxAppFee ? school.applicationFee <= parseInt(maxAppFee) : true) &&
      (maxProofOfFunds ? school.proofOfFunds <= parseInt(maxProofOfFunds) : true)
    )
  })

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">School Finder Results</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Max Tuition Fee (USD):</label>
          <input
            type="number"
            value={maxTuition}
            onChange={(e) => setMaxTuition(e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Scholarship Likelihood:</label>
          <select
            value={scholarshipFilter}
            onChange={(e) => setScholarshipFilter(e.target.value)}
            className="block w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Max Application Fee (USD):</label>
          <input
            type="number"
            value={maxAppFee}
            onChange={(e) => setMaxAppFee(e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Max Proof of Funds (USD):</label>
          <input
            type="number"
            value={maxProofOfFunds}
            onChange={(e) => setMaxProofOfFunds(e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Results */}
      {filteredSchools.length > 0 ? (
        <div className="space-y-4">
          {filteredSchools.map((school, index) => (
            <div key={index} className="p-4 border rounded shadow space-y-2">
              <h3 className="text-xl font-bold text-blue-700">{school.name}</h3>
              <p><strong>Country:</strong> {school.country}</p>
              <p><strong>Tuition Fee:</strong> ${school.tuition.toLocaleString()}</p>
              <p><strong>Application Fee:</strong> ${school.applicationFee}</p>
              <p><strong>Scholarship Likelihood:</strong> {school.scholarshipLikelihood}</p>
              <p><strong>Proof of Funds:</strong> ${school.proofOfFunds.toLocaleString()}</p>
              <p><strong>Required Scores:</strong> GRE: {school.requiredScores.gre}, GMAT: {school.requiredScores.gmat}, SAT: {school.requiredScores.sat}, ACT: {school.requiredScores.act}, TOEFL: {school.requiredScores.toefl}, IELTS: {school.requiredScores.ielts}</p>
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit School Website
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No schools match your criteria.</p>
      )}
    </div>
  )
}
