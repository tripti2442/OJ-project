import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  const [token, setToken] = useState(null);

 /* useEffect(() => {
    //const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); */

  return (
   //private routes
    <Router>
       <div className="App">
    
        <Route exact path="/" component={Login} />
        <Route exact path="/login">
          {token ? < Redirect to="/home" /> : <Login />}
        </Route>
        <Route exact path="/signup">
          {token ? < Redirect to="/home" /> : <Signup />}
        </Route>
        <Route exact path="/home">
          {token ? <Home /> : < Redirect to="/login" />}
        </Route>
        </div>
     
    </Router>
    
  );
}

export default App;
