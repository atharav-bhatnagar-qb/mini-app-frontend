import React from 'react'
import '../components/instructions/instructions.css'
import { LuArrowLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

const instructions=[
    "Connect your Ton wallet",
    "Signup as a user",
    "Select a job to generate referral",
    "Generate new Referral by depositing 1 Ton ",
    "Share the link to a candidate",
    "Candidate will receive a rating after applying for the job",
    "Your deposit will merge into the pool if candidate gets rating 3 or less",
    "Deposit will be returned by the end of the week on rating greater than 3",
    "Top 10 users with maximum referred candidates having rating 3 or more will receive rewards by the end of the week"
]

const Instructions = () => {
    const nav=useNavigate()
  return (
    <div className='page'>
        <img src="coinTop.png" alt="coin top" className="coin-top" />
        <LuArrowLeft className='back-icon' onClick={()=>nav('/profile')}/>
        <div className="instruction-cont">
            <h1 className="ins-title">INSTRUCTION :</h1>
            <ul className="ins-list">
                {
                    instructions.map((ins,index)=>(
                        <li key={index} className="ins-item">
                            {ins.toUpperCase()}
                        </li>
                    ))
                }
            </ul>
        </div>
        <img src="coinBtm.png" alt="coin bottom" className="coin-btm" />
    </div>
  )
}

export default Instructions