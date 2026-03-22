import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import EditResume from './pages/EditResume'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
        <Route path="/edit-resume/:id" element={
          <>
            <SignedIn>
              <EditResume />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App