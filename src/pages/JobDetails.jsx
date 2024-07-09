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
  const {connected,wallet,sender,network}=useTonConnect()
  const newLink=`https://t.me/ton_demo_tel_bot?start=${wallet?.toString()?.slice(2,11)}job${tonAuth?.job?.id}`
  const [isGenerated,setIsGenerated]=useState(false)
  const TON_DECIMALS=9
  const receiver="0QCueun5yIwfsyNDXMe2UQR25WJK5MOYDbkc-elqXeVoU2Ka"

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
    console.log("newtwork : ",network)
    await sender.send({
      to:sender.address,
      value:Math.pow(10,9-2),
      // body:"Generating referral"
    }).then(async(res)=>{
      console.log("ton res : ",res)
      await axios.post(`${baseURL}/createLink`,{
        generatedBy:wallet,
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
      toast.error("Could not complete ton transaction!")
    })
    
  }

  // useEffect(()=>{
  //   if(!connected){
  //     // nav('/')
  //   }else{
  //     // getReferral()
  //   }
  // },[])

  return (
    <div className='page'>
      <div className="job-detail-cont">
        <img src="Vector_left.svg" alt="back" className="back-icon" />
        <div className='view-application-btn'>
             <h1> View Applicants </h1>
        </div>
        <div className="about-company-cont">
          <div className="about-company-sub-cont">
            <h1>About the company</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, magni cupiditate. Culpa repellendus illo tempora itaque laborum eaque veniam accusantium recusandae provident, odit quos corrupti obcaecati nulla minima sit perferendis, unde cumque, neque est eligendi molestias eius ullam alias possimus. Minus at odio nemo amet.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails