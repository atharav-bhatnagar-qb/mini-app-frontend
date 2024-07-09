import React, { useContext, useEffect, useState } from 'react'
import { TonContext, baseURL, useTon } from '../utils/context'
import toast from 'react-hot-toast'
import '../components/jobListingMain/jobListingMain.css'
import { bounties, jobsData } from '../utils/sampledata'
import JobCard from '../components/jobListingMain/JobCard'
import { useNavigate } from 'react-router-dom'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useTonConnect } from '../utils/useTonConnect'
import { IoSearch } from "react-icons/io5";
import axios from 'axios'

const JobListingMain = () => {

  const nav=useNavigate()
  const tonAuth=useContext(TonContext)
  const {connected,wallet}=useTonConnect()
  const [jobs,setJobs]=useState([])
  const [searchText,setSearchText]=useState("")

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
    // getJobs()
    setJobs([...jobsData])
    // if(connected){
    //   getUserDetails()
    // }
  },[connected])

  return (
    <div className='page'>
      <div className="main-cont">
        <div className="main-header-cont">
          <h1 className="main-header-title">Jobs</h1>
          <TonConnectButton/>
        </div>
        <div className="main-search-cont">
          <IoSearch className='search-icon' />
          <input 
            type="text"
            onChange={(e)=>setSearchText(e.target.value)}
            className="main-search-inp" 
            placeholder='Search by job title or company'
          />
        </div>
        <div className="main-feature-job-cont">
          <h3 className="main-feature-job-title">Featured Jobs</h3>
          <div className='main-feature-scroll-cont no-scrollbar'>
                    {jobs.map((data, ind) => (
                        <div className='main-feature-job-card-cont' key={ind} >
                            <JobCard data={data} nav={nav}/>
                        </div>
                    ))}
                </div>
        </div>
        <div className="main-job-list">
          
          {
            jobs.map((data, ind) => (
              <div key={ind}> 
                <JobCard data={data} nav={nav}/>
              </div>
            ))
          }
          
        </div>
      </div>
    </div>
  )
}

export default JobListingMain