import React, { useContext, useEffect, useState } from 'react'
import { FiExternalLink } from "react-icons/fi";
import './jobListingMain.css'
import { TonContext, useTon } from '../../utils/context';
import toast from 'react-hot-toast';
import { useTonConnect } from '../../utils/useTonConnect';

const JobCard = ({jobItem,nav,data}) => {
  const tonAuth=useContext(TonContext)
  const {sender,network,connected,wallet}=useTonConnect()
  
  return (
    <div className='job-card-main' onClick={()=>{
        tonAuth?.setJob(data)
        nav('/jobDetail')
      }}>
       <div className="job-bounty-flag">
          <img src="fluent-emoji_coin.svg" alt="coin" />
          <h1 className="job-bounty-title"> $3500 Referral Bounty  </h1>
      </div>
      <div className="job-card-details">
      <div className="job-card-header">
        <img src={data?.profilePic} />
        <div className="job-card-name-cont no-scrollbar">
            <h1>{data?.jobProfile}</h1>
            <h2>{data?.companyName}</h2>
        </div>
      </div>

      <div className="job-card-body">
        <div className="job-card-body-item">
          <img src="mynaui_location.svg" alt="item" />
          <h1>{data?.extraDetails[0]}</h1>
        </div>
        <div className="job-card-body-item">
          <img src="ph_money-light.svg" alt="item" />
          <h1>{data?.extraDetails[1]}</h1>
        </div>
        <div className="job-card-body-item">
          <img src="ant-design_calendar-outlined.svg" alt="item" />
          <h1>{data?.extraDetails[2]}</h1>
        </div>
        <div className="job-card-body-item">
          <img src="ph_bag-simple-light.svg" alt="item" />
          <h1>{data?.extraDetails[3]}</h1>
        </div>
      </div>
      <div className="job-card-footer">
        <h1> 2 months ago </h1>
        <div className='job-card-footer-priority'>
            <img src='Vector.svg'/>
             <h1> High Priority</h1>
        </div>
        </div>
      </div>
    </div>
  )
}

export default JobCard