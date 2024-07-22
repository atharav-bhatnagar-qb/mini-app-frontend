import React from 'react'
import '../components/profile/profile.css'
import { LuArrowLeft } from 'react-icons/lu'

const links=[
  {
    img:"",
    text:"Rank Board",
    to:"/"
  },
  {
    img:"",
    text:"Bounties Earned",
    to:"/"
  },
  {
    img:"",
    text:"Referral information ",
    to:"/"
  },
  {
    img:"",
    text:"Rules",
    to:"/"
  },
  {
    img:"",
    text:"Logout",
    to:"/"
  }
]

const Profile = () => {
  return (
    <div className='page'>
      <LuArrowLeft className='back-icon'/>
      <img src="coinTop.png" alt="coin top" className="coin-top" />
      <div className="user-profile-main-cont">
        <div className="up-text-cont">
          <h1 className="up-name">Cecil Otis</h1>
          <p className="up-text-normal">
            Cecil.Rodriguez12@yahoo.com
          </p>
          <p className="up-text-normal">
            Wallet No.-5848928598295489222
          </p>
        </div>
        <div className="up-links-cont">
          {

          }
        </div>
      </div>
      <img src="coinBtm.png" alt="coin bottom" className="coin-btm" />
    </div>
  )
}

export default Profile