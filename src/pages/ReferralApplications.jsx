import React, { useContext, useEffect, useState } from 'react'
import { TonContext, baseURL } from '../utils/context'
import { useNavigate } from 'react-router-dom'
import { LuArrowLeft } from 'react-icons/lu'
import '../components/referralApplications/referralApplications.css'
import { useTonConnect } from '../utils/useTonConnect'
import axios from 'axios'
import { TiStarOutline } from 'react-icons/ti'

const ReferralApplications = () => {
    const {wallet}=useTonConnect()
    const nav=useNavigate()
    const tonAuth=useContext(TonContext)
    const [refList,setRefList]=useState([])

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

    useEffect(()=>{

        if(tonAuth?.user==undefined){
            nav('/')
        }
          
        getCandidates()
    },[])

  return (
    <div className='page'>
        <img src="coinTop.png" alt="coin top" className="coin-top" />
        <LuArrowLeft className='back-icon' onClick={()=>nav('/profile')}/>
        <div className="ref-app-info-main-cont">
            <h1 className="rai-title">Referral Info.</h1>
            
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