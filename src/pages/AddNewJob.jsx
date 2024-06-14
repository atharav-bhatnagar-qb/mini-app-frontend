import React, { useState } from 'react'
import '../components/addNewJob/addNewJob.css'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../utils/context'
import toast from 'react-hot-toast/headless'

const AddNewJob = () => {
    const [jobDetails,setJobDetails]=useState({})
    const nav=useNavigate()

    async function createJob(){

        console.log("creating job")
        if(
            jobDetails?.des==undefined || jobDetails?.des=="" ||
            jobDetails?.name==undefined || jobDetails?.name=="" ||
            jobDetails?.bounty==undefined || jobDetails?.bounty==""
        ){
            console.log(jobDetails)
            return
        };

        await axios.post(`${baseURL}/createJobs`,{
            bounty:parseInt(jobDetails?.bounty),
            name:jobDetails?.name,
            des:jobDetails?.des
        }).then((res)=>{
            console.log(res)
            if(res?.data?.message=="Job created succesfully"){
                toast.success("Your job is created!")
                nav('/')
            }else{
                toast.error(res?.data?.message)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div className='page'>
        <div className="addjob-cont">
        <IoMdArrowBack className='back-icon' onClick={()=>{
          nav('/')
        }}/>
            <h1 className="addjob-title">
                List your job
            </h1>
            <div className="addjob-form-cont">
                <input 
                    type="text" 
                    required
                    className="addjob-inp"
                    placeholder='Job title'
                    onChange={(e)=>{
                        setJobDetails({...jobDetails,name:e.target.value})
                    }}
                />
                <input 
                    type="number" 
                    required
                    className="addjob-inp" 
                    placeholder='Enter bounty prize in dollars'
                    multiple
                    onChange={(e)=>{
                        setJobDetails({...jobDetails,bounty:e.target.value})
                    }}
                />
                <textarea 
                    type="text" 
                    className="addjob-large-inp" 
                    placeholder='Add a description'
                    rows={5}
                    onChange={(e)=>{
                        setJobDetails({...jobDetails,des:e.target.value})
                    }}
                />
                <button className="addjob-submit-btn" onClick={createJob}>
                    Create Job Listing
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddNewJob