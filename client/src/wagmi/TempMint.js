import React from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useRouter } from "next/router";
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json"
import { Button } from "@mui/material";

export default function TempMint() {
    const userAddress = useRouter().query.address;
    const contractAddress = MemoryToEarn.networks[5777].address;
    const contractAbi = MemoryToEarn.abi;
    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'tempMint'
    })
    const {data, isLoading, isSuccess, write} = useContractWrite(config);

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