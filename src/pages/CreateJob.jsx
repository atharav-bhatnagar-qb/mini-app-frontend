import React, { useContext, useEffect, useState } from 'react'
import '../components/createJob/createJob.css'
import CreateJob1 from '../components/createJob/CreateJob1'
import CreateJob2 from '../components/createJob/CreateJob2'
import CreateJob3 from '../components/createJob/CreateJob3'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TonContext, baseURL } from '../utils/context'
import toast from 'react-hot-toast'
import ReactModal from 'react-modal'
import Loader from '../components/reusables/Loader'

const CreateJob = () => {
  const [loading,setLoading]=useState(false)
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
    jobReq:"",
    isFeatured:false
  })
  const nav=useNavigate()
  const tonAuth=useContext(TonContext)
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

  useEffect(()=>{
    if(tonAuth?.user==undefined || !tonAuth?.user?.isAdmin){
      nav('/')
    }
  },[])

  return (
    <div className='page'>
      <img src="coinTop.png" alt="coin top" className='coin-top' />
        {
          screen==1?
            <CreateJob1
              setScreen={setScreen}
              setNewJob={setNewJob}
              newJob={newJob}
              nav={nav}
              setLoading={setLoading}
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
        <ReactModal
          isOpen={loading}
          className='modal'
          ariaHideApp={false}
          style={{ 
              overlay: { backdropFilter: 'blur(3px)' , zIndex:50, backgroundColor:'rbg(0,0,0,0%)'}, 
          }}>
            <Loader/>
          </ReactModal> 
        <img src="coinBtm.png" alt="coin bottom" className="coin-btm" />
    </div>
  )
}

export default CreateJob