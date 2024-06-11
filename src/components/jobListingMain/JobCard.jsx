import React, { useContext, useEffect, useState } from 'react'
import { FiExternalLink } from "react-icons/fi";
import './jobListingMain.css'
import { TonContext, useTon } from '../../utils/context';
import toast from 'react-hot-toast';
import { useTonConnect } from '../../utils/useTonConnect';

const JobCard = ({jobItem,nav}) => {
  const tonAuth=useContext(TonContext)
  const {sender,network,connected,wallet}=useTonConnect()
  
  return (
    <div className='job-card-main'>
        <p className="job-title-main">{jobItem?.name}</p>
        <FiExternalLink className='job-redirect' onClick={()=>{
            if(connected){
              console.log(jobItem)
              tonAuth.setJob(jobItem)
              nav('/jobDetail')
            }else{
              toast.error("Please connect your wallet to proceed further ! ")
            }
            console.log(sender,network,connected,wallet)
            
        }}/>
    </div>
  )
}

export default JobCard