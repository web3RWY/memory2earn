import React from "react";
import { Typography, Box } from "@mui/material";
import { ConnectButton } from "./wagmi/ConnectButton";
import WalletIcon from '@mui/icons-material/Wallet';

export default function Welcome(){
    return (
        <Box m={1}>
            <Box m={2}>
                <Typography variant="h4" align="center">
                    Welcome to &quot;Memory To Earn&quot; !!
                </Typography>
                <Typography variant="h4" align="center">
                    Firstly, Please connect your wallet...
                </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <WalletIcon fontSize="large" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "center"}}>
                <ConnectButton />
            </Box>
        </Box>
    )
}