const mongoose = require('mongoose')

const ResumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, default: 'Untitled Resume' },
  name: { type: String, default: '' },
  jobTitle: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  summary: { type: String, default: '' },
  company: { type: String, default: '' },
  role: { type: String, default: '' },
  duration: { type: String, default: '' },
  description: { type: String, default: '' },
  school: { type: String, default: '' },
  degree: { type: String, default: '' },
  year: { type: String, default: '' },
  skills: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('Resume', ResumeSchema)