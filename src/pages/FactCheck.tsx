interface FactCheckPost {
  id: number
  title: string
  date: string
  excerpt: string
  content: string
  author: string
  published: boolean
}

import PageLayout from '../components/PageLayout'

const FactCheck = () => {
  // In a real application, this data would come from an API or state management
  // For demo purposes, we're using the same sample data as the admin
  const allFactCheckPosts: FactCheckPost[] = [
    {
      id: 1,
      title: "Security Issue Politicized",
      excerpt: "The Danbury News-Times editorial staff interviewed both candidates this week and within hours made their endorsement. During the interview Nancy Hawley discussed a \"data breach\" that occurred at Town Hall over a year ago. We think it is important to set the record straight on this issue as it clearly caught the attention of the...",
      content: "The Danbury News-Times editorial staff interviewed both candidates this week and within hours made their endorsement. During the interview Nancy Hawley discussed a \"data breach\" that occurred at Town Hall over a year ago. We think it is important to set the record straight on this issue as it clearly caught the attention of the editorial board.\n\nThe facts are as follows: In 2016, the town experienced a minor security incident involving outdated software on one computer workstation. No personal data was compromised, and the issue was immediately addressed by our IT contractor. All systems were updated and security protocols were enhanced.\n\nThis incident was reported to the appropriate authorities and documented in our annual security review. To characterize this as a \"data breach\" is misleading and appears to be an attempt to politicize routine IT maintenance.",
      author: "Admin",
      date: "2024-01-15",
      published: true
    },
    {
      id: 2,
      title: "Telling the Truth",
      excerpt: "Sometimes during election season, letters are mailed, letters to the editor published, or rumors that blossom are fertilized by being passed around by word of mouth. This section will be where we address their contents.",
      content: "Sometimes during election season, letters are mailed, letters to the editor published, or rumors that blossom are fertilized by being passed around by word of mouth. This section will be where we address their contents. We'll see how it turns out. Wouldn't it be nice if this was the first and last post?\n\nOur commitment is to provide factual, well-sourced responses to claims made about our candidates, policies, or record. We believe voters deserve accurate information to make informed decisions.\n\nIf you encounter questionable claims about local politics, please don't hesitate to contact us. We're committed to transparency and accountability.",
      author: "Admin",
      date: "2024-01-10",
      published: false // This post is private and won't appear on the public page
    },
    {
      id: 3,
      title: "Budget Facts and Fiction",
      excerpt: "Recent claims about the town's budget management require clarification. Here are the facts about our fiscal responsibility and transparency.",
      content: "Recent claims about the town's budget management require clarification. Here are the facts about our fiscal responsibility and transparency.\n\nClaim: \"The town is hiding budget deficits.\"\nFact: All budget documents are publicly available and presented at town meetings. Our annual audit shows consistent fiscal health.\n\nClaim: \"Property taxes have secretly increased.\"\nFact: Tax rates have remained stable for three consecutive years, as documented in public records.",
      author: "Admin",
      date: "2024-01-20",
      published: true
    }
  ]

  // Filter to only show published posts, sorted by date (newest first)
  const factCheckPosts = allFactCheckPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 pr-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4 border-b border-gray-300 pb-4">
            Fact Check
          </h1>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {factCheckPosts.map((post) => (
            <article key={post.id} className="pb-8 border-b border-gray-200 last:border-b-0">
              {/* Post Title */}
              <h2 className="text-2xl font-bold text-blue-700 mb-4 hover:text-blue-800 transition-colors">
                <a href={`#post-${post.id}`} className="no-underline">
                  {post.title}
                </a>
              </h2>

              {/* Post Meta */}
              <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium">Fact Check</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.418 8-8 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.418-8 8-8s8 3.582 8 8z" />
                  </svg>
                  No Comments
                </div>
              </div>

              {/* Post Excerpt */}
              <div className="text-gray-700 leading-relaxed mb-4">
                <p>{post.excerpt}</p>
              </div>

              {/* Read More Link */}
              <div>
                <a
                  href={`#post-${post.id}`}
                  className="inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm font-medium text-gray-700 transition-colors"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
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

export default FactCheck
