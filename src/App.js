import Canvas from "./GrapeJs/Canvas";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SaveLoad from './components/SaveLoad/SaveLoad'
const App = () => {
  return(
    <div>
      <BrowserRouter>
        <Routes >
          <Route path='/editor/:idStore' element={<Canvas type={2}/>}/>
          <Route path='/load' element={<SaveLoad open={true} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
