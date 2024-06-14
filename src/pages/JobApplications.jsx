import React, { useContext, useEffect, useState } from 'react'
import { TonContext, baseURL } from '../utils/context'
import '../components/jobApplications/jobApplications.css'
import { people } from '../utils/sampledata'
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import axios from 'axios';

const JobApplications = () => {
  const tonAuth=useContext(TonContext)
  const [applicants,setApplicants]=useState([])
  const nav=useNavigate()
  

  async function getJobApplications(){
    console.log(tonAuth?.job?.id)
    setApplicants([])
    await axios.get(`${baseURL}/getApplications?jobID=${tonAuth?.job?.id}`).then(async(res)=>{
      console.log(res?.data)
      if(res?.data?.message=="applications found"){
        for(let i=0;i<res?.data?.applications?.length;i++){
          let user=await axios.get(`${baseURL}/getUser?wallet=${res?.data?.applications[i]?.candidate}`)
          console.log(user?.data,typeof user?.data?.message)
          if(typeof user?.data?.message == 'string'){
            continue
          }
          let candidate={
            name:user?.data?.message?.name,
            email:user?.data?.message?.email,
            rating:res?.data?.applications[i]?.rating,
            skills:res?.data?.applications[i]?.skills
          }
          setApplicants(app=>[...app,candidate])
        }
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getJobApplications()
  },[])

  return (
    <div className='page'>
      <IoMdArrowBack className='back-icon' onClick={()=>{
          nav('/')
        }}/>
      <div className="application-cont">
        <h1 className="application-title">Candidate applications</h1>
        <p className="application-job-name">Job name : {tonAuth?.job?.name}</p>
        <div className="application-list-cont">
          {
            applicants.map((candidate,index)=>(
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