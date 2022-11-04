import React from 'react';
import Layout from '../../../component/Layout';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Typography, Card, CardContent } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import DiaryData from '../../../component/DiaryData';
import TempMint from '../../../src/wagmi/TempMint';
import Burn from '../../../src/wagmi/Burn';

export default function YourDiary(){

    return (
        <Layout>
            <Typography variant='h4' align='center' >Your Diary</Typography>
            <Typography variant='h4' align='center' >
                <AutoStoriesIcon color='secondary' sx={{fontSize: 100}}/>
            </Typography>
            <DiaryData />
            <TempMint />
            <Burn />            
        </Layout>
    )
}