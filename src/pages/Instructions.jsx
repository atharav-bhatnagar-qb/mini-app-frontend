import React from 'react'
import '../components/instructions/instructions.css'
import { LuArrowLeft } from 'react-icons/lu'

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

const Instructions = () => {
  return (
    <div className='page'>
        <LuArrowLeft className='back-icon'/>
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
    </div>
  )
}

export default Instructions