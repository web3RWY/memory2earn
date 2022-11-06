import React, {useState, useEffect} from "react";
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json"
import { useContractRead } from "wagmi";
import CreateDiaryButton from "./CreateDiaryButton";
import { Typography, Box, CircularProgress  } from "@mui/material";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Button } from "@mui/material";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

export default function Diary(){
    const router = useRouter();
    const abi = MemoryToEarn.abi;
    const userAddress = useAccount().address;
    const address = MemoryToEarn.networks[5].address
    const {data, isError, isLoading } = useContractRead({
        address: address,
        abi: abi,
        functionName: 'checkDiaryHolder',
        args: [userAddress]
    });

    const [_data, _setData] = useState(false);
    useEffect(()=> {
        _setData(data);
    },[data]);

    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection:"column"}}>
            {isLoading && <CircularProgress color="secondary"/>}
            <Box m={1}>
                <Typography variant="h4">{_data ? "Open Diary":"Create Diary"}</Typography>
            </Box>
            <Box m={1} sx={{display:'flex', justifyContent:'center'}}>
                <LocalLibraryIcon sx={{fontSize:100}} />
            </Box>
            {_data
            ? <Button
                variant="contained"
                color="secondary"
                onClick={()=> router.push(`./diary/${userAddress}`) }>
                    Go to Your Diary
                </Button>
            :<CreateDiaryButton />
            }
            <div>{isError}</div>
        </Box>
    )
}