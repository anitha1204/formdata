



import React from 'react';
import logo from '../assets/Group 12.png';


const CompanyForm = () => {

  return (
    <>

      <section id="sidebar" className="fixed top-0 left-0 w-64 h-full  z-2000 font-lato transition-transform transform duration-300 ease-in-out overflow-x-hidden">
        <div className="brand text-2xl font-bold h-14 flex items-center text-blue-500 sticky top-0 left-0  z-500 pb-5 box-content">

          <img src={logo} alt="" className='ml-12 w-[150px] h-18 mt-10' />
        </div>
        <div className="flex flex-1">
          <div className="flex flex-col border-r border-red-600 ml-20 h-[600px] mt-4">
            <div className="flex-grow mr-20">
              <ul className="flex flex-col space-y-10 mt-16 items-center">
                <li className="text-center text-red-500 text-lg md:text-2xl font-semibold cursor-pointer relative group">
                  Profile
                  {/* <span className="block h-1 bg-red-500 absolute left-0 bottom-0 w-0 group-hover:w-full transition-all duration-300 rounded-3xl"></span> */}
                </li>
                <li className="text-center text-red-500 text-lg md:text-2xl font-semibold cursor-pointer relative group">
                  Connect
                </li>
                <li className="text-center text-red-500 text-lg md:text-2xl font-semibold cursor-pointer relative group">
                  Settings
                </li>
              </ul>
            </div>
            <button className="mb-10 bg-red-600 text-lg text-white p-2 hover:bg-red-700 cursor-pointer rounded-3xl w-[130px]">Logout</button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <form className="flex-1 grid grid-cols-3 gap-4 p-10 ml-[300px] mt-24">

        {/* First row */}
        <div className="col-span-1 flex flex-col">
          <label className="mb-2">Name of the company</label>
          <input type="text" className="border rounded-xl p-2 outline-none" />
        </div>
        <div className="col-span-1 flex flex-col">
          <label className="mb-2">Telephone / Landline Number</label>
          <input type="text" className="border rounded-xl p-2 outline-none" />
        </div>
        <div className="col-span-1 flex flex-col">
          <label className="mb-2">No of Employees</label>
          <select className="border rounded-xl p-2 outline-none"> </select>
        </div>

        {/* Second row */}
        <div className="col-span-1 flex flex-col">
          <label className="mb-2">Address</label>
          <input type="text" className="border rounded-xl p-6 outline-none" />
        </div>
        <div className="col-span-1 flex flex-col">
          <label className="">Email Address</label>
          <input type="email" className="border rounded-xl p-2 outline-none" />
        </div>
        <div className="col-span-1 flex flex-col">
          <label className="">Annual Turnover</label>
          <input type="text" className="border rounded-xl p-2 outline-none" />
        </div>

        {/* Third row */}
        <div className="col-span-1 flex flex-col">
          <label className="mb-2">Address of registered Office</label>
          <input type="text" className="border rounded-xl p-6 outline-none" />
        </div>
        <div className="col-span-1 flex flex-col">
          <label className=" ">Mobile Number</label>
          <input type="text" className="border rounded-xl p-2 outline-none" />
        </div>
        <div className="col-span-1 flex flex-col">
          <label className="">GST No</label>
          <input type="text" className="border rounded-xl p-2 outline-none" />
        </div>

        {/* Fourth row */}
        <div className="col-span-1 flex flex-col">
          <label className="mb-2">Name of the chief executive</label>
          <input type="text" className="border rounded-xl p-2 outline-none" />
        </div>
        <div className="col-span-1 flex flex-col mb-[-2]">
          <label className="">Website</label>
          <input type="text" className="border rounded-xl p-2 outline-none" />
        </div>
        <div className="col-span-1 flex flex-col">
          <label className="">Nature of Company</label>
          <select className="border rounded-xl p-2 outline-none"> </select>
        </div>

        {/* Fifth row */}
        <div className="col-span-1 flex flex-col">
          <label className="mb-2">Designation</label>
          <input type="text" className="border rounded-xl p-2 outline-none" />
        </div>
        <div className="col-span-1 flex flex-col">
          <label className="mb-2">Business / Major Line of Activity</label>
          <input type="text" className="border rounded-xl p-2 outline-none" />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2'>
          <div className="col-span-1 flex flex-col">
            <label className="mb-2">Key contact Person</label>
            <input type="text" className="border rounded-xl p-2 outline-none" />
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-2">Mobile Number</label>
            <input type="text" className="border rounded-xl p-2 outline-none" />
          </div>
        </div>
        {/* Sixth row */}
        <div className="col-span-1 flex flex-col">
          <label className="mb-2">Year of Establishment</label>
          <select className="border rounded-xl p-2 outline-none"></select>
        </div>
        <div className="col-span-1 flex flex-col">
          <label className="mb-2">Paid up Capital</label>
          <input type="text" className="border rounded-xl p-2 outline-none" />
        </div>


        {/* Seventh row */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2'>
          <div className="col-span-1 flex flex-col">
            <label className="">Secondary contact Person</label>
            <input type="text" className="border rounded-xl p-2 outline-none" />
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="">Mobile Number</label>
            <input type="text" className="border rounded-xl p-2 outline-none" />
          </div>
        </div>
      </form>

    </>
  );
};

export default CompanyForm;

