import { useIssuesContent } from '../utils/contentService'
import PageLayout from '../components/PageLayout'

const Issues = () => {
  const issuesContent = useIssuesContent()
  const accomplishments = [
    {
      title: 'Infrastructure Improvements',
      description: 'Significant improvements to town roads, bridges, and public facilities while maintaining fiscal responsibility.',
      details: [
        'Completed Route 202 bridge repairs',
        'Resurfaced 12 miles of town roads',
        'Upgraded town hall heating system',
        'Improved emergency services equipment'
      ],
      icon: '🏗️'
    },
    {
      title: 'Fiscal Management',
      description: 'Maintained stable tax rates while investing in essential services and infrastructure.',
      details: [
        'Zero tax increase for three consecutive years',
        'Improved bond rating from AA- to AA',
        'Reduced long-term debt by 15%',
        'Increased emergency fund reserves'
      ],
      icon: '💰'
    },
    {
      title: 'Environmental Protection',
      description: 'Preserved Bridgewater\'s natural beauty and protected our water resources.',
      details: [
        'Protected 200 acres of open space',
        'Implemented water quality monitoring',
        'Upgraded septic system regulations',
        'Created wildlife conservation areas'
      ],
      icon: '🌲'
    },
    {
      title: 'Community Services',
      description: 'Enhanced services while preserving the small-town character that makes Bridgewater special.',
      details: [
        'Expanded senior services programs',
        'Improved snow removal operations',
        'Enhanced emergency preparedness',
        'Supported local volunteer organizations'
      ],
      icon: '🤝'
    }
  ]

  const futurePlans = [
    {
      title: 'Broadband Expansion',
      description: 'Bringing high-speed internet to all areas of Bridgewater',
      timeline: '2022-2023',
      priority: 'High'
    },
    {
      title: 'Recreation Improvements',
      description: 'Enhancing recreational facilities and programs for all ages',
      timeline: '2022-2024',
      priority: 'Medium'
    },
    {
      title: 'Green Energy Initiative',
      description: 'Exploring renewable energy options for town facilities',
      timeline: '2023-2025',
      priority: 'Medium'
    },
    {
      title: 'Historic Preservation',
      description: 'Protecting and maintaining Bridgewater\'s historic character',
      timeline: 'Ongoing',
      priority: 'High'
    }
  ]

  return (
    <PageLayout title={issuesContent.title}>
      <div className="mb-8">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
          {issuesContent.subtitle}
        </p>
      </div>

        {/* Accomplishments Section */}
        {issuesContent.sections.accomplishments.enabled && (
          <div className="mb-16">
            <h2 className="font-adamina text-3xl font-bold text-[#40474a] text-center mb-8">
              {issuesContent.sections.accomplishments.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {issuesContent.sections.accomplishments.items.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{item.icon}</span>
                    <h3 className="font-adamina text-xl font-bold text-[#40474a]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-[#9e562a] mr-2">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Future Plans Section */}
        {issuesContent.sections.futurePlans.enabled && (
          <div className="mb-12">
            <h2 className="font-adamina text-3xl font-bold text-[#40474a] text-center mb-8">
              {issuesContent.sections.futurePlans.title}
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#40474a] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-alice">Initiative</th>
                      <th className="px-6 py-4 text-left font-alice">Description</th>
                      <th className="px-6 py-4 text-left font-alice">Timeline</th>
                      <th className="px-6 py-4 text-left font-alice">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issuesContent.sections.futurePlans.items.map((plan, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold text-[#40474a]">
                          {plan.title}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {plan.description}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {plan.timeline}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            plan.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : plan.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {plan.priority.charAt(0).toUpperCase() + plan.priority.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Core Values Section */}
        <div className="bg-gradient-to-r from-[#cdd6dc] to-[#9ca6bb] p-8 rounded-lg shadow-lg text-center">
          <h2 className="font-adamina text-3xl font-bold text-[#40474a] mb-6">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="font-alice text-lg font-bold text-[#40474a] mb-2">Preserve</h3>
              <p className="text-sm text-gray-700">
                Protecting what makes Bridgewater special
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-alice text-lg font-bold text-[#40474a] mb-2">Protect</h3>
              <p className="text-sm text-gray-700">
                Safeguarding our environment and community
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-alice text-lg font-bold text-[#40474a] mb-2">Progress</h3>
              <p className="text-sm text-gray-700">
                Moving forward with thoughtful improvements
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-alice text-lg font-bold text-[#40474a] mb-2">Play Fair</h3>
              <p className="text-sm text-gray-700">
                Ensuring transparent and honest governance
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="font-adamina text-2xl font-bold text-[#40474a] mb-4">
              Continue the Progress
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our track record speaks for itself. Let's continue building on these successes
              while staying true to Bridgewater's values and character.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/candidates"
                className="bg-[#9e562a] text-white px-8 py-3 rounded-md font-medium hover:bg-[#8a4a24] transition-colors"
              >
                Meet the Team
              </a>
              <a
                href="/contact"
                className="border-2 border-[#9e562a] text-[#9e562a] px-8 py-3 rounded-md font-medium hover:bg-[#9e562a] hover:text-white transition-colors"
              >
                Get Involved
              </a>
            </div>
          </div>
        </div>
    </PageLayout>
  )
}

export default Issues
