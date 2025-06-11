// src/components/Results.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const recommendations = {
  High: [
    'Canada: Express Entry Program',
    'Germany: Skilled Worker Visa',
    'Australia: General Skilled Migration',
  ],
  Medium: [
    'UK: Temporary Work Visa',
    'France: Student Visa with Path to Work',
    'New Zealand: Essential Skills Work Visa',
  ],
  Low: [
    'South Africa: Visit Visa',
    'Ghana: Family Reunification Visa',
    'Kenya: Tourism Visa',
  ],
}

export default function Results() {
  const formData = JSON.parse(localStorage.getItem('assessment'))

  const calculateEligibility = (data) => {
    let score = 0

    if (parseInt(data.age) >= 18 && parseInt(data.age) <= 35) score += 30
    else if (parseInt(data.age) <= 45) score += 20

    switch (data.education) {
      case 'PhD': score += 40; break
      case "Master's": score += 30; break
      case "Bachelor's": score += 20; break
      case 'High School': score += 10; break
      default: break
    }

    switch (data.goal) {
      case 'Study': score += 20; break
      case 'Work': score += 30; break
      case 'Asylum': score += 15; break
      case 'Family': score += 10; break
      case 'Temporary Visit': score += 5; break
      default: break
    }

    return score
  }

  const score = calculateEligibility(formData)
  let level = ''
  if (score >= 80) level = 'High'
  else if (score >= 50) level = 'Medium'
  else level = 'Low'

  return (
    <div className="max-w-xl mx-auto text-center space-y-6">
      <h2 className="text-3xl font-bold text-green-700">Assessment Result</h2>
      <p className="text-lg">Eligibility Score: <strong>{score}</strong></p>
      <p className="text-lg">Eligibility Level: <strong>{level}</strong></p>

      <div>
        <h4 className="text-xl font-semibold mb-2">Recommended Pathways</h4>
        <ul className="list-disc list-inside text-left max-w-md mx-auto">
          {recommendations[level].map((item, index) => (
            <li key={index}>
              <Link to={`/pathway/${index}`} className="text-blue-600 hover:underline">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/"
        className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Start Over
      </Link>
    </div>
  )
}
