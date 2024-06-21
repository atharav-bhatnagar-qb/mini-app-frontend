import React, { useContext, useEffect, useState } from 'react'
import { TonContext, baseURL, useTon } from '../utils/context'
import toast from 'react-hot-toast'
import '../components/jobListingMain/jobListingMain.css'
import { bounties } from '../utils/sampledata'
import JobCard from '../components/jobListingMain/JobCard'
import { useNavigate } from 'react-router-dom'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useTonConnect } from '../utils/useTonConnect'
import axios from 'axios'

const JobListingMain = () => {

  const nav=useNavigate()
  const tonAuth=useContext(TonContext)
  const {connected,wallet}=useTonConnect()
  const [jobs,setJobs]=useState([])

  async function getUserDetails(){
    await axios.get(`${baseURL}/getUser?wallet=${wallet.toString()}`).then((res)=>{
      console.log(res)
      if(res?.data?.message=="no user exists with this walletid"){
        console.log("need to register")
        nav('/register')
      }else{
        tonAuth?.setUser(res?.data?.message)
        toast.success(`Welcome back ${res?.data?.message?.name} !`)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  async function getJobs(){
    setJobs([])
    await axios.get(`${baseURL}/getAllJobs`).then((res)=>{
      console.log(res?.data,res?.data?.jobs!=undefined)
      if(res?.data?.jobs!=undefined){
        for(let i=res?.data?.jobs?.length-1;i>=0;i--){
            let newJob={...res?.data?.jobs[i],id:res?.data?.jobs[i]?.jobId}
            console.log(newJob)
            setJobs(j=>[...j,newJob])
        }
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    console.log("is conn user",connected)
    getJobs()
    if(connected){
      getUserDetails()
    }
  },[connected])

  return (
    <div className='page'>
      <div className="main-cont">
        <div className="main-btn-cont">
          <TonConnectButton/>
          {
            connected?
            <button 
              className='main-connect-btn'
              onClick={()=>{
                if(tonAuth?.user?.name==""||tonAuth?.user?.name==undefined){
                  return
                }else{
                  nav('/apply')
                }
              }}
            >
              Apply for a job
            </button>
            :
            <></>
          }
        </div>
        
        <div className="main-job-list">
          <h1 className="main-job-list-title">
            Job Listings
          </h1>
          {
            connected?
            <button 
              className="main-create-job-btn"
              onClick={()=>{
                if(tonAuth?.user?.name==""||tonAuth?.user?.name==undefined){
                  return
                }else{
                  nav('/createJob')
                }
              }}
            >
              + Create new job
            </button>
            :
            <></>
          }

          {
            
            jobs?.length<=0?
            
            <p className="empty-text">
              No jobs to show {console.log(jobs,"jobs")}
            </p>
            :
            <></>
          }

          
          {
            jobs.map((bounty,index)=>(
              <JobCard key={index} jobItem={bounty} nav={nav}/>
            ))
            
          }
        </div>
      </div>
    </div>
  )
}

export default JobListingMain