import React, {useState, useEffect} from "react";
import {useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { Typography, Avatar, Box } from "@mui/material";

export default function Profile(){
    const { address, isConnected } = useAccount();
    
    const [ _address, _setAddress ] = useState('');
    useEffect(()=>{
        _setAddress(address);
    }, [address])

    const { ensAvatar } = useEnsAvatar({ _address });
    const { ensName } = useEnsName({ _address });

    return(
        <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems:'center'}}>
            <Typography sx={{m:1}}>
                {ensName ? `${ensName}` : address}
            </Typography>
            <Avatar src={ensAvatar} alt="ENS avatar" sx={{m:1}}/>
        </Box>
    )
}