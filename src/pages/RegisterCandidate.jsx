import React, { useState } from 'react'
import '../components/registerCandidate/registerCandidate.css'
import { useNavigate } from 'react-router-dom'

const RegisterCandidate = () => {
  const skillCount=[1,2,3,4]
  const [skillNum,setSkillNum]=useState(1)
  const nav=useNavigate()

  return (
    <div className='page'>
      <div className="register-cont">
        <h1 className="register-title">Register</h1>
        <div className="register-form-cont">
          <input 
            type="text" 
            className="register-name-inp" 
            placeholder='Candidate Name'
          />
          <input 
            type="email" 
            className="register-email-inp" 
            placeholder='Candidate Email' 
          />
          <div className="register-skill-cont">
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
          </div>
        </div>
        <button className="register-apply-btn" onClick={()=>{
          nav('/JobApplication')
        }}>Apply for the job</button>
      </div>
    </div>
  )
}

export default RegisterCandidate