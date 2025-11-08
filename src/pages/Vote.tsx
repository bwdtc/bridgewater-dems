import { useState } from 'react'
import { useVoteContent } from '../utils/contentService'
import PageLayout from '../components/PageLayout'

const Vote = () => {
  const [selectedTab, setSelectedTab] = useState('registration')
  const voteContent = useVoteContent()

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) >= new Date()
  }

  // Get enabled tabs
  const enabledTabs = Object.entries(voteContent.tabs).filter(([_, tab]) => tab.enabled)

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-adamina text-4xl md:text-5xl font-bold text-[#40474a] mb-4">
            {voteContent.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {voteContent.subtitle}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-wrap border-b">
              {enabledTabs.map(([tabKey, tab]) => (
                <button
                  key={tabKey}
                  onClick={() => setSelectedTab(tabKey)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    selectedTab === tabKey
                      ? 'bg-[#9e562a] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* Registration Tab */}
              {selectedTab === 'registration' && voteContent.tabs.registration.enabled && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="font-adamina text-2xl font-bold text-[#40474a] mb-4">
                        {voteContent.tabs.registration.title}
                      </h2>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-blue-900 mb-2">{voteContent.tabs.registration.content.whoCanRegister.title}</h3>
                          <ul className="text-sm text-blue-800 space-y-1">
                            {voteContent.tabs.registration.content.whoCanRegister.items.map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-green-900 mb-2">{voteContent.tabs.registration.content.howToRegister.title}</h3>
                          <ul className="text-sm text-green-800 space-y-1">
                            {voteContent.tabs.registration.content.howToRegister.items.map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-yellow-900 mb-2">{voteContent.tabs.registration.content.whatYouNeed.title}</h3>
                          <ul className="text-sm text-yellow-800 space-y-1">
                            {voteContent.tabs.registration.content.whatYouNeed.items.map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-adamina text-2xl font-bold text-[#40474a] mb-4">
                        {voteContent.tabs.registration.content.checkStatus.title}
                      </h2>
                      <div className="bg-white border-2 border-[#9e562a] rounded-lg p-6">
                        <p className="text-gray-700 mb-4">
                          {voteContent.tabs.registration.content.checkStatus.description}
                        </p>
                        <div className="space-y-4">
                          {voteContent.tabs.registration.content.checkStatus.buttons.map((button, index) => (
                            <button
                              key={index}
                              className={`w-full py-3 rounded-md font-medium transition-colors ${
                                button.style === 'primary'
                                  ? 'bg-[#9e562a] text-white hover:bg-[#8a4a24]'
                                  : 'border-2 border-[#9e562a] text-[#9e562a] hover:bg-[#9e562a] hover:text-white'
                              }`}
                            >
                              {button.text}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-alice text-lg font-bold text-[#40474a] mb-3">
                          {voteContent.tabs.registration.content.needHelp.title}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          {voteContent.tabs.registration.content.needHelp.contacts.map((contact, index) => (
                            <div key={index} className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {contact.type === 'phone' && (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                )}
                                {contact.type === 'email' && (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                )}
                                {contact.type === 'address' && (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                )}
                              </svg>
                              <div>
                                <span className="font-medium">{contact.label}: </span>
                                {contact.value.split('\n').map((line, idx) => (
                                  <div key={idx}>{line}</div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Polling Locations Tab */}
              {selectedTab === 'locations' && voteContent.tabs.locations.enabled && (
                <div className="space-y-6">
                  <h2 className="font-adamina text-2xl font-bold text-[#40474a] mb-6">
                    {voteContent.tabs.locations.title}
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {voteContent.tabs.locations.pollingLocations.map((location) => (
                      <div key={location.id} className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-alice text-lg font-bold text-[#40474a] mb-3">
                          {location.name}
                        </h3>
                        <div className="space-y-3 text-sm text-gray-700">
                          <div className="flex items-start">
                            <svg className="w-4 h-4 mr-2 mt-0.5 text-[#9e562a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <div>
                              <div className="font-medium">Address</div>
                              <div>{location.address}</div>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <svg className="w-4 h-4 mr-2 mt-0.5 text-[#9e562a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <div className="font-medium">Hours</div>
                              <div>{location.hours}</div>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <svg className="w-4 h-4 mr-2 mt-0.5 text-[#9e562a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <div>
                              <div className="font-medium">Serves Districts</div>
                              <div>{location.districts.join(', ')}</div>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <svg className="w-4 h-4 mr-2 mt-0.5 text-[#9e562a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div>
                              <div className="font-medium">Accessibility</div>
                              <div>{location.accessibility}</div>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <svg className="w-4 h-4 mr-2 mt-0.5 text-[#9e562a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <div>
                              <div className="font-medium">Parking</div>
                              <div>{location.parking}</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <button className="text-[#9e562a] text-sm font-medium hover:text-[#8a4a24] transition-colors">
                            📍 Get Directions
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-alice text-lg font-bold text-blue-900 mb-3">
                      {voteContent.tabs.locations.districtLookup.title}
                    </h3>
                    <p className="text-blue-800 mb-4">
                      {voteContent.tabs.locations.districtLookup.description}
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                      {voteContent.tabs.locations.districtLookup.buttonText}
                    </button>
                  </div>
                </div>
              )}

              {/* Important Dates Tab */}
              {selectedTab === 'dates' && voteContent.tabs.dates.enabled && (
                <div className="space-y-6">
                  <h2 className="font-adamina text-2xl font-bold text-[#40474a] mb-6">
                    {voteContent.tabs.dates.title}
                  </h2>
                  <div className="space-y-4">
                    {voteContent.tabs.dates.importantDates.map((dateInfo) => (
                      <div key={dateInfo.id} className={`p-4 rounded-lg border-l-4 ${
                        isUpcoming(dateInfo.date)
                          ? 'bg-green-50 border-green-500'
                          : 'bg-gray-50 border-gray-300'
                      }`}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="font-alice text-lg font-bold text-[#40474a] mb-1">
                              {dateInfo.title}
                            </h3>
                            <p className="text-gray-700 text-sm">
                              {dateInfo.description}
                            </p>
                          </div>
                          <div className={`mt-2 md:mt-0 text-right ${
                            isUpcoming(dateInfo.date) ? 'text-green-700' : 'text-gray-500'
                          }`}>
                            <div className="font-semibold">
                              {formatDate(dateInfo.date)}
                            </div>
                            {isUpcoming(dateInfo.date) && (
                              <div className="text-xs font-medium">Upcoming</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="font-alice text-lg font-bold text-red-900 mb-3">
                      {voteContent.tabs.dates.electionDayReminders.title}
                    </h3>
                    <ul className="text-red-800 space-y-2 text-sm">
                      {voteContent.tabs.dates.electionDayReminders.items.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Candidates Tab */}
              {selectedTab === 'candidates' && voteContent.tabs.candidates.enabled && (
                <div className="space-y-6">
                  <h2 className="font-adamina text-2xl font-bold text-[#40474a] mb-6">
                    {voteContent.tabs.candidates.title}
                  </h2>
                  <div className="space-y-6">
                    {voteContent.tabs.candidates.candidateInfo.map((race, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-alice text-lg font-bold text-[#40474a] mb-4">
                          {race.office}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {race.candidates.map((candidate, idx) => (
                            <div key={idx} className={`p-4 rounded-lg ${
                              candidate.party === 'Democratic'
                                ? 'bg-blue-50 border border-blue-200'
                                : 'bg-red-50 border border-red-200'
                            }`}>
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-semibold text-gray-900">
                                    {candidate.name}
                                  </div>
                                  <div className={`text-sm ${
                                    candidate.party === 'Democratic' ? 'text-blue-700' : 'text-red-700'
                                  }`}>
                                    {candidate.party}
                                  </div>
                                  {candidate.description && (
                                    <div className="text-xs text-gray-600 mt-1">
                                      {candidate.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="font-alice text-lg font-bold text-yellow-900 mb-3">
                      {voteContent.tabs.candidates.learnMore.title}
                    </h3>
                    <p className="text-yellow-800 mb-4">
                      {voteContent.tabs.candidates.learnMore.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {voteContent.tabs.candidates.learnMore.buttons.map((button, index) => (
                        <a
                          key={index}
                          href={button.link}
                          className={`px-4 py-2 rounded-md font-medium transition-colors text-center ${
                            button.style === 'primary'
                              ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                              : 'border-2 border-yellow-600 text-yellow-900 hover:bg-yellow-600 hover:text-white'
                          }`}
                        >
                          {button.text}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#cdd6dc] to-[#9ca6bb] p-8 rounded-lg shadow-lg text-center">
          <h2 className="font-adamina text-3xl font-bold text-[#40474a] mb-4">
            {voteContent.callToAction.title}
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            {voteContent.callToAction.message}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {voteContent.callToAction.buttons.map((button, index) => (
              <button
                key={index}
                className={`px-8 py-3 rounded-md font-medium transition-colors ${
                  button.style === 'primary'
                    ? 'bg-[#9e562a] text-white hover:bg-[#8a4a24]'
                    : 'border-2 border-[#40474a] text-[#40474a] hover:bg-[#40474a] hover:text-white'
                }`}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>

        {/* Voting Rights Information */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="font-adamina text-2xl font-bold text-[#40474a] mb-6 text-center">
            {voteContent.votingRights.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-alice text-lg font-bold text-[#40474a] mb-3">{voteContent.votingRights.youHaveTheRight.title}</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                {voteContent.votingRights.youHaveTheRight.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-alice text-lg font-bold text-[#40474a] mb-3">{voteContent.votingRights.needAssistance.title}</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                {voteContent.votingRights.needAssistance.contacts.map((contact, index) => (
                  <div key={index}>{contact.label}: {contact.value}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vote
