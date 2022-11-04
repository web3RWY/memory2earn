import React, {useState, useEffect} from "react";
import { useContractWrite, usePrepareContractWrite, useContractEvent } from "wagmi";
import { useRouter } from "next/router";
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json"
import { Button } from "@mui/material";

export default function TempMint() {
    const router = useRouter();
    const userAddress = router.query.address;
    const contractAddress = MemoryToEarn.networks[5777].address;
    const contractAbi = MemoryToEarn.abi;

    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'tempMint'
    })
    const {data, isLoading, isSuccess, write} = useContractWrite({
                ...config,
                // TODO: どのタイミングでSuccessになるのかGoerliで確認する。
                onSuccess() {
                    router.reload();
                }
            }
        );

    
    const [ _data, _setData ] = useState({});
    useEffect(()=>{
        _setData(data);
    },[data]);

    useContractEvent({
        address: contractAddress,
        abi: contractAbi,
        eventName: 'minted',
        listener(event){
            console.log(`${event} get 10MBT`);
            router.reload();
        }
    })


   

    return(
        <div>
            <Button disabled={!write} onClick={() => write?.()} variant="contained">
                Mint
            </Button>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </div>
    )
    
}