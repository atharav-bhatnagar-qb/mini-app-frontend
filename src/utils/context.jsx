import { createContext,useCallback,useEffect,useState } from "react"
import { useTonConnect } from "./useTonConnect"

export const TonContext=createContext()

export const baseURL="http://143.110.249.49/api/v1"

export const useTon=()=>{

    const {connected}=useTonConnect()
    const [isConnected,setIsConnected]=useState(connected)
    const [walletId,setWalletId]=useState(null)
    const [job,setJob]=useState(null)
    const [candidate,setCandidate]=useState(null)
    const [user,setUser]=useState({})

    useEffect(()=>{
        console.log("from context : ",job)
    },[job])


    return{
        walletId,setWalletId,isConnected,setIsConnected,job,setJob,candidate,setCandidate,user,setUser
    }
}

export const TonProvider=({children})=>{
    const tonAuth=useTon()
    return(
        <TonContext.Provider value={tonAuth}>
            {children}
        </TonContext.Provider>
    )
}