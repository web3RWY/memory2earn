import React, {useState, useEffect} from "react";
import {useAccount, useEnsAvatar, useEnsName, useDisconnect } from "wagmi";
import { Typography, Avatar, Box, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Profile(){
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect({
        onSuccess(){
            router.push('/');
        }
    });
    
    const [ _address, _setAddress ] = useState('');
    useEffect(()=>{
        _setAddress(address);
    }, [address])

    const { ensAvatar } = useEnsAvatar({ _address });
    const { ensName } = useEnsName({ _address });

    const handleClick =()=>{
        disconnect();
      }

    return(
        <Box sx={{display: 'flex', flexDirection:'row', justifyContent: 'flex-end', alignItems:'center'}}>
            <Button  variant="contained" color='warning' onClick={handleClick}>Disconnect</Button>
            <Box sx={{minWidth: 300}}>
                <Typography variant="body2" sx={{m:1}}>
                    {ensName ? `${ensName}` : address}
                </Typography>
            </Box>
                <Avatar src={ensAvatar} alt="ENS avatar" sx={{m:1}}/>
        </Box>
    )
}