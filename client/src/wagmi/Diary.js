import React, {useState, useEffect} from "react";
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json"
import { useContractRead } from "wagmi";
import CreateDiaryButton from "./CreateDiaryButton";
import { Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Button } from "@mui/material";

export default function Diary(){
    const router = useRouter();
    const abi = MemoryToEarn.abi;
    const address = MemoryToEarn.networks[5777].address
    const { data, isError, isLoading } = useContractRead({
        address: address,
        abi: abi,
        functionName: 'getDiaryPages'
    });
    const diaryHolder = useContractRead({
        address: address,
        abi: abi,
        functionName: 'checkDiaryHolder'
    }).data;
    console.log(diaryHolder);

    const [_data, _setData] = useState(0);
    useEffect(()=> {
        _setData(data);
    },[data]);

    const userAddress = useAccount.apply().address;
    const pages = data?._hex;

    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection:"column"}}>
            <Box m={1}>
                <Typography variant="h4">{diaryHolder ? "Open Diary":"Create Diary"}</Typography>
            </Box>
            {diaryHolder
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