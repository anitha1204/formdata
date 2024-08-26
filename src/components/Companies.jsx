
// import React, { useState } from 'react';
// import logo from '../assets/Group 12.png';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Companies = () => {
//     const [activeButton, setActiveButton] = useState('MCCI Membership');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [companyData, setCompanyData] = useState(null);
//     const [isSearching, setIsSearching] = useState(false);

//     // Update handleSearch function
//     const handleSearch = async (e) => {
//         e.preventDefault();
//         setIsSearching(true);
//         if (!searchTerm.trim()) {
//             setSearchResults([]);
//             setIsSearching(false);
//             return;
//         }
//         try {
//             const response = await axios.get(`https://formdata1.onrender.com/api/form/companies/search?name=${encodeURIComponent(searchTerm)}`);
//             setSearchResults(response.data);
//             console.log('Search results:', response.data);
//         } catch (error) {
//             console.error('Error fetching company data:', error.message);
//             setSearchResults([]);
//         }
//         setIsSearching(false);
//     };

//     const navigate = useNavigate(); // Initialize the useNavigate hook

//     // Function to handle navigation between different sections
//     const handleNavigation = (button) => {
//         setActiveButton(button);
//         switch (button) {
//             case 'MCCI Membership':
//                 navigate('/membership');
//                 break;
//             case 'Companies':
//                 navigate('/companies');
//                 break;
//             case 'Email to Members':
//                 navigate('/emailtomembers');
//                 break;
//             case 'Profile':
//                 navigate('/profile');
//                 break;
//             default:
//         }
//     };

// // Function to handle selection of a specific company from the search results
//     const handleSelectCompany = async (companyId) => {
//         try {
//             const response = await axios.get(`https://formdata1.onrender.com/api/form/companies/${companyId}`);
//             setCompanyData(response.data);
//             console.log('Selected company data:', response.data); // Add this line for debugging
//         } catch (error) {
//             console.error('Error fetching company details:', error.message);
//             setCompanyData(null);
//         }
//     };
//     return (
//         <div className="min-h-screen p-8">
//             <div>
//                 <div className="flex items-center justify-between mb-8">
//                     <div className="flex space-x-4 gap-10 ml-2">
//                         {['MCCI Membership', 'Companies', 'Email to Members', 'Profile'].map((button) => (
//                             <button
//                                 key={button}
//                                 className={`relative text-gray-500 pb-1 ${activeButton === button ? 'text-black border-b-2 border-red-500' : ''}`}
//                                 onClick={() => handleNavigation(button)}
//                             >
//                                 {button}
//                             </button>
//                         ))}
//                     </div>
//                     <img src={logo} alt="Logo" className="w-24 md:w-44" />
//                 </div>
//                 <div className="flex justify-between mb-8">
//                     <h2 className="text-xl font-bold ml-2">MCCI Membership Details</h2>
//                     <Link to="/LoginRegister">
//                         <h2 className="text-xl font-bold text-red-500 mr-2 cursor-pointer">MCCI Dashboard</h2>
//                     </Link>
//                 </div>
//             </div>
//             <div className="border border-red-500"></div>

//             <div className="grid md:grid-cols-[320px_380px_320px_300px] gap-4 mb-2">
//                 <div className="flex flex-col items-center flex-grow border-r border-red-700 ">
//                     <form onSubmit={handleSearch} className="w-full flex items-center justify-center ">
                        // <input
                        //     type="text"
                        //     placeholder="Search Companies"
                        //     value={searchTerm} // Bind input value to searchTerm state
                        //     onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                        //     className="border-b mb-4 p-2 w-80 mr-[45px] outline-none bg-gray-200 rounded-xl mt-10"
                        // />
//                         <button type="submit" className="hidden">Search</button>
//                     </form>

//                     <ul className="flex flex-col space-y-6 mt-4 mr-[70px]">
//                         {isSearching ? (
//                             <li>Searching...</li>
//                         ) : searchResults.length > 0 ? (
//                             searchResults.map((company) => (
//                                 <li
//                                     key={company._id}
//                                     onClick={() => handleSelectCompany(company._id)}
//                                     className="text-sm md:text-lg font-semibold cursor-pointer relative group"
//                                 >
//                                     {company.companyName}
//                                 </li>
//                             ))
//                         ) : (
//                             <li>No results found</li>
//                         )}
//                     </ul>

//                 </div>

//                 {/* Company details section */}
//                 <div className="grid grid-row-5 ml-4 mt-10 text-sm p-2 font-semibold">
//                     <div className="flex flex-col">
//                         <label className="mb-2">Name of the company</label>
//                         <input type="text" value={companyData?.companyName || ''} readOnly className="border rounded-xl p-2 outline-none" />
//                     </div>
//                     <div className="flex flex-col">
//                         <label className="mb-2">Address</label>
//                         <input type="text" value={companyData?.address || ''} readOnly className="border rounded-xl p-10 outline-none" />
//                     </div>
//                     <div className="flex flex-col">
//                         <label className="mb-2">Address of registered Office</label>
//                         <input type="text" value={companyData?.registeredOfficeAddress || ''} readOnly className="border rounded-xl p-10 outline-none" />
//                     </div>
//                     <div className="flex flex-col">
//                         <label className="mb-2">Name of the chief executive</label>
//                         <input type="text" value={companyData?.chiefExecutiveName || ''} readOnly className="border rounded-xl p-2 outline-none" />
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
//                         <div className="col-span-1 flex flex-col">
//                             <label className="mb-2">Designation</label>
//                             <input type="text" value={companyData?.designation || ''} readOnly className="border rounded-xl p-2 outline-none" />
//                         </div>
//                         <div className="col-span-1 flex flex-col">
//                             <label className="mb-2">Year of Establishment</label>
//                             <input type="text" value={companyData?.yearOfEstablishment || ''} readOnly className="border rounded-xl p-2 outline-none" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Additional company details */}
//                 <div className="grid grid-row-7 mt-10 text-sm p-2 font-semibold">
//                     <div className="col-span-1 flex flex-col">
//                         <label className="mb-2">Telephone / Landline Number</label>
//                         <input type="text" value={companyData?.telephone || ''} readOnly className="border rounded-xl p-2 outline-none" />
//                     </div>
//                     <div className="col-span-1 flex flex-col">
//                         <label className="mb-2">Email Address</label>
//                         <input type="email" value={companyData?.email || ''} readOnly className="border rounded-xl p-2 outline-none" />
//                     </div>
//                     <div className="col-span-1 flex flex-col">
//                         <label className="mb-2">Mobile Number</label>
//                         <input type="text" value={companyData?.mobile || ''} readOnly className="border rounded-xl p-2 outline-none" />
//                     </div>
//                     <div className="col-span-1 flex flex-col">
//                         <label className="mb-2">Website</label>
//                         <input type="text" value={companyData?.website || ''} readOnly className="border rounded-xl p-2 outline-none" />
//                     </div>
//                     <div className="col-span-1 flex flex-col">
//                         <label className="mb-2">Business / Major Line of Activity</label>
//                         <input type="text" value={companyData?.businessActivity || ''} readOnly className="border rounded-xl p-2 outline-none" />
//                     </div>
//                     <div className="col-span-1 flex flex-col">
//                         <label className="mb-2">Paid up Capital</label>
//                         <input type="text" value={companyData?.paidUpCapital || ''} readOnly className="border rounded-xl p-2 outline-none" />
//                     </div>
//                 </div>
//                 <div className="grid grid-row-7 mt-10 mr-8 text-sm p-2 font-semibold">
//                     <div className="col-span-1 flex flex-col">
//                         <label className="mb-2">GST No.</label>
//                         <input
//                             type="text"
//                             value={companyData?.gstNo || ''}
//                             readOnly
//                             className="border rounded-xl p-2 outline-none"
//                         />
//                     </div>
//                     <div className="col-span-1 flex flex-col">
//                         <label className="mb-2">Number of Employees</label>
//                         <input
//                             type="text"
//                             value={companyData?.numberOfEmployees || ''}
//                             readOnly
//                             className="border rounded-xl p-2 outline-none"
//                         />
//                     </div>
//                     <div className="col-span-1 flex flex-col">
//                         <label className="mb-2">Nature of the company</label>
//                         <input
//                             type="text"
//                             value={companyData?.natureOfCompany || ''}
//                             readOnly
//                             className="border rounded-xl p-2 outline-none"
//                         />
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
//                         <div className="col-span-1 flex flex-col">
//                             <label className="mb-2">Key contact Person</label>
//                             <input
//                                 type="text"
//                                 value={companyData?.keyContactPerson || ''}
//                                 readOnly
//                                 className="border rounded-xl p-2 outline-none"
//                             />
//                         </div>
//                         <div className="col-span-1 flex flex-col">
//                             <label className="mb-2">Mobile Number</label>
//                             <input
//                                 type="text"
//                                 value={companyData?.keyContactMobile || ''}
//                                 readOnly
//                                 className="border rounded-xl p-2 outline-none"
//                             />
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
//                         <div className="col-span-1 flex flex-col">
//                             <label className="mb-2">Secondary contact Person</label>
//                             <input
//                                 type="text"
//                                 value={companyData?.secondaryContactPerson || ''}
//                                 readOnly
//                                 className="border rounded-xl p-2 outline-none"
//                             />
//                         </div>
//                         <div className="col-span-1 flex flex-col">
//                             <label className="mb-2">Mobile Number</label>
//                             <input
//                                 type="text"
//                                 value={companyData?.secondaryContactMobile || ''}
//                                 readOnly
//                                 className="border rounded-xl p-2 outline-none"
//                             />
//                         </div>
//                     </div>

//                     <div className="col-span-1 flex flex-col w-[200px] ml-40">
//                         <button className="border rounded-xl p-2 outline-none bg-green-500 text-white hover:bg-green-600">
//                             DOWNLOAD AS PDF
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Companies;

import React, { useState, useEffect } from 'react';
import logo from '../assets/Group 12.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Companies = () => {
    const [activeButton, setActiveButton] = useState('MCCI Membership');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [companyData, setCompanyData] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('https://formdata1.onrender.com/api/form/companies');
                setSearchResults(response.data);
            } catch (error) {
                setError('Error fetching companies');
                console.error('Error fetching companies:', error.message);
            }
        };
        fetchCompanies();
    }, []);

    useEffect(() => {
        const results = searchResults.filter(company =>
            company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsSearching(true);
        setError('');
        if (!searchTerm.trim()) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }
        try {
            const response = await axios.get(`https://formdata1.onrender.com/api/form/companies/search?name=${encodeURIComponent(searchTerm)}`);
            setSearchResults(response.data);
        } catch (error) {
            setError('Error searching companies');
            console.error('Error fetching company data:', error.message);
            setSearchResults([]);
        }
        setIsSearching(false);
    };

    const handleNavigation = (button) => {
        setActiveButton(button);
        switch (button) {
            case 'MCCI Membership':
                navigate('/membership');
                break;
            case 'Companies':
                navigate('/companies');
                break;
            case 'Email to Members':
                navigate('/emailtomembers');
                break;
            case 'Profile':
                navigate('/profile');
                break;
            default:
        }
    };

    const handleSelectCompany = async (companyId) => {
        try {
            const response = await axios.get(`https://formdata1.onrender.com/api/form/companies/${companyId}`);
            setCompanyData(response.data);
        } catch (error) {
            setError('Error fetching company details');
            console.error('Error fetching company details:', error.message);
            setCompanyData(null);
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex space-x-4 gap-10 ml-2">
                        {['MCCI Membership', 'Companies', 'Email to Members', 'Profile'].map((button) => (
                            <button
                                key={button}
                                className={`relative text-gray-500 pb-1 ${activeButton === button ? 'text-black border-b-2 border-red-500' : ''}`}
                                onClick={() => handleNavigation(button)}
                            >
                                {button}
                            </button>
                        ))}
                    </div>
                    <img src={logo} alt="Logo" className="w-24 md:w-44" />
                </div>
                <div className="flex justify-between mb-8">
                    <h2 className="text-xl font-bold ml-2">MCCI Membership Details</h2>
                    <Link to="/LoginRegister">
                        <h2 className="text-xl font-bold text-red-500 mr-2 cursor-pointer">MCCI Dashboard</h2>
                    </Link>
                </div>
            </div>
            <div className="border border-red-500 mb-8"></div>

            <div className="grid md:grid-cols-[320px_380px_320px_300px] gap-4">
                <div className="flex flex-col items-center border-r border-red-700">
                    <form onSubmit={handleSearch} className="w-full flex flex-col items-center">
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-b mb-4 p-2 w-[300px] mr-[30px] outline-none bg-gray-200 rounded-xl mt-10"
                        />
                        <button type="submit" className="hidden">Search</button>
                    </form>
                    {error && <div className="text-red-500">{error}</div>}
                    {isSearching ? (
                        <p>Searching...</p>
                    ) : (
                        <ul className="flex flex-col space-y-6 mt-4 mr-[70px]">
                            {searchTerm && searchResults.length === 0 ? (
                                <li className="text-sm md:text-lg font-semibold">No results found</li>
                            ) : (
                                searchResults.map((company) => (
                                    <li
                                        key={company._id}
                                        onClick={() => handleSelectCompany(company._id)}
                                        className={`text-sm md:text-lg font-semibold cursor-pointer relative group ${
                                            searchTerm && company.companyName.toLowerCase() === searchTerm.toLowerCase() ? 'bg-gray-200' : ''
                                        }`}
                                    >
                                        {company.companyName}
                                    </li>
                                ))
                            )}
                        </ul>
                    )}
                </div>
                {/* Company details section */}
                <div className="grid grid-row-5 ml-4 mt-10 text-sm p-2 font-semibold">
                    <div className="flex flex-col">
                        <label className="mb-2">Name of the company</label>
                        <input type="text" value={companyData?.companyName || ''} readOnly className="border rounded-xl p-2 outline-none" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2">Address</label>
                        <input type="text" value={companyData?.address || ''} readOnly className="border rounded-xl p-10 outline-none" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2">Address of registered Office</label>
                        <input type="text" value={companyData?.registeredOfficeAddress || ''} readOnly className="border rounded-xl p-10 outline-none" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2">Name of the chief executive</label>
                        <input type="text" value={companyData?.chiefExecutiveName || ''} readOnly className="border rounded-xl p-2 outline-none" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
                        <div className="col-span-1 flex flex-col">
                            <label className="mb-2">Designation</label>
                            <input type="text" value={companyData?.designation || ''} readOnly className="border rounded-xl p-2 outline-none" />
                        </div>
                        <div className="col-span-1 flex flex-col">
                            <label className="mb-2">Year of Establishment</label>
                            <input type="text" value={companyData?.yearOfEstablishment || ''} readOnly className="border rounded-xl p-2 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Additional company details */}
                <div className="grid grid-row-7 mt-10 text-sm p-2 font-semibold">
                    <div className="col-span-1 flex flex-col">
                        <label className="mb-2">Telephone / Landline Number</label>
                        <input type="text" value={companyData?.telephone || ''} readOnly className="border rounded-xl p-2 outline-none" />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <label className="mb-2">Email Address</label>
                        <input type="email" value={companyData?.email || ''} readOnly className="border rounded-xl p-2 outline-none" />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <label className="mb-2">Mobile Number</label>
                        <input type="text" value={companyData?.mobile || ''} readOnly className="border rounded-xl p-2 outline-none" />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <label className="mb-2">Website</label>
                        <input type="text" value={companyData?.website || ''} readOnly className="border rounded-xl p-2 outline-none" />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <label className="mb-2">Business / Major Line of Activity</label>
                        <input type="text" value={companyData?.businessActivity || ''} readOnly className="border rounded-xl p-2 outline-none" />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <label className="mb-2">Paid up Capital</label>
                        <input type="text" value={companyData?.paidUpCapital || ''} readOnly className="border rounded-xl p-2 outline-none" />
                    </div>
                </div>
                <div className="grid grid-row-7 mt-10 mr-8 text-sm p-2 font-semibold">
                    <div className="col-span-1 flex flex-col">
                        <label className="mb-2">GST No.</label>
                        <input
                            type="text"
                            value={companyData?.gstNo || ''}
                            readOnly
                            className="border rounded-xl p-2 outline-none"
                        />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <label className="mb-2">Number of Employees</label>
                        <input
                            type="text"
                            value={companyData?.numberOfEmployees || ''}
                            readOnly
                            className="border rounded-xl p-2 outline-none"
                        />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <label className="mb-2">Nature of the company</label>
                        <input
                            type="text"
                            value={companyData?.natureOfCompany || ''}
                            readOnly
                            className="border rounded-xl p-2 outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
                        <div className="col-span-1 flex flex-col">
                            <label className="mb-2">Key contact Person</label>
                            <input
                                type="text"
                                value={companyData?.keyContactPerson || ''}
                                readOnly
                                className="border rounded-xl p-2 outline-none"
                            />
                        </div>
                        <div className="col-span-1 flex flex-col">
                            <label className="mb-2">Mobile Number</label>
                            <input
                                type="text"
                                value={companyData?.keyContactMobile || ''}
                                readOnly
                                className="border rounded-xl p-2 outline-none"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
                        <div className="col-span-1 flex flex-col">
                            <label className="mb-2">Secondary contact Person</label>
                            <input
                                type="text"
                                value={companyData?.secondaryContactPerson || ''}
                                readOnly
                                className="border rounded-xl p-2 outline-none"
                            />
                        </div>
                        <div className="col-span-1 flex flex-col">
                            <label className="mb-2">Mobile Number</label>
                            <input
                                type="text"
                                value={companyData?.secondaryContactMobile || ''}
                                readOnly
                                className="border rounded-xl p-2 outline-none"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 flex flex-col w-[200px] ml-40">
                        <button className="border rounded-xl p-2 outline-none bg-green-500 text-white hover:bg-green-600">
                            DOWNLOAD AS PDF
                        </button>
                    </div>
                </div>
               
               
            </div>
        </div>
    );
};

export default Companies;







