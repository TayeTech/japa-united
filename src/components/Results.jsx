// src/components/Results.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SchoolResults from './SchoolResults'

const recommendations = {
  High: [
    'Canada: Express Entry',
    'Germany: Blue Card',
    'Australia: Skilled Independent Visa',
  ],
  Medium: [
    'UK: Skilled Worker Visa',
    'USA: H1B Work Visa',
    'New Zealand: Skilled Migrant Visa',
  ],
  Low: ['Asylum', 'Family Sponsorship', 'Temporary Visit / Vacation'],
}

const visaFreeCountries = {
  Nigeria: ['Ghana', 'Kenya', 'Barbados', 'Fiji'],
  India: ['Nepal', 'Bhutan', 'Maldives', 'Mauritius'],
  // Add more countries as needed
}

export default function Results() {
  const [result, setResult] = useState({})
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState('Low')
  const [visaFreeList, setVisaFreeList] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('assessment'))
    setResult(data || {})

    // Simple scoring logic → can be expanded
    let tempScore = 0
    if (data?.education === "Master's" || data?.education === 'PhD') tempScore += 3
    else if (data?.education === "Bachelor's") tempScore += 2
    else tempScore += 1

    if (parseInt(data?.age) >= 25 && parseInt(data?.age) <= 35) tempScore += 3
    else if (parseInt(data?.age) < 25) tempScore += 2
    else tempScore += 1

    setScore(tempScore)

    if (tempScore >= 5) setLevel('High')
    else if (tempScore >= 4) setLevel('Medium')
    else setLevel('Low')

    // Visa-free countries
    if (data?.goal === 'Temporary Visit / Vacation') {
      const list = visaFreeCountries[data?.countryOfCitizenship] || []
      setVisaFreeList(list)
    }
  }, [])

  // 👉 If goal is Study → show SchoolResults instead
  if (result?.goal === 'Study') {
    return <SchoolResults />
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Your Results</h2>

      <p className="text-lg">
        <strong>Name:</strong> {result?.name}
      </p>
      <p className="text-lg">
        <strong>Age:</strong> {result?.age}
      </p>
      <p className="text-lg">
        <strong>Education:</strong> {result?.education}
      </p>
      <p className="text-lg">
        <strong>Goal:</strong> {result?.goal}
      </p>
      <p className="text-lg">
        <strong>Country of Citizenship:</strong> {result?.countryOfCitizenship}
      </p>

      {result?.goal === 'Temporary Visit / Vacation' && (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-2">Visa-Free / Minimal Visa Countries:</h3>
          {visaFreeList.length > 0 ? (
            <ul className="list-disc list-inside">
              {visaFreeList.map((country, index) => (
                <li key={index}>{country}</li>
              ))}
            </ul>
          ) : (
            <p>No visa-free countries found for your citizenship.</p>
          )}
        </div>
      )}

      {result?.goal !== 'Temporary Visit / Vacation' && (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-2">Eligibility Score: {score}</h3>
          <h3 className="text-xl font-bold mb-2">Suggested Pathways ({level} Eligibility):</h3>
          <ul className="list-disc list-inside">
            {recommendations[level].map((item, index) => (
              <li key={index}>
                <Link
                  to={`/pathway/${index}`}
                  className="text-blue-600 hover:underline"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        to="/"
        className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Assessment
      </Link>
    </div>
  )
}
