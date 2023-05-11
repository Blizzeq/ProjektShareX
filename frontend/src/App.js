import React from "react";
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from "./Components/Register/Register";
import Reset from "./Components/Reset/Reset";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import {AuthGuard} from "./guards/auth.guard";
import {Role} from "./models/role";
import {NotFound} from "./Components/NotFound/NotFound";
import {Unauthorized} from "./Components/Unauthorized/Unauthorized";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />

            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/404" element={<NotFound />}/>
            <Route path="/401" element={<Unauthorized />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
