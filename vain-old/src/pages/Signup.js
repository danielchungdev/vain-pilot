import React, {useState} from 'react'
import {Grid, Paper, Typography, Box, Input, 
    Button,Link,MenuItem, Select, Snackbar, 
    Alert
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

export default function Login() {

    //Variables
    const [username, setUsername] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [accountType, setAccountType] = useState(0)

    //Errors
    const [snackbar, setSnackbar] = useState(null)

    let navigate = useNavigate()

    const handleCloseSnackbar = () => {
        setSnackbar(null);
    }

    const inputValidation = () => {
        if (username === "" || fname === "" || lname === "" || accountType === 0 || email === "" || password === ""){
            setSnackbar({children: "There are empty fields!", severity: "error"});
            return false;
        }
        if (password !== passwordConfirm){
            setSnackbar({children: "Passwords don't match!", severity: "error"});
            return false;   
        }
        if (email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null){
            setSnackbar({children: "Invalid email!", severity: "error"});
            return false;
        }
        return true;
    }

    const createAccount = (e) => {
        e.preventDefault()
        if(inputValidation()){
            fetch('http://localhost:5000/users',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: username.toLowerCase(),
                    fname: fname,
                    lname: lname,
                    role: accountType,
                    email: email.toLowerCase(),
                    password: password
                })
            })
            .then(res => {
                if (res.status === 200){
                    return res.json()
                }
                else{
                    setSnackbar({ children: 'Username already exists!', severity: 'error' });
                    return null
                }
            })
            .then(data => {
                if (data){
                    navigate('/login')
                }
            })
        }
    }

    return (
        <Grid container sx={{height: 'auto', justifyContent: "center", alignContent:"center", backgroundColor: '#EBBC92'}}>
            <Grid item component={Paper} elevation={8} xl={3} lg={4} md={5} sm={8} xs={11} sx={{height:'auto', padding: '2%', margin: '5% 0 5%'}}>
                <Typography variant="h5" align='center'>Sign Up to VAIN</Typography>
                <form onSubmit={createAccount}>
                    <Typography sx={{marginTop: '5%'}}>Username</Typography>
                    <Input autoComplete='false' margin="dense" placeholder="Enter your username" fullWidth onChange={(e)=> {setUsername(e.target.value)}}></Input>
                    <Typography sx={{marginTop: '5%'}}>First name</Typography>
                    <Input autoComplete='false' margin="dense" placeholder="Enter your first name" fullWidth onChange={(e)=> {setFname(e.target.value)}}></Input>
                    <Typography sx={{marginTop: '5%'}}>Last name</Typography>
                    <Input autoComplete='false' margin="dense" placeholder="Enter your last name" fullWidth onChange={(e)=> {setLname(e.target.value)}}></Input>
                    <Typography sx={{marginTop: '5%'}}>Email</Typography>
                    <Input autoComplete='false' margin="dense" placeholder="Enter your email" fullWidth onChange={(e)=> {setEmail(e.target.value)}}></Input>
                    <Typography sx={{marginTop: '5%'}}>Password</Typography>
                    <Input autoComplete='false' margin="dense" type="password" placeholder="Enter your password" fullWidth onChange={(e)=> {setPassword(e.target.value)}}></Input>
                    <Typography sx={{marginTop: '5%'}}>Confirm Password</Typography>
                    <Input autoComplete='false' margin="dense" type="password" placeholder="Confirm your password" fullWidth onChange={(e)=> {setPasswordConfirm(e.target.value)}}></Input>
                    <Typography sx={{marginTop: '5%'}}>User Role</Typography>
                    <Select
                        value={accountType}
                        onChange={(e) => {setAccountType(e.target.value)}}
                        displayEmpty
                        fullWidth
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="0"><em>None</em></MenuItem>
                        <MenuItem value="1">Administrator</MenuItem>
                        <MenuItem value="2">Contributor</MenuItem>
                        <MenuItem value="3">User</MenuItem>
                        <MenuItem value="4">Guest</MenuItem>
                    </Select>
                    <Box textAlign="center" margin={2}>
                        <Button type="submit" variant="outlined">Create Account</Button>
                    </Box>
                    <Typography variant="subtitle2" align="right">Already have an account? <Link href="/login">Login!</Link></Typography>
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
