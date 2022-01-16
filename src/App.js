import { Route, Routes } from 'react-router';
import React, { useState } from 'react'
import './App.css';
import Login from './Component/Login';
import Register from './Component/Register';
import TopNavBar from './Component/AppBar';
function App() {

  const [isLogin, setIsLogin] = useState(localStorage.getItem("token") != null);
  const onLogoutSuccess = () => {
    setIsLogin(false);
    localStorage.clear();
    console.log("Logout success");
  }
  const onLoginSuccess = () => {
    setIsLogin(true);
    console.log("Login success");
  }

  return  (
    <div>
      { isLogin ? <TopNavBar brandName={""} onLogoutSuccess={onLogoutSuccess}></TopNavBar> : 
      <div></div>}
    <Routes>
      <Route path='/' element={<Login onLoginSuccess={onLoginSuccess}/>}/>
      <Route path='/register' element={<Register/>}/>
      
    </Routes>
    </div>
  );
}

export default App;