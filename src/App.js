import Canvas from "./GrapeJs/Canvas";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
const App = () => {
  return(
    <div>
      <BrowserRouter>
        <Routes >
          <Route path='/editor/:idStore' element={<Canvas type={2}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
