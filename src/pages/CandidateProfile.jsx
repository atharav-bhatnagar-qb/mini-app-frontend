import React, { useContext, useEffect } from 'react'
import '../components/candidateProfile/candidateProfile.css'
import { LuArrowLeft } from 'react-icons/lu'
import { TiStarOutline } from 'react-icons/ti'
import { TonContext } from '../utils/context'
import { useNavigate } from 'react-router-dom'

const skills=[
    "Linux","Docker","Kubernetes","Kubernetes","Linux"
]

const CandidateProfile = () => {
    const tonAuth=useContext(TonContext)
    const nav=useNavigate()
    console.log(tonAuth?.candidate)

    useEffect(()=>{
        if(tonAuth?.user==undefined){
            nav('/')
        }
    },[])

  return (
    <div className='page'>
        <img src="coinTop.png" alt="top" className="coin-top" />
        <LuArrowLeft className='back-icon' onClick={()=>nav(-1)}/>
        <div className="can-pro-cont">
            <h1 className="can-pro-title">Candidate Profile</h1>
            <div className="can-pro-card">
                <div className="can-pro-item">
                    <p className="can-pro-item-text">NAME</p>
                    <p className="can-pro-item-text">{tonAuth?.candidate?.candidateData?.name}</p>

                </div>
                <div className="can-pro-item">
                    <p className="can-pro-item-text">EMAIL</p>
                    <p className="can-pro-item-text">{tonAuth?.candidate?.candidateData?.email}</p>
                </div>
                <div className="can-pro-item">
                    <p className="can-pro-item-text">SKILLS</p>
                    <div className="can-pro-skill-cont">
                        {
                            tonAuth?.candidate?.skills?.map((skill,index)=>(
                                <p key={index} className="can-pro-skill-item">
                                    {skill}
                                </p>
                            ))
                        }
                    </div>
                </div>
                <div className="can-pro-item">
                    <p className="can-pro-item-text">RATING</p>
                    <p className="can-pro-item-text">
                    {tonAuth?.candidate?.rating} {" "}
                        <TiStarOutline className='text-yellow-500 animate-pulse text-2xl'/>
                    </p>
                </div>
            </div>
        </div>
        <img src="coinBtm.png" alt="btm" className="coin-btm" />
    </div>
  )
}

export default CandidateProfile