import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white">
      <div className="py-6 px-4">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/">
            <img
              src="/media/bridgewater-dtc-logo.png"
              alt="Bridgewater Democratic Town Committee"
              className="h-24 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
