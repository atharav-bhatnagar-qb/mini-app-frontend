import React from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import CreatePageIndicator from './CreatePageIndicator'

const CreateJob3 = ({setScreen,setNewJob,newJob,createNewJob,nav}) => {

    
  return (
    <div className='create-job-cont' >
        <div className="create-job-header2">
            <LuArrowLeft className='create-job-back-icon2'onClick={()=>setScreen(2)}/>
            <h1 className="create-job-title">
                More Details
            </h1>
        </div>
        <CreatePageIndicator page={3}/>
        <div className="cj3-form">
            <div className="cj3-item">
                <p className="cj3-label">
                    Candidate requirements
                </p>
                <textarea onChange={(e)=>setNewJob({...newJob,candidateReq:e.target.value})} rows={4} className="cj3-inp"/>
            </div>
            <div className="cj3-item">
                <p className="cj3-label">
                    Job requirements
                </p>
                <textarea onChange={(e)=>setNewJob({...newJob,jobReq:e.target.value})} rows={4}  className="cj3-inp"/>
            </div>
        </div>
        <button className="create-job-submit-btn" onClick={()=>{
            console.log(newJob)
            // setScreen(1)
            createNewJob()
        }}>
            CREATE JOB LISTING
        </button>
    </div>
  )
}

export default CreateJob3