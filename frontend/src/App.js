import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Login from './components/Login';
import Signup from './components/Signup';
import Protected from './components/Protected';
import User from './components/User'; // Assuming you have a User component
import Compiler from './components/Compiler';
import { getRole, isLoggedIn } from './Auth';

function App() {
    // Initialize token state from localStorage
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    return (
        <Router>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/protected/:role/*" element={<Protected />} />
                <Route
                    path="/protected/user/compiler/:questionId"
                    element={isLoggedIn() ? <Compiler /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/login" />} />
                
                
                




            </Routes>
        </Router>
    );
}

export default App;








/*import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Login from './components/Login';
import Signup from './components/Signup';
import Protected from './components/Protected';
import User from './components/User'; // Assuming you have a User component

function App() {
    // Initialize token state from localStorage
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    return (
        <Router>
        <Router>
            <Routes>
              
                <Route path="/login" element={<Login />} />

              
                <Route path="/signup" element={<Signup />} />

              
                <Route path="/protected" element={<Protected />}>
                    
                    <Route path="user" element={<User />}>
                      <Route path="compiler/:questionId" element={<Compiler />} />
                    </Route>
                
                    
                    <Route path="admin" element={<Admin />} />
                </Route>
                

            
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;*/









/*


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Protected from './components/Protected';
import User from './components/User'; // Assuming you have a User component

function App() {
    // Initialize token state from localStorage
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    
    return (
        <Router>
            <Routes>
               

                <Route path="/login" element={ <Login />} />

                <Route path="/signup" element={ <Signup />} />
                
                <Route path="/protected" element={<Protected />} >
                    <Route path="/admin" element={ <Admin />} />
                    <Route path="/user" element={ <User />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;*/







/*import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Protected from './components/Protected';
import User from './components/User'; // Assuming you have a User component


function App() {
    const token= localStorage.getItem('token');

    return (
      <>
      <Router>
        <Routes>
          <Route path="/" element={token ? <Protected/> : <Navigate to={"/login"}/>} />
          <Route path="/login" element={token ? <Navigate to={"/"}/> : <Login/>} />
          <Route path="/signup" element={token ? <Navigate to={"/"}/> : <Signup/>} />
          <Route path="/admin" element={token ? <Admin/> : <Navigate to={"/login"}/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
   
        </Router> 
    </>
    );
}

export default App;*/









