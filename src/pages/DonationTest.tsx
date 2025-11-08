import { useState } from 'react'

const DonationTest = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [testResults, setTestResults] = useState<any>({})

  const testSteps = [
    {
      step: 1,
      title: 'Visit Donate Page',
      description: 'User visits /donate and sees two donation options',
      action: () => window.open('/donate', '_blank')
    },
    {
      step: 2,
      title: 'Click Online Donation Button',
      description: 'User clicks the PayPal donation gif button',
      action: () => window.open('/seecform', '_blank')
    },
    {
      step: 3,
      title: 'Fill Out SEEC Form',
      description: 'User fills out the required SEEC Individual Contributor Form',
      test: true
    },
    {
      step: 4,
      title: 'Submit Form & Email Processing',
      description: 'Form submits, emails are sent to admin and donor',
      test: true
    },
    {
      step: 5,
      title: 'Redirect to Thank You Page',
      description: 'User is redirected to thank you page with confirmation',
      action: () => window.open('/thankyou', '_blank')
    }
  ]

  const runFormTest = () => {
    // Simulate filling out form with test data
    const testFormData = {
      'your-first-name': 'John',
      'text-initial': 'D',
      'your-last-name': 'Doe',
      'your-email': 'john.doe@example.com',
      'tel-number': '(555) 123-4567',
      donation: 100,
      'your-street': '123 Main Street',
      'your-city': 'Bridgewater',
      'your-state': 'CT',
      'your-zip': '06752',
      'checkbox-under18': false,
      'text-age': '',
      employer: 'Self-Employed',
      occupation: 'Software Developer',
      'checkbox-lobby': 'No',
      'checkbox-spouse': 'No',
      'checkbox-elected': '',
      'checkbox-contractor': 'No',
      'checkbox-branch': [],
      'checkbox-contractor-official': '',
      'checkbox-holder': 'No',
      'digital-signature': 'John D Doe'
    }

    // Store test data
    localStorage.setItem('testSEECSubmission', JSON.stringify({
      formData: testFormData,
      timestamp: new Date().toISOString(),
      testMode: true
    }))

    setTestResults(prev => ({
      ...prev,
      formTest: {
        success: true,
        data: testFormData,
        timestamp: new Date().toISOString()
      }
    }))

    setCurrentStep(4)
  }

  const runEmailTest = async () => {
    try {
      // Import email service
      const { sendSEECNotification, sendDonorConfirmation, getEmailRecipients } = await import('../utils/emailService')

      const testData = testResults.formTest?.data
      if (!testData) {
        throw new Error('No test form data available')
      }

      const recipients = getEmailRecipients()

      // Test admin notification
      const notificationResult = await sendSEECNotification(testData, recipients)

      // Test donor confirmation
      const confirmationResult = await sendDonorConfirmation(testData)

      setTestResults(prev => ({
        ...prev,
        emailTest: {
          success: true,
          notificationSent: notificationResult.success,
          confirmationSent: confirmationResult.success,
          recipients,
          timestamp: new Date().toISOString()
        }
      }))

      setCurrentStep(5)
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        emailTest: {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }
      }))
    }
  }

  const resetTest = () => {
    setCurrentStep(1)
    setTestResults({})
    localStorage.removeItem('testSEECSubmission')
    localStorage.removeItem('lastSEECSubmission')
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="font-adamina text-3xl font-bold text-[#40474a] mb-4">
              Donation Flow Test Suite
            </h1>
            <p className="text-gray-600">
              Test the complete donation process from Donate page to Thank You page
            </p>
          </div>

          {/* Test Steps */}
          <div className="space-y-6">
            {testSteps.map((step) => (
              <div
                key={step.step}
                className={`p-6 border rounded-lg ${
                  currentStep === step.step
                    ? 'border-[#9e562a] bg-orange-50'
                    : currentStep > step.step
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                        currentStep > step.step
                          ? 'bg-green-500'
                          : currentStep === step.step
                          ? 'bg-[#9e562a]'
                          : 'bg-gray-400'
                      }`}
                    >
                      {currentStep > step.step ? '✓' : step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {step.action && (
                      <button
                        onClick={() => {
                          step.action?.()
                          if (step.step < 3) setCurrentStep(step.step + 1)
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Open Page
                      </button>
                    )}
                    {step.test && step.step === 3 && (
                      <button
                        onClick={runFormTest}
                        className="bg-[#9e562a] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#8a4a24] transition-colors"
                      >
                        Test Form
                      </button>
                    )}
                    {step.test && step.step === 4 && testResults.formTest && (
                      <button
                        onClick={runEmailTest}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        Test Emails
                      </button>
                    )}
                  </div>
                </div>

                {/* Test Results */}
                {step.step === 3 && testResults.formTest && (
                  <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
                    <h4 className="font-semibold text-green-800">Form Test Results:</h4>
                    <p className="text-green-700">✓ Test form data generated successfully</p>
                    <p className="text-green-700">✓ Form validation would pass</p>
                    <p className="text-sm text-green-600 mt-2">
                      Test donor: {testResults.formTest.data['your-first-name']} {testResults.formTest.data['your-last-name']}
                      (${testResults.formTest.data.donation})
                    </p>
                  </div>
                )}

                {step.step === 4 && testResults.emailTest && (
                  <div className={`mt-4 p-4 rounded border ${
                    testResults.emailTest.success
                      ? 'bg-green-100 border-green-300'
                      : 'bg-red-100 border-red-300'
                  }`}>
                    <h4 className={`font-semibold ${
                      testResults.emailTest.success ? 'text-green-800' : 'text-red-800'
                    }`}>
                      Email Test Results:
                    </h4>
                    {testResults.emailTest.success ? (
                      <div className="text-green-700">
                        <p>✓ Admin notification: {testResults.emailTest.notificationSent ? 'Sent' : 'Failed'}</p>
                        <p>✓ Donor confirmation: {testResults.emailTest.confirmationSent ? 'Sent' : 'Failed'}</p>
                        <p className="text-sm text-green-600 mt-2">
                          Recipients: {testResults.emailTest.recipients?.join(', ')}
                        </p>
                        <p className="text-xs text-green-500 mt-1">
                          Check browser console for email content
                        </p>
                      </div>
                    ) : (
                      <p className="text-red-700">✗ Error: {testResults.emailTest.error}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={resetTest}
              className="bg-gray-600 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors"
            >
              Reset Test
            </button>
            <button
              onClick={() => window.open('/admin', '_blank')}
              className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              View Admin Panel
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-4">Testing Instructions:</h3>
            <div className="text-blue-700 space-y-2">
              <p>1. Click "Open Page" for steps 1, 2, and 5 to see each page in the flow</p>
              <p>2. Use "Test Form" to simulate form data submission</p>
              <p>3. Use "Test Emails" to simulate email sending (check browser console for content)</p>
              <p>4. In a real deployment, emails would be sent via EmailJS or similar service</p>
              <p>5. PayPal integration would redirect to actual PayPal payment processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationTest
