import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import { useCandidatesContent } from '../utils/contentService'

const Candidates = () => {
  const candidatesContent = useCandidatesContent()

  return (
    <PageLayout title={candidatesContent.title}>
      <div className="mb-8">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
          {candidatesContent.subtitle}
        </p>
      </div>

        {/* Candidates Grid */}
        <div className="space-y-12">
          {candidatesContent.candidates.map((candidate, index) => (
            <div
              key={candidate.name}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Candidate Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Candidate Info */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="mb-6">
                    <h2 className="font-adamina text-3xl font-bold text-[#40474a] mb-2">
                      {candidate.name}
                    </h2>
                    <p className="text-xl text-[#9e562a] font-semibold mb-4">
                      {candidate.position}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {candidate.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Experience */}
                    <div>
                      <h3 className="font-alice text-lg font-bold text-[#40474a] mb-3">
                        Experience
                      </h3>
                      <ul className="space-y-2">
                        {candidate.experience.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-[#9e562a] mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Priorities */}
                    <div>
                      <h3 className="font-alice text-lg font-bold text-[#40474a] mb-3">
                        Priorities
                      </h3>
                      <ul className="space-y-2">
                        {candidate.priorities.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-[#9e562a] mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="font-adamina text-2xl font-bold text-[#40474a] mb-4">
              Your Team, Your Town
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              This experienced team is committed to preserving what makes Bridgewater special
              while ensuring our town continues to thrive for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/endorsements"
                className="bg-[#9e562a] text-white px-8 py-3 rounded-md font-medium hover:bg-[#8a4a24] transition-colors text-center"
              >
                See Endorsements
              </Link>
              <Link
                to="/issues"
                className="border-2 border-[#9e562a] text-[#9e562a] px-8 py-3 rounded-md font-medium hover:bg-[#9e562a] hover:text-white transition-colors text-center"
              >
                View Issues
              </Link>
            </div>
          </div>
        </div>
    </PageLayout>
  )
}

export default Candidates
