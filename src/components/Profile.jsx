import React from "react";
import logo from "../assets/Group 12.png";
import profileImg from "../assets/img.png";

const Profile = () => {
  const data = [
    {
      companyName: "4SPL Technologies India Pvt Ltd",
      contactPerson: "Rajasekar",
      mobileNumber: "+91 98765 43210",
      address: "4th Cross St, West Tambaram, Chennai",
      website: "4spl.com",
    },
    {
      companyName: "4SPL Technologies India Pvt Ltd",
      contactPerson: "Rajasekar",
      mobileNumber: "+91 98765 43210",
      address: "4th Cross St, West Tambaram, Chennai",
      website: "4spl.com",
    },
    {
      companyName: "4SPL Technologies India Pvt Ltd",
      contactPerson: "Rajasekar",
      mobileNumber: "+91 98765 43210",
      website: "4spl.com",
      address: "4th Cross St, West Tambaram, Chennai",
    },
  ];
  return (
    <>
      <section className="fixed top-0 left-0 w-64 h-full z-2000 font-lato transition-transform transform duration-300 ease-in-out overflow-x-hidden flex flex-col">
        <div className="brand text-2xl font-bold h-14 flex items-center text-blue-500 mt-10 mb-5 justify-center">
          <img src={logo} alt="" className="w-[150px] h-18" />
        </div>
        <div className="flex flex-col items-center flex-grow border-r border-red-600">
          <ul className="flex flex-col space-y-10 mt-16 items-center">
            <li className="text-center text-red-500 text-lg md:text-2xl font-semibold cursor-pointer relative group">
              Profile
            </li>
            <li className="text-center text-red-500 text-lg md:text-2xl font-semibold cursor-pointer relative group">
              Connect
            </li>
            <li className="text-center text-red-500 text-lg md:text-2xl font-semibold cursor-pointer relative group">
              Settings
            </li>
          </ul>
          <div className="flex flex-grow"></div>{" "}
          <div className="mb-10">
            <button className="bg-red-600 text-lg text-white p-2 hover:bg-red-700 cursor-pointer rounded-3xl w-[130px]">
              Logout
            </button>
          </div>
        </div>
      </section>

      <div className="flex-1 space-y-8 mt-24 mx-4 ml-80">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 border-b pb-4"
          >
            <img
              src={profileImg}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="col-span-1">
                <p className="font-semibold">Name of the company</p>
                <p>{item.companyName}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Key contact Person</p>
                <p>{item.contactPerson}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Mobile Number</p>
                <p>{item.mobileNumber}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Website</p>
                <p>{item.website}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Address</p>
                <p>{item.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
