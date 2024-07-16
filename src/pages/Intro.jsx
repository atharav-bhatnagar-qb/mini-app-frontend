import React, { useContext, useEffect } from 'react'
import '../components/intro/intro.css'
import {toast} from 'react-hot-toast'
import { TonConnectButton, TonConnectUI, useTonConnectModal, useTonConnectUI } from '@tonconnect/ui-react'
import { TonContext, baseURL, useTon } from '../utils/context'
import { useTonConnect } from '../utils/useTonConnect'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const instructions=[
    "Connect your Ton wallet",
    "Signup as a user",
    "Select a job to generate referral",
    "Generate new Referral by depositing 10 Ton stars",
    "Share the link to a candidate",
    "Candidate will receive a rating after applying for the job",
    "Your deposit will merge into the pool if candidate gets rating 3 or less",
    "Deposit will be returned by the end of the week on rating greater than 3",
    "Top 10 users with maximum referred candidates having rating 3 or more will receive 10 extra ton stars by the end of the week"
]

const Intro = () => {
    const {state,open, close}=useTonConnectModal()
    const tonAuth=useContext(TonContext)
    const {connected, wallet}=useTonConnect()
    const [tonConnectUI]=useTonConnectUI()
    const nav=useNavigate()

    async function getUserDetails(){
        try{
            console.log("get user running")
            await axios.get(`${baseURL}/getUser?wallet=${wallet.toString()}`).then((res)=>{
                console.log(res)
                if(res?.data?.message=="no user exists with this walletid"){
                  console.log("need to register")
                  nav('/register')
                }else{
                  tonAuth?.setUser(res?.data?.message)
                  if(res?.data?.message?.isAdmin){
                    nav('/adminHome')
                  }else{
                    nav('/jobListing')
                  }
                  toast.success(`Welcome back ${res?.data?.message?.name} !`)
                }
              }).catch((err)=>{
                console.log(err)
              })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        if(connected){
            getUserDetails()
        }
        console.log("connected : ",connected)
    },[connected])
  return (
    <div className='intro-pg'>
        <img src='coinTop.png' className='intro-coins-top'/>
        <div className="intro-head">
            <div className="intro-title">
                <div className='intro-title1'>
                    UNL
                    <img src="coin1.png" alt="coin" className="intro-title-coin" />
                    CK
                </div> EARNINGS
            </div>
            <h4 className="intro-subtitle">
            Refer Job Opportunities!
            </h4>
        </div>
        <div className="intro-ins-cont">
            <h1 className="intro-ins-title">INSTRUCTION :</h1>
            <ul className="intro-ins-list">
                {
                    instructions.map((ins,index)=>(
                        <li key={index} className="intro-ins-item">
                            {ins.toUpperCase()}
                        </li>
                    ))
                }
            </ul>
        </div>
        {/* <TonConnectButton id='ton-btn'/> */}

        <div className="intro-bottom-cont">
            <button className="intro-connect-btn" 
            // onClick={()=>{
            //     document.getElementById('TonConnectButton').click()
            // }}
            onClick={open}
            >
                {
                    connected?
                    "DISCONNECT WALLET"
                    :
                    "CONNECT WALLET"
                }
            </button>
            <p className="intro-jobs-btn" onClick={()=>toast.error("Please connect your wallet first")}>
                View jobs
            </p>
        </div>
        <img src='coinBtm.png' className='intro-coins-btm'/>
    </div>
  )
}

export default Intro