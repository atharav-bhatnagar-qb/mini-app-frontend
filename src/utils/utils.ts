import { Address, Dictionary } from "@ton/core";
import { DistributeReward, ReturnFee } from "../../build/Pot/tact_Pot";
import { toNano } from "ton-core";

export function arrayToDictionaryNum(arr:Array<bigint>):Dictionary<bigint,bigint>{
    let newArr:Dictionary<bigint,bigint>=Dictionary.empty()

    try {
        for(let i:number=0;i<arr.length;i++){
            // console.log("num : ",i," "arr[i] instanceof )
            newArr.set(BigInt(i),arr[i])
        }
    } catch (error) {
        console.log(error)
    }

    return newArr
}

export function arrayToDictionaryAddress(arr:Array<Address>):Dictionary<bigint,Address>{
    let newArr:Dictionary<bigint,Address>=Dictionary.empty()

    try {
        for(let i:number=0;i<arr.length;i++){
            // console.log("num : ",i," "arr[i] instanceof )
            newArr.set(BigInt(i),arr[i])
        }
    } catch (error) {
        console.log(error)
    }

    return newArr
}
export function checkInstance(msg:DistributeReward){
    console.log(typeof msg)
}
export function compileMessage(arr1:Array<bigint>,arr2:Array<Address>,count:bigint):DistributeReward{
    let newArr1:Dictionary<bigint,bigint>=Dictionary.empty()

    try {
        for(let i:number=0;i<arr1.length;i++){
            // console.log("num : ",i," "arr[i] instanceof )
            console.log("num : ",arr2[i]," ",arr2[i] instanceof Address)

            newArr1.set(BigInt(i),arr1[i])
        }
    } catch (error) {
        console.log(error)
    }
    let newArr2:Dictionary<bigint,Address>=Dictionary.empty()

    try {
        for(let i:number=0;i<arr2.length;i++){
            console.log("address : ",Address.parse(Address.normalize(arr2[i]))," ",arr2[i] instanceof Address)
            newArr2.set(BigInt(i),Address.parse(Address.normalize(arr2[i])))
        }
    } catch (error) {
        console.log(error)
    }

    return {
        $$type:"DistributeReward",
        wallets:newArr2,
        userCount:count,
        rewardsStars:newArr1
    }
}
export function compileReturnFeeMSG(wallet:Address,amount:bigint):ReturnFee{
    return{
        $$type:"ReturnFee",
        amount:BigInt(amount),
        wallet:Address.parse(Address.normalize(wallet))
    }
}