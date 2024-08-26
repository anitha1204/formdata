import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import logo from '../assets/Group 12.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const Register = () => {
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name.trim()]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post('https://formdata1.onrender.com/api/auth/register', {
                username: registerData.username,
                email: registerData.email,
                password: registerData.password
            });
            if (response && response.data) {
                console.log('Registration successful:', response.data);
                toast.success('Registration successful');
                setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
                setTimeout(() => {
                    navigate('/'); // Redirect to login page
                }, 2000); // Delay to allow toast message to display
            }
        } catch (error) {
            console.error('Error during registration:', error.response?.data);
            toast.error('Registration failed: ' + (error.response?.data?.msg || 'An error occurred'));
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 md:p-8">
                <div className="flex md:flex-row rounded-lg overflow-hidden w-full max-w-md bg-white shadow-xl">
                    <div className="flex flex-col items-center justify-center p-6 md:p-10 w-full mb-8 md:mb-0">
                        <img src={logo} alt="Logo" className="w-24 md:w-44 mx-auto" />
                        <h2 className="text-center text-red-500 text-lg md:text-xl mt-6 font-semibold">Register as member</h2>
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
                        <div className="relative w-full md:w-3/4">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                className="border-b mb-4 p-4 w-full outline-none text-center pr-10"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <HiOutlineEyeOff className="text-gray-500" /> : <HiOutlineEye className="text-gray-500" />}
                            </div>
                        </div>
                        <div className="relative w-full md:w-3/4">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="border-b mb-4 p-4 w-full outline-none text-center pr-10"
                                value={registerData.confirmPassword}
                                onChange={handleRegisterChange}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <HiOutlineEyeOff className="text-gray-500" /> : <HiOutlineEye className="text-gray-500" />}
                            </div>
                        </div>
                        <button onClick={handleRegisterSubmit} className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full md:w-3/4">
                            Register
                        </button>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default Register;




// import React, { useState } from 'react';
// import axios from 'axios';
// import 'tailwindcss/tailwind.css';
// import logo from '../assets/Group 12.png';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

// const Register = () => {
//     const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const navigate = useNavigate();

//     const handleRegisterChange = (e) => {
//         setRegisterData({ ...registerData, [e.target.name.trim()]: e.target.value });
//     };

//     const handleRegisterSubmit = async (e) => {
//         e.preventDefault();
//         if (registerData.password !== registerData.confirmPassword) {
//             toast.error("Passwords do not match!");
//             return;
//         }
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/register', {
//                 username: registerData.username,
//                 email: registerData.email,
//                 password: registerData.password
//             });
//             if (response && response.data) {
//                 console.log('Registration successful:', response.data);
//                 toast.success('Registration successful');
//                 setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
//                 setTimeout(() => {
//                     navigate('/'); // Redirect to login page
//                 }, 2000); // Delay to allow toast message to display
//             }
//         } catch (error) {
//             console.error('Error during registration:', error.response?.data);
//             toast.error('Registration failed: ' + (error.response?.data?.msg || 'An error occurred'));
//         }
//     };

//     return (
//         <>
//             <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 md:p-8">
//                 <div className="flex md:flex-row rounded-lg overflow-hidden w-full max-w-md bg-white shadow-xl">
//                     <div className="flex flex-col items-center justify-center p-6 md:p-10 w-full mb-8 md:mb-0">
//                         <img src={logo} alt="Logo" className="w-24 md:w-44 mx-auto" />
//                         <h2 className="text-center text-red-500 text-lg md:text-xl mt-6 font-semibold">Register as member</h2>
//                         <input
//                             type="text"
//                             name="username"
//                             placeholder="Username"
//                             className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
//                             value={registerData.username}
//                             onChange={handleRegisterChange}
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
//                             value={registerData.email}
//                             onChange={handleRegisterChange}
//                         />
//                         <div className="relative w-full md:w-3/4">
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 name="password"
//                                 placeholder="Password"
//                                 className="border-b mb-4 p-4 w-full outline-none text-center pr-10"
//                                 value={registerData.password}
//                                 onChange={handleRegisterChange}
//                             />
//                             <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
//                                 {showPassword ? <HiOutlineEyeOff className="text-gray-500" /> : <HiOutlineEye className="text-gray-500" />}
//                             </div>
//                         </div>
//                         <div className="relative w-full md:w-3/4">
//                             <input
//                                 type={showConfirmPassword ? 'text' : 'password'}
//                                 name="confirmPassword"
//                                 placeholder="Confirm Password"
//                                 className="border-b mb-4 p-4 w-full outline-none text-center pr-10"
//                                 value={registerData.confirmPassword}
//                                 onChange={handleRegisterChange}
//                             />
//                             <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                                 {showConfirmPassword ? <HiOutlineEyeOff className="text-gray-500" /> : <HiOutlineEye className="text-gray-500" />}
//                             </div>
//                         </div>
//                         <button onClick={handleRegisterSubmit} className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full md:w-3/4">
//                             Register
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <ToastContainer />
//         </>
//     );
// };

// export default Register;
