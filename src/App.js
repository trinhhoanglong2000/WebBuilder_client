import Canvas from "./GrapeJs/Canvas";
import React from "react";
import Login from "./component/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./component/Register";
const App = () => {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Canvas type={2}/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
