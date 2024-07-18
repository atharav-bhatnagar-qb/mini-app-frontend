import React, { useContext } from 'react'
import '../components/adminHome/adminHome.css'
import { useNavigate } from 'react-router-dom'
import { TonContext, useTon } from '../utils/context'
import { useTonConnectUI } from '@tonconnect/ui-react'

const top=[
    {
        name:"Name",
        ref:15
    },
    {
        name:"Name",
        ref:15
    },
    {
        name:"Name",
        ref:15
    }
]
const referrals=[
    {
        name:"Imnop",
        rating:3,
        by:"abcd"
    },
    {
        name:"Imnop",
        rating:3,
        by:"abcd"
    }
]
const AdminHome = () => {

    const nav=useNavigate()
    const tonAuth=useContext(TonContext)
    console.log("tonauth",tonAuth?.user)
    const [tonConnectUI]=useTonConnectUI()


  return (
    <div className='page'>
        <img src='coinTop.png' alt='top' className='coin-top'/>
        <div className="ah-header">
            <h1 className="ah-welcome">Welcome Admin,</h1>
            <button className="ah-logout" onClick={async()=>{
                await tonConnectUI.disconnect()
                nav('/')
            }}>Logout</button>
        </div>
        <div className="hr1"></div>
        <button className="ah-cj-btn" onClick={()=>nav('/createJob')}>
            CREATE NEW JOB
        </button>
        <div className="ah-bounty-card">
            <div className="ah-bc-grad"/>
            <img src="coin1.png" alt="dollar" className="ah-bounty-img" />
            <div className="ah-bc-text-cont">
                <h3 className="ah-bc-title">
                    500 Bounty in pool
                </h3>
                <p className="ah-bc-link">
                    View details
                </p>
            </div>
        </div>
        <div className="ah-table-cont">
            <div className="ah-table-header">
                <h3 className="ah-table-title">
                    TOP 3 This week
                </h3>
                <p className="ah-table-link">
                    View Details
                </p>
            </div>
            {
                top.map((t,index)=>{
                    if((index+1)==top.length){
                        return(
                            <div className="ah-table-row" key={index}>
                                <p className="ah-row-text">
                                    #{index+1}
                                </p>
                                <p className="ah-row-text">
                                    {t?.name}
                                </p>
                                <p className="ah-row-ref">
                                    {t?.ref + " Referral"} 
                                </p>
                            </div>
                        )
                    }else{
                        return(
                            <>
                                <div className="ah-table-row" key={index}>
                                    <p className="ah-row-text">
                                        #{index+1}
                                    </p>
                                    <p className="ah-row-text">
                                        {t?.name}
                                    </p>
                                    <p className="ah-row-ref">
                                        {t?.ref + " Referral"} 
                                    </p>
                                </div>
                                <div className="ah-table-hr"/>
                            </>
                        )
                    }
                })
            }
        </div>
        <div className="ah-table-cont">
            <div className="ah-table-header">
                <h3 className="ah-table-title">
                    Referrals
                </h3>
                <p className="ah-table-link">
                    View More
                </p>
            </div>
            <div className="ah-table-row">
                <p className="ah-row-text">Name</p>
                <p className="ah-row-text">Rating</p>
                <p className="ah-row-text">Referred by</p>
            </div>
            <div className="ah-table-hr"/>
            {
                referrals?.map((ref,index)=>(
                    <>
                        <div className="ah-table-row" key={index}>
                            <p className="ah-row-text">
                                {ref?.name}
                            </p>
                            <p className="ah-row-text">
                                {ref?.rating}
                            </p>
                            <p className="ah-row-text">
                                {ref?.by}
                            </p>
                        </div>
                        <div className="ah-table-hr"/>
                    </>
                ))
            }
        </div>
        <button className="ah-vj-btn" onClick={()=>nav('/jobListing')}>
            VIEW JOBS
        </button>
        <img src='coinBtm.png' alt='top' className='coin-btm'/>
    </div>
  )
}

export default AdminHome