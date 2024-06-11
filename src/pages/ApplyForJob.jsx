import React, { useState } from 'react'
import '../components/applyForJob/applyForJob.css'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../utils/context'
import { useTonConnect } from '../utils/useTonConnect'
import { IoMdArrowBack } from 'react-icons/io'
import axios from 'axios'
import toast from 'react-hot-toast'

const ApplyForJob = () => {
    const skillCount=[1,2,3,4]
    const [skillNum,setSkillNum]=useState(1)
    const [referral,setReferral]=useState("")
    const nav=useNavigate()
    const {wallet}=useTonConnect()

    async function applyForJob(){
        const jobId=referral.split("job")[1]??""
        let skills=[]
        for(let i=0;i<skillNum;i++){
            const el=document.querySelector(`#sk${i}`).value
            skills.push(el)
        }
        console.log(jobId,skills)
        await axios.post(`${baseURL}/createApplication`,{
            candidate:wallet.toString(),
            skills:skills,
            jobId:jobId
        }).then((res)=>{
            console.log(res?.data)
            if(res?.data?.success==true){
                toast.success(res?.data?.message)
                nav('/')
            }else{
                toast.error(res?.data?.message)
            }
        }).catch((err)=>{
            console.log(err)
            toast.error("Some error occured while applying")
        })
    }

  return (
    <div className="page">
        <div className="apply-cont">
        <IoMdArrowBack className='back-icon' onClick={()=>{
          nav('/')
        }}/>
            <h1 className="apply-title">Application</h1>
            <h2 className="apply-ref-title">Enter referral : </h2>
            <input 
                type="text" 
                id="ref"
                className="apply-ref-inp"
                value={referral}
                onChange={(e)=>setReferral(e.target.value)}
                required
            />
            <div className="apply-skill-cont">
            <div className="skill-num-cont">
              <h3 className="skill-num-cont-title">
                Number of skills
              </h3>
              <select 
                className="skill-num-dropdown" 
                onChange={(e)=>setSkillNum(parseInt(e.target.value))}
                value={skillNum}
              >
                {
                  skillCount.map((num,index)=>(
                    <option 
                      className='skill-num-op' 
                      value={num}
                      key={index}
                    >
                        {num}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="apply-skill-list-cont">
              {
                new Array(skillNum).fill(1).map((one,index)=>(
                  <input 
                    required
                    type="text" 
                    id={`sk${index}`}
                    className="apply-skill-item" 
                    placeholder={`Skill ${index+1}`}
                    key={index}
                  />
                ))
              }
            </div>
          </div>
          <button className='apply-apply-btn' onClick={applyForJob}>
            Apply for job
          </button>
        </div>
    </div>
  )
}

export default ApplyForJob