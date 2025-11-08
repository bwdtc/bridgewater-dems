import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="space-y-6">
      {/* Contact Us Widget */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-alice text-xl font-bold mb-4 text-[#40474a]">
          Contact Us
        </h3>
        <Link
          to="/contact"
          className="text-[#9e562a] hover:text-[#7a3d1a] font-medium"
        >
          Email us here
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
