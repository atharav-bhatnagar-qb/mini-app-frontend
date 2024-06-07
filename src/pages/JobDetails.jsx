import React, { useContext, useEffect } from 'react'
import { TonContext, useTon } from '../utils/context'
import '../components/jobDetails/jobDetails.css'
import { useNavigate } from 'react-router-dom'

const JobDetails = () => {

  const tonAuth=useContext(TonContext)
  const nav=useNavigate()

  useEffect(()=>{
    if(!tonAuth?.isConnected){
      nav('/')
    }
  },[])

  return (
    <div className='page'>
      <div className="job-detail-cont">
        <h1 className="job-detail-title">Job details</h1>
        <div className="job-detail-info-cont">
          <h4 className="job-info-name">{tonAuth?.job?.name}</h4>
          <h6 className="job-info-bounty">Prize : ${tonAuth?.job?.bounty}</h6>
          <p className="job-info-desc">
            <strong>About the job : </strong>
            <br/>
            {tonAuth?.job?.des}
          </p>
        </div>
        <div className="job-referral-link-cont">
          <button className="job-referral-gen-btn" onClick={()=>nav('/register')}>Generate Referral</button>
            <p className="job-referral-link">nasnaiswidhuincakjbsudbuwbdkwbnbwbdb</p>
        </div>
      </div>
    </div>
  )
}

export default JobDetails