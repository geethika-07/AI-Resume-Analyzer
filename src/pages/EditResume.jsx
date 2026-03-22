import { useState, useEffect } from 'react'
import { UserButton } from '@clerk/clerk-react'
import { Link, useParams } from 'react-router-dom'
import { getResume, updateResume } from '../api'
import toast, { Toaster } from 'react-hot-toast'

function EditResume() {
  const { id } = useParams()
  const [resume, setResume] = useState({
    title: '', name: '', jobTitle: '', email: '', phone: '',
    summary: '', company: '', role: '', duration: '',
    description: '', school: '', degree: '', year: '', skills: ''
  })

  useEffect(() => {
    fetchResume()
  }, [])

  const fetchResume = async () => {
    try {
      const res = await getResume(id)
      setResume(res.data)
    } catch (err) {
      toast.error('Failed to load resume')
    }
  }

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {
      await updateResume(id, resume)
      toast.success('Resume saved!')
    } catch (err) {
      toast.error('Failed to save resume')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">ResumeAI</Link>
        <div className="flex items-center gap-4">
          <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Save
          </button>
          <UserButton />
        </div>
      </nav>

      <div className="flex h-[calc(100vh-64px)]">

        {/* Left Side - Form */}
        <div className="w-1/2 overflow-y-auto p-8 border-r border-gray-200 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Resume</h2>

          <div className="mb-6">
            <input name="title" value={resume.title} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-lg" placeholder="Resume Title" />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Info</h3>
            <div className="flex flex-col gap-3">
              <input name="name" value={resume.name} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Full Name" />
              <input name="jobTitle" value={resume.jobTitle} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Job Title" />
              <input name="email" value={resume.email} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email" />
              <input name="phone" value={resume.phone} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Phone" />
              <textarea name="summary" value={resume.summary} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Professional Summary" rows={4} />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Experience</h3>
            <div className="flex flex-col gap-3">
              <input name="company" value={resume.company} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Company Name" />
              <input name="role" value={resume.role} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Role" />
              <input name="duration" value={resume.duration} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Duration (e.g. Jan 2022 - Dec 2023)" />
              <textarea name="description" value={resume.description} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Description" rows={3} />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Education</h3>
            <div className="flex flex-col gap-3">
              <input name="school" value={resume.school} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="School / University" />
              <input name="degree" value={resume.degree} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Degree" />
              <input name="year" value={resume.year} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Year" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Skills</h3>
            <textarea name="skills" value={resume.skills} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. React, Node.js, MongoDB" rows={3} />
          </div>
        </div>

        {/* Right Side - Live Preview */}
        <div className="w-1/2 overflow-y-auto p-8 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Live Preview</h2>
          <div className="bg-white shadow-md rounded-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800">{resume.name || 'Your Name'}</h1>
            <p className="text-blue-600 font-medium mt-1">{resume.jobTitle || 'Job Title'}</p>
            <p className="text-gray-500 text-sm mt-1">{resume.email || 'email@example.com'} | {resume.phone || '0000000000'}</p>
            <hr className="my-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Summary</h2>
            <p className="text-gray-600 text-sm">{resume.summary || 'Your professional summary will appear here.'}</p>
            <hr className="my-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Experience</h2>
            <p className="text-gray-800 font-medium text-sm">{resume.role || 'Role'} — {resume.company || 'Company'}</p>
            <p className="text-gray-500 text-sm">{resume.duration || 'Duration'}</p>
            <p className="text-gray-600 text-sm mt-1">{resume.description || 'Job description will appear here.'}</p>
            <hr className="my-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Education</h2>
            <p className="text-gray-800 font-medium text-sm">{resume.degree || 'Degree'} — {resume.school || 'School'}</p>
            <p className="text-gray-500 text-sm">{resume.year || 'Year'}</p>
            <hr className="my-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Skills</h2>
            <p className="text-gray-600 text-sm">{resume.skills || 'Your skills will appear here.'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditResume