
import React from 'react';
import 'tailwindcss/tailwind.css';
import logo from '../assets/Group 12.png';
import { Link } from 'react-router-dom';

const LoginRegister = () => {
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
              placeholder="Username"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
            />
            <button className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full md:w-3/4">
              Submit
            </button>
            <a href="#" className="text-sm font-semibold mt-4">
              Forgot Password?
            </a>
          </div>

          {/* Vertical line */}
          <div className="border-t md:border-l border-gray-300 md:border-t-0"></div>

          {/* Right side - Register as Member */}
          <div className="flex flex-col items-center justify-center p-6 md:p-10 w-full md:w-1/2">
            <h2 className="text-center text-red-500 text-lg md:text-xl mb-4 font-semibold">Register as Member</h2>
            <input
              type="text"
              placeholder="Username"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
            />
            <input
              type="password"
              placeholder="Change Password"
              className="border-b mb-4 p-4 w-full md:w-3/4 outline-none text-center"
            />
            <button className="bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700 w-full md:w-3/4">
              Submit
            </button>
            <a href="#" className="text-sm font-semibold mt-4">
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="flex justify-center sm:justify-start md:justify-center lg:justify-end xl:justify-end 2xl:justify-end w-full mt-10 md:mt-20">
          <Link to="/companyform">
            <button className="bg-red-600 text-white py-2 px-4 hover:bg-red-700">
              Next
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
