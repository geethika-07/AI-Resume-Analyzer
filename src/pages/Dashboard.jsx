import { useState, useEffect } from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { FilePlus, Trash2 } from 'lucide-react'
import { getResumes, createResume, deleteResume } from '../api'
import toast, { Toaster } from 'react-hot-toast'

function Dashboard() {
  const [resumes, setResumes] = useState([])
  const { user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const res = await getResumes()
      setResumes(res.data)
    } catch (err) {
      toast.error('Failed to fetch resumes')
    }
  }

  const handleCreate = async () => {
    try {
      const res = await createResume({
        title: 'Untitled Resume',
        userId: user.id,
        name: '', jobTitle: '', email: '', phone: '',
        summary: '', company: '', role: '', duration: '',
        description: '', school: '', degree: '', year: '', skills: ''
      })
      navigate(`/edit-resume/${res.data.id}`)
    } catch (err) {
      toast.error('Failed to create resume')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteResume(id)
      setResumes(resumes.filter(r => r.id !== id))
      toast.success('Resume deleted!')
    } catch (err) {
      toast.error('Failed to delete resume')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <Link to="/" className="text-2xl font-bold text-blue-600">ResumeAI</Link>
        <UserButton />
      </nav>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Resumes</h2>
          <button onClick={handleCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <FilePlus size={20} />
            New Resume
          </button>
        </div>

        {resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm py-24">
            <FilePlus size={48} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-500">No resumes yet</h3>
            <p className="text-gray-400 mt-2">Click "New Resume" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map(resume => (
              <div key={resume.id} className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800">{resume.title}</h3>
                <p className="text-gray-500 text-sm">{resume.jobTitle || 'No job title yet'}</p>
                <div className="flex gap-2 mt-auto">
                  <Link to={`/edit-resume/${resume.id}`} className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(resume.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard