import React, { useState } from 'react'
import '../components/registerCandidate/registerCandidate.css'
import { useNavigate } from 'react-router-dom'
import { baseURL, useTon } from '../utils/context'
import { useTonConnect } from '../utils/useTonConnect'
import toast from 'react-hot-toast'
import axios from 'axios'

const RegisterCandidate = () => {
  const skillCount=[1,2,3,4]
  const [skillNum,setSkillNum]=useState(1)
  const nav=useNavigate()
  const {wallet}=useTonConnect()
  const {tonAuth}=useTon()

  async function registerUser(){
    const name=document.querySelector('#name').value 
    const email=document.querySelector('#email').value

    console.log(name,email,wallet)

    const newUserObj={
      name:name,
      email:email,
      walletId:wallet
    }

    await axios.post(`${baseURL}/createUser`,{user:wallet,name,email}).then((res)=>{
      console.log(res?.data)
        if(res?.data?.message=="User created successfully"){
          console.log("user created")
          tonAuth?.setUser(newUserObj)
          nav('/')
        }else if(res?.data?.message == "user already exists"){
          toast.error(res?.data?.message)
          nav('/')
        }else{
          toast.error(res?.data?.message)
        }
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className='page'>
      <div className="register-cont">
        <h1 className="register-title">Register</h1>
        <div className="register-form-cont">
          <input 
            type="text" 
            className="register-name-inp" 
            id="name"
            placeholder='Candidate Name'
          />
          <input 
            type="email" 
            id="email"
            className="register-email-inp" 
            placeholder='Candidate Email' 
          />
          {/* <div className="register-skill-cont">
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
            <div className="register-skill-list-cont">
              {
                new Array(skillNum).fill(1).map((one,index)=>(
                  <input 
                    type="text" 
                    className="register-skill-item" 
                    placeholder={`Skill ${index+1}`}
                    key={index}
                  />
                ))
              }
            </div>
          </div>*/}
        </div> 
        <button className="register-apply-btn" onClick={registerUser}>
          Register User
        </button>
      </div>
    </div>
  )
}

export default RegisterCandidate