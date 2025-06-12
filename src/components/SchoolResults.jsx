// src/components/SchoolResults.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

export default function SchoolResults() {
  const [schools, setSchools] = useState([])
  const [maxTuition, setMaxTuition] = useState('')
  const [scholarshipFilter, setScholarshipFilter] = useState('')
  const [maxAppFee, setMaxAppFee] = useState('')
  const [maxProofOfFunds, setMaxProofOfFunds] = useState('')

  // New filters:
  const [countryFilter, setCountryFilter] = useState('')
  const [programLevelFilter, setProgramLevelFilter] = useState('')
  const [maxProgramDuration, setMaxProgramDuration] = useState('')
  const [programNameFilter, setProgramNameFilter] = useState('')

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    const { data, error } = await supabase.from('schools').select('*').order('id', { ascending: false })
    if (error) {
      console.error('Error fetching schools:', error)
    } else {
      setSchools(data)
    }
  }

  const handleSchoolClick = async (schoolName) => {
    const { data: { user } } = await supabase.auth.getUser()
    const userEmail = user?.email || 'Anonymous'

    await supabase.from('school_clicks').insert([
      {
        user_email: userEmail,
        school_name: schoolName,
      },
    ])
  }

  const handleSaveSchool = async (schoolName) => {
    const { data: { user } } = await supabase.auth.getUser()
    const userEmail = user?.email || 'Anonymous'

    await supabase.from('saved_schools').insert([
      {
        user_email: userEmail,
        school_name: schoolName,
      },
    ])
    alert('School saved to your dashboard!')
  }

  const filteredSchools = schools.filter((school) => {
    return (
      (countryFilter ? school.country?.toLowerCase() === countryFilter.toLowerCase() : true) &&
      (programLevelFilter ? school.program_level?.toLowerCase() === programLevelFilter.toLowerCase() : true) &&
      (maxProgramDuration ? (school.program_duration_months || 0) <= parseFloat(maxProgramDuration) : true) &&
      (programNameFilter ? school.program_name?.toLowerCase().includes(programNameFilter.toLowerCase()) : true) &&
      (maxTuition ? (school.tuition || 0) <= parseFloat(maxTuition) : true) &&
      (scholarshipFilter ? school.scholarship_likelihood === scholarshipFilter : true) &&
      (maxAppFee ? (school.application_fee || 0) <= parseFloat(maxAppFee) : true) &&
      (maxProofOfFunds ? (school.proof_of_funds || 0) <= parseFloat(maxProofOfFunds) : true)
    )
  })

  // Extract unique values for country + program level dropdowns:
  const uniqueCountries = Array.from(new Set(schools.map((school) => school.country).filter(Boolean)))
  const uniqueProgramLevels = Array.from(new Set(schools.map((school) => school.program_level).filter(Boolean)))

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">School Finder Results</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        {/* Country */}
        <div>
          <label className="block text-sm font-medium mb-1">Country:</label>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="block w-full p-2 border rounded"
          >
            <option value="">All</option>
            {uniqueCountries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Program Level */}
        <div>
          <label className="block text-sm font-medium mb-1">Program Level:</label>
          <select
            value={programLevelFilter}
            onChange={(e) => setProgramLevelFilter(e.target.value)}
            className="block w-full p-2 border rounded"
          >
            <option value="">All</option>
            {uniqueProgramLevels.map((level, index) => (
              <option key={index} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Max Program Duration */}
        <div>
          <label className="block text-sm font-medium mb-1">Max Program Duration (months):</label>
          <input
            type="number"
            value={maxProgramDuration}
            onChange={(e) => setMaxProgramDuration(e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>

        {/* Program Name text search */}
        <div>
          <label className="block text-sm font-medium mb-1">Program Name (Search):</label>
          <input
            type="text"
            value={programNameFilter}
            onChange={(e) => setProgramNameFilter(e.target.value)}
            className="block w-full p-2 border rounded"
            placeholder="e.g. Business, Computer Science"
          />
        </div>

        {/* Existing filters below */}
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
          {filteredSchools.map((school) => (
            <div key={school.id} className="p-4 border rounded shadow space-y-2">
              <h3 className="text-xl font-bold text-blue-700">{school.name}</h3>
              <p><strong>Country:</strong> {school.country}</p>
              <p><strong>Program Name:</strong> {school.program_name}</p>
              <p><strong>Program Level:</strong> {school.program_level}</p>
              <p><strong>Language of Instruction:</strong> {school.language_of_instruction}</p>
              <p><strong>Intake Periods:</strong> {school.intake_periods}</p>
              <p><strong>Program Duration:</strong> {school.program_duration_months} months</p>
              <p><strong>Delivery Mode:</strong> {school.delivery_mode}</p>
              <p><strong>DLI Number:</strong> {school.dli_number}</p>
              <p><strong>PGWP Eligible:</strong> {school.post_graduation_work_permit_eligible}</p>
              <p><strong>Pathway Program Available:</strong> {school.pathway_program_available}</p>
              <p><strong>Tuition Fee:</strong> {school.currency_code} {school.tuition?.toLocaleString()}</p>
              <p><strong>Estimated Annual Cost of Living:</strong> {school.currency_code} {school.estimated_annual_cost_of_living?.toLocaleString()}</p>
              <p><strong>Application Fee:</strong> {school.currency_code} {school.application_fee}</p>
              <p><strong>Scholarship Likelihood:</strong> {school.scholarship_likelihood}</p>
              <p><strong>Proof of Funds:</strong> {school.currency_code} {school.proof_of_funds?.toLocaleString()}</p>
              <p><strong>Required Scores:</strong>
                <br />
                GRE: {school.gre_score_min}–{school.gre_score_max} |
                GMAT: {school.gmat_score_min}–{school.gmat_score_max} |
                SAT: {school.sat_score_min}–{school.sat_score_max} |
                ACT: {school.act_score_min}–{school.act_score_max} |
                TOEFL: {school.toefl_score_min}–{school.toefl_score_max} |
                IELTS: {school.ielts_score_min}–{school.ielts_score_max}
              </p>
              <p><strong>Last Updated:</strong> {school.last_updated_at}</p>

              <Link
                to={`/school-info/${encodeURIComponent(school.name)}`}
                className="text-blue-600 hover:underline block mt-2"
                onClick={() => handleSchoolClick(school.name)}
              >
                Visit School Website
              </Link>

              <button
                onClick={() => handleSaveSchool(school.name)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
              >
                Save this School
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No schools match your criteria.</p>
      )}
    </div>
  )
}
