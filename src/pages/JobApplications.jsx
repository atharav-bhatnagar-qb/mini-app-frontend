import React, { useContext } from 'react'
import { TonContext } from '../utils/context'
import '../components/jobApplications/jobApplications.css'
import { people } from '../utils/sampledata'
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const JobApplications = () => {
  const tonAuth=useContext(TonContext)
  const nav=useNavigate()
  return (
    <div className='page'>
      <div className="application-cont">
        <h1 className="application-title">Candidate applications</h1>
        <p className="application-job-name">Job name : {tonAuth?.job?.name}</p>
        <div className="application-list-cont">
          {
            people.map((candidate,index)=>(
              <div key={index} className="app-candidate-card" onClick={()=>{
                tonAuth?.setCandidate(candidate)
                nav('/candidateProfile')
              }}>
                <h3 className="app-candidate-name">
                  {candidate?.name}
                </h3>
                <div className="app-candidate-rating-cont">
                  <FaStar className='app-candidate-star'/>
                  <h3 className="app-candidate-rating">{candidate?.rating}</h3>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default JobApplications