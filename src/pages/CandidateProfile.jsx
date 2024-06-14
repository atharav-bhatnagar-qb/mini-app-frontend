import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TonContext } from '../utils/context'
import '../components/candidateProfile/candidateProfile.css'
import { FaStar } from 'react-icons/fa'
import { IoMdArrowBack } from 'react-icons/io'

const CandidateProfile = () => {
  const nav=useNavigate()
  const tonAuth=useContext(TonContext)
  return (
    <div className='page'>
      <div className="profile-cont">
      <IoMdArrowBack className='back-icon' onClick={()=>{
          nav('/')
        }}/>
        <h1 className="profile-title">Candidate Profile</h1>
        <div className="profile-info-cont">
          <h3 className="profile-info-label">Name : </h3>
          <p className="profile-info-value">{tonAuth?.candidate?.name}</p>
        </div>
        <div className="profile-info-cont">
          <h3 className="profile-info-label">Email : </h3>
          <p className="profile-info-value">{tonAuth?.candidate?.email}</p>
        </div>
        <div className="profile-info-cont">
          <h3 className="profile-info-label">Rating : </h3>
          <p className="profile-info-value">
            <FaStar/>
            {" "+tonAuth?.candidate?.rating}
          </p>
        </div>
        <div className="profile-skill-cont">
          <div className="profile-skill-title">Skills : </div>
          <div className="profile-skill-tag-list">
            {
              tonAuth?.candidate?.skills?.map((skill,index)=>(
                <p className="profile-skill-tag" key={index}>{skill}</p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateProfile