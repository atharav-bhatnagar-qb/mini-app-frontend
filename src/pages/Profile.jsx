import React, { useContext, useEffect, useState } from 'react'
import '../components/profile/profile.css'
import { LuArrowLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { CiEdit } from "react-icons/ci";
import ReactModal from 'react-modal';
import UpdateProfile from '../components/profile/UpdateProfile';
import { TonContext, baseURL } from '../utils/context';
import { useTonConnect } from '../utils/useTonConnect';
import { useTonConnectUI } from '@tonconnect/ui-react';
import Loader from '../components/reusables/Loader';
import axios from 'axios';


const Profile = () => {

  const [updateModal,showUpdateModal]=useState(false)
  const [loading,setLoading]=useState(false)
  const nav=useNavigate()
  const {wallet}=useTonConnect()
  const tonAuth=useContext(TonContext)
  const [tonConnectUI]=useTonConnectUI()
  const links=[
    {
      img:"profileSec1.png",
      text:"Rank Board",
      onclick:()=>nav('/')
    },
    {
      img:"profileSec2.png",
      text:"Bounties Earned",
      onclick:()=>nav('/')
    },
    {
      img:"profileSec3.png",
      text:"Referral information ",
      onclick:()=>nav('/refApplications')
    },
    {
      img:"profileSec4.png",
      text:"Rules",
      onclick:()=>nav('/instructions')
    },
    {
      img:"profileSec5.png",
      text:"Logout",
      onclick:async()=>{
        await tonConnectUI.disconnect()
        nav('/')
      }
    }
  ]

  async function getUserDetails(){
    try{
        console.log("get user running")
        await axios.get(`${baseURL}/getUser?wallet=${wallet?.toString()}`).then((res)=>{
            console.log(res)
            if(typeof res?.data?.message=='string') return
            tonAuth?.setUser(res?.data?.message)  
          }).catch((err)=>{
            console.log(err)
          })
    }catch(err){
        console.log(err)
    }
}
  useEffect(()=>{
    getUserDetails()
  },[])

  return (
    <div className='page'>
      <LuArrowLeft className='back-icon' onClick={()=>nav('/jobListing')}/>
      <img src="coinTop.png" alt="coin top" className="coin-top" />
      <div className="user-profile-main-cont">
        <CiEdit className='up-edit-btn' onClick={()=>{
          showUpdateModal(true)
          console.log(updateModal)
          
        }}/>
        <div className="up-user-img-cont">
          <img src={tonAuth?.user?.profile||"sampleUser.jpg"} alt="user profile" className="up-user-img" />
          <p className="up-user-rank-text">
            #{tonAuth?.user?.rank}
          </p>
        </div>
        <div className="up-text-cont">
          <h1 className="up-name">{tonAuth?.user?.name}</h1>
          <p className="up-text-normal italic">
            {/* Cecil.Rodriguez12@yahoo.com */}
            {tonAuth?.user?.email}
          </p>
          <p className="up-text-normal">
            {/* Wallet No.-5848928598295489222 */}
            Wallet No.- {wallet?.toString()?.substring(0,20)+"..."}
          </p>
        </div>
        <div className="up-links-cont">
          {
            links?.map((link,index)=>(
              <div className="up-link-item" key={index} onClick={()=>link?.onclick()}>
                <img src={link?.img} alt="link" className={index==2?"up-link-item-img2":"up-link-item-img"} />
                <p className="up-link-item-text">{link?.text}</p>
              </div>
            ))
          }
        </div>
      </div>
      <ReactModal
          isOpen={updateModal}
          className='modal'
          ariaHideApp={false}
          style={{ 
              overlay: { backdropFilter: 'blur(3px)' , zIndex:50, backgroundColor:'rbg(0,0,0,0%)'}, 
          }}>
            <UpdateProfile getUserDetails={getUserDetails} showUpdateModal={showUpdateModal} setLoading={setLoading}/>
      </ReactModal>
      <ReactModal
          isOpen={loading}
          className='modal'
          ariaHideApp={false}
          style={{ 
              overlay: { backdropFilter: 'blur(3px)' , zIndex:60, backgroundColor:'rbg(0,0,0,0%)'}, 
          }}>
            <Loader/>
          </ReactModal> 
      <img src="coinBtm.png" alt="coin bottom" className="coin-btm" />
    </div>
  )
}

export default Profile