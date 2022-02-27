import React, {useState} from "react";
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import './index.css';
import { Link } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import validator from 'validator';
import logo from './Logo.png'

const Login = () => {
    
    //=======================STATES===========================
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(localStorage.getItem("token") != null)
    const [error, setError] = useState({});

    //=======================STYLES===========================
    const paperStyle = {
        padding: 20,
        width: 340,
        display: 'block'
    }

    const buttonStyle = {
        margin: '2.5rem 0 0.6rem 0',
        backgroundColor: '#2B9361',
        width: '100%',
        height: '2.75rem',
        borderRadius: '15px',
        color: 'white'
    }

    const errorStyle = {
        color: 'red',
        fontSize: '13px'
    };

    //=======================FUNCTION=========================
    const handleOnchangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleOnchangePassword = (e) => {
        setPassword(e.target.value);
    }

    const validate = () => {
        var err = {};
        if (password.length < 8) {
            err.password = "*Password must contain at least 8 characters!"
        }
        if (!validator.isEmail(username)) {
            err.email = "*Invalid email!"
        }
        
        setError(err);

        return (Object.keys(err).length);
    }
    
    const login = () => {
        var checkValid = validate();
        if (checkValid > 0) return;

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

        fetch(process.env.REACT_APP_API_URL + "login", requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                }

                throw Error(response.status);
            })
            .then(result => {
                if (result.statusCode === 200) 
                {
                    console.log(result.message)
                    localStorage.setItem("token", result.data.token);
                    localStorage.setItem("userId", result.data.user._id);
                    setIsLogin(true);
                }
                alert(result.message);
            })
            .catch(error => {
                console.log('error', error)
                alert("Incorrect username or password!");
            });
    }

    const responseFacebook = (response) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id_token": response.accessToken
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        fetch(process.env.REACT_APP_API_URL + "auth/facebook-sign-in", requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                }

                throw Error(response.status);
            })
            .then(result => {
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("userId", result.data.user._id);
                setIsLogin(true);
                alert(result.message);
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    const onSuccessGoogle = (response) => {
        console.log(response);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id_token": response.tokenId,
            "access_token": response.accessToken
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        fetch(process.env.REACT_APP_API_URL + "auth/google-sign-in", requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                }

                throw Error(response.status);
            })
            .then(result => {
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("userId", result.data.user._id);
                setIsLogin(true);
                alert(result.message);
            })
            .catch(error => {
                console.log('error', error)
            });
    }
    const onLogoutSuccess = () => {
        setIsLogin(false);
        window.location.pathname ='/'; 
        window.location.reload();
        localStorage.clear();
    }
    
    return (
        <div className="bgImg">
            <div className="page-content">
            <Grid>
                <Paper elevation={10} style ={paperStyle}>
                    <Stack direction="row" spacing={2}>
                        <Avatar
                            src={logo}
                            style={{ height: '70px', width: '70px' }}
                        />
                        <Typography component={'span'}><h3>EASY MALL</h3></Typography>
                    </Stack>
                    <Grid>
                    <Typography component={'span'}><h3>Sign in</h3></Typography>
                    </Grid>
                    
                    <TextField name='email' label='Email' placeholder='Enter email' fullWidth required onChange={handleOnchangeUsername}/>
                    <Typography style={errorStyle}>{error.email}</Typography>
                    
                    <TextField name='password' label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleOnchangePassword}/>
                    <Typography style={errorStyle}>{error.password}</Typography>
                    
                    <Button type='button' style={buttonStyle} color='primary' variant='contained' fullWidth onClick={login}>Sign In</Button>
                    <FacebookLogin
                        appId="842222179779996"
                        fields="name,picture,email"
                        autoLoad = {false}
                        cssClass="btnFacebook"
                        textButton = "Sign In with Facebook"   
                        icon="fa-facebook"                                                             
                        callback={responseFacebook} />
                    <br></br>
                    < GoogleLogin
                        clientId="176406720657-kvkukhtjlamdlv6cnc1vg8qanluodo33.apps.googleusercontent.com"
                        buttonText="Sign In with Google"
                        onSuccess={onSuccessGoogle}
                        isSignedIn={false}
                        className="btnGoogle"
                        scope="https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read"
                    />
                    <Typography >
                        Don't have an account? 
                        <Link to={'/register'}> Sign up</Link>
                    </Typography>
                    <Grid container justifyContent="flex-end">
                    <Stack direction="row" spacing={2} mt={5}>
                        <Typography> <Link to={'#'} className="link-footer">Help</Link></Typography>
                        <div className="line"></div>  
                        <Typography><Link to={'#'} className="link-footer">Terms</Link></Typography>        
                    </Stack>
                    </Grid>
                   
                </Paper>

            </Grid>
            </div>
        </div>
    );
}

export default Login;