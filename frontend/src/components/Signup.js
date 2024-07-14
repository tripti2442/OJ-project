import React, { useState } from 'react';
import { signup } from '../services/api'; // Assuming signup function is imported correctly
import { Navigate , Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';


export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+91');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const [secretKey, setSecretKey] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        general: '',
        role: '',
        secretKey: ''
    });
    const [signupSuccess, setSignupSuccess] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhoneNumber = (phone) => {
        const re = /^\+91\d{10}$/;
        return re.test(phone);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    };

    const handleSignup = (event) => {
        event.preventDefault();
        let isValid = true;

        if (!validateEmail(email)) {
            setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
            isValid = false;
        }

        if (!validatePhoneNumber(phone)) {
            setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number starting with +91 and followed by 10 digits.' }));
            isValid = false;
        }

        if (!validatePassword(password)) {
            setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.' }));
            isValid = false;
        }

        if (role === 'admin' && secretKey.trim() === '') {
            setErrors(prev => ({ ...prev, secretKey: 'Secret key is required for admin role.' }));
            isValid = false;
        }

        if (isValid) {
            console.log("the role is ",role);
            const dataPromise = signup(name, phone, email, password, role, secretKey);
            dataPromise.then((data) => {
                if (data.message === 'Email already exists') {
                    setErrors(prev => ({ ...prev, email: data.message }));
                } else if(data.message === 'Incorect Admin Key'){
                    setErrors(prev => ({ ...prev, secretKey: data.message }));
                }
                else {
                    console.log(data.user.role);
                    
                    localStorage.setItem('token', data.token);
                   
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
                console.error('Signup failed:', error);
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
            setErrors(prev => ({ ...prev, email: '' }));
        } else if (name === 'phone') {
            setPhone(value);
            setErrors(prev => ({ ...prev, phone: '' }));
        } else if (name === 'name') {
            setName(value);
            setErrors(prev => ({ ...prev, name: '' }));
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

    /*if (signupSuccess) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <p className="text-white text-2xl">Signup successful! You can now navigate to your dashboard.</p>
            </div>
        );
    }*/

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                onSubmit={handleSignup}
                className="bg-gray-600 text-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl mb-6 text-center text-white">SignUp</h2>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="name">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        name="name"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="phone">
                        Phone Number:
                    </label>
                    <input
                        id="phone"
                        type="text"
                        value={phone}
                        name="phone"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        name="email"
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
                        value={password}
                        name="password"
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
                        value={role}
                        name="role"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded"
                    >
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
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
                            value={secretKey}
                            name="secretKey"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border text-black border-gray-300 rounded"
                        />
                        {errors.secretKey && <p className="text-red-500 text-sm mt-1">{errors.secretKey}</p>}
                    </div>
                )}
                {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}

                <button
                    type="submit"
                    className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Signup
                </button>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </form>
        </div>
    );
}
























/*import React, { useState } from 'react';
import { signup } from '../services/api'; // Assuming signup function is imported correctly
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+91');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        general: '',
        role: ''
    });
    const [signupSuccess, setSignupSuccess] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhoneNumber = (phone) => {
        const re = /^\+91\d{10}$/;
        return re.test(phone);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    };

    const handleSignup = (event) => {
        event.preventDefault();
        let isValid = true;

        if (!validateEmail(email)) {
            setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
            isValid = false;
        }

        if (!validatePhoneNumber(phone)) {
            setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number starting with +91 and followed by 10 digits.' }));
            isValid = false;
        }

        if (!validatePassword(password)) {
            setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.' }));
            isValid = false;
        }

        if (isValid) {
            const dataPromise = signup(name, phone, email, password, role);
            dataPromise.then((data) => {

                if (data.message === 'Email already exists') {
                    setErrors(prev => ({ ...prev, email: data.message }));
                } else {
                    console.log(data.token);
                    localStorage.setItem('token', data.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                    if (data.token) {
                        setSignupSuccess(true);
                    }
                    setErrors(prev => ({ ...prev, email: '' }));
                }
            }).catch((error) => {
                console.error('Signup failed:', error);
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
            setErrors(prev => ({ ...prev, email: '' }));
        }
        if (name === 'phone') {
            setPhone(value);
            setErrors(prev => ({ ...prev, phone: '' }));
        } else if (name === 'name') {
            setName(value);
            setErrors(prev => ({ ...prev, name: '' }));
        } else if (name === 'password') {
            setPassword(value);
            setErrors(prev => ({ ...prev, password: '' }));
        } else if (name === 'role') {
            setRole(value);
            setErrors(prev => ({ ...prev, role: '' }));
        }
    };

    if (signupSuccess) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <p className="text-white text-2xl">Signup successful! You can now navigate to your dashboard.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                onSubmit={handleSignup}
                className="bg-gray-600 text-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl mb-6 text-center text-white">SignUp</h2>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        name="name"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">
                        Phone Number:
                    </label>
                    <input
                        id="phone"
                        type="text"
                        value={phone}
                        name="phone"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        name="email"
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
                        value={password}
                        name="password"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="role">
                        Role:
                    </label>
                    <select
                        id="role"
                        value={role}
                        name="role"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded"
                    >
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                </div>
                {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}

                <button
                    type="submit"
                    className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Signup
                </button>
                <p className="mt-4 text-center">
                    Already have an account? Login
                </p>
            </form>
        </div>
    );
}
*/