import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'

// Main site layout component
const MainSiteLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#f3f1f6] relative">
    {/* Background pattern at top */}
    <div
      className="absolute top-0 left-0 right-0 h-48"
      style={{
        background: 'linear-gradient(to bottom, #1e3a8a 0%, #2c5aa0 50%, #4a90e2 100%)',
        backgroundRepeat: 'repeat-x'
      }}
    />

    {/* Main container */}
    <div className="relative z-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4">
        <Header />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg mt-4 overflow-hidden">
          {children}
        </div>

        <Footer />
      </div>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <Routes>
        {/* Main site routes - Home and Contact */}
        <Route path="/" element={<MainSiteLayout><Home /></MainSiteLayout>} />
        <Route path="/contact" element={<MainSiteLayout><Contact /></MainSiteLayout>} />
      </Routes>
    </Router>
  )
}

export default App
