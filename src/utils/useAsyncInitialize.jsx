import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const useAsyncInitialize = (func,deps) => {
  const [state,setState]=useState(null)
  useEffect(()=>{
    (async()=>{
        setState(await func())
    })
  },[deps])
  return state
}

export default useAsyncInitialize