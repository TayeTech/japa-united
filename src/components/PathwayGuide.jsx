// src/components/PathwayGuide.jsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'

const pathwayDetails = [
  {
    title: 'Canada: Express Entry Program',
    documents: [
      'Passport',
      'IELTS score',
      'Educational Credential Assessment',
      'Proof of Funds',
    ],
    steps: [
      'Check eligibility',
      'Gather documents',
      'Create Express Entry profile',
      'Receive Invitation to Apply (ITA)',
      'Submit application',
      'Wait for decision',
    ],
    links: [
      'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html',
    ],
    timeframe: '6-12 months',
    estimatedCost: '$2,000 - $5,000',
  },
  {
    title: 'USA: H1B Work Visa',
    documents: [
      'Valid passport',
      'Job offer from US employer',
      'Labor Condition Application (LCA)',
      'Proof of qualifications',
    ],
    steps: [
      'Employer files LCA',
      'Employer files H1B petition',
      'Receive approval',
      'Attend visa interview',
      'Receive visa',
    ],
    links: [
      'https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations',
    ],
    timeframe: '6-8 months',
    estimatedCost: '$2,500 - $7,000',
  },
  {
    title: 'USA: F1 Student Visa',
    documents: [
      'Passport',
      'I-20 form',
      'Proof of funds',
      'SEVIS fee receipt',
      'Visa application (DS-160)',
    ],
    steps: [
      'Get admission',
      'Pay SEVIS fee',
      'Book visa interview',
      'Attend interview',
      'Receive visa',
    ],
    links: [
      'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html',
    ],
    timeframe: '1-3 months',
    estimatedCost: '$500 - $1,500',
  },
  {
    title: 'UK: Skilled Worker Visa',
    documents: [
      'Passport',
      'Certificate of Sponsorship',
      'Proof of English',
      'Proof of funds',
    ],
    steps: [
      'Secure job offer',
      'Apply for visa',
      'Biometrics appointment',
      'Receive visa',
    ],
    links: [
      'https://www.gov.uk/skilled-worker-visa',
    ],
    timeframe: '2-4 months',
    estimatedCost: '$1,500 - $3,000',
  },
  {
    title: 'Germany: Blue Card',
    documents: [
      'Passport',
      'Job offer',
      'Proof of qualifications',
      'Health insurance',
    ],
    steps: [
      'Secure job offer',
      'Apply for Blue Card',
      'Attend interview',
      'Receive Blue Card',
    ],
    links: [
      'https://www.make-it-in-germany.com/en/visa-residence/eu-blue-card',
    ],
    timeframe: '2-4 months',
    estimatedCost: '$1,000 - $2,500',
  },
  {
    title: 'Australia: Skilled Independent Visa',
    documents: [
      'Passport',
      'Skills assessment',
      'English test results',
      'Health checks',
    ],
    steps: [
      'Submit Expression of Interest',
      'Receive invitation',
      'Submit visa application',
      'Undergo checks',
      'Receive visa',
    ],
    links: [
      'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189',
    ],
    timeframe: '9-12 months',
    estimatedCost: '$3,000 - $6,000',
  },
  {
    title: 'New Zealand: Skilled Migrant Category Visa',
    documents: [
      'Passport',
      'Job offer (if applicable)',
      'Skills assessment',
      'English test',
    ],
    steps: [
      'Submit Expression of Interest',
      'Receive invitation',
      'Submit visa application',
      'Health and character checks',
      'Receive visa',
    ],
    links: [
      'https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/skilled-migrant-residence-visa',
    ],
    timeframe: '6-12 months',
    estimatedCost: '$3,000 - $5,000',
  },
  {
    title: 'Sweden: Job Seeker Visa',
    documents: [
      'Passport',
      'Proof of qualifications',
      'Proof of funds',
      'Health insurance',
    ],
    steps: [
      'Prepare documents',
      'Submit online application',
      'Attend biometrics appointment',
      'Receive visa',
    ],
    links: [
      'https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden/Job-seeker.html',
    ],
    timeframe: '2-3 months',
    estimatedCost: '$500 - $1,500',
  },
  {
    title: 'Portugal: Digital Nomad Visa',
    documents: [
      'Passport',
      'Proof of income',
      'Proof of accommodation',
      'Health insurance',
    ],
    steps: [
      'Prepare documents',
      'Submit visa application',
      'Attend interview',
      'Receive visa',
    ],
    links: [
      'https://vistos.mne.gov.pt/en/national-visas/digital-nomads',
    ],
    timeframe: '1-3 months',
    estimatedCost: '$500 - $2,000',
  },
  {
    title: 'France: Talent Passport',
    documents: [
      'Passport',
      'Proof of professional activity',
      'Proof of income',
      'Health insurance',
    ],
    steps: [
      'Prepare documents',
      'Submit application',
      'Attend interview',
      'Receive visa',
    ],
    links: [
      'https://france-visas.gouv.fr/en/web/france-visas/talent-passport',
    ],
    timeframe: '2-4 months',
    estimatedCost: '$1,000 - $3,000',
  },
]

export default function PathwayGuide() {
  const { id } = useParams()
  const pathway = pathwayDetails[id]

  if (!pathway) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-bold text-red-700">Pathway not found</h2>
        <Link
          to="/results"
          className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Results
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
        {pathway.title}
      </h2>

      <p className="text-lg"><strong>Estimated Timeframe:</strong> {pathway.timeframe}</p>
      <p className="text-lg"><strong>Estimated Cost:</strong> {pathway.estimatedCost}</p>

      <div>
        <h4 className="text-xl font-semibold mb-2">Required Documents</h4>
        <ul className="list-disc list-inside text-left">
          {pathway.documents.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-xl font-semibold mb-2">Application Steps</h4>
        <ol className="list-decimal list-inside text-left">
          {pathway.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h4 className="text-xl font-semibold mb-2">Helpful Links</h4>
        <ul className="list-disc list-inside text-left">
          {pathway.links.map((link, index) => (
            <li key={index}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/results"
        className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Results
      </Link>
    </div>
  )
}
