import React, { useState } from 'react'
import {Grid, Paper, Typography, Box, 
    Input, Button, Divider, Link,
    Snackbar, Alert, InputAdornment,
    IconButton
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'

export default function Login() {
    //Variables 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    //Error messages
    const [snackbar, setSnackbar] = useState(null)

    //Navigation hook
    let navigate = useNavigate()

    const handleCloseSnackbar = () => setSnackbar(null);

    //Functions checks if there are empty fields & raises error.
    const checkEmptyFields = () => {
        if (username === "" || password === ""){
            setSnackbar({ children: 'There are empty fields!', severity: 'error' });
            return false
        }
        return true
    }

    //This sets the user as guest in localStorage
    const loginAsGuest = () => {
        localStorage.setItem('user', 'Guest')
        localStorage.setItem('fname', 'Guest')
        localStorage.setItem('lname', 'User')
        navigate('/')
    }

    //Login function
    const login = (e) => {
        e.preventDefault();
        if (checkEmptyFields()){
            fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username, 
                    password
                })
            })
            .then( res => {
                if (res.status === 200){
                    return res.json()
                }
                else{
                    return null
                }
            })
            .then( data => {
                if (data){
                    localStorage.setItem('user', data[0].user_id)
                    localStorage.setItem('fname', data[0].fname)
                    localStorage.setItem('lname', data[0].lname)
                    navigate('/')
                }
                else{
                    setSnackbar({ children: 'Credentials are wrong! Try again', severity: 'error' });
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <Grid container sx={{height: '100vh', justifyContent: "center", alignContent:"center", backgroundColor: '#EBBC92'}}>
            <Grid item component={Paper} elevation={8} xl={3} lg={4} md={5} sm={8} xs={11} sx={{height:'auto', padding: '2%'}}>
                <Typography variant="h5" align='center'>Login to VAIN</Typography>
                <form onSubmit={login}>
                    <Typography sx={{marginTop: '5%'}}>Username</Typography>
                    <Input 
                        autoComplete='false'    
                        margin="dense" 
                        placeholder="Enter your username" 
                        fullWidth 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Typography sx={{marginTop: '5%'}}>Password</Typography>
                    <Input 
                        autoComplete='false' 
                        margin="dense" 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Enter your password" 
                        fullWidth 
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end" sx={{padding: "5px"}}>
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={ () => setShowPassword(!showPassword)}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    /> 
                    <Box textAlign="center" margin={2}>
                        <Button type="submit" variant="outlined">Login</Button>
                    </Box>
                    <Typography variant="subtitle2" align="right">Don't have an account? <Link href="/signup">Create one!</Link></Typography>
                    <Box margin={2}>
                        <Divider/>
                    </Box>
                    <Box textAlign="center">
                        <Button variant="outlined" onClick={loginAsGuest}>Continue as a Guest</Button>
                    </Box>
                </form>
            </Grid>
            {!!snackbar && (
                <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </Grid>
    )
}