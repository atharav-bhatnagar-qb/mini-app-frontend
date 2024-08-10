import React, { useContext, useEffect, useState } from 'react'
import '../components/candidateApplications/candidateApplications.css'
import { LuArrowLeft } from "react-icons/lu";
import { TiStarOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { TonContext, baseURL } from '../utils/context';
import toast from 'react-hot-toast';
import axios from 'axios';

const can=[
    {
        name:"Atharav",
        email:"a@gmail.com",
        skills:["docker","kubernetes","mern","react native"],
        rating:3
    },
    {
        name:"Vaasu",
        email:"v@gmail.com",
        skills:["docker","kubernetes","mern","react native"],
        rating:5
    },    
]

const CandidateApplications = () => {
    const nav=useNavigate()
    const tonAuth=useContext(TonContext)
    const [applications,setApplications]=useState([])

    

    async function getApplications(){
        try{
            setApplications([])
            let apl=[]
            await axios.get(`${baseURL}/getApplications?jobID=${tonAuth?.job?.id}`).then(async(res)=>{
                console.log(res?.data)
                if(res?.data?.message=="applications found"){
                    // setApplications(res?.data?.applications)
                    console.log(res?.data?.applications)
                    let app=res?.data?.applications
                    for(let i=0;i<app?.length;i++){
                        await axios.get(`${baseURL}/getUser?wallet=${app[i].candidate}`).then((userRes)=>{
                            console.log(userRes?.data?.message,console.log(typeof userRes?.data?.message))
                            if((typeof userRes?.data?.message)=='string'){
                                return
                            }
                            apl.push({...app[i],candidateData:userRes?.data?.message})
                            // setApplications([...applications,{...app[i],candidateData:userRes?.data?.message}])
                            setApplications([...apl])
                            console.log(applications)
                        }).catch((err)=>console.log(err))
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
            // toast.error("something went wrong while fetching the applications!")
        }
    }

    useEffect(()=>{
        if(tonAuth?.user==undefined){
            nav('/')
        }
        getApplications()
    },[])

  return (
    <div className='page'>
        <img src="coinTop.png" alt="top" className="coin-top" />
        <LuArrowLeft className='back-icon' onClick={()=>nav('/jobListing')}/>
        <div className="can-app-cont">
            <h1 className="can-app-title">Candidate Applications</h1>
            <h3 className="can-app-title2">Job name : {tonAuth?.job?.title}</h3>
            <div className="can-app-list">
                {
                    applications.map((candidate,index)=>(
                        <div className="app-candidate-card" key={index} onClick={()=>{
                            tonAuth?.setCandidate(candidate)
                            nav('/candidateProfile')
                        }}>
                            <h1 className="app-candidate-name">
                                {candidate?.candidateData?.name}
                            </h1>
                            <div className="app-candidate-rating-cont">
                                {candidate?.rating+" "}
                                <TiStarOutline className='text-yellow-500 animate-pulse text-2xl'/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <img src="coinBtm.png" alt="btm" className="coin-btm" />
    </div>
  )
}

export default CandidateApplications