import React, { useContext, useEffect, useState } from 'react'
import '../components/applyform/applyform.css'
import { LuArrowLeft } from 'react-icons/lu'
import { PiFileTextLight } from "react-icons/pi";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { TonContext, baseURL } from '../utils/context';
import { useTonConnect } from '../utils/useTonConnect';

const ApplyForm = () => {

  const [skills,setSkills]=useState([""])
  const nav=useNavigate()
  const {wallet}=useTonConnect()
  const tonAuth=useContext(TonContext)

  useEffect(()=>{
    if(tonAuth?.user==undefined){
        nav('/')
    }
  },[])

  async function apply(){
    try{
      const ref=document.getElementsByClassName('apply-form-ref')[0]
      const skillInps=document.getElementsByClassName('apply-skill-inp')
      let skillList=[]
      for(let i=0;i<skills?.length;i++){
        skillList.push(skillInps[i].value)
      }
      console.log(skillList)
      // return
      await axios.post(`${baseURL}/createApplication`,{
        skills:skillList,
        ref:ref.value,
        candidate:wallet
      }).then((res)=>{
        console.log(res?.data?.message)
        if(res?.data?.success){
          toast.success(res?.data?.message)
          nav('/jobListing')
          return
        }
        toast.error(res?.data?.message)
      }).catch((err)=>{
        console.log(err)
      })
    }catch(err){
      console.log(err)
      toast.error("Something went wrong!")
    }
  }

  return (
    <div className='page'>
      <img src="coinTop.png" alt="top" className="coin-top" />
      <LuArrowLeft className='back-icon' onClick={()=>nav('/jobListing')}/>
      <div className="apply-form-cont">
        <h1 className="apply-title">Application</h1>
        <h3 className="apply-subtitle">
          Enter Referral
        </h3>
        <input id='apply-form-ref' type="text" className="apply-form-ref" />
        <h3 className="apply-subtitle">
          Skills
        </h3>
        <div className="apply-skills-cont">
          <BsPlusLg className='apply-add-skill-btn'onClick={()=>{
            setSkills(s=>[...s,""])
          }}/>
          {
            skills?.map((skill,index)=>(
              <input key={index} type="text" className="apply-skill-inp" />
            ))
          }
        </div>
        <h3 className="apply-subtitle">
          Resume
        </h3>
        <div className="resume-upload-cont">
          <PiFileTextLight className="resume-icon" />
          <button className="resume-upload-btn">
            Upload resume
          </button>
          <p className="resume-support-text">
          Supported file type .pdf (5mb max)
          </p>
        </div>
        <button className="apply-form-btn" onClick={apply}>
          Apply For Job
        </button>
      </div>
      <img src="coinBtm.png" alt="btm" className="coin-btm" />
    </div>
  )
}

export default ApplyForm