import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">ResumeAI</h1>
        <div>
          <SignedOut>
            <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-blue-600 font-medium hover:underline">
                Dashboard
              </Link>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-24">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          Build Your Resume with <span className="text-blue-600">AI</span>
        </h2>
        <p className="text-gray-500 text-lg mb-8 max-w-xl">
          Create professional resumes in minutes using the power of Gemini AI. Smart, fast and beautiful.
        </p>
        <Link to="/dashboard" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
          Get Started Free
        </Link>
      </div>

    </div>
  )
}

export default Home