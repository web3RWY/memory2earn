import React, {useState, useEffect} from "react";
import { useContractWrite, usePrepareContractWrite, useContractEvent, useContractRead } from "wagmi";
import { useRouter } from "next/router";
import MemoryToEarn from "../../../truffle/build/contracts/MemoryToEarn.json"
import { Button, FormControl, TextField, Box } from "@mui/material";

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

    const  pages = parseInt(useContractRead({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getDiaryPages',
        }).data?._hex);

    const [_pages, _setPages] = useState(0);
    useEffect(()=>{
        _setPages(pages);
    }, [pages]);
    const diaryPages = [...Array(_pages)].map((_,page) => "");

    return(
        <div>
            <Box m={1}  >
            {diaryPages.map((value, index)=>{
                return(
                        <Box m={1} component="form" sx={{display: "flex", flexDirection: "row"}} noValidate autoComplete="off">
                        <TextField label={index} variant="outlined"  id={index} name={index}/>
                        <Button disabled={!write} onClick={() => write?.()} variant="contained">
                            Mint
                        </Button>
                        </Box>
                )

            })}
            </Box>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </div>
    )
    
}