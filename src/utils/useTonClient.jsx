import { TonClient } from "ton";
import useAsyncInitialize from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { CHAIN } from "@tonconnect/ui-react";

export function useTonClient(){
    const {network}=useTonConnect()
    
    return{
        client:useAsyncInitialize(async()=>{
            if(!network){
                return
            }

            return new TonClient({
                endpoint:getHttpEndpoint({
                    network:network==CHAIN.MAINNET?"mainnet":"testnet"
                })
            })
        },[network])
    }
}