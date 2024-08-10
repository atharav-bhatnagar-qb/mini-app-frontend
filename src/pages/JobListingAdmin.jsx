import React, { useContext, useEffect, useState } from 'react'
import '../components/adminJobListing/adminJobListing.css'
import { useNavigate } from 'react-router-dom'
import { TonContext, baseURL } from '../utils/context'
import toast from 'react-hot-toast'
import axios from 'axios'
import { IoIosSearch } from 'react-icons/io'
import AdminJobCard from '../components/adminJobListing/AdminJobCard'
import { FaRegUser } from "react-icons/fa";

const JobListingAdmin = () => {
    const nav=useNavigate()
    const tonAuth=useContext(TonContext)
    const [fJobs,setFJobs]=useState([])
    const [nJobs,setNJobs]=useState([])
    const [isEditing,setIsEditing]=useState(false)

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
    async function changeFeatureStatus(id,status){
        try{
            let res=await axios.patch(`${baseURL}/updateFStatus`,{jobId:id,featureStatus:status})
            console.log(res)
            if(res?.data?.message!='Job feature status updated'){
                toast.error("error while updating feature status")
                return
            }
            getFeaturedJobs()
            getUnFeaturedJobs()
            toast.success(res?.data?.message)
        }catch(err){
            console.log(err)
            toast.error("Something went wrong")
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


    async function deleteJob(id){
        try{
            let res=await axios.delete(`${baseURL}/deleteJob?jobId=${id}`)
            console.log(res)
            if(res?.data?.message=='deleted'){
                getUnFeaturedJobs()
                getFeaturedJobs()
                toast.success("deleted jobs successfully")
                return
            }
            toast.error("something went wrong")
        }catch(err){
            console.log(err)
            toast.error("something went wrong")
        }
    }

    useEffect(()=>{
        if(tonAuth?.user==undefined || !tonAuth?.user?.isAdmin){
            nav('/')
        }
        getFeaturedJobs()
        getUnFeaturedJobs()
    },[])

  return (
    <div className='admin-job-listing-main-cont'>
        <img src="coinTop.png" alt="coin top" className="coin-top" />
        <div className="ajl-header">
            <h1 className="ajl-title">
                Jobs
            </h1>
            <div className="ajl-user-btn" onClick={()=>{
                setIsEditing(false)
                nav('/adminHome')
            }}>
                <FaRegUser className='ajl-user-icon'/>
                <p className="ajl-user-btn-name" >
                    Admin
                </p>
            </div>
        </div>
        <div className="ajl-search-cont">
            <IoIosSearch className='ajl-search-icon'/>
            <input type="text" className="ajl-search-inp"  placeholder='Search a job by name' />
        </div>
        <div className="ajl-featured-cont1">
            <div className="ajl-f-header">
                <h4 className="ajl-f-title">Featured Jobs</h4>
                {
                    !isEditing?
                    <p className="ajl-f-btn" onClick={()=>setIsEditing(true)}>
                        Edit list
                    </p>
                    :
                    <p className="ajl-f-btn" onClick={()=>{
                        setIsEditing(false)
                        nav('/createJob')
                    }}>
                        Create New Job
                    </p>
                }
            </div>
            <div className={isEditing?"ajl-jc-vlist":"ajl-jc-hlist"}>
                {
                    fJobs?.map((job,index)=>(
                        <AdminJobCard 
                            key={index} 
                            job={job} 
                            nav={nav}
                            isEditing={isEditing}
                            deleteJob={deleteJob}
                            changeFeatureStatus={changeFeatureStatus}
                        />
                    ))
                }
            </div>
        </div>
        <div className="ajl-normaljob-cont">
            {
                nJobs?.map((job,index)=>(
                    <AdminJobCard 
                        key={index} 
                        job={job} 
                        nav={nav}
                        isEditing={isEditing}
                        deleteJob={deleteJob}
                        changeFeatureStatus={changeFeatureStatus}
                    />
                ))
            }
        </div>
        <img src='coinBtm.png' alt='bottom' className='coin-btm'/>
    </div>
  )
}

export default JobListingAdmin