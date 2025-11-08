import { Link } from 'react-router-dom'

const FeatureBlocks = () => {
  const blocks = [
    {
      id: 'candidates',
      title: 'Candidates',
      description: 'The slate, strong and qualified.',
      icon: '👥',
    },
    {
      id: 'endorsements',
      title: 'Endorsements',
      description: 'Supporters, loud and clear.',
      icon: '🗳️',
    },
    {
      id: 'issues',
      title: 'Issues',
      description: 'Successes and plans.',
      icon: '📋',
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blocks.map((block) => (
            <Link
              key={block.id}
              to={`/${block.id}`}
              className="feature-block bg-gradient-to-br from-[#cdd6dc] to-[#9ca6bb] p-8 rounded-lg text-center hover:cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {block.icon}
              </div>
              <h5 className="font-adamina text-xl font-bold text-[#40474a] mb-3">
                {block.title}
              </h5>
              <p className="text-[#40474a] text-sm leading-relaxed">
                {block.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureBlocks
