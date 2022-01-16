import React, {useState} from "react";
import {Link} from 'react-router-dom'
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import './index.css';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import HomePage from "../HomePage";
const Login = ({onLoginSuccess}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isLogin, setIsLogin] = useState(localStorage.getItem("token") != null)
    const paperStyle = {
        padding: 20,
        height: '70vh',
        width: 300,
        margin: "20px auto"
    }
    const avatarStyle = {
        backgroundColor: '#1bbd7e'
    }

    const buttonStyle = {
        margin: '10px 0'
    }

    const handleOnchangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleOnchangePassword = (e) => {
        setPassword(e.target.value);
    }

    const responseFacebook = response => {
        console.log(response);
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
                console.log(result)
                localStorage.setItem("token", result.token);
                localStorage.setItem("userId", result.user.id);
                setIsLogin(true);
                onLoginSuccess();
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    const onSuccessGoogle = response => {
        console.log(response);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id_token": response.tokenId
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
                console.log(result)
                localStorage.setItem("token", result.token);
                localStorage.setItem("userId", result.user.id);
                setIsLogin(true);
                onLoginSuccess();
            })
            .catch(error => {
                console.log('error', error)
            });
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
        localStorage.clear();
    }
    return (
            <div>
            { isLogin ?
            
            <HomePage key={isLogin} /> :

            <Grid>
                <Paper elevation={10} style ={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <TextField name='username' label='Username' placeholder='Enter username' fullWidth required onChange={handleOnchangeUsername}/>
                    <TextField name='password' label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleOnchangePassword}/>
                    <Button type='button' style={buttonStyle} color='primary' variant='contained' fullWidth onClick={login}>Sign In</Button>
                    <Typography>
                        Don't have an account?
                        <Link to="/register"> Sign Up
                        </Link>
                    </Typography>
                    <FacebookLogin
                        appId="842222179779996"
                        fields="name,picture,email"
                        autoLoad = {false}
                        cssClass="btnFacebook"
                        textButton = "Sign In with Facebook"                                                                
                        callback={responseFacebook} />
                    <br></br>
                    < GoogleLogin
                        clientId="176406720657-kvkukhtjlamdlv6cnc1vg8qanluodo33.apps.googleusercontent.com"
                        buttonText="Sign In with Google"
                        onSuccess={onSuccessGoogle}
                        isSignedIn={false}
                        className="btnGoogle"
                    />
                </Paper>
            </Grid>
            }
            
            </div>
        );
}

export default Login;