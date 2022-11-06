import React, {useState, useEffect} from "react";
import {useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { Button, Box,CircularProgress, Typography  } from "@mui/material"
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export default function CreateDiaryButton(){
    const router = useRouter();
    const abi = MemoryToEarn.abi;
    const address = MemoryToEarn.networks[5].address;
    const [_isSuccess, _setIsSuccess] = useState(false);

    const userAddress = useAccount().address;

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
     } = usePrepareContractWrite({
        address: address,
        abi: abi,
        functionName: 'createDiary'
    });

    const {data, error, isError, write } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
      onSuccess(){
        router.push(`/diary/${userAddress}`);
      }
    });

    const handleClick = () => {
      try {
        write?.()
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <Box m={1} sx={{display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
            <Button
                disabled={!write || isLoading}
                onClick={handleClick}
                variant="contained"
                color="secondary"
                sx={{display: 'flex', justifyContent: 'center'}}
            >
                Create Diary!    
            </Button>
            <Box sx={{display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
              <Box m={1} >
                {isLoading && <Typography align="center"> <CircularProgress color="secondary"/></Typography>}
              </Box>
              {isSuccess && <Typography>Your Diary Created!!</Typography>}
              {(isPrepareError||isError) && (<Typography>Error: {(prepareError||error)?.message}</Typography>)}
            </Box>
            </Box>
        </Box>
    )

}