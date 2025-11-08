import { useState } from 'react'
import { sendSEECNotification, sendDonorConfirmation, getEmailRecipients } from '../utils/emailService'
import { useDonationContent } from '../utils/contentService'

interface SEECFormData {
  'your-first-name': string
  'text-initial': string
  'your-last-name': string
  'your-email': string
  'tel-number': string
  donation: number
  'your-street': string
  'your-city': string
  'your-state': string
  'your-zip': string
  'checkbox-under18': boolean
  'text-age': string
  employer: string
  occupation: string
  'checkbox-lobby': string
  'checkbox-spouse': string
  'checkbox-elected': string
  'checkbox-contractor': string
  'checkbox-branch': string[]
  'checkbox-contractor-official': string
  'checkbox-holder': string
  'digital-signature': string
}

const SEECForm = () => {
  const content = useDonationContent()
  const [formData, setFormData] = useState<SEECFormData>({
    'your-first-name': '',
    'text-initial': '',
    'your-last-name': '',
    'your-email': '',
    'tel-number': '',
    donation: 5,
    'your-street': '',
    'your-city': '',
    'your-state': '',
    'your-zip': '',
    'checkbox-under18': false,
    'text-age': '',
    employer: '',
    occupation: '',
    'checkbox-lobby': '',
    'checkbox-spouse': '',
    'checkbox-elected': '',
    'checkbox-contractor': '',
    'checkbox-branch': [],
    'checkbox-contractor-official': '',
    'checkbox-holder': '',
    'digital-signature': ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      if (name === 'checkbox-branch') {
        const currentValues = formData['checkbox-branch']
        if (checkbox.checked) {
          setFormData(prev => ({
            ...prev,
            'checkbox-branch': [...currentValues, value]
          }))
        } else {
          setFormData(prev => ({
            ...prev,
            'checkbox-branch': currentValues.filter(v => v !== value)
          }))
        }
      } else if (name === 'checkbox-under18') {
        setFormData(prev => ({
          ...prev,
          [name]: checkbox.checked
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Get email recipients from admin settings
      const recipients = getEmailRecipients()

      // Send SEEC notification email to admin recipients
      const notificationResult = await sendSEECNotification(formData, recipients)
      if (!notificationResult.success) {
        console.warn('Failed to send admin notification:', notificationResult.error)
        // Continue anyway - don't block the donation process
      }

      // Send confirmation email to the donor
      const confirmationResult = await sendDonorConfirmation(formData)
      if (!confirmationResult.success) {
        console.warn('Failed to send donor confirmation:', confirmationResult.error)
        // Continue anyway - don't block the donation process
      }

      // Store form data in localStorage for the thank you page
      localStorage.setItem('lastSEECSubmission', JSON.stringify({
        formData,
        notificationSent: notificationResult.success,
        confirmationSent: confirmationResult.success,
        timestamp: new Date().toISOString()
      }))

      // Simulate PayPal processing (in production, this would redirect to actual PayPal)
      // For now, we'll go directly to the thank you page
      window.location.href = '/thankyou'
    } catch (error) {
      setSubmitMessage('There was an error processing your form. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="font-adamina text-3xl font-bold text-[#40474a] mb-4">
              {content.seecForm.title}
            </h1>
            <p className="text-gray-600">
              {content.seecForm.subtitle}
            </p>
          </div>

          {submitMessage && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Individual Contributor Information */}
            <div>
              <h2 className="font-bold text-lg mb-4">{content.seecForm.contributorSectionTitle}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">First Name:</label>
                  <input
                    type="text"
                    name="your-first-name"
                    required
                    value={formData['your-first-name']}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Middle Initial:</label>
                  <input
                    type="text"
                    name="text-initial"
                    maxLength={1}
                    value={formData['text-initial']}
                    onChange={handleInputChange}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Last Name:</label>
                  <input
                    type="text"
                    name="your-last-name"
                    required
                    value={formData['your-last-name']}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Your Email Address:</label>
                  <input
                    type="email"
                    name="your-email"
                    required
                    value={formData['your-email']}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Your Phone Number:</label>
                  <input
                    type="tel"
                    name="tel-number"
                    required
                    value={formData['tel-number']}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Donation Amount */}
            <div>
              <label className="block font-medium mb-2">{content.seecForm.donationSectionTitle}</label>
              <div className="flex items-center space-x-2">
                <span>$</span>
                <input
                  type="number"
                  name="donation"
                  required
                  min={5}
                  max={2000}
                  step={5}
                  value={formData.donation}
                  onChange={handleInputChange}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                />
                <span className="text-sm text-gray-600">(Min: $5. Max: $2000)</span>
              </div>
            </div>

            {/* Residential Address */}
            <div>
              <h3 className="font-bold text-lg mb-4">{content.seecForm.addressSectionTitle}</h3>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">STREET:</label>
                  <input
                    type="text"
                    name="your-street"
                    required
                    value={formData['your-street']}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">CITY:</label>
                  <input
                    type="text"
                    name="your-city"
                    required
                    value={formData['your-city']}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">ST:</label>
                  <input
                    type="text"
                    name="your-state"
                    required
                    value={formData['your-state']}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">ZIP CODE:</label>
                  <input
                    type="text"
                    name="your-zip"
                    required
                    value={formData['your-zip']}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Age Information */}
            <div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="checkbox-under18"
                    checked={formData['checkbox-under18']}
                    onChange={handleInputChange}
                    className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                  />
                  <span>Please check if you are UNDER 18:</span>
                </label>

                {formData['checkbox-under18'] && (
                  <div>
                    <label className="block font-medium mb-2">If under 18, please list your age:</label>
                    <input
                      type="text"
                      name="text-age"
                      value={formData['text-age']}
                      onChange={handleInputChange}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">
                  NAME OF EMPLOYER (If self-employed, provide Name of Business. Example: Dave's Painting Other Examples: Retired, Unemployed, Student, Homemaker):
                </label>
                <input
                  type="text"
                  name="employer"
                  required
                  value={formData.employer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  PRINCIPAL OCCUPATION (If self-employed, provide Job Description. Example: Painter Other Examples: Retired, Unemployed, Student, Homemaker):
                </label>
                <input
                  type="text"
                  name="occupation"
                  required
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                />
              </div>
            </div>

            <hr className="my-6" />

            {/* Legal Disclosure Requirements */}
            <div>
              <p className="font-bold mb-4">
                {content.seecForm.legalInstructions}
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2">Are you a communicator lobbyist?**</label>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="checkbox-lobby"
                        value="Yes"
                        required
                        checked={formData['checkbox-lobby'] === 'Yes'}
                        onChange={handleInputChange}
                        className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="checkbox-lobby"
                        value="No"
                        required
                        checked={formData['checkbox-lobby'] === 'No'}
                        onChange={handleInputChange}
                        className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2">Are you the spouse or dependent child of a communicator lobbyist?</label>
                  <div className="space-x-4 mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="checkbox-spouse"
                        value="Yes"
                        required
                        checked={formData['checkbox-spouse'] === 'Yes'}
                        onChange={handleInputChange}
                        className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="checkbox-spouse"
                        value="No"
                        required
                        checked={formData['checkbox-spouse'] === 'No'}
                        onChange={handleInputChange}
                        className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                      />
                      <span>No</span>
                    </label>
                  </div>

                  {formData['checkbox-spouse'] === 'Yes' && (
                    <div className="ml-8">
                      <label className="block font-medium mb-2">If yes, are you an elected public official?</label>
                      <div className="space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="checkbox-elected"
                            value="Yes"
                            checked={formData['checkbox-elected'] === 'Yes'}
                            onChange={handleInputChange}
                            className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="checkbox-elected"
                            value="No"
                            checked={formData['checkbox-elected'] === 'No'}
                            onChange={handleInputChange}
                            className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-medium mb-2">Are you a principal of a state contractor or prospective state contractor?</label>
                  <div className="space-x-4 mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="checkbox-contractor"
                        value="Yes"
                        required
                        checked={formData['checkbox-contractor'] === 'Yes'}
                        onChange={handleInputChange}
                        className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="checkbox-contractor"
                        value="No"
                        required
                        checked={formData['checkbox-contractor'] === 'No'}
                        onChange={handleInputChange}
                        className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                      />
                      <span>No</span>
                    </label>
                  </div>

                  {formData['checkbox-contractor'] === 'Yes' && (
                    <div className="ml-8 space-y-4">
                      <div>
                        <label className="block font-medium mb-2">
                          If yes, please indicate which branch or branches of the government the contract(s) is/are with:
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name="checkbox-branch"
                              value="Legislative"
                              checked={formData['checkbox-branch'].includes('Legislative')}
                              onChange={handleInputChange}
                              className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                            />
                            <span>Legislative</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name="checkbox-branch"
                              value="Executive"
                              checked={formData['checkbox-branch'].includes('Executive')}
                              onChange={handleInputChange}
                              className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                            />
                            <span>Executive</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium mb-2">
                          If you answered yes to the previous question, are you an elected public official?
                        </label>
                        <div className="space-x-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="checkbox-contractor-official"
                              value="Yes"
                              checked={formData['checkbox-contractor-official'] === 'Yes'}
                              onChange={handleInputChange}
                              className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                            />
                            <span>Yes</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="checkbox-contractor-official"
                              value="No"
                              checked={formData['checkbox-contractor-official'] === 'No'}
                              onChange={handleInputChange}
                              className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                            />
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Are you a principal of a holder of a valid prequalification issued by the Commissioner of Administrative Services?
                  </label>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="checkbox-holder"
                        value="Yes"
                        required
                        checked={formData['checkbox-holder'] === 'Yes'}
                        onChange={handleInputChange}
                        className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="checkbox-holder"
                        value="No"
                        required
                        checked={formData['checkbox-holder'] === 'No'}
                        onChange={handleInputChange}
                        className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-6" />

            {/* Certification */}
            <div>
              <h3 className="font-bold text-lg mb-4">{content.seecForm.certificationTitle}</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm">
                  {content.seecForm.certificationText}
                </p>
              </div>

              <div>
                <label className="block font-medium mb-2">
                  {content.seecForm.signatureInstructions}
                </label>
                <input
                  type="text"
                  name="digital-signature"
                  required
                  value={formData['digital-signature']}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                />
              </div>
            </div>

            <div className="text-center pt-6">
              <p className="mb-4">{content.seecForm.submitMessage}</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#9e562a] text-white px-8 py-3 rounded-md font-medium hover:bg-[#8a4a24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  content.seecForm.submitButtonText
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SEECForm
