import React, { useState } from 'react';
import { login } from '../services/api';
import { Navigate , Link , useNavigate } from 'react-router-dom';
import Admin from './Admin';
import User from './User';
/*import { useAuthContext } from "../context/AuthContext"*/

export default function Login() {
  console.log("hello");
  const navigate = useNavigate();
  /*const {authUser , setAuthUser}= useAuthContext();*/
  const [tokenrole, setTokenRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [secretKey, setSecretKey] = useState("");
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    role: '',
    secretKey: ''
  });

  const handleLogin = (event) => {
    event.preventDefault();
    let isValid = true;

    if (role === 'admin' && secretKey.trim() === '') {
      setErrors(prev => ({ ...prev, secretKey: 'Secret key is required for admin role.' }));
      isValid = false;
    }

    if (isValid) {
      
      const dataPromise = login( email, password, role, secretKey);
      dataPromise.then((data) => {
          if (data.message === 'Incorrect Password') {
              setErrors(prev => ({ ...prev, password: data.message }));
          } else if(data.message === 'Incorect Admin Key'){
              setErrors(prev => ({ ...prev, secretKey: data.message }));
          }
          else if(data.message === 'User not found'){
            setErrors(prev => ({ ...prev, email: data.message }));
        }
          else {
              console.log(data.user.role);
             
              localStorage.setItem('token', data.token);
              /*setAuthUser(data.token);*/
              localStorage.setItem('role', data.role);
            
              if (data.user.role === 'admin') {
                navigate("/protected/admin");
              } else if(data.user.role === 'user') {
                navigate("/protected/user");
              }
              else{
                navigate("/login");
              }
              setErrors(prev => ({ ...prev, email: '' }));
              setErrors(prev => ({ ...prev, secretKey: data.message }));
              
              
          }


      }).catch((error) => {
          console.error('Login failed:', error);
      });
  }
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      setErrors(prev => ({ ...prev, email: '' }));
    } else if (name === 'password') {
      setPassword(value);
      setErrors(prev => ({ ...prev, password: '' }));
    } else if (name === 'role') {
      setRole(value);
      setErrors(prev => ({ ...prev, role: '' }));
      if (value !== 'admin') {
        setSecretKey('');
        setErrors(prev => ({ ...prev, secretKey: '' }));
      }
    } else if (name === 'secretKey') {
      setSecretKey(value);
      setErrors(prev => ({ ...prev, secretKey: '' }));
    }
  };



  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-600 text-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-6 text-center text-white">Login</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            className="w-full p-2 border text-black border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            className="w-full p-2 border text-black border-gray-300 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="role">
            Role:
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleChange}
            required
            className="w-full p-2 border text-black border-gray-300 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>
        {role === 'admin' && (
          <div className="mb-4">
            <label className="block mb-2" htmlFor="secretKey">
              Secret Key:
            </label>
            <input
              id="secretKey"
              type="password"
              name="secretKey"
              value={secretKey}
              onChange={handleChange}
              required
              className="w-full p-2 border text-black border-gray-300 rounded"
            />
            {errors.secretKey && <p className="text-red-500 text-sm mt-1">{errors.secretKey}</p>}
          </div>
        )}
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?  <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>
      </form>
    </div>
  );
}














/*import React, { useState } from 'react'
import { login } from '../services/api';

export default function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
  const handleLogin=(event)=>{
     event.preventDefault();
     const data=login(email,password);
     console.log(data);
     
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-600 text-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-6 text-center text-white">Login</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border text-black border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border text-black border-gray-300 rounded"
          />
        </div>
        
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account? Signup
          
        </p>
    
      </form>
    </div>
  )
}
*/