const express = require('express')
const router = express.Router()

// Mock data for now
let resumes = []

// Get all resumes
router.get('/', (req, res) => {
  res.json(resumes)
})

// Create a new resume
router.post('/', (req, res) => {
  const resume = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  }
  resumes.push(resume)
  res.json(resume)
})

// Get a single resume
router.get('/:id', (req, res) => {
  const resume = resumes.find(r => r.id === req.params.id)
  if (!resume) return res.status(404).json({ message: 'Resume not found' })
  res.json(resume)
})

// Update a resume
router.put('/:id', (req, res) => {
  const index = resumes.findIndex(r => r.id === req.params.id)
  if (index === -1) return res.status(404).json({ message: 'Resume not found' })
  resumes[index] = { ...resumes[index], ...req.body }
  res.json(resumes[index])
})

// Delete a resume
router.delete('/:id', (req, res) => {
  resumes = resumes.filter(r => r.id !== req.params.id)
  res.json({ message: 'Resume deleted' })
})

module.exports = router