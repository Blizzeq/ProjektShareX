import React from "react";
import {HashRouter , Route, Routes} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from "./Components/Register/Register";
import Reset from "./Components/Reset/Reset";
import Home from "./Components/Home/Home";


function App() {
  return (
    <HashRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path={"/home"} element={<Home />} />
        </Routes>
    </HashRouter>
  );
}

export default App;
