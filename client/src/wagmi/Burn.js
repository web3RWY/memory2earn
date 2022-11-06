import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useRouter } from "next/router";
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json";
import {Button, Box, CircularProgress, Typography, Stack} from "@mui/material"

export default function Burn(){
    const router = useRouter();
    const contractAddress = MemoryToEarn.networks[5].address;
    const contractAbi = MemoryToEarn.abi;
    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'burn'
    })
    const { data, write} = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(){
            router.reload();
        }
    })


    return(
        <Box mt={1} sx={{width:'100%', display: 'flex', alignItems: 'center',flexDirection: 'row', justifyContent: 'center', backgroundColor: 'grey.300'}}>

            <Box m={1} sx={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                 {isLoading && <CircularProgress />}
                <Button sx={{marginLeft: 1}} disabled={!write || isLoading} onClick={() => write?.()} variant="contained" color="secondary">
                    Add 5 pages</Button>
            </Box>
            <Box>
                <Typography error='true'>Cost: 5 MET</Typography>
            </Box>
        </Box>

    )
}