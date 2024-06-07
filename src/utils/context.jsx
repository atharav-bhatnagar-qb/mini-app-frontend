import { createContext,useCallback,useEffect,useState } from "react"

export const TonContext=createContext()

export const useTon=()=>{
    const [isConnected,setIsConnected]=useState(false)
    const [walletId,setWalletId]=useState(null)
    const [job,setJob]=useState(null)
    const [candidate,setCandidate]=useState(null)

    useEffect(()=>{
        console.log("from context : ",job)
    },[job])


    return{
        walletId,setWalletId,isConnected,setIsConnected,job,setJob,candidate,setCandidate
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