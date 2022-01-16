import React, {useState} from "react";
import {Link} from 'react-router-dom'
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Register = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();


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
    const handleOnchangeConfirm = (e) => {
        setConfirm(e.target.value);
    }

    const register = () => {
        if (password !== confirm) {
            alert("Password does not match!");
            return;
        }
        if (password === "" || confirm === "") {
            alert("You must fill in username and password!");
        }
        if (username !== "") {
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
        <Grid>
            <Paper elevation={10} style ={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required onChange={handleOnchangeUsername}/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleOnchangePassword}/>
                <TextField label='Confirm Password' placeholder='Enter password again' type='password' fullWidth required onChange={handleOnchangeConfirm}/>
                <Button type='button' style={buttonStyle} color='primary' variant='contained' fullWidth onClick={register}>Sign Up</Button>
                <Typography>
                    Already have an account?
                    <Link to="/"> Sign In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Register;