import React, { useContext, useState } from 'react'
import {RxCross1} from 'react-icons/rx'
import { MdCamera } from "react-icons/md";
import { TonContext, baseURL, useTon } from '../../utils/context';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { imageDB } from '../../../firebaseConfig';
import { v4 } from 'uuid';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useTonConnect } from '../../utils/useTonConnect';
import { isEmailAddress } from '../../utils/utils';

const UpdateProfile = ({showUpdateModal,setLoading,getUserDetails}) => {

  const tonAuth=useContext(TonContext)
  const [img,setImg]=useState(tonAuth?.user?.profile||'sampleUser.jpg')
  const [user,setUser]=useState({
    name:tonAuth?.user?.name,
    email:tonAuth?.user?.email
  })
  const {wallet}=useTonConnect()

  async function uploadImage(uri){
        
    return new Promise(async(resolve,reject)=>{
      const storageRef = ref(imageDB, 'userImage/' + v4());
      const uploadTask = uploadBytesResumable(storageRef,uri);
  
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        error => {
            setLoading(false)
          console.log('Error => ', error);
          reject(new Error("Some error occured while trying to upload images"))
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            console.log('File available at', downloadURL);
            resolve(downloadURL)
          });
        },
      );
    })
    
  };

  async function updateProfile(){
    try{
      setLoading(true)
      if(
        user?.name==tonAuth?.user?.name &&
        user?.email==tonAuth?.user?.email &&
        (
          img=='sampleUser.jpg'||
          img==tonAuth?.user?.profile
        )
      ){
        toast.error('Nothing has been modifed to be updated')
        setLoading(false)
        return
      }
      if(!isEmailAddress(user?.email)||user?.email==''){
        toast.error('Not a valid email')
        setLoading(false)
        return
      }
      if(typeof img=='string'){
        let res=await axios.put(`${baseURL}/updateUser`,{
          wallet:wallet?.toString(),
          name:user?.name,
          email:user.email,
          img:(img=='sampleUser.jpg'?null:img)
        })
        console.log(res)
        if(res?.data?.message!="profile updated"){
          toast.error(res?.data?.message)
          setLoading(false)
          return 
        }
        // console.log(imgRes)
        // getUserDetails()
        tonAuth?.setUser(res?.data?.user)
        toast.success(res?.data?.message)
        setLoading(false)
        showUpdateModal(false)
      }else{
        let imgRes=await uploadImage(img)
        let res=await axios.put(`${baseURL}/updateUser`,{
          wallet:wallet?.toString(),
          name:user?.name,
          email:user.email,
          img:imgRes
        })
        console.log(res)
        if(res?.data?.message!="profile updated"){
          toast.error(res?.data?.message)
          setLoading(false)
          return 
        }
        console.log(imgRes)
        // getUserDetails()
        tonAuth?.setUser(res?.data?.user)
        toast.success(res?.data?.message)
        setLoading(false)
        showUpdateModal(false)
      }
    }catch(err){
      console.log(err)
      setLoading(false)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='update-profile-modal-cont'
    >
        <div className="upm-main">
          <RxCross1 
            className='upm-close-icon'
            onClick={()=>{showUpdateModal(false)}}
          />
          <div className="upm-img-cont">
            <img src={(typeof img =="string")?img:URL.createObjectURL(img)} alt="profile" className="upm-img" />
            <MdCamera className='upm-img-icon' onClick={()=>document.getElementById('upm-img-inp').click()}/>
            <input 
              type="file" 
              className='hidden' 
              id='upm-img-inp'
              onChange={(e)=>setImg(e.target.files[0])}
            />
          </div>
          <div className="upm-form-item">
            <p className="upm-form-label">Name</p>
            <input 
              type="text" 
              className="upm-form-inp font-semibold" 
              value={user?.name}
              required
              onChange={(e)=>setUser(prev=>({...prev,name:e.target.value}))}
            />
          </div>
          <div className="upm-form-item">
            <p className="upm-form-label">Email</p>
            <input 
              type="text" 
              className="upm-form-inp italic" 
              value={user?.email}
              onChange={(e)=>setUser(prev=>({...prev,email:e.target.value}))}
              required
            />
          </div>
          <button className="upm-submit" onClick={updateProfile}>SAVE CHANGES</button>
        </div>
    </div>
  )
}

export default UpdateProfile