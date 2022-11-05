import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Welcome from "../Welcome";
import Diary from "./Diary";
import { Box } from "@mui/material"

export default function Entry() {
    
    const { address, isConnected } = useAccount();
    const [_isConnected, _setIsConnected] = useState(false);
    
    useEffect(()=>{
        _setIsConnected(isConnected);
    },[isConnected])
    
    return (
        <Box m={5} sx={{display: 'flex', justifyContent: 'center'}}>
            {_isConnected ? <Diary /> : <Welcome />}
        </Box>
    );
}

