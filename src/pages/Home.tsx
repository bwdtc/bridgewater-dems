import HeroSlider from '../components/HeroSlider'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The Bridgewater Democratic Town Committee is the voice and face of the Democratic Party in Bridgewater, Connecticut. We love Bridgewater and think it is a great place to live. We are grateful for all that nature has given us here.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We understand that it takes effort, discipline and skill to care for our beautiful surroundings, for the town's infrastructure and its operations, and for all of the residents who have chosen to make Bridgewater their home.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We are here to preserve, to protect, to progress, and play fair.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                And we welcome help from any members of the Bridgewater community in our efforts.
              </p>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
