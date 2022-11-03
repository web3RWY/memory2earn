import React from "react";
import { Typography, Box } from "@mui/material";
import { ConnectButton } from "./wagmi/ConnectButton";

export default function Welcome(){
    return (
        <div>
        <Typography variant="h4" align="center">
            Welcome to "Memory To Earn" !!
        </Typography>
        <Typography variant="h4" align="center">
            Firstly, Please connect your wallet...
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: "center"}}>
            <ConnectButton />
        </Box>
        </div>
    )
}