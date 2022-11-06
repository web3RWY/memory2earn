import React, {useState, useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ConnectButton } from './ConnectButton';
import { useAccount} from 'wagmi';
import Profile from './Profile';
import Logo from "../../public/Logo.png"
import Image from 'next/image';

export default function ButtonAppBar() {
  const { isConnected } = useAccount();
  const [_isConnected, _setIsConnected ] = useState(false);
 

  useEffect(()=>{
    _setIsConnected(isConnected);
  }, [isConnected])



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            href='/'
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Image src={Logo} width={40} height={40} alt="Logo"/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Memory2Earn
          </Typography>
          { _isConnected ? <Profile /> : <ConnectButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
