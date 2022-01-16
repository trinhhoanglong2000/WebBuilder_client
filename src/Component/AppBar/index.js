import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from '@mui/icons-material/Logout';
import { Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import './index.css'

export default function TopNavBar({ brandName, onLogoutSuccess }) {
	const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
	const [show, setShow] = React.useState(false);
  const [url] = React.useState("/profile/" + localStorage.getItem("userId"));

	let navigate = useNavigate();
  let location = useLocation();


  const logout = () => {
    localStorage.removeItem("token");
    onLogoutSuccess();
    console.log("Location: " + location.pathname);
    if (location.pathname !== "/") {
      navigate("/")
    }
    else {
      window.location.reload()
    }
  }
	const nameOnChangeHandler = (e) => setName(e.target.value);
  const descriptionOnChangeHandler = (e) => setDescription(e.target.value);
	const onHandleModalClose = () => setShow(false);
	const onHandleModalShow = () => setShow(true);
  const onHandleProfileOnClick = () => { navigate(url); }
  const onHandleGoHome = () => {navigate("/")}
 
  
  return (
    <Box className="nav-bar" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
           <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> 
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {brandName}
          </Typography>
          
            <div>  
              <IconButton
                size="large"
                aria-label="logout"
                aria-controls="menu-appbar"
                color="inherit"
                onClick={logout}
              >
                <LogoutIcon/>
              </IconButton>
            </div>
            
        </Toolbar>
      </AppBar>
      
    </Box>
  );
}
