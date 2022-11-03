import React, {useState, useEffect} from "react";
import {useContractWrite, usePrepareContractWrite } from "wagmi";
import { Button } from "@mui/material"
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json"

export default function CreateDiaryButton(){
    // TODO:Goerli変更時に以下の記述を変更
    const abi = MemoryToEarn.abi;
    const address = MemoryToEarn.networks[5777].address;

    const { config } = usePrepareContractWrite({
        address: address,
        abi: abi,
        functionName: 'createDiary'
    });

    const {data, isLoading, isSuccess, write } = useContractWrite(config);

    return (
        <div>
            <Button
                disabled={!write}
                onClick={() => write?.()}
                variant="contained"
                color="secondary"
                sx={{display: flex, justifyContent: center}}
            >
                Create Diary!    
            </Button>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Your Diary Created!!</div>}
        </div>
    )

}