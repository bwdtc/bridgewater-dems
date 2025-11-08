import { useState } from 'react'
import PageLayout from '../components/PageLayout'

const Events = () => {
  const [viewType, setViewType] = useState<'calendar' | 'list'>('list')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const events = [
    {
      id: 1,
      title: 'Town Hall Meeting - Budget Review',
      date: '2024-02-15',
      time: '7:00 PM',
      location: 'Bridgewater Community Center',
      type: 'Government',
      description: 'Public meeting to review and discuss the proposed 2024 municipal budget.',
      registrationRequired: false,
      contact: 'Town Clerk: (860) 555-0123'
    },
    {
      id: 2,
      title: 'Volunteer Training Session',
      date: '2024-02-18',
      time: '10:00 AM',
      location: 'Town Hall Conference Room',
      type: 'Volunteer',
      description: 'Training session for new campaign volunteers covering phone banking and canvassing.',
      registrationRequired: true,
      contact: 'volunteer@bridgewaterdems.org'
    },
    {
      id: 3,
      title: 'Community Coffee with Curtis Read',
      date: '2024-02-22',
      time: '9:00 AM',
      location: 'Bridgewater Diner',
      type: 'Community',
      description: 'Informal coffee meeting with First Selectman Curtis Read. Come discuss local issues.',
      registrationRequired: false,
      contact: 'curtis.read@bridgewater.gov'
    },
    {
      id: 4,
      title: 'Environmental Committee Meeting',
      date: '2024-02-25',
      time: '6:30 PM',
      location: 'Virtual Meeting (Zoom)',
      type: 'Committee',
      description: 'Monthly meeting of the Environmental Protection Committee to discuss ongoing initiatives.',
      registrationRequired: true,
      contact: 'env.committee@bridgewaterdems.org'
    },
    {
      id: 5,
      title: 'Senior Citizens Forum',
      date: '2024-02-28',
      time: '2:00 PM',
      location: 'Senior Center',
      type: 'Community',
      description: 'Monthly forum addressing senior services and programs in Bridgewater.',
      registrationRequired: false,
      contact: 'seniors@bridgewater.gov'
    },
    {
      id: 6,
      title: 'Campaign Strategy Meeting',
      date: '2024-03-05',
      time: '7:30 PM',
      location: 'Democratic Town Committee Office',
      type: 'Political',
      description: 'Strategic planning meeting for upcoming campaign activities and events.',
      registrationRequired: true,
      contact: 'info@bridgewaterdems.org'
    },
    {
      id: 7,
      title: 'Infrastructure Public Hearing',
      date: '2024-03-08',
      time: '7:00 PM',
      location: 'Town Hall Auditorium',
      type: 'Government',
      description: 'Public hearing on proposed infrastructure improvements for Route 133.',
      registrationRequired: false,
      contact: 'planning@bridgewater.gov'
    },
    {
      id: 8,
      title: 'Volunteer Appreciation Dinner',
      date: '2024-03-15',
      time: '6:00 PM',
      location: 'Bridgewater Country Club',
      type: 'Volunteer',
      description: 'Annual dinner celebrating our dedicated volunteers and their contributions.',
      registrationRequired: true,
      contact: 'events@bridgewaterdems.org'
    },
    {
      id: 9,
      title: 'Board of Education Meeting',
      date: '2024-03-18',
      time: '7:00 PM',
      location: 'Bridgewater Elementary School',
      type: 'Government',
      description: 'Regular monthly meeting of the Board of Education.',
      registrationRequired: false,
      contact: 'boe@bridgewater.edu'
    },
    {
      id: 10,
      title: 'Spring Town Clean-Up Day',
      date: '2024-03-22',
      time: '8:00 AM',
      location: 'Town Green (Meeting Point)',
      type: 'Community',
      description: 'Community-wide clean-up day. Volunteers needed! Supplies provided.',
      registrationRequired: true,
      contact: 'volunteer@bridgewaterdems.org'
    }
  ]

  const eventTypes = ['All', 'Government', 'Community', 'Volunteer', 'Committee', 'Political']
  const [selectedType, setSelectedType] = useState('All')

  const filteredEvents = selectedType === 'All'
    ? events
    : events.filter(event => event.type === selectedType)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatShortDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Government': 'bg-blue-100 text-blue-800',
      'Community': 'bg-green-100 text-green-800',
      'Volunteer': 'bg-purple-100 text-purple-800',
      'Committee': 'bg-yellow-100 text-yellow-800',
      'Political': 'bg-red-100 text-red-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) >= new Date()
  }

  const upcomingEvents = filteredEvents
    .filter(event => isUpcoming(event.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <PageLayout title="Events Calendar">
      <div className="mb-8">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
          Stay informed about upcoming town meetings, community events, and opportunities
            to get involved in your local government.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewType('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewType === 'list'
                      ? 'bg-[#9e562a] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setViewType('calendar')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewType === 'calendar'
                      ? 'bg-[#9e562a] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Calendar View
                </button>
              </div>

              {/* Type Filter */}
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      selectedType === type
                        ? 'bg-[#9e562a] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events Content */}
        {viewType === 'list' ? (
          /* List View */
          <div className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No upcoming events found for the selected category.</p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Date Badge */}
                    <div className="flex-shrink-0">
                      <div className="bg-[#9e562a] text-white p-4 rounded-lg text-center min-w-[120px]">
                        <div className="text-2xl font-bold">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-sm">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="text-xs">
                          {new Date(event.date).getFullYear()}
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                        <div>
                          <h3 className="font-adamina text-xl font-bold text-[#40474a] mb-2">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {event.time}
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {event.location}
                            </div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="text-sm text-gray-600 mb-3 md:mb-0">
                          <strong>Contact:</strong> {event.contact}
                        </div>
                        <div className="flex gap-3">
                          {event.registrationRequired && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              Registration Required
                            </span>
                          )}
                          <button className="bg-[#9e562a] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#8a4a24] transition-colors">
                            Add to Calendar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Calendar View */
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <h3 className="font-adamina text-xl text-[#40474a]">
                {new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </h3>
            </div>

            {/* Simple Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 font-semibold text-gray-700 bg-gray-50">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(selectedYear, selectedMonth, i - 6)
                const isCurrentMonth = date.getMonth() === selectedMonth
                const dayEvents = upcomingEvents.filter(event =>
                  new Date(event.date).toDateString() === date.toDateString()
                )

                return (
                  <div
                    key={i}
                    className={`p-2 min-h-[60px] border border-gray-100 ${
                      isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`text-xs ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                      {date.getDate()}
                    </div>
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 mt-1 rounded ${getTypeColor(event.type)} truncate`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-[#cdd6dc] to-[#9ca6bb] p-8 rounded-lg shadow-lg">
            <h2 className="font-adamina text-2xl font-bold text-[#40474a] text-center mb-6">
              Stay Connected
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-3">📧</div>
                <h3 className="font-alice text-lg font-bold text-[#40474a] mb-2">Email Alerts</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Get notified about important meetings and events
                </p>
                <a
                  href="/contact"
                  className="bg-white text-[#40474a] px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Subscribe
                </a>
              </div>
              <div>
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-alice text-lg font-bold text-[#40474a] mb-2">Mobile Updates</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Receive text message reminders for events
                </p>
                <a
                  href="/contact"
                  className="bg-white text-[#40474a] px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Sign Up
                </a>
              </div>
              <div>
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="font-alice text-lg font-bold text-[#40474a] mb-2">Get Involved</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Volunteer to help organize community events
                </p>
                <a
                  href="/volunteer"
                  className="bg-white text-[#40474a] px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Volunteer
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Export/Subscribe Section */}
        <div className="mt-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-alice text-lg font-bold text-[#40474a] mb-4">
              Never Miss an Event
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our calendar or export events to your personal calendar app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#9e562a] text-white px-6 py-2 rounded-md font-medium hover:bg-[#8a4a24] transition-colors">
                📅 Subscribe to Calendar
              </button>
              <button className="border-2 border-[#9e562a] text-[#9e562a] px-6 py-2 rounded-md font-medium hover:bg-[#9e562a] hover:text-white transition-colors">
                📱 Download iCal
              </button>
            </div>
          </div>
        </div>
    </PageLayout>
  )
}

export default Events
