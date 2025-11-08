import { useState } from 'react'
import { useVolunteerContent } from '../utils/contentService'
import PageLayout from '../components/PageLayout'

const Volunteer = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const volunteerContent = useVolunteerContent()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    skills: '',
    availability: '',
    experience: '',
    interests: [] as string[],
    emergencyContact: '',
    emergencyPhone: '',
    backgroundCheck: false,
    agreement: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const volunteerRoles = [
    {
      id: 'campaign',
      title: 'Campaign Support',
      description: 'Help with phone banking, canvassing, and voter outreach efforts.',
      icon: '📞',
      timeCommitment: '2-10 hours/week',
      requirements: ['Friendly communication skills', 'Reliable schedule', 'Basic computer skills'],
      tasks: ['Phone banking to registered voters', 'Door-to-door canvassing', 'Data entry and voter database management', 'Distributing campaign materials']
    },
    {
      id: 'events',
      title: 'Event Organization',
      description: 'Organize and coordinate campaign events, town halls, and community gatherings.',
      icon: '🎪',
      timeCommitment: '5-15 hours/week',
      requirements: ['Event planning experience', 'Strong organizational skills', 'Leadership abilities'],
      tasks: ['Planning and coordinating events', 'Venue management and setup', 'Volunteer coordination', 'Vendor and catering management']
    },
    {
      id: 'digital',
      title: 'Digital Outreach',
      description: 'Manage social media, website content, and digital communications.',
      icon: '💻',
      timeCommitment: '3-8 hours/week',
      requirements: ['Social media experience', 'Basic graphic design', 'Content writing skills'],
      tasks: ['Social media content creation', 'Website updates and maintenance', 'Email newsletter management', 'Online community engagement']
    },
    {
      id: 'admin',
      title: 'Administrative Support',
      description: 'Provide office support, data management, and organizational assistance.',
      icon: '📋',
      timeCommitment: '4-12 hours/week',
      requirements: ['Office experience', 'Computer proficiency', 'Attention to detail'],
      tasks: ['Filing and document organization', 'Database management', 'Phone answering and scheduling', 'General office support']
    },
    {
      id: 'fundraising',
      title: 'Fundraising Team',
      description: 'Support fundraising efforts and donor relations.',
      icon: '💰',
      timeCommitment: '3-10 hours/week',
      requirements: ['Sales or fundraising experience', 'Strong interpersonal skills', 'Professional demeanor'],
      tasks: ['Donor outreach and cultivation', 'Fundraising event support', 'Grant research and writing', 'Financial tracking and reporting']
    },
    {
      id: 'community',
      title: 'Community Liaison',
      description: 'Connect with local organizations and community groups.',
      icon: '🤝',
      timeCommitment: '5-15 hours/week',
      requirements: ['Local community connections', 'Public speaking skills', 'Cultural sensitivity'],
      tasks: ['Representing campaign at community events', 'Building coalition partnerships', 'Organizing community forums', 'Stakeholder relationship management']
    }
  ]

  const interestAreas = [
    'Environmental Issues',
    'Education Policy',
    'Infrastructure Development',
    'Senior Services',
    'Economic Development',
    'Public Safety',
    'Healthcare Access',
    'Transportation',
    'Historic Preservation',
    'Youth Programs'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setSubmitMessage('Thank you for volunteering! We\'ll contact you within 2-3 business days to discuss next steps.')
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      skills: '',
      availability: '',
      experience: '',
      interests: [],
      emergencyContact: '',
      emergencyPhone: '',
      backgroundCheck: false,
      agreement: false
    })
    setSelectedRole(null)
    setIsSubmitting(false)

    // Clear success message after 7 seconds
    setTimeout(() => setSubmitMessage(''), 7000)
  }

  const selectedRoleData = volunteerRoles.find(role => role.id === selectedRole)

  return (
    <div className="py-12 bg-[#f5f5f6]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-adamina text-4xl md:text-5xl font-bold text-[#40474a] mb-4">
            {volunteerContent.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {volunteerContent.subtitle}
          </p>
        </div>

        {!selectedRole ? (
          <>
            {/* Volunteer Opportunities */}
            <div className="mb-12">
              <h2 className="font-adamina text-3xl font-bold text-[#40474a] text-center mb-8">
                Choose Your Role
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {volunteerContent.roles.map((role) => (
                  <div key={role.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{role.icon}</div>
                      <h3 className="font-adamina text-xl font-bold text-[#40474a] mb-2">
                        {role.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {role.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm font-semibold text-[#9e562a] mb-2">
                        Time Commitment: {role.timeCommitment}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <strong>Requirements:</strong>
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {role.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-[#9e562a] mr-1">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleRoleSelect(role.id)}
                      className="w-full bg-[#9e562a] text-white py-2 rounded-md font-medium hover:bg-[#8a4a24] transition-colors"
                    >
                      Learn More & Apply
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Volunteer Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
              <h2 className="font-adamina text-2xl font-bold text-[#40474a] text-center mb-8">
                Why Volunteer with Us?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {volunteerContent.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-[#9e562a] mr-3 mt-1">•</div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Role Details and Application Form */
          <div className="space-y-8">
            {/* Back Button */}
            <div>
              <button
                onClick={() => setSelectedRole(null)}
                className="flex items-center text-[#9e562a] hover:text-[#8a4a24] transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Volunteer Opportunities
              </button>
            </div>

            {/* Role Details */}
            {selectedRoleData && (
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{selectedRoleData.icon}</div>
                  <div>
                    <h2 className="font-adamina text-3xl font-bold text-[#40474a]">
                      {selectedRoleData.title}
                    </h2>
                    <p className="text-gray-600">{selectedRoleData.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-alice text-lg font-bold text-[#40474a] mb-3">
                      Typical Tasks
                    </h3>
                    <ul className="space-y-2">
                      {selectedRoleData.tasks.map((task, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="text-[#9e562a] mr-2">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-alice text-lg font-bold text-[#40474a] mb-3">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {selectedRoleData.requirements.map((req, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="text-[#9e562a] mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-sm">
                      <strong className="text-[#9e562a]">Time Commitment:</strong> {selectedRoleData.timeCommitment}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Application Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="font-adamina text-2xl font-bold text-[#40474a] mb-6">
                Volunteer Application
              </h2>

              {submitMessage && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-alice text-lg font-bold text-[#40474a] mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
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
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                      placeholder="Street Address, City, State, ZIP"
                    />
                  </div>
                </div>

                {/* Experience and Skills */}
                <div>
                  <h3 className="font-alice text-lg font-bold text-[#40474a] mb-4">Experience & Skills</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                        Relevant Experience
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        rows={3}
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                        placeholder="Describe any relevant volunteer, professional, or personal experience..."
                      />
                    </div>
                    <div>
                      <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                        Special Skills or Talents
                      </label>
                      <textarea
                        id="skills"
                        name="skills"
                        rows={2}
                        value={formData.skills}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                        placeholder="Languages, technical skills, professional expertise, etc."
                      />
                    </div>
                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                        Availability
                      </label>
                      <textarea
                        id="availability"
                        name="availability"
                        rows={2}
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                        placeholder="Days and times you're available, any scheduling constraints..."
                      />
                    </div>
                  </div>
                </div>

                {/* Interest Areas */}
                <div>
                  <h3 className="font-alice text-lg font-bold text-[#40474a] mb-4">Areas of Interest</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interestAreas.map((interest) => (
                      <label key={interest} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                          className="mr-2 text-[#9e562a] focus:ring-[#9e562a]"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="font-alice text-lg font-bold text-[#40474a] mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e562a] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Agreements */}
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="backgroundCheck"
                      checked={formData.backgroundCheck}
                      onChange={handleInputChange}
                      className="mr-3 mt-1 text-[#9e562a] focus:ring-[#9e562a]"
                    />
                    <span className="text-sm text-gray-700">
                      I consent to a background check if required for this volunteer position
                    </span>
                  </label>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreement"
                      checked={formData.agreement}
                      onChange={handleInputChange}
                      required
                      className="mr-3 mt-1 text-[#9e562a] focus:ring-[#9e562a]"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to volunteer in accordance with campaign policies and local election laws *
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#9e562a] text-white py-3 rounded-md font-medium hover:bg-[#8a4a24] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Volunteer Application'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-[#cdd6dc] to-[#9ca6bb] p-8 rounded-lg shadow-lg text-center">
          <h2 className="font-adamina text-2xl font-bold text-[#40474a] mb-4">
            Questions About Volunteering?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Have questions about volunteer opportunities or need more information?
            We're here to help you find the perfect way to get involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-[#9e562a] text-white px-8 py-3 rounded-md font-medium hover:bg-[#8a4a24] transition-colors"
            >
              Contact Volunteer Coordinator
            </a>
            <a
              href="/events"
              className="border-2 border-[#40474a] text-[#40474a] px-8 py-3 rounded-md font-medium hover:bg-[#40474a] hover:text-white transition-colors"
            >
              View Upcoming Events
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Volunteer
