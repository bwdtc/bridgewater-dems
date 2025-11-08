import { useEndorsementsContent } from '../utils/contentService'
import PageLayout from '../components/PageLayout'

const Endorsements = () => {
  const endorsementsContent = useEndorsementsContent()
  const endorsements = [
    {
      name: 'Robert Thompson',
      title: 'Former Mayor, Litchfield',
      quote: 'Curtis Read and his team have demonstrated exceptional leadership and fiscal responsibility. Bridgewater is fortunate to have such dedicated public servants.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Sarah Johnson',
      title: 'Local Business Owner',
      quote: 'The support this administration has shown for local businesses while maintaining our town\'s character has been outstanding. They have my full endorsement.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Dr. Michael Chen',
      title: 'Environmental Scientist',
      quote: 'Their commitment to environmental protection while managing growth responsibly shows the kind of balanced leadership we need.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Patricia Williams',
      title: 'Retired Teacher',
      quote: 'I\'ve watched this team work tirelessly for our community. Their transparency and dedication to residents of all ages is remarkable.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'James Rodriguez',
      title: 'Fire Chief (Retired)',
      quote: 'Public safety and emergency preparedness have improved significantly under their leadership. They understand what our community needs.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Linda Davis',
      title: 'Community Volunteer',
      quote: 'This team truly listens to residents and follows through on their commitments. That\'s the kind of leadership Bridgewater deserves.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'
    }
  ]

  const organizations = [
    {
      name: 'Bridgewater Volunteer Fire Department',
      type: 'Public Safety Organization'
    },
    {
      name: 'Litchfield County Environmental Council',
      type: 'Environmental Group'
    },
    {
      name: 'Connecticut Small Business Association',
      type: 'Business Organization'
    },
    {
      name: 'Senior Citizens Advisory Board',
      type: 'Community Group'
    },
    {
      name: 'Bridgewater Historical Society',
      type: 'Cultural Organization'
    },
    {
      name: 'Local Teachers Union',
      type: 'Education Group'
    }
  ]

  const newsMedia = [
    {
      outlet: 'Litchfield County Times',
      headline: 'Bridgewater Leadership Shows Fiscal Responsibility',
      excerpt: 'The current administration has successfully balanced progress with preservation...',
      date: 'October 15, 2021'
    },
    {
      outlet: 'Connecticut Post',
      headline: 'Small Town, Big Results in Bridgewater',
      excerpt: 'Infrastructure improvements without tax increases demonstrate effective governance...',
      date: 'September 28, 2021'
    },
    {
      outlet: 'Hartford Courant',
      headline: 'Environmental Protection Meets Economic Growth',
      excerpt: 'Bridgewater serves as a model for sustainable community development...',
      date: 'October 8, 2021'
    }
  ]

  return (
    <PageLayout title={endorsementsContent.title}>
      <div className="mb-8">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
          {endorsementsContent.subtitle}
        </p>
      </div>

        {/* Individual Endorsements */}
        <div className="mb-16">
          <h2 className="font-adamina text-3xl font-bold text-[#40474a] text-center mb-8">
            Community Leaders Speak Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {endorsementsContent.individualEndorsements.map((endorsement, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={endorsement.image}
                    alt={endorsement.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-alice text-lg font-bold text-[#40474a]">
                      {endorsement.name}
                    </h3>
                    <p className="text-sm text-[#9e562a] font-medium">
                      {endorsement.title}
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "{endorsement.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Organization Endorsements */}
        <div className="mb-16">
          <h2 className="font-adamina text-3xl font-bold text-[#40474a] text-center mb-8">
            Organizational Support
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {endorsementsContent.organizationEndorsements.map((org, index) => (
                <div key={index} className="flex items-center p-4 border-l-4 border-[#9e562a]">
                  <div>
                    <h3 className="font-alice text-lg font-bold text-[#40474a]">
                      {org.name}
                    </h3>
                    <p className="text-sm text-gray-600">{org.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Coverage */}
        <div className="mb-12">
          <h2 className="font-adamina text-3xl font-bold text-[#40474a] text-center mb-8">
            Media Recognition
          </h2>
          <div className="space-y-6">
            {endorsementsContent.mediaEndorsements.map((article, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="font-alice text-xl font-bold text-[#40474a]">
                    {article.headline}
                  </h3>
                  <div className="text-sm text-gray-500 mt-2 md:mt-0">
                    <span className="font-medium">{article.outlet}</span> • {article.date}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Your Voice Section */}
        <div className="bg-gradient-to-r from-[#cdd6dc] to-[#9ca6bb] p-8 rounded-lg shadow-lg text-center">
          <h2 className="font-adamina text-3xl font-bold text-[#40474a] mb-4">
            Add Your Voice
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join the growing number of Bridgewater residents who support continued
            progress with proven leadership. Your endorsement matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-[#9e562a] text-white px-8 py-3 rounded-md font-medium hover:bg-[#8a4a24] transition-colors"
            >
              Submit Endorsement
            </a>
            <a
              href="/events"
              className="border-2 border-[#40474a] text-[#40474a] px-8 py-3 rounded-md font-medium hover:bg-[#40474a] hover:text-white transition-colors"
            >
              View Events
            </a>
          </div>
        </div>

        {/* Endorsement Stats */}
        <div className="mt-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="font-adamina text-2xl font-bold text-[#40474a] text-center mb-8">
              Community Support by the Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#9e562a] mb-2">150+</div>
                <div className="text-gray-600">Individual Endorsements</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#9e562a] mb-2">12</div>
                <div className="text-gray-600">Organization Endorsements</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#9e562a] mb-2">85%</div>
                <div className="text-gray-600">Approval Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#9e562a] mb-2">4</div>
                <div className="text-gray-600">Years of Proven Leadership</div>
              </div>
            </div>
          </div>
        </div>
    </PageLayout>
  )
}

export default Endorsements
