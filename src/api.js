import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

export const createResume = (data) => API.post('/resumes', data)
export const getResumes = () => API.get('/resumes')
export const getResume = (id) => API.get(`/resumes/${id}`)
export const updateResume = (id, data) => API.put(`/resumes/${id}`, data)
export const deleteResume = (id) => API.delete(`/resumes/${id}`)