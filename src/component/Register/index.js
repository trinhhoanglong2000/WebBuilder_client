import React, {useState} from "react";
import {Avatar, Button, Grid, Paper, TextField, Typography, Checkbox, FormControlLabel} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import './index.css';
import { Link } from "react-router-dom";

const Register = ({onLoginSuccess}) => {
    
    //=======================STATES===========================
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();

    const [checked, setChecked] = useState(false);
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
    const handleOnchangeConfirm = (e) => {
        setConfirm(e.target.value);
    }
    const handleOnchangeFirstname = (e) => {
        setFirstname(e.target.value);
    }
    const handleOnchangeLastname = (e) => {
        setLastname(e.target.value);
    }
    const handleOnchangeChecked = (e) => {
        setChecked(e.target.checked);
      };
    
    const register = () => {
        if (password !== confirm) {
            alert("Password does not match!");
            return;
        }
        if (password === "" || confirm === "") {
            alert("You must fill in username and password!");
        }
        if (checked) {
            alert("Yooooo")
        }
        if (username !== "") {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "username": username,
                "password": password,
                "fullname": firstname + lastname,
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(process.env.REACT_APP_API_URL + "accounts", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                alert("Register successfully, you can login now!");
            })
            .catch(error => {
                console.log('error', error);
                alert("Register fail!")
            });
        }
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
                    <Stack direction="row" spacing={2}>
                    <TextField name='firstname' label='First Name' placeholder='Enter First Name' fullWidth required onChange={handleOnchangeFirstname}/>
                    <TextField name='lastname' label='Last Name' placeholder='Enter Last Name' fullWidth required onChange={handleOnchangeLastname}/>            
                    </Stack>
                    <TextField name='password' label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleOnchangePassword}/>
                    <TextField label='Confirm Password' placeholder='Enter password again' type='password' fullWidth required onChange={handleOnchangeConfirm}/>
                    <FormControlLabel className='label-check-terms'
                        control={<Checkbox checked={checked} onChange={handleOnchangeChecked} style={{color: 'black'}}/>}
                        label={
                            <div>
                               <span>I accept the </span>
                               <Link to={'#'}>Terms of Use</Link>
                            </div>
                            }
                    />
                    <Button type='button' style={buttonStyle} class='btnSignUp' color='primary' variant='contained' fullWidth >Sign Up</Button>
                    <Typography>
                        Already have an account? <Link to={'/login'}>Sign in</Link>
                    </Typography>
                    
                    <Stack spacing={10}>
                        <div></div>
                        <div></div>
                        <div></div>          
                    </Stack>
                    <Stack direction="row" spacing={2} className='footer-page-register'>
                        <Typography> <Link to={'#'} className="link-footer">Help</Link></Typography>
                        <div className="line"></div>  
                        <Typography><Link to={'#'} className="link-footer">Terms</Link></Typography>        
                    </Stack>
                </Paper>
            </Grid>
        </div>
    );
}

export default Register;