import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address } from "ton-core";

export function useTonConnect(){
    const [tonConnectUI]=useTonConnectUI()
    const wallet =useTonWallet()

    return {
        sender:{
            send: async (args) => {
                tonConnectUI.sendTransaction({
                  messages: [
                    {
                      address: args.to.toString(),
                      amount: args.value.toString(),
                      payload: args.body?.toBoc().toString("base64"),
                    },
                  ],
                  validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
                });
              },
              address: wallet?.account?.address ? Address.parse(wallet?.account?.address?.toString()) : undefined
        },
        connected:!!wallet?.account.address,
        wallet:wallet?.account.address,
        network:wallet?.account.chain
    }
}