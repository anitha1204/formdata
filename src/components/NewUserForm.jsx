// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import logo from '../assets/Group 12.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { HiOutlinePlusCircle } from 'react-icons/hi';
// import { AiOutlineFontSize } from 'react-icons/ai';
// import { BiBold, BiItalic } from 'react-icons/bi';
// import { BsListUl, BsUpload } from 'react-icons/bs';
// import { MdOutlineFormatListNumbered } from 'react-icons/md';

// const Emailtomembers = () => {
//     const [activeButton, setActiveButton] = useState('MCCI Membership');
//     const [categories, setCategories] = useState([]);
//     const [selectedCategories, setSelectedCategories] = useState([]); // Added state for selected categories
//     const [selectAll, setSelectAll] = useState(false);
//     const [companies, setCompanies] = useState([]);

//     const navigate = useNavigate();
//     const companyId = 1; // Replace with actual company ID or get it from props/context

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`https://formdata1.onrender.com/api/form/companies/${companyId}`);
//                 console.log('Fetched Categories:', response.data.categories); // Debugging line
//                 const fetchedCategories = response.data.categories;
//                 const sortedCategories = [...new Set(fetchedCategories)].sort(); // Remove duplicates and sort
//                 setCategories(sortedCategories);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         const fetchCompanies = async () => {
//             try {
//                 const response = await axios.get('https://formdata1.onrender.com/api/form/companies');
//                 console.log('Fetched Companies:', response.data); // Debugging line
//                 const sortedCompanies = response.data.sort((a, b) => a.companyName.localeCompare(b.companyName)); // Sort by company name
//                 setCompanies(sortedCompanies);
//             } catch (error) {
//                 console.error('Error fetching companies:', error);
//             }
//         };

//         if (companyId) {
//             fetchCategories();
//             fetchCompanies();
//         }
//     }, [companyId]);

//     const handleSelectAll = () => {
//         if (selectAll) {
//             setSelectedCategories([]); // Deselect all
//         } else {
//             setSelectedCategories(categories); // Select all
//         }
//         setSelectAll(!selectAll);
//     };

//     const handleCheckboxChange = (category) => {
//         setSelectedCategories((prev) =>
//             prev.includes(category)
//                 ? prev.filter((cat) => cat !== category)
//                 : [...prev, category]
//         );
//     };

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

//     return (
//         <div className="min-h-screen p-4 md:p-8">
//             <div>
//                 <div className="flex items-center justify-between mb-8">
//                     <div className="flex space-x-4 gap-10 ml-2">
//                         {['MCCI Membership', 'Companies', 'Email to Members', 'Profile'].map((button) => (
//                             <button
//                                 key={button}
//                                 className={`relative text-gray-500 pb-1 ${activeButton === button
//                                     ? 'border-b-2 border-red-500 text-black'
//                                     : ''
//                                     }`}
//                                 onClick={() => handleNavigation(button)}
//                             >
//                                 {button}
//                             </button>
//                         ))}
//                     </div>
//                     <img src={logo} alt="Logo" className="w-24 md:w-44" />
//                 </div>
//                 <div className="flex justify-between mb-8">
//                     <h2 className="text-xl font-bold ml-1">MCCI Email to Members</h2>
//                     <Link to="/LoginRegister">
//                         <h2 className="text-xl font-bold text-red-500 mr-2 cursor-pointer">MCCI Dashboard</h2>
//                     </Link>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="grid grid-cols-1 md:grid-cols-[320px_350px_auto] gap-4">
//                 {/* Company Categories */}
//                 <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 pr-0 md:pr-4">
//                     <h3 className="font-bold text-red-500 mb-4">Company Categories</h3>
//                     <ul className="space-y-2 text-sm md:text-base">
                       
                        
//                     </ul>

//                     <button className="text-red-500 mt-4" onClick={handleSelectAll}>
//                         {selectAll ? 'Deselect All' : 'Select All'}
//                     </button>
//                 </div>

//                 {/* List of Companies */}
//                 <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 px-0 md:px-4">
//                     <div className="flex justify-between items-center mb-4">
//                         <h3 className="font-bold text-red-500">List of Companies</h3>
//                         <input type="checkbox" className='ml-20' />Select All
//                     </div>
//                     <ul className="space-y-2 text-sm md:text-base bg-gray-100 p-4 rounded-md">
//                         {companies.map((company) => (
//                             <li key={company._id}>
//                                 <input type="checkbox" /> {company.companyName} - {company.natureOfCompany}
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="mt-4 text-sm md:text-base">
//                         <label className='text-red-500 font-semibold'>Mail to Only </label>
//                         <input type="text" className="border-b mb-4 w-full outline-none" />
//                     </div>
//                     <select className="border border-gray-300 rounded-md p-1 w-full md:w-[320px]">
//                         <option>CEO</option>
//                         <option>Manager</option>
//                         <option>Staff</option>
//                     </select>
//                     <div className="mt-4 text-sm md:text-base text-red-500 font-semibold">
//                         Total No of Mail: <span>{companies.length}</span>
//                     </div>
//                 </div>

//                 {/* Email Composer */}
//                 <div className="px-4">
//                     <div className="flex space-x-4 mb-4">
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Create a New Mail</button>
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Final Preview</button>
//                     </div>
//                     <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-md mb-4">
//                         <HiOutlinePlusCircle className="text-2xl text-gray-500" />
//                         <input type="text" placeholder="Subject" className="w-full outline-none border-none bg-transparent" />
//                     </div>
//                     <div className="flex space-x-4 text-lg mb-4">
//                         <AiOutlineFontSize />
//                         <BiBold />
//                         <BiItalic />
//                         <BsListUl />
//                         <BsUpload />
//                         <MdOutlineFormatListNumbered />
//                     </div>
//                     <textarea placeholder="Compose your email here" className="w-full h-64 border p-2 rounded-md"></textarea>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Emailtomembers;














// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import logo from '../assets/Group 12.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { HiOutlinePlusCircle } from 'react-icons/hi';
// import { AiOutlineFontSize } from 'react-icons/ai';
// import { BiBold, BiItalic } from 'react-icons/bi';
// import { BsListUl, BsUpload } from 'react-icons/bs';
// import { MdOutlineFormatListNumbered } from 'react-icons/md';

// const Emailtomembers = () => {
//     const [activeButton, setActiveButton] = useState('MCCI Membership');
//     const [categories, setCategories] = useState([]);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [selectAll, setSelectAll] = useState(false);
//     const [companies, setCompanies] = useState([]);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const companyId = 1; // Replace with actual company ID or get it from props/context

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`https://formdata1.onrender.com/api/form/companies/${companyId}`);
//                 const fetchedCategories = response.data.categories; // Assuming categories are returned in an array
//                 setCategories([...new Set(fetchedCategories)]); // Remove duplicates
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         const fetchCompanies = async () => {
//             try {
//                 const response = await axios.get('https://formdata1.onrender.com/api/form/companies');
//                 setCompanies(response.data);
//             } catch (error) {
//                 setError('Error fetching companies');
//                 console.error('Error fetching companies:', error);
//             }
//         };

//         if (companyId) {
//             fetchCategories();
//             fetchCompanies();
//         }
//     }, [companyId]);

//     const handleCheckboxChange = (category) => {
//         setSelectedCategories((prev) =>
//             prev.includes(category)
//                 ? prev.filter((cat) => cat !== category)
//                 : [...prev, category]
//         );
//     };

//     const handleSelectAll = () => {
//         if (selectAll) {
//             setSelectedCategories([]); // Deselect all
//         } else {
//             setSelectedCategories(categories); // Select all
//         }
//         setSelectAll(!selectAll);
//     };

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

//     return (
//         <div className="min-h-screen p-4 md:p-8">
//             <div>
//                 <div className="flex items-center justify-between mb-8">
//                     <div className="flex space-x-4 gap-10 ml-2">
//                         {['MCCI Membership', 'Companies', 'Email to Members', 'Profile'].map((button) => (
//                             <button
//                                 key={button}
//                                 className={`relative text-gray-500 pb-1 ${activeButton === button
//                                     ? 'border-b-2 border-red-500 text-black'
//                                     : ''
//                                     }`}
//                                 onClick={() => handleNavigation(button)}
//                             >
//                                 {button}
//                             </button>
//                         ))}
//                     </div>
//                     <img src={logo} alt="Logo" className="w-24 md:w-44" />
//                 </div>
//                 <div className="flex justify-between mb-8">
//                     <h2 className="text-xl font-bold ml-1">MCCI Email to Members</h2>
//                     <Link to="/LoginRegister">
//                         <h2 className="text-xl font-bold text-red-500 mr-2 cursor-pointer">MCCI Dashboard</h2>
//                     </Link>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="grid grid-cols-1 md:grid-cols-[320px_350px_auto] gap-4">
//                 {/* Company Categories */}
//                 <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 pr-0 md:pr-4">
//                     <h3 className="font-bold text-red-500 mb-4">Company Categories</h3>
//                     {/* <ul className="space-y-2 text-sm md:text-base">
//                         {categories.map((category) => (
//                             <li
//                                 key={category}
//                                 className={`flex items-center space-x-2 ${selectedCategories.includes(category) ? 'text-red-500' : ''}`}
//                             >
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedCategories.includes(category)}
//                                     onChange={() => handleCheckboxChange(category)}
//                                 />
//                                 <span>{category}</span>
//                             </li>
//                         ))}
//                     </ul> */}
//                     <ul className="space-y-2 text-sm md:text-base bg-gray-100 p-4 rounded-md">
//                         {categories.map((category) => (
//                             <li key={category._id}>
//                                 <input type="checkbox" /> {category.natureOfCompany} -  {category.companyName} 
//                             </li>
//                         ))}
//                     </ul>
//                     <button className="text-red-500 mt-4" onClick={handleSelectAll}>
//                         {selectAll ? 'Deselect All' : 'Select All'}
//                     </button>
//                 </div>

//                 {/* List of Companies */}
//                 <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 px-0 md:px-4">
//                     <div className="flex justify-between items-center mb-4">
//                         <h3 className="font-bold text-red-500">List of Companies</h3>
//                         <input type="checkbox" className='ml-20' />Select All
//                     </div>
//                     <ul className="space-y-2 text-sm md:text-base bg-gray-100 p-4 rounded-md">
//                         {companies.map((company) => (
//                             <li key={company._id}>
//                                 <input type="checkbox" /> {company.companyName} - {company.natureOfCompany}
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="mt-4 text-sm md:text-base">
//                         <label className='text-red-500 font-semibold'>Mail to Only </label>
//                         <input type="text" className="border-b mb-4 w-full outline-none" />
//                     </div>
//                     <select className="border border-gray-300 rounded-md p-1 w-full md:w-[320px]">
//                         <option>CEO</option>
//                         <option>Manager</option>
//                         <option>Staff</option>
//                     </select>
//                     <div className="mt-4 text-sm md:text-base text-red-500 font-semibold">
//                         Total No of Mail: <span>{companies.length}</span>
//                     </div>
//                 </div>

//                 {/* Email Composer */}
//                 <div className="px-4">
//                     <div className="flex space-x-4 mb-4">
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Create a New Mail</button>
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Final Preview</button>
//                     </div>
//                     <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-md mb-4">
//                         <HiOutlinePlusCircle className="text-2xl text-gray-500" />
//                         <input type="text" placeholder="Subject" className="w-full outline-none border-none bg-transparent" />
//                     </div>
//                     <div className="flex space-x-4 text-lg mb-4">
//                         <AiOutlineFontSize />
//                         <BiBold />
//                         <BiItalic />
//                         <BsListUl />
//                         <BsUpload />
//                         <MdOutlineFormatListNumbered />
//                     </div>
//                     <textarea placeholder="Compose your email here" className="w-full h-64 border p-2 rounded-md"></textarea>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Emailtomembers;