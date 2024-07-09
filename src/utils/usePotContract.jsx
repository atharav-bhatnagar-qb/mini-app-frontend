import useAsyncInitialize from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import {Pot} from '../wrappers/Pot'
import { Address } from "ton-core";

export function usePotContract(){
    const {client}=useTonClient()

    const potContract=useAsyncInitialize(async()=>{
        if(!client) return

        const contract = Pot.fromAddress(Address.parse())
    })
}