import React, {useState} from "react";
import {Avatar, Button, Grid, Paper, TextField, Typography, Checkbox, FormControlLabel} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import './index.css';
import { Link } from "react-router-dom";
import validator from 'validator';

const Register = () => {
    
    //=======================STATES===========================
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState({});

    const [checked, setChecked] = useState(false);
    //=======================STYLES===========================
    const paperStyle = {
        position: 'relative',
        padding: 20,
        width: 300,
        float: 'left',
        left: '20vh',
        float: 'top',
        top: '10vh',
    }

    const buttonStyle = {
        margin: '10px 0',
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
    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
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

    const validate = () => {
        var err = {};
        if (password !== confirm) {
            err.confirm = "*Password does not match!"
        }
        if (password.length < 8) {
            err.password = "*Password must contain at least 8 characters!"
        }
        if (!validator.isEmail(email)) {
            err.email = "*Invalid email!"
        }
        if (firstname.length === 0  || lastname.length === 0) {
            err.name = "*You must fill in first name and last name!"
        }
        
        setError(err);

        return (Object.keys(err).length);
    }
    
    const register = () => {
        var checkValid = validate();
        if (checkValid === 0) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": email,
                "password": password,
                "fullname": firstname + ' ' + lastname,
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(process.env.REACT_APP_API_URL + "accounts/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                alert(result.message);
            })
            .catch(error => {
                console.log('error', error);
                alert("Register fail!")
            });
        }
    }

    return (
        <div className="bgImg">
            <Grid >
                <Paper elevation={10} style ={paperStyle}>
                    <Stack direction="row" spacing={2}>
                        <Avatar
                            alt="Logo"
                            src="./Logo.jpg"
                            sx={{ width: 24, height: 24 }}
                            variant="square"
                        />
                        <Typography component={'span'}><h3>EASY MALL</h3></Typography>
                    </Stack>
                    <Grid>
                    <Typography component={'span'}><h3>Sign up</h3></Typography>
                    </Grid>
                    <TextField name='email'
                            label='Email' 
                            placeholder='Enter email' 
                            fullWidth
                            required
                            value={email}
                            onChange={handleOnchangeEmail}/>
                            
                    <Typography style={errorStyle}>{error.email}</Typography>

                    <Stack direction="row" spacing={2}>
                    <TextField name='firstname' label='First Name' placeholder='Enter First Name' value={firstname} fullWidth required onChange={handleOnchangeFirstname}/>
                    <TextField name='lastname' label='Last Name' placeholder='Enter Last Name' value={lastname} fullWidth required onChange={handleOnchangeLastname}/> 
                    </Stack>
                    <Typography style={errorStyle}>{error.name}</Typography>

                    <TextField name='password' label='Password' placeholder='Enter password' type='password' value={password} fullWidth required onChange={handleOnchangePassword}/>
                    <Typography style={errorStyle}>{error.password}</Typography>

                    <TextField label='Confirm Password' placeholder='Enter password again' type='password' value={confirm} fullWidth required onChange={handleOnchangeConfirm}/>
                    <Typography style={errorStyle}>{error.confirm}</Typography>

                    <FormControlLabel className='label-check-terms'
                        control={<Checkbox checked={checked} onChange={handleOnchangeChecked} style={{color: 'black'}}/>}
                        label={
                            <div>
                               <span>I accept the </span>
                               <Link to={'#'}>Terms of Use</Link>
                            </div>
                            }
                    />
                    <Button type='button' 
                            style={buttonStyle} 
                            onClick={register} 
                            variant='contained' 
                            disabled={!checked}
                            fullWidth>
                        Sign Up
                    </Button>
                    <Typography>
                        Already have an account? <Link to={'/login'}>Sign in</Link>
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
    );
}

export default Register;