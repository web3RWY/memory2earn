import { Card, CardContent,Typography,Grid, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useContractRead, useToken } from "wagmi";
import MemoryToEarn from "../../truffle/build/contracts/MemoryToEarn.json";
import SavingsIcon from "@mui/icons-material/Savings";
import ArticleIcon from '@mui/icons-material/Article';
import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import { Divider } from "@mui/material";

export default function DiaryData(props){
    const  userAddress  = useRouter().query.address;
    const abi = MemoryToEarn.abi;
    const contractAddress = MemoryToEarn.networks[5777].address;
    const MemoryToEarnContract = {
        abi: abi,
        address: contractAddress,
    }
    const { data, isError, isLoading } = useContractRead({
            ...MemoryToEarnContract,
            functionName: 'balanceOf',
            args: [userAddress]
    });
    const  pages = parseInt(useContractRead({
            ...MemoryToEarnContract,
            functionName: 'getDiaryPages',
    }).data?._hex);

    const [_pages, _setPages] = useState(0);
    useEffect(()=>{
        _setPages(pages);
    }, [pages]);

    const tokenData = useToken({
            address: contractAddress,
    }).data;
    

    const [_data, _setData] = useState('');
    useEffect(()=>{
        _setData(data);
    },[data]);

    const [_tokenData, _setTokenData] = useState(null);
    useEffect(() =>{
        _setTokenData(tokenData);
    },[tokenData])

    return(
        <Card sx={{minWidth: 275 }}>
        <CardContent>
                <List >
                    <ListItem>
                        <ListItemIcon>
                            <SavingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Token Amount" />
                    </ListItem>
                    <ListItemText sx={{textAlign:'right'}} >
                        {_data?._hex/ (10 ** _tokenData?.decimals)} {_tokenData?.symbol} 
                    </ListItemText>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Remain Page Count" />
                    </ListItem>
                    <ListItemText sx={{textAlign:'right'}} >
                        {_pages} pages 
                    </ListItemText>
                </List>
        </CardContent>
        </Card>
    )
}