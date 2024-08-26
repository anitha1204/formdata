


import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import logo from '../assets/Group 12.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const Login = () => {
  const [loginData, setLoginData] = useState({ usernameOrEmail: '', password: '' });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [resetPasswordData, setResetPasswordData] = useState({ token: '', newPassword: '' });
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [isResetPasswordFormOpen, setResetPasswordFormOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleResetPasswordChange = (e) => {
    setResetPasswordData({ ...resetPasswordData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://formdata1.onrender.com/api/auth/login', loginData);
      if (response && response.data) {
        console.log('Login successful:', response.data);
        toast.success('Login successful');
        localStorage.setItem('token', response.data.token);
        setLoginData({ usernameOrEmail: '', password: '' });

        // Navigate to the membership page after successful login
        navigate('/membership');
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data);
      toast.error('Login failed: ' + (error.response?.data?.msg || 'An error occurred'));
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://formdata1.onrender.com/api/auth/forgot-password', { email: forgotPasswordEmail });
      if (response && response.data) {
        console.log('Password reset email sent:', response.data);
        toast.success('Password reset email sent');
        setForgotPasswordEmail('');
        setForgotPasswordModalOpen(false);
        setResetPasswordFormOpen(true);
      }
    } catch (error) {
      console.error('Error during password reset request:', error.response?.data);
      toast.error('Error: ' + (error.response?.data?.msg || 'An error occurred'));
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://formdata1.onrender.com/api/auth/reset-password', resetPasswordData);
      if (response && response.data) {
        console.log('Password reset successful:', response.data);
        toast.success('Password reset successful');
        setResetPasswordData({ token: '', newPassword: '' });
        setResetPasswordFormOpen(false);
      }
    } catch (error) {
      console.error('Error during password reset:', error.response?.data);
      toast.error('Error: ' + (error.response?.data?.msg || 'An error occurred'));
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 md:p-8">
        <div className="flex md:flex-row rounded-lg overflow-hidden w-full max-w-md bg-white shadow-xl">
          <div className="flex flex-col items-center justify-center p-6 md:p-10 w-full mb-8 md:mb-0">
            <img src={logo} alt="Logo" className="w-24 md:w-44 mx-auto" />
            <h2 className="text-center text-red-500 text-lg md:text-xl mt-12 font-semibold">Sign in to the MCCI</h2>
            <input
              type="text"
              name="usernameOrEmail"
              placeholder="Username or Email"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center mt-2"
              value={loginData.usernameOrEmail}
              onChange={handleLoginChange}
            />
            <div className="relative w-full md:w-3/4">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="border-b mb-4 p-4 w-full outline-none text-center"
                value={loginData.password}
                onChange={handleLoginChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
                  <HiOutlineEyeOff className="cursor-pointer text-xl" onClick={togglePasswordVisibility} />
                ) : (
                  <HiOutlineEye className="cursor-pointer text-xl" onClick={togglePasswordVisibility} />
                )}
              </div>
            </div>
            <button onClick={handleLoginSubmit} className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full md:w-3/4">
              Submit
            </button>
            <button onClick={() => setForgotPasswordModalOpen(true)} className="mt-4 hover:underline">
              Forgot Password?
            </button>
            <button onClick={() => navigate('/register')} className="text-center text-lg md:text-xl mt-4 font-semibold text-red-600 hover:underline">
              For New Registration
            </button>
          </div>
        </div>
      </div>

      {isForgotPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
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
            <button onClick={() => setForgotPasswordModalOpen(false)} className="mt-4 text-red-600 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}

      {isResetPasswordFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
            <div className="relative w-full">
              <input
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                placeholder="New Password"
                className="border-b mb-4 p-4 w-full outline-none text-center"
                value={resetPasswordData.newPassword}
                onChange={handleResetPasswordChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showNewPassword ? (
                  <HiOutlineEyeOff className="cursor-pointer text-xl" onClick={toggleNewPasswordVisibility} />
                ) : (
                  <HiOutlineEye className="cursor-pointer text-xl" onClick={toggleNewPasswordVisibility} />
                )}
              </div>
            </div>
            <button onClick={handleResetPasswordSubmit} className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full">
              Reset Password
            </button>
            <button onClick={() => setResetPasswordFormOpen(false)} className="mt-4 text-red-600 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}
      
      <ToastContainer />
    </>
  );
};

export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';
// import 'tailwindcss/tailwind.css';
// import logo from '../assets/Group 12.png';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

// const Login = () => {
//   const [loginData, setLoginData] = useState({ usernameOrEmail: '', password: '' });
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
//   const [resetPasswordData, setResetPasswordData] = useState({ token: '', newPassword: '' });
//   const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
//   const [isResetPasswordFormOpen, setResetPasswordFormOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLoginChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleForgotPasswordChange = (e) => {
//     setForgotPasswordEmail(e.target.value);
//   };

//   const handleResetPasswordChange = (e) => {
//     setResetPasswordData({ ...resetPasswordData, [e.target.name]: e.target.value });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleNewPasswordVisibility = () => {
//     setShowNewPassword(!showNewPassword);
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://formdata1.onrender.com/api/auth/login', loginData);
//       if (response && response.data) {
//         console.log('Login successful:', response.data);
//         toast.success('Login successful');
//         localStorage.setItem('token', response.data.token);
//         setLoginData({ usernameOrEmail: '', password: '' });

//         // Navigate to the membership page after successful login
//         navigate('/membership');
//       }
//     } catch (error) {
//       console.error('Error during login:', error.response?.data);
//       toast.error('Login failed: ' + (error.response?.data?.msg || 'An error occurred'));
//     }
//   };

//   const handleForgotPasswordSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://formdata1.onrender.com/api/auth/forgot-password', { email: forgotPasswordEmail });
//       if (response && response.data) {
//         console.log('Password reset email sent:', response.data);
//         toast.success('Password reset email sent');
//         setForgotPasswordEmail('');
//         setForgotPasswordModalOpen(false);
//         setResetPasswordFormOpen(true);
//       }
//     } catch (error) {
//       console.error('Error during password reset request:', error.response?.data);
//       toast.error('Error: ' + (error.response?.data?.msg || 'An error occurred'));
//     }
//   };

//   const handleResetPasswordSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://formdata1.onrender.com/api/auth/reset-password', resetPasswordData);
//       if (response && response.data) {
//         console.log('Password reset successful:', response.data);
//         toast.success('Password reset successful');
//         setResetPasswordData({ token: '', newPassword: '' });
//         setResetPasswordFormOpen(false);
//       }
//     } catch (error) {
//       console.error('Error during password reset:', error.response?.data);
//       toast.error('Error: ' + (error.response?.data?.msg || 'An error occurred'));
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 md:p-8">
//         <div className="flex md:flex-row rounded-lg overflow-hidden w-full max-w-md bg-white shadow-xl">
//           <div className="flex flex-col items-center justify-center p-6 md:p-10 w-full mb-8 md:mb-0">
//             <img src={logo} alt="Logo" className="w-24 md:w-44 mx-auto" />
//             <h2 className="text-center text-red-500 text-lg md:text-xl mt-12 font-semibold">Sign in to the MCCI</h2>
//             <input
//               type="text"
//               name="usernameOrEmail"
//               placeholder="Username or Email"
//               className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center mt-2"
//               value={loginData.usernameOrEmail}
//               onChange={handleLoginChange}
//             />
//             <div className="relative w-full md:w-3/4">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Password"
//                 className="border-b mb-4 p-4 w-full outline-none text-center"
//                 value={loginData.password}
//                 onChange={handleLoginChange}
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                 {showPassword ? (
//                   <HiOutlineEyeOff className="cursor-pointer text-xl" onClick={togglePasswordVisibility} />
//                 ) : (
//                   <HiOutlineEye className="cursor-pointer text-xl" onClick={togglePasswordVisibility} />
//                 )}
//               </div>
//             </div>
//             <button onClick={handleLoginSubmit} className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full md:w-3/4">
//               Submit
//             </button>
//             <button onClick={() => setForgotPasswordModalOpen(true)} className="mt-4 hover:underline">
//               Forgot Password?
//             </button>
//             <button onClick={() => navigate('/register')} className="text-center text-lg md:text-xl mt-4 font-semibold text-red-600 hover:underline">
//               For New Registration
//             </button>
//           </div>
//         </div>
//       </div>

//       {isForgotPasswordModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
//             <h2 className="text-red-500 text-lg font-semibold mb-4">Forgot Password</h2>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="border-b mb-4 p-4 w-full outline-none text-center"
//               value={forgotPasswordEmail}
//               onChange={handleForgotPasswordChange}
//             />
//             <button onClick={handleForgotPasswordSubmit} className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full">
//               Send Reset Email
//             </button>
//             <button onClick={() => setForgotPasswordModalOpen(false)} className="mt-4 text-red-600 hover:underline">
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {isResetPasswordFormOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
//             <h2 className="text-red-500 text-lg font-semibold mb-4">Reset Password</h2>
//             <input
//               type="text"
//               name="token"
//               placeholder="Reset Token"
//               className="border-b mb-4 p-4 w-full outline-none text-center"
//               value={resetPasswordData.token}
//               onChange={handleResetPasswordChange}
//             />
//             <div className="relative w-full">
//               <input
//                 type={showNewPassword ? 'text' : 'password'}
//                 name="newPassword"
//                 placeholder="New Password"
//                 className="border-b mb-4 p-4 w-full outline-none text-center"
//                 value={resetPasswordData.newPassword}
//                 onChange={handleResetPasswordChange}
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                 {showNewPassword ? (
//                   <HiOutlineEyeOff className="cursor-pointer text-xl" onClick={toggleNewPasswordVisibility} />
//                 ) : (
//                   <HiOutlineEye className="cursor-pointer text-xl" onClick={toggleNewPasswordVisibility} />
//                 )}
//               </div>
//             </div>
//             <button onClick={handleResetPasswordSubmit} className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full">
//               Reset Password
//             </button>
//             <button onClick={() => setResetPasswordFormOpen(false)} className="mt-4 text-red-600 hover:underline">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
      
//       <ToastContainer />
//     </>
//   );
// };

// export default Login;
