import React, { useContext, useEffect, useState } from 'react'
import '../components/jobDes/jobDes.css'
import { LuArrowLeft } from "react-icons/lu";
import { MdPeopleOutline } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { TonContext, baseURL } from '../utils/context';
import { useNavigate } from 'react-router-dom';

const AdminJobDescription = () => {
    const tonAuth=useContext(TonContext)
    const nav=useNavigate()
    const [createdAt,setCreatedAt]=useState("")

    const monthArr=["January","Febraury","March","April","May","June","July","August","September","October","November","December"]

    function setDate(){
        try{
            let date=new Date(tonAuth?.job?.createdAt)
            console.log(date)
            setCreatedAt(`${date.getDate()} ${monthArr[date.getMonth()]} ${date.getFullYear()}`)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        
        if(tonAuth?.user==undefined){
            nav('/')
        }
        setDate()
          
    },[])

  return (
    <div className='job-des-main'>
        <img src="coinTop.png" alt="top" className="coin-top" />
        <div className="jd-back-icon-cont">
            <LuArrowLeft className='jd-back-icon' onClick={()=>{
                if(tonAuth?.user?.isAdmin){
                    nav('/adminJobListings')
                    return
                }
                nav('/jobListing')}
            }/>
        </div>
        <div className="jd-main-des-cont">
            <img src={tonAuth?.job?.logo==undefined?"compLogo.png":tonAuth?.job?.logo} alt="company" className="jd-comp-img" />
            <h1 className="jd-sec-title">
                {tonAuth?.job?.title}
            </h1>
            <p className="jd-main-des-subtitle">
                {tonAuth?.job?.company}
            </p>
            <p className="jd-small-text">
                {tonAuth?.job?.aboutCompany}
            </p>
            <div className="jd-static-tag-cont">
                <div className="jd-static-tag-item">
                    <MdPeopleOutline className='jd-tag-icon'/>
                    <p className="jd-tag-text">
                        0 Applications
                    </p>
                </div>
                <div className="jd-static-tag-item">
                    <GiTrophyCup className='jd-tag-icon'/>
                    <p className="jd-tag-text">
                        High Chance of Winning
                    </p>
                </div>
                <div className="jd-static-tag-item">
                    <GiReceiveMoney className='jd-tag-icon'/>
                    <p className="jd-tag-text">
                        125% returns*
                    </p>
                </div>
            </div>
            <div className="jd-line"/>
            <div className="jd-custom-tag-cont">
                <p className="jd-skill-tag">Full time</p>
                <p className="jd-skill-tag">Competetive salary</p>
                <p className="jd-skill-tag">Engineering</p>
                <p className="jd-skill-tag">51-100 employees</p>
            </div>
            <p className="jd-small-text">
                posted on {createdAt}
            </p>
        </div>

        <div className="jd-applicant-req-cont">
            <p className="jd-sec-title">About the Role</p>
            <p className="jd-small-text">
                {tonAuth?.job?.jobDetail}
            </p>
            <p className="jd-small-title">Skills</p>
            <div className="jd-skill-cont">
                {
                    tonAuth?.job?.skills?.map((skill,index)=>(
                        <p className="jd-skill-tag" key={index}>
                            {skill}
                        </p>
                    ))
                }
            </div>
            <p className="jd-small-title">Candidate Requirements</p>
            <p className="jd-small-text">
            {tonAuth?.job?.candidateReq}
            </p>
            <p className="jd-small-title">Job Responsibilities</p>
            <p className="jd-small-text">
            {tonAuth?.job?.jobReq}
            </p>
        </div>
        <button className="jd-view-applicant-btn" onClick={()=>nav('/candidateApplications')}>
            VIEW APPLICANTS
        </button>
        <div className="jd-about-comp-cont">
            <p className="jd-sec-title">
                About Company
            </p>
            <p className="jd-small-text">
                {tonAuth?.job?.aboutCompany}
            </p>
        </div>
    </div>
  )
}

export default AdminJobDescription