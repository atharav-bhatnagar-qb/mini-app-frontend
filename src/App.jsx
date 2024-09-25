import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import { TonProvider } from './utils/context'
import {Toaster} from 'react-hot-toast'
import {TonConnectUIProvider} from '@tonconnect/ui-react'
import Intro from './pages/Intro'
import Register from './pages/Register'
import CandidateApplications from './pages/CandidateApplications'
import CandidateProfile from './pages/CandidateProfile'
import Instructions from './pages/Instructions'
import ReferralList from './pages/ReferralList'
import ApplyForm from './pages/ApplyForm'
import CreateJob from './pages/CreateJob'
import AdminHome from './pages/AdminHome'
import JobListing from './pages/JobListing'
import JobDescription from './pages/JobDescription'
import Profile from './pages/Profile'
import ReferralApplications from './pages/ReferralApplications'
import JobListingAdmin from './pages/JobListingAdmin'
import EditJob from './pages/EditJob'
import Leaderboard from './pages/Leaderboard'
import AdminJobDescription from './pages/AdminJobDescription'
window.Buffer = window.Buffer || require("buffer").Buffer; 


const App = () => {
  // const manifestURL="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json"
  const manifestURL="https://raw.githubusercontent.com/atharav-bhatnagar-qb/ton-demo/master/manifestURL.json"
  return (
    <TonConnectUIProvider enableAndroidBackHandler={true} manifestUrl={manifestURL}>
    <TonProvider>
    <Router className='w-screen'>
      <Routes>
        {/* <Route path='/' element={<ReferralList/>}/> */}
        <Route path='/' element={<Intro/>}/>
        <Route path='/adminHome' element={<AdminHome/>}/>
        <Route path='/createJob' element={<CreateJob/>}/>
        <Route path='/jobListing' element={<JobListing/>}/>
        <Route path='/jobDetails' element={<JobDescription/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/candidateApplications' element={<CandidateApplications/>}/>
        <Route path='/candidateProfile' element={<CandidateProfile/>}/>
        <Route path='/apply' element={<ApplyForm/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/instructions' element={<Instructions/>}/>
        <Route path='/userActiveRef' element={<ReferralList/>}/>
        <Route path='/refApplications' element={<ReferralApplications/>}/>
        <Route path='/adminJobListings' element={<JobListingAdmin/>}/>
        <Route path='/adminEditJob' element={<EditJob/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/adminJobDetails' element={<AdminJobDescription/>}/>
      </Routes>
      <Toaster/>
    </Router>
    </TonProvider>
    </TonConnectUIProvider>
  )
}

export default App