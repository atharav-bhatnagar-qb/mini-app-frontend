import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address } from "ton-core";

export function useTonConnect(){
    const [tonConnectUI]=useTonConnectUI()
    const wallet =useTonWallet()

    return {
        sender:{
            send:async(args)=>{
                console.log("args",args.to.toString(),args.value.toString(),typeof args.amount)
                tonConnectUI.sendTransaction({
                    messages:[{
                        address:args.to.toString(),
                        amount:args.value.toString(),
                        // payload:args.body?.toBoc().toString("base64")
                    }],
                    validUntil:new Date() + (5 *60 * 1000)
                })
            },
            address:wallet?.account.address ? Address.parse(wallet?.account.address) : undefined
        },
        connected:!!wallet?.account.address,
        wallet:wallet?.account.address,
        network:wallet?.account.chain
    }
}