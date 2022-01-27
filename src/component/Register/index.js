import React, {useState} from "react";
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import './index.css';
import { Link } from "react-router-dom";

const Register = ({onLoginSuccess}) => {
    
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
    
    const login = async () => {
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

        await fetch(process.env.REACT_APP_API_URL + "login", requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                }

                throw Error(response.status);
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("token", result.token);
                localStorage.setItem("userId", result.user.id);
                setIsLogin(true);
                onLoginSuccess();

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
                    <Typography><h3>Sign up</h3></Typography>
                    </Grid>
                    <TextField name='username' label='Username' placeholder='Enter username' fullWidth required onChange={handleOnchangeUsername}/>
                    <TextField name='password' label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleOnchangePassword}/>
                    <Button type='button' style={buttonStyle} color='primary' variant='contained' fullWidth onClick={login}>Sign Up</Button>

                    <Typography>
                        Already have an account? <Link to={'/'}>Sign in</Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
}

export default Register;