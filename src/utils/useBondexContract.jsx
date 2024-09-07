import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";
import {Pot} from '../../build/Pot/tact_Pot'
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { arrayToDictionaryAddress, arrayToDictionaryNum, checkInstance, compileMessage, compileReturnFeeMSG } from "./utils.ts";

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

export function useBondexContract() {
    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()
    const [balance, setBalance] = useState()

    const bondexContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;

        // const contract = Pot.fromAddress(Address.parse("EQD1mW2hPelbiK8R-o8DNy9uk6kiM8s7yns01UKBaftauYoi"))
        const contract = Pot.fromAddress(Address.parse("EQDPRgLx4W4yPVR_s9KigrMPjMAzDgPGgCXsjDKcEljCSZ2T"))
        return client.open(contract) 
    }, [client, wallet])


    useEffect(()=>{
        async function getBalance() {
            if(!bondexContract) return 
            setBalance(null)
            const balance = (await bondexContract.getBalance())
            setBalance(fromNano(balance))
            await sleep(10000)
            getBalance()
        }

        getBalance()

    }, [bondexContract])

    return {
        // mint: () => {
        //     const message = {
        //         $$type: "Mint",
        //         amount: 150n
        //     }

        //     jettonContract?.send(sender, {
        //         value: toNano("0.05")
        //     }, message)
        // },
        generateRef:()=>{
            const message=null
            bondexContract?.send(sender,{
                value:toNano("1")
            },message)
        },
        returnFee:(amount,address)=>{
            // const message={
            //     $$type:"ReturnFee",
            //     wallet:Address.parse(Address.normalize(address)),
            //     amount:amount
            // }
            const message=compileReturnFeeMSG(address,amount)
            bondexContract?.send(sender,{
                value:toNano("0.05")
            },message)
            
        },
        withdrawAll:()=>{
            const message={
                $$type:"RequestAll",
                preserve:toNano("0.1")
            }
            bondexContract?.send(sender,{
                value:toNano("0.05")
            },message)
        },
        distributeReward:(wallets,rewards,userCount)=>{
            const message=compileMessage(rewards,wallets,userCount)
            bondexContract?.send(sender,{
                value:toNano("0.05")
            },message)
        },
        balance:balance,
        contract:bondexContract
    }
}