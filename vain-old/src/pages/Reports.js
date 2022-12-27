import React from 'react';
import Navbar from '../components/Navbar'
import MyResponsiveBar from '../components/MyResponsiveBar';
import { Box, Container } from '@mui/material';

export default function Reports() {
    return (
        <div>
            <Navbar/>
            <Container sx={{height: '100vh' }}>
                <MyResponsiveBar/>
            </Container>
        </div>
    )
}
