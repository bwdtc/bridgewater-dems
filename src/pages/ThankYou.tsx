import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDonationContent } from '../utils/contentService'

const ThankYou = () => {
  const [searchParams] = useSearchParams()
  const [donationInfo, setDonationInfo] = useState<any>(null)
  const content = useDonationContent()

  useEffect(() => {
    // Check for PayPal return parameters
    const paymentId = searchParams.get('paymentId')
    const payerId = searchParams.get('PayerID')
    const amount = searchParams.get('amount')

    // Try to get SEEC form data from localStorage
    const lastSubmission = localStorage.getItem('lastSEECSubmission')
    if (lastSubmission) {
      try {
        const submissionData = JSON.parse(lastSubmission)
        setDonationInfo({
          ...submissionData.formData,
          paymentId,
          payerId,
          amount
        })
      } catch (error) {
        console.error('Error parsing SEEC submission data:', error)
      }
    } else {
      // For demo purposes, show sample data if no real submission exists
      setDonationInfo({
        'your-first-name': 'Demo',
        'your-last-name': 'Donor',
        'your-email': 'demo@example.com',
        donation: 100,
        paymentId: 'DEMO123',
        payerId: 'DEMO456',
        amount: '100'
      })
    }
  }, [searchParams])

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 pr-8">
        <div className="text-center py-12">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl font-bold text-[#40474a] mb-6">
            {content.thankYouPage.title}
          </h1>

          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-xl text-gray-700">
              {content.thankYouPage.subtitle}
            </p>

            {donationInfo && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
                <h2 className="text-xl font-semibold text-green-800 mb-4">{content.thankYouPage.summaryTitle}</h2>
                <div className="text-left space-y-2 text-green-700">
                  <p><strong>Donor:</strong> {donationInfo['your-first-name']} {donationInfo['your-last-name']}</p>
                  <p><strong>Email:</strong> {donationInfo['your-email']}</p>
                  <p><strong>Amount:</strong> ${donationInfo.donation}</p>
                  <p><strong>Method:</strong> PayPal</p>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">{content.thankYouPage.nextStepsTitle}</h2>
              <div className="text-left space-y-3 text-blue-700">
                {content.thankYouPage.nextSteps.map((step, index) => (
                  <p key={index}>• {step}</p>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{content.thankYouPage.engagementTitle}</h2>
              <p className="text-gray-700 mb-4">
                {content.thankYouPage.engagementSubtitle}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/volunteer"
                  className="bg-[#9e562a] text-white px-6 py-2 rounded-md font-medium hover:bg-[#8a4a24] transition-colors"
                >
                  Volunteer
                </a>
                <a
                  href="/events"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  View Events
                </a>
                <a
                  href="/candidates"
                  className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                >
                  Meet Candidates
                </a>
                <a
                  href="/contact"
                  className="bg-gray-600 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-gray-600">
                {content.thankYouPage.contactNote} <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">Contact us here</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-80 pl-6 border-l border-gray-200">
        {/* Contact Us Widget */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wide">
            Contact Us
          </h3>
          <div className="text-gray-600">
            <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">
              eMail/USMail us here
            </a>
          </div>
        </div>

        {/* About Us Widget */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wide">
            About Us
          </h3>
          <div className="text-gray-600">
            <a href="/about" className="text-blue-600 hover:text-blue-800 underline">
              About the DTC
            </a>
          </div>
        </div>

        {/* Upcoming Events Widget */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wide">
            Upcoming Events
          </h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-blue-600 hover:text-blue-800">
                <a href="/events" className="underline">Test</a>
              </h4>
              <p className="text-sm text-gray-600">
                June 13 @ 8:00 PM - 9:00 PM
              </p>
            </div>
          </div>
          <div className="mt-4">
            <a href="/events" className="text-blue-600 hover:text-blue-800 underline">
              View All Events
            </a>
          </div>
        </div>

        {/* Recent Donations Widget */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wide">
            Recent Supporters
          </h3>
          <div className="text-gray-600 space-y-2">
            <p className="text-sm">Thank you to our recent donors who help make our work possible!</p>
            <div className="text-xs space-y-1">
              <p>• Anonymous - $100</p>
              <p>• Community Member - $50</p>
              <p>• Local Supporter - $25</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default ThankYou
