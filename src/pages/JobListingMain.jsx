import React, { useContext, useEffect } from 'react'
import { TonContext, useTon } from '../utils/context'
import toast from 'react-hot-toast'
import '../components/jobListingMain/jobListingMain.css'
import { bounties } from '../utils/sampledata'
import JobCard from '../components/jobListingMain/JobCard'
import { useNavigate } from 'react-router-dom'
import { TonConnectButton } from '@tonconnect/ui-react'

const JobListingMain = () => {

  const nav=useNavigate()
  const tonAuth=useContext(TonContext)



  return (
    <div className='page'>
      <div className="main-cont">
        <TonConnectButton/>
        {/* <button 
          onClick={()=>{
            tonAuth.setIsConnected(!tonAuth.isConnected)
            if(tonAuth?.isConnected){
              toast.success(`Wallet disconnected successfully!`)
            }else{
              toast.success(`Wallet connected successfully!`)
            }
          }}
          className="main-connect-btn">
            {
              tonAuth.isConnected?
              "Disconnect"
              :
              "Connect"
            }
        </button> */}
        <div className="main-job-list">
          <h1 className="main-job-list-title">
            Job Listings
          </h1>
          {
            bounties.map((bounty,index)=>(
              <JobCard key={index} jobItem={bounty} nav={nav}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default JobListingMain