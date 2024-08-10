import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TonContext, baseURL } from '../utils/context'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import EditJob1 from '../components/editJob/EditJob1'
import EditJob2 from '../components/editJob/EditJob2'
import EditJob3 from '../components/editJob/EditJob3'
import ReactModal from 'react-modal'
import Loader from '../components/reusables/Loader'

const EditJob = () => {

    const tonAuth=useContext(TonContext)

    const [newJob,setNewJob]=useState(tonAuth?.job)
    const [loading,setLoading]=useState(false)
    const [screen,setScreen]=useState(1)
    const nav=useNavigate()

    useEffect(()=>{
      if(tonAuth?.user==undefined || !tonAuth?.user?.isAdmin){
          nav('/')
      }
    },[])

    async function editJob(){
        try{
          await axios.patch(`${baseURL}/updateJob`,newJob).then((res)=>{
              console.log(res)
              if(res?.data?.message=="job updated successfully"){
                  toast.success(res?.data?.message)
                  nav('/adminJobListings')
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
      <img src="coinTop.png" alt="coin top" className='coin-top' />
        {
          screen==1?
            <EditJob1
              setScreen={setScreen}
              setNewJob={setNewJob}
              newJob={newJob}
              nav={nav}
              setLoading={setLoading}
            />
          :
          screen==2?
            <EditJob2
              setNewJob={setNewJob}
              newJob={newJob}
              setScreen={setScreen}
              nav={nav}
            />
          :
            <EditJob3 
              setScreen={setScreen}
              setNewJob={setNewJob}
              newJob={newJob}
              editJob={editJob}
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

export default EditJob