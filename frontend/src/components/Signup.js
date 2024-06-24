import React, { useState } from 'react';
import { signup } from '../services/api'; // Assuming signup function is imported correctly
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+91');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        general: '',
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
            const dataPromise = signup(name, phone, email, password);
            dataPromise.then((data) => {
               
                if (data.message === 'Email already exists') {
                    setErrors(prev => ({ ...prev, email: data.message }));
                } else {
                    console.log(data.token);
                    localStorage.setItem("token", data.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                    if(data.token){
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
