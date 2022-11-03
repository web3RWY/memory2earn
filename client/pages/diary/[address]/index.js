import React from 'react';
import Layout from '../../../component/Layout';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Typography } from '@mui/material';

export default function YourDiary(){
    return (
        <Layout>
            <Typography variant='h4' align='center' >Your Diary</Typography>
            <Typography variant='h4' align='center' >
                <AutoStoriesIcon color='secondary' sx={{fontSize: 100}}/>
            </Typography>
            
        </Layout>
    )
}