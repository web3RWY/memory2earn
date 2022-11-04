import React, {useState, useEffect} from "react";
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json"
import { useContractRead } from "wagmi";
import CreateDiaryButton from "./CreateDiaryButton";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Button } from "@mui/material"

export default function Diary(){
    const router = useRouter();
    const abi = MemoryToEarn.abi;
    const address = MemoryToEarn.networks[5777].address
    const { data, isError, isLoading } = useContractRead({
        address: address,
        abi: abi,
        functionName: 'getDiaryPages'
    });

    const [_data, _setData] = useState(0);
    useEffect(()=> {
        _setData(data);
    },[data]);

    const userAddress = useAccount.apply().address;
    const pages = data?._hex;

    return(
        <div>
            <Typography variant="h4" align="center">{
            pages!=0 ? "Open Diary":"Create Diary"}</Typography>
            {pages!=0
            ? <Button
                sx={{display: 'flex', justifyContent: 'center'}}
                variant="contained"
                color="secondary"
                onClick={()=> router.push(`./diary/${userAddress}`) }>
                    Go to Your Diary
                </Button>
            :<CreateDiaryButton />
            }
            <div>{isError}</div>
        </div>
    )
}