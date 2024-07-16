import React from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import { LuUpload } from "react-icons/lu";
import '../components/referralList/referralList.css'

const referrals=[
    "https://coordinated-crazy.net",
    "https://coordinated-crazy.net",
    "https://coordinated-crazy.net"
]

const ReferralList = () => {
  return (
    <div className='page'>
        <LuArrowLeft className='back-icon'/>
        <div className="u-reflist-cont">
            <h1 className="u-reflist-title">Referral Info.</h1>
            <h3 className="u-reflist-smalltext">(Non Redeemed)</h3>
            <h2 className="u-reflist-title2">Job name : job profile</h2>
            <div className="u-reflist">
                {
                    referrals?.map((ref,index)=>(
                        <div className="u-refitem" key={index}>
                            <p className="u-refitem-link">{ref}</p>
                            <LuUpload className='u-refitem-icon'/>
                        </div>
                    ))
                }

            </div>
        </div>
    </div>
  )
}

export default ReferralList