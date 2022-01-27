import React, {useState} from "react";
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import './index.css';
import { Link } from "react-router-dom";

const Login = () => {
    
    //=======================STATES===========================
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isLogin, setIsLogin] = useState(localStorage.getItem("token") != null)

    //=======================STYLES===========================
    const paperStyle = {
        position: 'relative',
        padding: 20,
        height: '70vh',
        width: 300,
        float: 'left',
        left: '20vh',
        float: 'top',
        top: '10vh',
    }

    const buttonStyle = {
        margin: '10px 0'
    }

    //=======================FUNCTION=========================
    const handleOnchangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleOnchangePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const login = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/login", requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                }

                throw Error(response.status);
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("userId", result.data.user._id);
                setIsLogin(true);
                alert(result);
            })
            .catch(error => {
                console.log('error', error)
                alert("Incorrect username or password!");
            });
    }

    const onLogoutSuccess = () => {
        setIsLogin(false);
        window.location.pathname ='/'; 
        window.location.reload();
        localStorage.clear();
    }
    
    return (
        <div className="bg">
            <div className="bgImg">

            </div>
            <Grid >
                <Paper elevation={10} style ={paperStyle}>
                    <Stack direction="row" spacing={2}>
                        <Avatar
                            alt="Logo"
                            src="./Logo.jpg"
                            sx={{ width: 24, height: 24 }}
                            variant="square"
                        />
                        <Typography><h3>EASY MALL</h3></Typography>
                    </Stack>
                    <Grid>
                    <Typography><h3>Sign in</h3></Typography>
                    </Grid>
                    <TextField name='email' label='Email' placeholder='Enter email' fullWidth required onChange={handleOnchangeUsername}/>
                    <TextField name='password' label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleOnchangePassword}/>
                    <Button type='button' style={buttonStyle} color='primary' variant='contained' fullWidth onClick={login}>Sign In</Button>

                    <Typography>
                        Don't have an account? 
                        <Link to={'/register'}> Sign up</Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
}

export default Login;