import React, { useContext } from 'react'
import { AiFillDollarCircle } from "react-icons/ai";
import { MdPeopleOutline } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { TonContext } from '../../utils/context';

const JobCard = ({job,nav}) => {

    const tonAuth=useContext(TonContext)

  return (
    <div className='jl-job-card' onClick={()=>{
        tonAuth?.setJob(job)
        nav('/jobDetails')
    }}>
        <div className="jc-bounty-cont">
            <AiFillDollarCircle className='jc-bounty-icon'/>
            <p className="jc-bounty-text"> $ {job?.bounty} bounty prize</p>
        </div>
        <div className="jc-main-card">
            <div className="jc-m-header">
                <img src={job?.logo==undefined?"compLogo.png":job?.logo} alt="job card" className="jc-main-img" />
                <div className="jc-mh-textcont">
                    <h1 className="jc-mh-post">{job?.title}</h1>
                    <p className="jc-mh-name">{job?.company}</p>
                </div>
            </div>
            <div className="jc-tag-cont">
                <div className="jc-tag-item">
                    <MdPeopleOutline className='jc-tag-icon'/>
                    <p className="jc-tag-text">
                        0 Applicants
                    </p>
                </div>
                <div className="jc-tag-item">
                    <GiTrophyCup className='jc-tag-icon'/>
                    <p className="jc-tag-text">
                        High Chance of Winning
                    </p>
                </div>
                <div className="jc-tag-item">
                    <GiReceiveMoney className='jc-tag-icon'/>
                    <p className="jc-tag-text">
                        125% Return*
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default JobCard