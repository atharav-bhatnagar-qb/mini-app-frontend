import React, { useState } from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import CreatePageIndicator from './CreatePageIndicator'
import { PiPlusCircleFill } from "react-icons/pi";

const CreateJob2 = ({setScreen,setNewJob,newJob,nav}) => {

  const [skills,setSkills]=useState(newJob.skills)
  const [tags,setTags]=useState(newJob.tags)

  const updateSkills=()=>{
    const skillInp=document.getElementsByClassName('cj2-skill-inp')[0]
    let skill=skillInp.value
    console.log(skill)
    if(skill.replace(/[ ]+/g, "")==""){
      return
    }
    skillInp.value=""
    setSkills(s=>[...s,skill])
    setNewJob({...newJob,skills:[...skills,skill]})
  }

  const updateTags=()=>{
    const tagInp=document.getElementsByClassName('cj2-tag-inp')[0]
    let tag=tagInp.value
    if(tag.replace(/[ ]+/g, "")==""){
      return
    }
    console.log(tag)
    tagInp.value=""
    setTags(t=>[...t,tag])
    setNewJob({...newJob,tags:[...tags,tag]})
  }

  return (
    <div className='create-job-cont' >
        <div className="create-job-header1">
            <LuArrowLeft className='create-job-back-icon1' onClick={()=>setScreen(1)}/>
            <h1 className="create-job-title">List Job</h1>
        </div>
        <CreatePageIndicator page={2}/>
        <div className="cj2-form-cont">
            <div className="cj2-form-item">
              <p className="cj-form-item-label">
                Skills Required
              </p>
              <div className="cj2-skill-inp-cont">
                <input type="text" className="cj2-skill-inp" />
                <PiPlusCircleFill onClick={updateSkills} className='cj2-skill-add-btn'/>
              </div>
              <div className="cj2-skill-cont">
                {
                  skills.map((skill,index)=>(
                    <p className="cj2-skill-item" key={index}>
                      {skill}
                    </p>
                  ))
                }
              </div>
            </div>
            <div className="cj2-form-item">
              <p className="cj-form-item-label">
                Tags
              </p>
              <div className="cj2-tag-inp-cont">
                <input type="text" className="cj2-tag-inp" />
                <PiPlusCircleFill onClick={updateTags} className='cj2-tag-add-btn'/>
              </div>
              <div className="cj2-tag-cont">
                {
                  tags.map((tag,index)=>(
                    <p className="cj2-tag-item" key={index}>{tag}</p>
                  ))
                }
              </div>
            </div>
            <div className="cj2-form-item">
              <p className="cj-form-item-label">
                About Company
              </p>
              <textarea value={newJob.aboutCompany} onChange={(e)=>setNewJob({...newJob,aboutCompany:e.target.value})}  rows={4} className="cj2-big-inp"/>
            </div>
            <button className="create-job-submit-btn" onClick={()=>setScreen(3)}>
                ADD MORE DETAILS
            </button>
        </div>
    </div>
  )
}

export default CreateJob2