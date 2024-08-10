import React, { useContext, useEffect, useState } from 'react'
import '../components/leaderboard/leaderboard.css'
import { useNavigate } from 'react-router-dom'
import { TonContext, baseURL } from '../utils/context'
import { IoArrowBack } from "react-icons/io5";
import { GoChevronRight } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
import axios from 'axios';
import { useTonConnect } from '../utils/useTonConnect';
import { FaRegUser } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Leaderboard = () => {
    const nav=useNavigate()
    const tonAuth=useContext(TonContext)
    const [leaderboard,setLeaderboard]=useState([])
    const [selfRank,setSelfRank]=useState({})
    const {wallet}=useTonConnect()

    async function getRankings(){
        try{
            let res=await axios.get(`${baseURL}/getLeaderboard?wallet=${wallet?.toString()}`)
            console.log(res)
            if(res?.data?.message!='users found'){
                setLeaderboard([])
                return
            }
            console.log(res?.data?.users?.sort((a,b)=>a?.rank>b?.rank?1:a?.rank<b?.rank?-1:0))
            setLeaderboard(res?.data?.users?.sort((a,b)=>a?.rank>b?.rank?1:a?.rank<b?.rank?-1:0))
            setSelfRank(res?.data?.self)
        }catch(err){
            console.log(err)
        }
    }

    const changeRankPage=(direction)=>{
        toast.error('No more pages to show ')
    }


    useEffect(()=>{
        if(tonAuth?.user==undefined){
            nav('/')
        }
        getRankings()
    },[])
    const arr=new Array(10).fill(1)

  return (
    <div className='leaderboard-page'>
        <img src="coinTop.png" alt="coin top" className="coin-top" />
        <div className="leaderboard-main-header">
            <IoArrowBack className='lm-back-icon' onClick={()=>{
                nav(-1)
            }}/>
            {
                tonAuth?.user?.isAdmin?
                <div className="lm-admin-btn" onClick={()=>{
                    nav('/adminHome')
                }}>
                    <FaRegUser className='lma-icon'/>
                    <p className="lma-name" >
                        Admin
                    </p>
                </div>
                :
                <></>
            }
                    </div>
        <div className="lm-cont">
            <div className="lmc-head">
                <GoChevronLeft className='lmc-head-icon' onClick={()=>changeRankPage(-1)}/>
                <p className="lmc-head-title">Top {10} this week</p>
                <GoChevronRight className='lmc-head-icon' onClick={()=>changeRankPage(1)}/>
            </div>
            {
                leaderboard?.map((el,ind)=>(
                    <>
                    <div className="lmc-item" key={ind}>
                        <p className="lmc-text">#{el?.rank}</p>
                        <p className="lmc-text">{el?.name}</p>
                        <p className="lmc-text2">{el?.referrals} referrals</p>
                    </div>
                    <div className="lmc-line"/>
                    </>
                ))
            }
        </div>
        {
            tonAuth?.user?.isAdmin?
            <></>
            :
            <p className="leaderboard-btm-text">
            {
                selfRank?.rank<=10?
                "You are in the top 10"
                :
                `${selfRank?.rank-10} more ranks to reach top 10`
            }
            </p>
        }
        
        <img src="coinBtm.png" alt="coin bottom" className="coin-btm" />
    </div>
  )
}

export default Leaderboard