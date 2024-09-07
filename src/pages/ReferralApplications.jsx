import React, { useContext, useEffect, useState } from 'react'
import { TonContext, baseURL } from '../utils/context'
import { useNavigate } from 'react-router-dom'
import { LuArrowLeft } from 'react-icons/lu'
import '../components/referralApplications/referralApplications.css'
import { useTonConnect } from '../utils/useTonConnect'
import axios from 'axios'
import { TiStarOutline } from 'react-icons/ti'
import { useBondexContract } from '../utils/useBondexContract'
import { toNano } from 'ton-core'
import toast from 'react-hot-toast'

const ReferralApplications = () => {
    const {wallet}=useTonConnect()
    const nav=useNavigate()
    const tonAuth=useContext(TonContext)
    const [refList,setRefList]=useState([])
    const [bounty,setBounty]=useState(0)
    const {returnFee}=useBondexContract()

    async function getCandidates(){
        try{
            let resp=await axios.get(`${baseURL}/getRefApplications?wallet=${wallet?.toString()}`)
            console.log(resp?.data)
            if(resp?.data?.message!='candidates found'){
                console.log('err fetching candidates')
                return
            }
            setRefList(resp?.data?.candidates)
        }catch(err){
            console.log(err)
        }
    }
    async function getCurrentBounty(){
        try {
            let resp=await axios.get(`${baseURL}/getBounties?wallet=${wallet?.toString()}`)
            console.log(resp?.data)
            if(resp?.data?.message=='Something went wrong'){
                console.log('err fetching current bounty')
                return
            }
            setBounty(resp?.data?.count)
        } catch (err) {
            console.log(err)
        }
    }
    async function removeCurrentBounty(){
        try {
            let resp=await axios.patch(`${baseURL}/removeBounty?wallet=${wallet?.toString()}`)
            console.log(resp?.data)
            if(resp?.data?.message=='Something went wrong'){
                console.log('err fetching current bounty')
                return
            }
            toast.success("Please complete transaction to redeem bounty")
            setBounty(0)
        } catch (err) {
            setBounty(0)
            console.log(err)
        }
    }

    useEffect(()=>{

        if(tonAuth?.user==undefined){
            nav('/')
        }
          
        getCandidates()
        getCurrentBounty()
    },[])

  return (
    <div className='page'>
        <img src="coinTop.png" alt="coin top" className="coin-top" />
        <LuArrowLeft className='back-icon' onClick={()=>nav('/profile')}/>
        <div className="ref-app-info-main-cont">
            <h1 className="rai-title">Referral Info.</h1>
            {
                bounty>0?
                <p className="rai-bounty-count" onClick={async()=>{
                    removeCurrentBounty()
                    returnFee(toNano(bounty),wallet)
                }}>
                    Redeem All {` ${bounty} `} Ton
                </p>
                :
                <></>
            }
            
            {
                refList?.map((ref,index)=>(
                    <div className="rai-job-ref-cont" key={index} >
                        <h1 className="rai-job-ref-title">Job name : {ref[0]}</h1>
                        {
                            ref?.slice(1)?.map((candidate,index2)=>(
                                <div className="rai-candidate-card" style={{borderColor:(candidate?.rating>3)?'green':'red'}} onClick={()=>{
                                    tonAuth?.setCandidate(candidate)
                                    nav('/candidateProfile')
                                }}>
                                    <h1 className="rai-candidate-name">
                                        {candidate?.candidateData?.name}
                                    </h1>
                                    <div className="rai-candidate-rating-cont">
                                        {candidate?.rating+" "}
                                        <TiStarOutline className='text-yellow-500 animate-pulse text-2xl'/>
                                    </div>
                                </div>
                            ))
                            
                        }
                    </div>
                ))
            }
            
            <p className="rai-non-link" onClick={()=>nav('/userActiveRef')}>Non-Redeemed</p>
        </div>
        <img src="coinBtm.png" alt="coin bottom" className="coin-btm" />
    </div>
  )
}

export default ReferralApplications