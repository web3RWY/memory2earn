import React from 'react';
import Layout from '../../../component/Layout';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Typography, Card, CardContent, 
            Table, TableContainer, TableBody, TableCell, TableHead,TableRow, Paper  } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import DiaryData from '../../../component/DiaryData';
import TempMint from '../../../src/wagmi/TempMint';
import Burn from '../../../src/wagmi/Burn';
import dbConnect from '../../../lib/dbConnect';
import Page from '../../../model/Page';

export default function YourDiary({pages}){

    return (
        <Layout>
            <Typography variant='h4' align='center' >Your Diary</Typography>
            <Typography variant='h4' align='center' >
                <AutoStoriesIcon color='secondary' sx={{fontSize: 100}}/>
            </Typography>
            <DiaryData />
            <TempMint />
            <Burn />
            <Typography variant='h4'>Your Pages</Typography>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Article</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pages.map((page)=>(
                            <TableRow key={page._id} >
                                <TableCell component="th" scope="row">{page._id}</TableCell>
                                <TableCell align='right'>{page.createdAt}</TableCell>
                                <TableCell align='right'>{page.article}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    )
}

export async function getServerSideProps() {
    await dbConnect();

    let result = await Page.find({});
    const pages = result.map((doc) => {
        const page = doc.toObject();
        page._id = page._id.toString();
        page.createdAt = page.createdAt?.toString();
        return page
    })

    return { props: {pages: pages}}
}