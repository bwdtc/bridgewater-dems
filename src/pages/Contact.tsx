import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  })
  const [submitMessage, setSubmitMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    setIsSuccess(false)

    const form = e.target as HTMLFormElement

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form) as any).toString()
    })
      .then(() => {
        setIsSuccess(true)
        setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.')
        setIsSubmitting(false)
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: ''
        })
      })
      .catch((error) => {
        console.error('Form submission error:', error)
        setIsSuccess(false)
        setSubmitMessage('Sorry, there was an error sending your message. Please try again or email us directly at info@bridgewaterdems.org')
        setIsSubmitting(false)
      })
  }

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-adamina text-4xl md:text-5xl font-bold text-[#40474a] mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            We want to hear from you! Send us a message and we'll get back to you soon.
          </p>
        </div>

        {/* Contact Form - Centered */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="font-adamina text-2xl font-bold text-[#40474a] mb-6 text-center">
            Send Us a Message
          </h2>

          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg ${
              isSuccess
                ? 'bg-green-100 border border-green-300 text-green-700'
                : 'bg-red-100 border border-red-300 text-red-700'
            }`}>
              {submitMessage}
            </div>
          )}

          <form
            name="contact"
            method="POST"
            action="/"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Hidden fields for Netlify Forms */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Volunteer Opportunity">Volunteer Opportunity</option>
                  <option value="Endorsement">Endorsement</option>
                  <option value="Town Services">Town Services</option>
                  <option value="Media Inquiry">Media Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                placeholder="Please tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#9e562a] text-white py-3 rounded-md font-medium hover:bg-[#8a4a24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Contact Information */}
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-700">
              You can also reach us directly at <strong>info@bridgewaterdems.org</strong> or mail us at:<br />
              <strong>Bridgewater Democratic Town Committee</strong><br />
              P.O. Box 132<br />
              Bridgewater, CT 06752
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
