import React from 'react';
import Layout from '../../../component/Layout';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Box,Typography, Grid,
            Table, TableContainer, TableBody, TableCell, TableHead,TableRow, Paper  } from '@mui/material';
import DiaryData from '../../../component/DiaryData';
import TempMint from '../../../src/wagmi/TempMint';
import Burn from '../../../src/wagmi/Burn';
import dbConnect from '../../../lib/dbConnect';
import Page from '../../../model/Page';
import { Divider } from '@mui/material';

export default function YourDiary({pages}){



    return (
        <Layout>
            <Box m={5}>
            <Grid container spacing={2}>
                <Grid item xs={6} sx={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                    <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box>
                            <Typography variant='h4' align='center' >Your Diary</Typography>
                        </Box>
                        <Box align="center">
                            <AutoStoriesIcon color='secondary' sx={{fontSize: 100}}/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <DiaryData />
                </Grid>
            </Grid>
            <TempMint />
            <Box mb={3} sx={{display:'flex', justifyContent: 'flex-end'}}>
                <Burn />
            </Box>
            <Divider />
            <Box m={1}>
                <Typography variant='h4'>Your Pages</Typography>
                <TableContainer component={Paper} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="left">Article</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pages.map((page)=>(
                                <TableRow key={page._id} >
                                    <TableCell align='left'>{page.createdAt}</TableCell>
                                    <TableCell align='left'>{page.article}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            </Box>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    await dbConnect();
    const userAddress = context.query.address;

    let result = await Page.find({"user": userAddress});
    const pages = result.map((doc) => {
        const page = doc.toObject();
        page._id = page._id.toString();
        page.createdAt = page.createdAt?.toString();
        return page
    })

    return { props: {pages: pages}}
}