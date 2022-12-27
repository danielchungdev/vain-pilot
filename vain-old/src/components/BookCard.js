import { Button, Card, Stack, Typography } from '@mui/material'
import React from 'react'

export default function BookCard(props) {
    console.log(props)
    return (
        <Card sx={{display:'inline-block', margin: '10px', width: '100%', padding: "1%"}}>
            <Typography variant='h6'>
                {props.title}
            </Typography>
            <Typography>
                {props.year}
            </Typography>
            <Typography>
                {props.description}
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={3}>
                <Button variant='outlined'>
                    Edit Book
                </Button>
                <Button variant='outlined' color='error'>
                    Delete Book
                </Button>
            </Stack>
        </Card>
    )
}
