import React, {useState, useEffect} from "react";
import MemoryToEarne from "../../../truffle/build/contracts/MemoryToEarn.json"
import { useContractRead } from "wagmi";
import CreateDiaryButton from "./CreateDiaryButton";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Button } from "@mui/material"

export default function Diary(){
    const router = useRouter();
    const abi = MemoryToEarne.abi;
    const address = MemoryToEarne.networks[5777].address
    const { data, isError, isLoading } = useContractRead({
        address: address,
        abi: abi,
        functionName: 'diaryHolderCheck'
    });

    const [_data, _setData] = useState(false);
    useEffect(()=> {
        _setData(data);
    },[data]);

    const userAddress = useAccount.apply().address;

    return(
        <div>
            <Typography variant="h4" align="center">{
            data ? "Open Diary":"Create Diary"}</Typography>
            {data
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