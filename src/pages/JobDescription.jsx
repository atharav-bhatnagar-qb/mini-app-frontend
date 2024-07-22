import React, { useContext, useEffect, useState } from 'react'
import '../components/jobDes/jobDes.css'
import { LuArrowLeft } from "react-icons/lu";
import { MdPeopleOutline } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { TonContext, baseURL } from '../utils/context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTonConnect } from '../utils/useTonConnect';
import { v4 } from 'uuid';
import toast from 'react-hot-toast';
import { FaCopy } from "react-icons/fa6";

const JobDescription = () => {
    const tonAuth=useContext(TonContext)
    // console.log(tonAuth)
    const nav=useNavigate()
    const {wallet,sender}=useTonConnect()
    const [links,setLinks]=useState([])
    const newLink=`https://t.me/ton_demo_tel_bot?start=`
    const TON_DECIMALS=9
    const receiver="0QCueun5yIwfsyNDXMe2UQR25WJK5MOYDbkc-elqXeVoU2Ka"
  
    async function getAllreferrals(){
        try{
            await axios.get(`${baseURL}/getAllLinks?user=${wallet}&job=${tonAuth?.job?.jobId}`).then((res)=>{
                console.log(res?.data?.message)
                if(res?.data?.message=="links found"){
                    console.log("links : ",res?.data?.links)
                    setLinks(res?.data?.links)
                }
            }).catch((err)=>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
        }
    }

    async function generateLink(){
        try{
            let id=v4()
            await sender.send({
                to:sender.address,
                value:Math.pow(10,9-2),
                // body:"Generating referral"
            }).then(async(res)=>{
                console.log("ton res : ",res)
                await axios.post(`${baseURL}/createLink`,{
                  generatedBy:wallet,
                  link:newLink+id,
                  jobId:tonAuth?.job?.id,
                  ref:id
                }).then(async(res)=>{
                  console.log(res?.data)
                  if(res?.data?.message=="Link created successfully"){
                    getAllreferrals()
                    toast.success("Your referral is being generated, please proceed with transaction")
                  }else{
                    toast?.error(res?.data?.message)
                  }
                }).catch((err)=>{
                  console.log(err)
                })
              }).catch((err)=>{
                console.log(err) 
                toast.error("Could not complete ton transaction!")
              })
        }catch(err){
            console.log(err)
        }
    }
    async function copyText(text){
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Referral copied to clipboard")
          } catch (err) {
            console.error('Failed to copy: ', err);
            toast.success("Referral copied to clipboard")

          }
    }

    useEffect(()=>{
        getAllreferrals()
    },[])

  return (
    <div className='job-des-main'>
        <img src="coinTop.png" alt="top" className="coin-top" />
        <div className="jd-back-icon-cont">
            <LuArrowLeft className='jd-back-icon' onClick={()=>nav('/jobListing')}/>
        </div>
        <div className="jd-main-des-cont">
            <img src={tonAuth?.job?.logo==undefined?"compLogo.png":tonAuth?.job?.logo} alt="company" className="jd-comp-img" />
            <h1 className="jd-sec-title">
                {/* Senior Frontend Developer */}
                {tonAuth?.job?.title}
            </h1>
            <p className="jd-main-des-subtitle">
            {/* CoinMarketCap */}
                {tonAuth?.job?.company}
            </p>
            <p className="jd-small-text">
                {/* CoinMarketCap is the world's most trusted & accurate source for crypto market capitalizations, pricing and information. CoinMarketCap is a U.S. company registered in the United States of America. */}
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
                posted 2 months ago
            </p>
        </div>
        <div className="jd-refer-job-cont">
            <a  className="jd-sec-title">Refer Job</a>
            {
                links?.length>0?
                <>
                <p className="jd-small-text">
                    Red referrals are the used ones, you can use green referral
                </p>
                <div className="jd-ref-link-cont">
                    {
                        links?.map((link,index)=>(
                            <div className="jd-ref-link-item" key={index}>
                                <p className="jd-ref-link-text" style={link?.isActive?{color:'green'}:{color:'red'}}>{link?.link}</p>
                                <FaCopy className='jd-copy-icon' onClick={()=>{
                                    copyText(link?.link)
                                }}/>
                            </div>
                            
                        ))

                    }
                    
                </div>
                <button className="jd-refer-btn" onClick={generateLink}>
                    GENERATE ANOTHER REFERRAL
                </button>
                </>
                :
                <>
                    <p className="jd-small-text" id='refer-ref'>
                        Refer this job, compete against other users and earn you rewards ! 
                    </p>
                    <button className="jd-refer-btn" onClick={generateLink}>
                        GENERATE REFERRAL
                    </button>
                </>
            }

        </div>
        <div className="jd-applicant-req-cont">
            <p className="jd-sec-title">About the Role</p>
            <p className="jd-small-text">
                {/* We're looking for a seasoned Frontend Web Developer to implement new user- facing features for high-traffic products, write client-side code to develop fast and user-friendly web applications for desktop and mobile browsers, as well as optimizing these applications for speed and scalability. Additionally, the position requires building libraries and frameworks to support complex web applications, contributing creatively to solve technical and business challenges, and researching and advocating for new technologies and best practices within the team. */}
                {tonAuth?.job?.jobDetail}
            </p>
            <p className="jd-small-title">Skills</p>
            <div className="jd-skill-cont">
                {/* <p className="jd-skill-tag">Kubernetes</p>
                <p className="jd-skill-tag">Linux</p>
                <p className="jd-skill-tag">Redux</p> */}
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
            {/* These are the minimum requirements a candidate must meet to be considered for this role */}
            {tonAuth?.job?.candidateReq}
            </p>
            <p className="jd-small-title">Job Responsibilities</p>
            <p className="jd-small-text">
            {/* A web developer designs, builds, and maintains websites and web applications, ensuring they are functional, user-friendly, and visually appealing. They optimize performance, implement security measures, and collaborate with team members to meet project goals. Continuous learning and adapting to new technologies and trends are essential parts of their role. */}
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
                {/* CoinMarketCap has been the premier price-tracking website for cryptocurrencies. It is the most referenced and trusted source for comparing thousands of crypto entities in the rapidly growing cryptocurrency space by users, institutions, and media. CoinMarketCap firmly stands for accurate, timely and unbiased information, enabling each end user to draw their own informed conclusions from CoinMarketCap data. */}
                {tonAuth?.job?.aboutCompany}
            </p>
        </div>
        <div className="jd-app-cont">
            <button className="jd-app-refer-btn" onClick={()=>{
                nav('/jobDetails#refer-ref')
                toast.success("Generate referrals or share the existing ones")
            }}>Refer Job</button>
            <button className="jd-app-apply-btn" onClick={()=>nav('/apply')}>Apply</button>
        </div>
    </div>
  )
}

export default JobDescription