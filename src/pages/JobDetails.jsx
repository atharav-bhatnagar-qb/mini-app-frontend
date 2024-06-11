import React, { useContext, useEffect, useState } from 'react'
import { TonContext, baseURL, useTon } from '../utils/context'
import '../components/jobDetails/jobDetails.css'
import { useNavigate } from 'react-router-dom'
import { useTonConnect } from '../utils/useTonConnect'
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios'
import toast from 'react-hot-toast'
import { TonConnectUI } from '@tonconnect/ui-react'

const JobDetails = () => {

  const tonAuth=useContext(TonContext)
  const [showRef,setShowRef]=useState(false)
  const nav=useNavigate()
  const {connected,wallet,sender}=useTonConnect()
  const newLink=`https://t.me/ton_demo_tel_bot?start=${wallet.toString().slice(2,11)}job${tonAuth?.job?.id}`
  const [isGenerated,setIsGenerated]=useState(false)
  const receiver="EQChHpu8-rFBQyVCXJtT1aTwODTBc1dFUAEatbYy11ZLcBST"

  async function getReferral(){
    await axios.get(`${baseURL}/getLink?link=${newLink}`).then((res)=>{
      console.log(res?.data)
      if(res?.data?.message=="link found"){
        setIsGenerated(true)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  async function generateReferral(){
    await sender.send({
      to:receiver,
      value:1
    }).then(async(res)=>{
      await axios.post(`${baseURL}/createLink`,{
        generatedBy:wallet.toString(),
        link:newLink,
        jobId:tonAuth?.job?.id
      }).then(async(res)=>{
        console.log(res?.data)
        if(res?.data?.message=="Link created successfully"){
          toast.success("Your referral link is generated for this job")
          setIsGenerated(true)
        }else{
          toast?.error(res?.data?.message)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }).catch((err)=>{
      console.log(err) 
      toast.err("Could not complete ton transaction!")
    })
    
  }

  useEffect(()=>{
    if(!connected){
      nav('/')
    }else{
      getReferral()
    }
  },[])

  return (
    <div className='page'>
      <div className="job-detail-cont">
        <IoMdArrowBack className='back-icon' onClick={()=>{
          nav('/')
        }}/>
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
          {
            isGenerated?
            <p className='job-info-bounty'>
              <strong>Your referral : </strong>
            </p>
            :
            <button className={showRef?"job-referral-gen-btn cursor-not-allowed":"job-referral-gen-btn"}
              disabled={showRef}
                onClick={generateReferral}
              >
                {
                  showRef?
                  "Referral generated"
                  :
                  "Generate Referral"
                }
              </button>
          }
            <p className="job-referral-link">
              {isGenerated?newLink:""}
            </p>
        </div>
      </div>
    </div>
  )
}

export default JobDetails