import Sidebar from './Sidebar'

const MainContent = () => {

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="space-y-6 text-[#40474a]">
                <h3 className="font-alice text-lg font-bold leading-relaxed">
                  The Bridgewater Democratic Town Committee is the voice and face of the Democratic Party in Bridgewater, Connecticut. We love Bridgewater and think is a great place to live. We are grateful for all that nature has given us here.
                </h3>

                <h3 className="font-alice text-lg font-bold leading-relaxed">
                  We understand that it takes effort, discipline and skill to care for our beautiful surroundings, for the town's infrastructure and its operations, and for all of the residents who have chosen to make Bridgewater their home.
                </h3>

                <h3 className="font-alice text-lg font-bold leading-relaxed">
                  We are here to preserve, to protect, to progress, and play fair.
                </h3>

                <h3 className="font-alice text-lg font-bold leading-relaxed">
                  And we welcome help from any members of the Bridgewater community in our efforts.
                </h3>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </section>
  )
}

export default MainContent
