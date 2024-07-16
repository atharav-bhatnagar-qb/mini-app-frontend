import React, { useState } from 'react'
import '../components/createJob/createJob.css'
import CreateJob1 from '../components/createJob/CreateJob1'
import CreateJob2 from '../components/createJob/CreateJob2'
import CreateJob3 from '../components/createJob/CreateJob3'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../utils/context'
import toast from 'react-hot-toast'

const CreateJob = () => {
  const [screen,setScreen]=useState(1)
  const [newJob,setNewJob]=useState({
    title:"",
    company:"",
    bounty:"",
    jobDetail:"",
    logo:"",
    skills:[],
    tags:[],
    aboutCompany:"",
    candidateReq:"",
    jobReq:""
  })
  const nav=useNavigate()
  async function createNewJob(){
    try{
      await axios.post(`${baseURL}/createJobs`,newJob).then((res)=>{
          console.log(res)
          if(res?.data?.message=="Job created succesfully"){
              toast.success("Your job is created!")
              nav('/adminHome')
          }else{
              toast.error(res?.data?.message)
          }
      }).catch((err)=>{
          console.log(err)
      })
    }catch(err){
      console.log(err)
      toast.error("something went wrong")
    }
  }
  return (
    <div className='page'>
        {
          screen==1?
            <CreateJob1
              setScreen={setScreen}
              setNewJob={setNewJob}
              newJob={newJob}
              nav={nav}
            />
          :
          screen==2?
            <CreateJob2
              setNewJob={setNewJob}
              newJob={newJob}
              setScreen={setScreen}
              nav={nav}
            />
          :
            <CreateJob3 
              setScreen={setScreen}
              setNewJob={setNewJob}
              newJob={newJob}
              createNewJob={createNewJob}
              nav={nav}
            />
        }
    </div>
  )
}

export default CreateJob