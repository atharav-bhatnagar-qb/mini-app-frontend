import React, { useContext, useEffect } from 'react'
import '../components/register/register.css'
import toast from 'react-hot-toast'
import { TonContext, baseURL, useTon } from '../utils/context'
import { useTonConnect } from '../utils/useTonConnect'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const tonAuth=useContext(TonContext)
    const {wallet,connected}=useTonConnect()
    const nav=useNavigate()

    async function register(){
        try{
            const name=document.querySelector('#reg-name').value 
            const email=document.querySelector('#reg-email').value

            console.log(name,email,wallet)
            if(name=="" || email==""){
                toast.error("Please do not leave any field empty")
                return
            }
            if(name.trim()==""||email.trim()==""){
                toast.error("Cannot submit blank spaces")
                return
            }

            const newUserObj={
                name:name,
                email:email,
                walletId:wallet
            }

            await axios.post(`${baseURL}/createUser`,{user:wallet,name,email}).then((res)=>{
            console.log(res?.data)
                if(res?.data?.message=="User created successfully"){
                    console.log("user created")
                    tonAuth?.setUser(newUserObj)
                    nav('/jobListing')
                }else if(res?.data?.message == "user already exists"){
                    toast.error(res?.data?.message)
                    nav('/jobListing')
                }else{
                    toast.error(res?.data?.message)
                }
            }).catch((err)=>{
            console.log(err)
            })

        }catch(err){
            console.log(err)
            toast.error("some error occured")
        }
    }

    useEffect(()=>{
        console.log(tonAuth?.user)
        if(!connected){
            nav('/')
        }
    },[])

  return (
    <div className='page'>
        <div className="register-form">
            <h1 className="register-title">
                REGISTER
            </h1>
            <div className="register-inp-cont">
                <p className="register-label">
                    NAME
                </p>
                <input id='reg-name' type="text" className="register-inp" />
            </div>
            <div className="register-inp-cont">
                <p className="register-label">
                    EMAIL
                </p>
                <input id='reg-email' type="email" className="register-inp" />
            </div>
            <button className='register-submit-btn' onClick={register}>Register User</button>
        </div>
    </div>
  )
}

export default Register