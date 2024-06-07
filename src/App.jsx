import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import JobListingMain from './pages/JobListingMain'
import JobDetails from './pages/JobDetails'
import RegisterCandidate from './pages/RegisterCandidate'
import JobApplications from './pages/JobApplications'
import CandidateProfile from './pages/CandidateProfile'
import './App.css'
import { TonProvider } from './utils/context'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <TonProvider>
    <Router className='w-screen'>
      <Routes>
        <Route path='/' element={<JobListingMain/>}/>
        <Route path='/jobDetail' element={<JobDetails/>}/>
        <Route path='/register' element={<RegisterCandidate/>}/>
        <Route path='/JobApplication' element={<JobApplications/>}/>
        <Route path='/candidateProfile' element={<CandidateProfile/>}/>
      </Routes>
      <Toaster/>
    </Router>
    </TonProvider>
  )
}

export default App