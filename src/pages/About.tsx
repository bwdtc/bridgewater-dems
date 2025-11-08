import Sidebar from '../components/Sidebar'
import { useAboutContent } from '../utils/contentService'

const About = () => {
  const aboutContent = useAboutContent()

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="font-adamina text-4xl md:text-5xl font-bold text-[#40474a] mb-4">
                  {aboutContent.title}
                </h1>
              </div>

              <div className="space-y-6 text-[#40474a]">
                <div>
                  <h3 className="font-alice text-xl font-bold mb-3">{aboutContent.sections.whoWeAre.title}</h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {aboutContent.sections.whoWeAre.content}
                  </p>
                </div>

                <div>
                  <h3 className="font-alice text-xl font-bold mb-3">{aboutContent.sections.officers.title}</h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {aboutContent.sections.officers.content}
                  </p>
                </div>

                <div>
                  <h3 className="font-alice text-xl font-bold mb-3">{aboutContent.sections.whatWeStriveFor.title}</h3>
                  <ul className="space-y-2">
                    {aboutContent.sections.whatWeStriveFor.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#9e562a] mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="leading-relaxed">
                    {aboutContent.joinUsMessage.replace('Click here', 'Click ')}{' '}
                    <a
                      href="/contact"
                      className="text-[#9e562a] hover:text-[#8a4a24] transition-colors font-medium"
                    >
                      here
                    </a>{' '}
                    to contact us.
                  </p>
                </div>
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

export default About
