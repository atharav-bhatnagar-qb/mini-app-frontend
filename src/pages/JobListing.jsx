import React, { useContext, useEffect, useState } from 'react'
import '../components/jobListing/jobListing.css'
import { HiOutlineUser } from "react-icons/hi2";
import JobCard from '../components/jobListing/JobCard';
import { useNavigate } from 'react-router-dom';
import { TonContext, baseURL, useTon } from '../utils/context';
import toast from 'react-hot-toast';
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useTonConnect } from '../utils/useTonConnect';

const marText="Total Prize Distributed 1200 Bounties . Total Referrals this week 15,000 . Total Prize Distributed 1200 Bounties"

const JobListing = () => {

    const nav=useNavigate()
    const tonAuth=useContext(TonContext)
    console.log(tonAuth?.user)
    const [fJobs,setFJobs]=useState([])
    const [nJobs,setNJobs]=useState([])
    const [tonConnectUI]=useTonConnectUI()
    const [disconnectOpen,setDisconnectOpen]=useState(false)
    const {wallet}=useTonConnect()

    async function getFeaturedJobs(){
        try{
            console.log("getting featured jobs")
            setFJobs([])
            await axios.get(`${baseURL}/getFeatJobs`).then((res)=>{
                console.log(res?.data,res?.data?.jobs!=undefined)
                if(res?.data?.jobs!=undefined){
                  for(let i=res?.data?.jobs?.length-1;i>=0;i--){
                      let newJob={...res?.data?.jobs[i]}
                      console.log(newJob)
                      setFJobs(j=>[...j,newJob])
                  }
                }
            }).catch((err)=>{
                console.log(err)
                toast.error("Something went wrong while getting the jobs !")
            })
          
        }catch(err){
            console.log(err)
            toast.error("Something went wrong while getting the jobs !")
        }
    }


    async function getUnFeaturedJobs(){
        try{
            console.log("getting unfeatured jobs")
            setNJobs([])
            await axios.get(`${baseURL}/getUnfeatJobs`).then((res)=>{
                console.log(res?.data,res?.data?.jobs!=undefined)
                if(res?.data?.jobs!=undefined){
                  for(let i=res?.data?.jobs?.length-1;i>=0;i--){
                      let newJob={...res?.data?.jobs[i]}
                      console.log(newJob)
                      setNJobs(j=>[...j,newJob])
                  }
                }
            }).catch((err)=>{
                console.log(err)
                toast.error("Something went wrong while getting the jobs !")
            })
          
        }catch(err){
            console.log(err)
            toast.error("Something went wrong while getting the jobs !")
        }
    }

    async function getUserDetails(){
        try{
            console.log("get user running")
            await axios.get(`${baseURL}/getUser?wallet=${wallet.toString()}`).then((res)=>{
                console.log(res)
                if(res?.data?.message=="no user exists with this walletid"){
                  console.log("need to register")
                  nav('/register')
                }else{
                  tonAuth?.setUser(res?.data?.message)
                  if(res?.data?.message?.isAdmin){
                    nav('/adminHome')
                  }else{
                    nav('/jobListing')
                  }
                  toast.success(`Welcome back ${res?.data?.message?.name} !`)
                }
              }).catch((err)=>{
                console.log(err)
              })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getFeaturedJobs()
        getUnFeaturedJobs()
    },[])


  return (
    <div className='job-listing-main-cont'>
        <img src='coinTop.png' alt='top' className='jl-coin-top'/>
        <div className="jl-header">
            <h1 className="jl-title">
                Jobs
            </h1>
            <div className="jl-user-btn">
                {/* icon
                name
                etc */}
                {
                    tonAuth?.user?.isAdmin?
                    <p className="jl-user-btn-name" onClick={()=>nav('/adminHome')}>
                        Go Back to Dashboard
                    </p>
                    :
                    <>
                        <HiOutlineUser className='jl-user-btn-icon'/>
                        <p className="jl-user-btn-name cursor-pointer" onClick={()=>{

                            setDisconnectOpen(!disconnectOpen)
                        }}>
                            {wallet?.toString()?.substring(0,12)}...
                        </p>
                        <p className="jl-user-btn-rating">#{tonAuth?.user?.rank}</p>
                        {
                            disconnectOpen?
                            <div className='jl-user-btn-option-cont' onClick={()=>setDisconnectOpen(true)}>
                                <p 
                                    className="jl-user-btn-option" 
                                    onClick={()=>nav('/profile')}
                                    // onClick={()=>console.log("profile")}
                                >
                                    Profile
                                </p>
                                <hr />
                                 <p 
                                    className="jl-user-btn-option" 
                                    onClick={()=>nav('/instructions')}
                                    // onClick={()=>console.log("instructions")}
                                 >
                                    Instructions
                                </p> 
                                <hr />
                                <p className="jl-user-btn-option"  
                                onClick={async()=>{
                                    await tonConnectUI.disconnect()
                                    nav('/')
                                    console.log("dei")
                                }}
                                >
                                    Disconnect
                                </p>
                            </div>
                            :
                            <></>
                        }
                    </>
                }
                
            </div>
        </div>
        <div className="jl-search-cont">
            <IoIosSearch className='jl-search-icon'/>
            <input type="text" className="jl-search-inp"  placeholder='Search a job by name' />
        </div>
        <div className="jl-winner-info">
            <img src="cup.png" alt="cup winner" className="jl-winner-cup" />
            <div className="jl-w-data-cont">
                <p className="jl-w-t1">#1 ABCDEF</p>
                <p className="jl-w-t2">WON 3 BOUNTIES</p>
                <p className="jl-w-t3">15 Referrals | result of this Saturday</p>
            </div>
        </div>
        <marquee className='jl-marquee'>
            {marText.toUpperCase()}
        </marquee>
        <div className="jl-featured-cont">
            <h4 className="jl-f-title">Featured Jobs</h4>
            <div className="jl-jc-hlist">
                {
                    fJobs?.map((job,index)=>(
                        <JobCard key={index} job={job} nav={nav}/>
                    ))
                }
                {/* <JobCard nav={nav}/> */}
            </div>
        </div>
        <div className="jl-normaljob-cont">
            {
                nJobs?.map((job,index)=>(
                    <JobCard key={index} job={job} nav={nav}/>
                ))
            }
            {/* <JobCard nav={nav}/>                     */}
        </div>
        <img src='coinBtm.png' alt='top' className='jl-coin-btm'/>
    </div>
  )
}

export default JobListing