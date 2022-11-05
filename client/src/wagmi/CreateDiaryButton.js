import React, {useState, useEffect} from "react";
import {useContractWrite, usePrepareContractWrite } from "wagmi";
import { Button, Box } from "@mui/material"
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export default function CreateDiaryButton(){
    // TODO:Goerli変更時に以下の記述を変更
    const router = useRouter();
    const abi = MemoryToEarn.abi;
    const address = MemoryToEarn.networks[5777].address;
    const [_isSuccess, _setIsSuccess] = useState(false);

    const userAddress = useAccount().address;

    const { config } = usePrepareContractWrite({
        address: address,
        abi: abi,
        functionName: 'createDiary'
    });

    const {data, isLoading, isSuccess, write } = useContractWrite(config);


    const handleClick = () => {
      try {
        write?.()
      } catch (error) {
        console.log(error);
      }
      router.push(`/diary/${userAddress}`);
    }

    return (
        <Box m={1} sx={{display: 'flex', justifyContent: 'center'}}>
            <Button
                disabled={!write}
                // onClick={() => write?.()}
                onClick={handleClick}
                variant="contained"
                color="secondary"
                sx={{display: 'flex', justifyContent: 'center'}}
            >
                Create Diary!    
            </Button>
            <Box>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Your Diary Created!!</div>}
            </Box>
        </Box>
    )

}