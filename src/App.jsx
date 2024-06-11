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
import {TonConnectUIProvider} from '@tonconnect/ui-react'
import ApplyForJob from './pages/ApplyForJob'
window.Buffer = window.Buffer || require("buffer").Buffer; 


const App = () => {
  const manifestURL="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json"
  return (
    <TonConnectUIProvider manifestUrl={manifestURL}>
    <TonProvider>
    <Router className='w-screen'>
      <Routes>
        <Route path='/' element={<JobListingMain/>}/>
        <Route path='/jobDetail' element={<JobDetails/>}/>
        <Route path='/register' element={<RegisterCandidate/>}/>
        <Route path='/JobApplication' element={<JobApplications/>}/>
        <Route path='/candidateProfile' element={<CandidateProfile/>}/>
        <Route path='/apply' element={<ApplyForJob/>}/>
      </Routes>
      <Toaster/>
    </Router>
    </TonProvider>
    </TonConnectUIProvider>
  )
}

export default App