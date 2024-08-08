import React, { useContext } from 'react'
import { TonContext } from '../../utils/context'
import { AiFillDollarCircle } from 'react-icons/ai'
import { MdPeopleOutline } from 'react-icons/md'
import { GiReceiveMoney, GiTrophyCup } from 'react-icons/gi'
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";

const AdminJobCard = ({job,nav,isEditing,deleteJob,changeFeatureStatus}) => {

    const tonAuth=useContext(TonContext)

  return (
    <div className='ajl-job-card' onClick={()=>{
        // tonAuth?.setJob(job)
        // nav('/jobDetails')
    }}>
        <div className="ajc-bounty-cont">
            <AiFillDollarCircle className='ajc-bounty-icon'/>
            <p className="ajc-bounty-text"> $ {job?.bounty} bounty prize</p>
        </div>
        <div className="ajc-main-card">
            {
                !isEditing?
                <></>
                :
                !job?.isFeatured?
                <IoStarOutline className='ajc-feature-star' onClick={()=>{
                    changeFeatureStatus(job?.id,true)
                }}/>
                :
                <IoStarSharp className='ajc-feature-star' onClick={()=>{
                    changeFeatureStatus(job?.id,false)
                }}/>
            }
            <div className="ajc-m-header">
                <img src={job?.logo==undefined?"compLogo.png":job?.logo} alt="job card" className="ajc-main-img" />
                <div className="ajc-mh-textcont">
                    <h1 className="ajc-mh-post">{job?.title}</h1>
                    <p className="ajc-mh-name">{job?.company}</p>
                </div>
            </div>
            <div className="ajc-tag-cont">
                <div className="ajc-tag-item">
                    <MdPeopleOutline className='ajc-tag-icon'/>
                    <p className="ajc-tag-text">
                        0 Applicants
                    </p>
                </div>
                <div className="ajc-tag-item">
                    <GiTrophyCup className='ajc-tag-icon'/>
                    <p className="ajc-tag-text">
                        High Chance of Winning
                    </p>
                </div>
                <div className="ajc-tag-item">
                    <GiReceiveMoney className='ajc-tag-icon'/>
                    <p className="ajc-tag-text">
                        125% Return*
                    </p>
                </div>
            </div>
            {
                isEditing?
                <div className="ajc-btm-edit">
                    <p className="ajc-btm-edit-txt" onClick={()=>{
                        tonAuth?.setJob(job)
                        nav('/adminEditJob')
                    }}>Edit</p>
                    <RiDeleteBin6Line className='ajc-btm-delete' onClick={()=>deleteJob(job?.id)}/>
                </div>
                :
                <></>
            }
            
        </div>
    </div>
  )
}

export default AdminJobCard