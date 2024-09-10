import React, { useContext, useEffect, useState } from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import { LuUpload } from "react-icons/lu";
import '../components/referralList/referralList.css'
import { TonContext, baseURL } from '../utils/context';
import { useTonConnect } from '../utils/useTonConnect';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const referrals=[
    "https://coordinated-crazy.net",
    "https://coordinated-crazy.net",
    "https://coordinated-crazy.net"
]

const ReferralList = () => {
    const {wallet}=useTonConnect()
    const tonAuth=useContext(TonContext)
    const [refList,setRefList]=useState([])
    const nav=useNavigate()

    async function getLinks(){
        try{
            let linkRes=await axios.get(`${baseURL}/getActiveLinks?wallet=${wallet?.toString()}`)
            console.log(linkRes)
            if(linkRes?.data?.message!='links found'){
                console.log('err fetching link')
                return
            }
            setRefList(linkRes?.data?.links)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{

        if(tonAuth?.user==undefined){
            nav('/')
        }
          
        getLinks()
        console.log(wallet)
    },[])
    useEffect(()=>{
        console.log("reflist :",refList)
    },[refList])

  return (
    <div className='page'>
        <img src="coinTop.png" alt="coin top" className="coin-top" />
        <LuArrowLeft className='back-icon' onClick={()=>nav('/refApplications')}/>
        <div className="u-reflist-cont">
            <h1 className="u-reflist-title">Referral Info.</h1>
            <h3 className="u-reflist-smalltext">(Non Redeemed)</h3>
            {
                refList.map((jobLinks,index)=>(
                    <>
                    <h2 className="u-reflist-title2">Job name : {jobLinks[0]}</h2>
                    <div className="u-reflist">
                    {
                        jobLinks?.slice(1)?.map((ref,index)=>(
                            <div className="u-refitem" key={index}>
                                <p className="u-refitem-link">{ref?.link}</p>
                                <a href={ref?.link} target='blank'>
                                    <LuUpload className='u-refitem-icon'/>
                                </a>
                            </div>
                        ))
                    }
                    </div>
                    </>
                ))
                
            }
            
        </div>
        <img src="coinBtm.png" alt="coin bottom" className="coin-btm" />
    </div>
  )
}

export default ReferralList