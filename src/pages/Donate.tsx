import { useDonationContent } from '../utils/contentService'

const Donate = () => {
  const content = useDonationContent()

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 pr-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#40474a] mb-4 border-b border-gray-300 pb-4">
            {content.donatePage.title}
          </h1>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {content.donatePage.subtitle}
          </h2>

          <h3 className="text-xl font-bold text-gray-800">{content.donatePage.optionsTitle}</h3>

          {/* Option 1: Online Donation */}
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong>1. {content.donatePage.option1Title}</strong>, {content.donatePage.option1Description}
            </p>
            <p className="text-gray-700 font-bold">
              {content.donatePage.option1Note}
            </p>

            <div className="my-6">
              <a
                href="/seecform"
                className="inline-block"
              >
                <img
                  src="https://ext.same-assets.com/249616470/3438813453.gif"
                  alt="Click for CT Donor Form"
                  className="hover:opacity-80 transition-opacity"
                  style={{ width: '147px', height: '47px' }}
                />
              </a>
            </div>
          </div>

          {/* Spacing */}
          <div className="py-4"></div>

          {/* Option 2: Check Donation */}
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong>2. {content.donatePage.option2Title}</strong>, you <em>must</em> {content.donatePage.option2Description}
            </p>
            <p className="text-red-600 font-bold italic">
              {content.donatePage.option2Warning}
            </p>

            <p className="text-gray-700">{content.donatePage.option2Instructions}</p>

            <div className="my-6">
              <a
                href="/media/DTC_Donor_Cert_Form.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="/media/form_p.png"
                  alt="form_p"
                  className="hover:opacity-80 transition-opacity"
                  style={{ width: '180px', height: '43px' }}
                />
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-gray-700">{content.donatePage.option2MailingInstructions}</p>

              <div className="my-4">
                <p className="font-bold text-gray-800">{content.donatePage.mailingAddress.organization}</p>
                <p className="font-bold text-gray-800">{content.donatePage.mailingAddress.addressLine1}</p>
                <p className="font-bold text-gray-800">{content.donatePage.mailingAddress.addressLine2}</p>
              </div>
            </div>

            <p className="text-gray-700 font-semibold">{content.donatePage.thankYouMessage}</p>
          </div>

          {/* Additional spacing to match original */}
          <div className="py-8"></div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-80 pl-6 border-l border-gray-200">
        {/* Search Widget */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contact Us Widget */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wide">
            Contact Us
          </h3>
          <div className="text-gray-600">
            <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">
              eMail/USMail us here
            </a>
          </div>
        </div>

        {/* About Us Widget */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wide">
            About Us
          </h3>
          <div className="text-gray-600">
            <a href="/about" className="text-blue-600 hover:text-blue-800 underline">
              About the DTC
            </a>
          </div>
        </div>

        {/* Upcoming Events Widget */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wide">
            Upcoming Events
          </h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-blue-600 hover:text-blue-800">
                <a href="/events" className="underline">Test</a>
              </h4>
              <p className="text-sm text-gray-600">
                June 13 @ 8:00 PM - 9:00 PM
              </p>
            </div>
          </div>
          <div className="mt-4">
            <a href="/events" className="text-blue-600 hover:text-blue-800 underline">
              View All Events
            </a>
          </div>
        </div>

        {/* Archives Widget */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wide">
            Archives
          </h3>
          <div className="text-gray-600">
            {/* Archives would typically show months/years with post counts */}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Donate
