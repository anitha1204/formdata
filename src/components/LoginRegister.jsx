import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import logo from '../assets/Group 12.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginRegister = () => {
  const [loginData, setLoginData] = useState({ usernameOrEmail: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [resetPasswordData, setResetPasswordData] = useState({ token: '', newPassword: '' });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name.trim()]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name.trim()]: e.target.value });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleResetPasswordChange = (e) => {
    setResetPasswordData({ ...resetPasswordData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      if (response && response.data) {
        console.log('Login successful:', response.data);
        toast.success('Login successful');
        localStorage.setItem('token', response.data.token);
        setLoginData({ usernameOrEmail: '', password: '' });
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data);
      toast.error('Login failed: ' + (error.response?.data?.msg || 'An error occurred'));
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password
      });
      if (response && response.data) {
        console.log('Registration successful:', response.data);
        toast.success('Registration successful');
        setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (error) {
      console.error('Error during registration:', error.response?.data);
      toast.error('Registration failed: ' + (error.response?.data?.msg || 'An error occurred'));
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email: forgotPasswordEmail });
      if (response && response.data) {
        console.log('Password reset email sent:', response.data);
        toast.success('Password reset email sent');
        setForgotPasswordEmail('');
        document.getElementById('forgot-password-modal').style.display = 'none';
        document.getElementById('reset-password-form').style.display = 'block';
      }
    } catch (error) {
      console.error('Error during password reset request:', error.response?.data);
      toast.error('Error: ' + (error.response?.data?.msg || 'An error occurred'));
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', resetPasswordData);
      if (response && response.data) {
        console.log('Password reset successful:', response.data);
        toast.success('Password reset successful');
        setResetPasswordData({ token: '', newPassword: '' });
        document.getElementById('reset-password-form').style.display = 'none';
      }
    } catch (error) {
      console.error('Error during password reset:', error.response?.data);
      toast.error('Error: ' + (error.response?.data?.msg || 'An error occurred'));
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white shadow-md rounded-lg p-4 md:p-8">
        <div className="mb-8">
          <img src={logo} alt="Logo" className="w-24 md:w-32 mx-auto" />
        </div>
        <div className="flex flex-col md:flex-row rounded-lg overflow-hidden w-full max-w-4xl">
          {/* Left side - Members login */}
          <div className="flex flex-col items-center justify-center p-6 md:p-10 w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-center text-red-500 text-lg md:text-xl mb-4 font-semibold">Members login</h2>
            <input
              type="text"
              name="usernameOrEmail"
              placeholder="Username or Email"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
              value={loginData.usernameOrEmail}
              onChange={handleLoginChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
              value={loginData.password}
              onChange={handleLoginChange}
            />
            <button onClick={handleLoginSubmit} className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full md:w-3/4">
              Submit
            </button>
            <button onClick={() => document.getElementById('forgot-password-modal').style.display = 'block'} className="mt-4 text-red-600 hover:underline">
              Forgot Password?
            </button>
          </div>
          
          {/* Right side - Register as member */}
          <div className="flex flex-col items-center justify-center p-6 md:p-10 w-full md:w-1/2">
            <h2 className="text-center text-red-500 text-lg md:text-xl mb-4 font-semibold">Register as member</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
              value={registerData.username}
              onChange={handleRegisterChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
              value={registerData.email}
              onChange={handleRegisterChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
              value={registerData.password}
              onChange={handleRegisterChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
            />
            <button onClick={handleRegisterSubmit} className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full md:w-3/4">
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <div id="forgot-password-modal" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 " style={{ display: 'none' }}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm  items-center justify-center">
          <h2 className="text-red-500 text-lg font-semibold mb-4">Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="border-b mb-4 p-4 w-full outline-none text-center"
            value={forgotPasswordEmail}
            onChange={handleForgotPasswordChange}
          />
          <button onClick={handleForgotPasswordSubmit} className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full">
            Send Reset Email
          </button>
          <button onClick={() => document.getElementById('forgot-password-modal').style.display = 'none'} className="mt-4 text-red-600 hover:underline">
            Close
          </button>
        </div>
      </div>

      {/* Reset Password Form */}
      <div id="reset-password-form" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 " style={{ display: 'none' }}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-red-500 text-lg font-semibold mb-4">Reset Password</h2>
          <input
            type="text"
            name="token"
            placeholder="Reset Token"
            className="border-b mb-4 p-4 w-full outline-none text-center"
            value={resetPasswordData.token}
            onChange={handleResetPasswordChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="border-b mb-4 p-4 w-full outline-none text-center"
            value={resetPasswordData.newPassword}
            onChange={handleResetPasswordChange}
          />
          <button onClick={handleResetPasswordSubmit} className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full">
            Reset Password
          </button>
          <button onClick={() => document.getElementById('reset-password-form').style.display = 'none'} className="mt-4 text-red-600 hover:underline">
            Close
          </button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default LoginRegister;
