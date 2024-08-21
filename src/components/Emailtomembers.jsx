



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';  // Ensure axios is imported
// import logo from '../assets/Group 12.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { HiOutlinePlusCircle } from 'react-icons/hi';
// import { AiOutlineFontSize } from 'react-icons/ai';
// import { BiBold, BiItalic } from 'react-icons/bi';
// import { BsListUl, BsUpload } from 'react-icons/bs';
// import { MdOutlineFormatListNumbered } from 'react-icons/md';

// const Emailtomembers = () => {
//     const [activeButton, setActiveButton] = useState('Email to Members');
//     const [categories, setCategories] = useState([]);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [companies, setCompanies] = useState([]);
//     const [selectedCompanies, setSelectedCompanies] = useState([]);
//     const [emailContent, setEmailContent] = useState('');
//     const [selectedPosition, setSelectedPosition] = useState('CEO');
//     const [totalEmails, setTotalEmails] = useState(0);
//     const [mailToOnly, setMailToOnly] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch categories and companies from API when the component mounts
//         fetchCategories();
//         fetchCompanies();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get('/api/categories');
//             setCategories(response.data);
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//         }
//         // Fallback categories (used only if API fails or for initial testing)
//         setCategories([
//             'Company Law & Corporate (120)',
//             'Matters (33)',
//             'Banking, Finance & Insurance (55)',
//             'GST (30)',
//             'Logistics (30)',
//             'HR & IR (70)',
//             'Manufacturing (60)',
//             'Women Business Council (12)',
//             'Direct Tax (25)',
//             'Energy (30)',
//             'Corporate Social Responsibility (55)',
//             'IT & ITES (11)',
//             'Legal Affairs (12)',
//             'Education (47)',
//         ]);
//     };

//     const fetchCompanies = async () => {
//         try {
//             const response = await axios.get('/api/companies');
//             setCompanies(response.data);
//         } catch (error) {
//             console.error("Error fetching companies:", error);
//         }
//         // Fallback companies (used only if API fails or for initial testing)
//         setCompanies([
//             '4SPL Technologies India Pvt Ltd',
//             'Accent-e-Technology',
//             'Accentric Global',
//             'Adroit Solutions',
//             'Afxisi Technology Services Pvt Ltd',
//             'AigleSoft',
//             'Algorithm Computers',
//             'Alphalinx India Pvt Ltd',
//             'Altra Systems',
//         ]);
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

//     const handleCategoryChange = (category) => {
//         setSelectedCategories(prevState => {
//             const newState = prevState.includes(category)
//                 ? prevState.filter(item => item !== category)
//                 : [...prevState, category];
//             updateTotalEmails(newState, selectedCompanies);
//             return newState;
//         });
//     };

//     const handleCompanyChange = (company) => {
//         setSelectedCompanies(prevState => {
//             const newState = prevState.includes(company)
//                 ? prevState.filter(item => item !== company)
//                 : [...prevState, company];
//             updateTotalEmails(selectedCategories, newState);
//             return newState;
//         });
//     };

//     const handleSelectAllCategories = () => {
//         const newState = selectedCategories.length === categories.length ? [] : categories;
//         setSelectedCategories(newState);
//         updateTotalEmails(newState, selectedCompanies);
//     };

//     const handleSelectAllCompanies = () => {
//         const newState = selectedCompanies.length === companies.length ? [] : companies;
//         setSelectedCompanies(newState);
//         updateTotalEmails(selectedCategories, newState);
//     };

//     const updateTotalEmails = (cats, comps) => {
//         // In a real scenario, this would be calculated based on the actual data
//         setTotalEmails(cats.length * comps.length);
//     };

//     const handleSendEmail = async (emailData) => {
//         try {
//           const response = await axios.post('http://localhost:3000/api/send-email', emailData);
//           console.log('Email sent successfully:', response.data);
//         } catch (error) {
//           console.error('Error sending email:', error);
//         }
//       };
      
//       // Example usage of handleSendEmail
//       const onSendEmailClick = () => {
//         const emailData = {
//           subject: 'Your Subject',
//           body: 'Your email body',
//           recipients: ['recipient1@example.com', 'recipient2@example.com'],
//         };
//         handleSendEmail(emailData);
//       };
    
//     const handleSaveDraft = () => {
//         // Implement draft saving logic
//         console.log('Saving draft');
//         // You would typically make an API call here
//     };

//     const handleCreateNewMail = () => {
//         setEmailContent('');
//         setSelectedCompanies([]);
//         setSelectedCategories([]);
//         setMailToOnly('');
//     };

//     const handleFinalPreview = () => {
//         // Implement preview logic
//         console.log('Generating preview');
//         // You might open a modal or navigate to a preview page here
//     };

//     return (
//         <div className="min-h-screen p-4 md:p-8">
//             {/* Navigation and header code remains the same */}
//             <div className="">
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
//                         {categories.map((category) => (
//                             <li
//                                 key={category}
//                                 className={`flex items-center space-x-2 ${selectedCategories.includes(category) ? 'text-red-500' : ''}`}
//                             >
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedCategories.includes(category)}
//                                     onChange={() => handleCategoryChange(category)}
//                                 />
//                                 <span>{category}</span>
//                             </li>
//                         ))}
//                     </ul>
//                     <button
//                         className="text-red-500 mt-4"
//                         onClick={handleSelectAllCategories}
//                     >
//                         {selectedCategories.length === categories.length ? 'Deselect All' : 'Select All'}
//                     </button>
//                 </div>

//                 {/* List of Companies */}
//                 <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 px-0 md:px-4">
//                     <div className="flex justify-between items-center mb-4">
//                         <h3 className="font-bold text-red-500">List of Companies</h3>
//                         <div>
//                             <input 
//                                 type="checkbox" 
//                                 checked={selectedCompanies.length === companies.length}
//                                 onChange={handleSelectAllCompanies}
//                             />
//                             <span className="ml-2">Select All</span>
//                         </div>
//                     </div>
//                     <ul className="space-y-2 text-sm md:text-base bg-gray-100 p-4 rounded-md">
//                         {companies.map((company) => (
//                             <li key={company}>
//                                 <input 
//                                     type="checkbox" 
//                                     checked={selectedCompanies.includes(company)}
//                                     onChange={() => handleCompanyChange(company)}
//                                 />
//                                 <span className="ml-2">{company}</span>
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="mt-4 text-sm md:text-base">
//                         <label className='text-red-500 font-semibold'>Mail to Only </label>
//                         <input 
//                             type="text" 
//                             className="border-b mb-4 w-full outline-none"
//                             value={mailToOnly}
//                             onChange={(e) => setMailToOnly(e.target.value)}
//                         />
//                     </div>
//                     <select 
//                         className="border border-gray-300 rounded-md p-1 w-full md:w-[320px]"
//                         value={selectedPosition}
//                         onChange={(e) => setSelectedPosition(e.target.value)}
//                     >
//                         <option value="CEO">CEO</option>
//                         <option value="Manager">Manager</option>
//                         <option value="Staff">Staff</option>
//                     </select>
//                     <div className="mt-4 text-sm md:text-base text-red-500 font-semibold">
//                         Total No of Mail: <span>{totalEmails}</span>
//                     </div>
//                 </div>

//                 {/* Email Composer */}
//                 <div className="px-4">
//                     <div className="flex space-x-4 mb-4">
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md" onClick={handleCreateNewMail}>Create a New Mail</button>
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md" onClick={handleFinalPreview}>Final Preview</button>
//                     </div>
//                     {/* Email formatting tools */}
//                     <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-md mb-4">
//                         {/* Insert Button */}
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <HiOutlinePlusCircle className="text-lg" />
//                             <span>Insert</span>
//                             <span className="text-xs">&#x25BC;</span> {/* Dropdown arrow */}
//                         </button>
//                         <p>|</p>
//                         {/* Font Size */}
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <AiOutlineFontSize className="text-lg" />
//                             <span>Type</span>
//                             <span className="text-xs">&#x25BC;</span> {/* Dropdown arrow */}
//                         </button>
//                         <p>|</p>
//                         {/* Bold */}
//                         <button className="flex items-center text-gray-600 hover:text-black">
//                             <BiBold className="text-lg font-bold" />
//                         </button>

//                         {/* Italic */}
//                         <button className="flex items-center text-gray-600 hover:text-black">
//                             <BiItalic className="text-lg font-italic" />
//                         </button>

//                         {/* Unordered List */}
//                         <button className="flex items-center text-gray-600 hover:text-black">
//                             <BsListUl className="text-lg" />
//                         </button>

//                         {/* Ordered List */}
//                         <button className="flex items-center text-gray-600 hover:text-black">
//                             <MdOutlineFormatListNumbered className="text-lg" />
//                         </button>

//                         {/* Upload */}
//                         <button className="flex items-center text-gray-600 hover:text-black">
//                             <BsUpload className="text-lg" />
//                         </button>
//                     </div>
//                     <textarea
//                         className="w-full h-48 md:h-96 border border-gray-300 rounded-md p-4 bg-gray-100 mt-4"
//                         placeholder="Compose your email here..."
//                         value={emailContent}
//                         onChange={(e) => setEmailContent(e.target.value)}
//                     ></textarea>
//                     <div className="flex justify-end space-x-4 mt-4">
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md" onClick={handleSaveDraft}>Save to Draft</button>
//                         {/* <button className="bg-red-500 text-white text-sm md:text-base px-10 py-2 rounded-md" onClick={handleSendEmail}>Send</button> */}
//                         <button className="bg-red-500 text-white text-sm md:text-base px-4 py-2 rounded-md" onClick={handleSendEmail}>Send Email</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Emailtomembers;

// import React, { useState } from 'react';
// import logo from '../assets/Group 12.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { HiOutlinePlusCircle } from 'react-icons/hi';
// import { AiOutlineFontSize } from 'react-icons/ai';
// import { BiBold, BiItalic } from 'react-icons/bi';
// import { BsListUl, BsUpload } from 'react-icons/bs';
// import { MdOutlineFormatListNumbered } from 'react-icons/md';

// const Emailtomembers = () => {
//     const [activeButton, setActiveButton] = useState('MCCI Membership');
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [selectAll, setSelectAll] = useState(false);
//     const navigate = useNavigate();

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

//     const handleCheckboxChange = (category) => {
//         setSelectedCategories(prevState => {
//             const isSelected = prevState.includes(category);
//             if (isSelected) {
//                 return prevState.filter(item => item !== category);
//             } else {
//                 return [...prevState, category];
//             }
//         });
//     };

//     const handleSelectAll = () => {
//         if (selectAll) {
//             setSelectedCategories([]);
//         } else {
//             setSelectedCategories([
//                 'Company Law & Corporate (120)',
//                 'Matters (33)',
//                 'Banking, Finance & Insurance (55)',
//                 'GST (30)',
//                 'Logistics (30)',
//                 'HR & IR (70)',
//                 'Manufacturing (60)',
//                 'Women Business Council (12)',
//                 'Direct Tax (25)',
//                 'Energy (30)',
//                 'Corporate Social Responsibility (55)',
//                 'IT & ITES (11)',
//                 'Legal Affairs (12)',
//                 'Education (47)',
//             ]);
//         }
//         setSelectAll(!selectAll);
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
//                         {['Company Law & Corporate (120)', 'Matters (33)', 'Banking, Finance & Insurance (55)', 'GST (30)', 'Logistics (30)', 'HR & IR (70)', 'Manufacturing (60)', 'Women Business Council (12)', 'Direct Tax (25)', 'Energy (30)', 'Corporate Social Responsibility (55)', 'IT & ITES (11)', 'Legal Affairs (12)', 'Education (47)'].map((category) => (
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
//                     </ul>
//                     <button
//                         className="text-red-500 mt-4"
//                         onClick={handleSelectAll}
//                     >
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
//                         <li><input type="checkbox" /> 4SPL Technologies India Pvt Ltd</li>
//                         <li><input type="checkbox" /> Accent-e-Technology</li>
//                         <li><input type="checkbox" /> Accentric Global</li>
//                         <li><input type="checkbox" /> Adroit Solutions</li>
//                         <li><input type="checkbox" /> Afxisi Technology Services Pvt Ltd</li>
//                         <li><input type="checkbox" /> AigleSoft</li>
//                         <li><input type="checkbox" /> Algorithm Computers</li>
//                         <li><input type="checkbox" /> Alphalinx India Pvt Ltd</li>
//                         <li><input type="checkbox" /> Altra Systems</li>
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
//                         Total No of Mail: <span>10</span>
//                     </div>
//                 </div>

//                 {/* Email Composer */}
//                 <div className="px-4">
//                     <div className="flex space-x-4 mb-4">
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Create a New Mail</button>
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Final Preview</button>
//                     </div>
//                     <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-md mb-4">
//                         {/* Insert Button */}
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <HiOutlinePlusCircle className="text-lg" />
//                             <span>Insert</span>
//                             <span className="text-xs">&#x25BC;</span> {/* Dropdown arrow */}
//                         </button>
//                         <p>|</p>
//                         {/* Font Size */}
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <AiOutlineFontSize className="text-lg" />
//                             <span>Type</span>
//                             <span className="text-xs">&#x25BC;</span> {/* Dropdown arrow */}
//                         </button>
//                         <p>|</p>
//                         {/* Bold */}
//                         <button className="flex items-center text-gray-600 hover:text-black">
//                             <BiBold className="text-lg font-bold" />
//                         </button>

//                         {/* Italic */}
//                         <button className="flex items-center text-gray-600 hover:text-black">
//                             <BiItalic className="text-lg font-italic" />
//                         </button>

//                         {/* Unordered List */}
//                         <button className="flex items-center text-gray-600 hover:text-black">
//                             <BsListUl className="text-lg" />
//                         </button>

//                         {/* Ordered List */}
//                         <button className="flex items-center text-gray-600 hover:text-black">
//                             <MdOutlineFormatListNumbered className="text-lg" />
//                         </button>

//                         {/* Upload */}
//                         <button className="flex items-center text-gray-600 hover:text-black">
//                             <BsUpload className="text-lg" />
//                         </button>
//                     </div>
//                     <textarea
//                         rows="8"
//                         placeholder="Write here..."
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                     <div className="flex justify-between mt-4">
//                         <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Send Mail</button>
//                         <button className="bg-gray-200 px-4 py-2 rounded-md">Save Draft</button>
//                     </div>
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
//     const navigate = useNavigate();
//     const companyId = 1; // Replace with actual company ID or get it from props/context

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/form/companies/${companyId}`);
//                 const fetchedCategories = response.data.categories; // Assuming categories are returned in an array
//                 setCategories([...new Set(fetchedCategories)]); // Remove duplicates
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         if (companyId) {
//             fetchCategories();
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
//                     <ul className="space-y-2 text-sm md:text-base">
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
//                         <li><input type="checkbox" /> 4SPL Technologies India Pvt Ltd</li>
//                         <li><input type="checkbox" /> Accent-e-Technology</li>
//                         <li><input type="checkbox" /> Accentric Global</li>
//                         <li><input type="checkbox" /> Adroit Solutions</li>
//                         <li><input type="checkbox" /> Afxisi Technology Services Pvt Ltd</li>
//                         <li><input type="checkbox" /> AigleSoft</li>
//                         <li><input type="checkbox" /> Algorithm Computers</li>
//                         <li><input type="checkbox" /> Alphalinx India Pvt Ltd</li>
//                         <li><input type="checkbox" /> Altra Systems</li>
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
//                         Total No of Mail: <span>10</span>
//                     </div>
//                 </div>

//                 {/* Email Composer */}
//                 <div className="px-4">
//                     <div className="flex space-x-4 mb-4">
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Create a New Mail</button>
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Final Preview</button>
//                     </div>
//                     <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-md mb-4">
//                         {/* Insert Button */}
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <HiOutlinePlusCircle className="text-lg" />
//                             <span>Insert</span>
//                             <span className="text-xs">&#x25BC;</span> {/* Dropdown arrow */}
//                         </button>
//                         <p>|</p>
//                         {/* Font Size */}
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <AiOutlineFontSize className="text-lg" />
//                             <span>Type</span>
//                             <span className="text-xs">&#x25BC;</span> {/* Dropdown arrow */}
//                         </button>
//                         <p>|</p>
//                         {/* Text Formatting */}
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <BiBold className="text-lg" />
//                             <span>Bold</span>
//                         </button>
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <BiItalic className="text-lg" />
//                             <span>Italic</span>
//                         </button>
//                         <p>|</p>
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <BsListUl className="text-lg" />
//                             <span>List</span>
//                         </button>
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <MdOutlineFormatListNumbered className="text-lg" />
//                             <span>Numbered List</span>
//                         </button>
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <BsUpload className="text-lg" />
//                             <span>Upload</span>
//                         </button>
//                     </div>
//                     <div className="bg-gray-100 p-4 rounded-md">
//                         <textarea
//                             className="w-full h-48 p-2 border border-gray-300 rounded-md resize-none"
//                             placeholder="Write your email content here..."
//                         />
//                     </div>
//                     <div className="mt-4 flex justify-end space-x-4">
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Save as Draft</button>
//                         <button className="bg-red-500 text-white text-sm md:text-base px-4 py-2 rounded-md">Send Mail</button>
//                     </div>
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
                   
//                         <li><input type="checkbox" /> 4SPL Technologies India Pvt Ltd</li>
//                         <li><input type="checkbox" /> Accent-e-Technology</li>
//                         <li><input type="checkbox" /> Accentric Global</li>
//                         <li><input type="checkbox" /> Adroit Solutions</li>
//                         <li><input type="checkbox" /> Afxisi Technology Services Pvt Ltd</li>
//                         <li><input type="checkbox" /> AigleSoft</li>
//                         <li><input type="checkbox" /> Algorithm Computers</li>
//                         <li><input type="checkbox" /> Alphalinx India Pvt Ltd</li>
//                         <li><input type="checkbox" /> Altra Systems</li>
                    
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
//     const [selectAllCategories, setSelectAllCategories] = useState(false);
//     const [companies, setCompanies] = useState([]);
//     const [selectAllCompanies, setSelectAllCompanies] = useState(false);

//     const navigate = useNavigate();
//     const companyId = 1; // Replace with actual company ID or get it from props/context

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`https://formdata1.onrender.com/api/form/companies/${companyId}`);
//                 const fetchedCategories = response.data || [];
//                 const sortedCategories = fetchedCategories.sort((a, b) => a.natureOfCompany.localeCompare(b.natureOfCompany));
//                 setCategories(sortedCategories);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
    
//         const fetchCompanies = async () => {
//             try {
//                 const response = await axios.get('https://formdata1.onrender.com/api/form/companies');
//                 const sortedCompanies = response.data.sort((a, b) => a.companyName.localeCompare(b.companyName));
//                 setCompanies(sortedCompanies);
//             } catch (error) {
//                 console.error('Error fetching companies:', error);
//             }
//         };
    
//         fetchCategories();
//         fetchCompanies();
//     }, [companyId]);
    

//     const handleCategoryCheckboxChange = (categoryId) => {
//         setSelectedCategories((prev) =>
//             prev.includes(categoryId)
//                 ? prev.filter((id) => id !== categoryId)
//                 : [...prev, categoryId]
//         );
//     };

//     const handleSelectAllCategories = () => {
//         if (selectAllCategories) {
//             setSelectedCategories([]); // Deselect all categories
//         } else {
//             setSelectedCategories(categories.map((category) => category._id)); // Select all categories
//         }
//         setSelectAllCategories(!selectAllCategories);
//     };

//     const handleCompanyCheckboxChange = (companyId) => {
//         setSelectedCategories((prev) =>
//             prev.includes(companyId)
//                 ? prev.filter((id) => id !== companyId)
//                 : [...prev, companyId]
//         );
//     };

//     const handleSelectAllCompanies = () => {
//         if (selectAllCompanies) {
//             setSelectedCategories([]); // Deselect all companies
//         } else {
//             setSelectedCategories(companies.map((company) => company._id)); // Select all companies
//         }
//         setSelectAllCompanies(!selectAllCompanies);
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
//                         {categories.map((category) => (
//                             <li key={category._id} className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedCategories.includes(category._id)}
//                                     onChange={() => handleCategoryCheckboxChange(category._id)}
//                                 />
//                                 <span>{category.companyName} - {category.natureOfCompany}</span>
//                             </li>
//                         ))}
//                         <li>jhhhhhhhhhhhhhhhhhhhhhhh</li>
//                     </ul>
//                     <button className="text-red-500 mt-4" onClick={handleSelectAllCategories}>
//                         {selectAllCategories ? 'Deselect All' : 'Select All'}
//                     </button>
//                 </div>

//                 {/* List of Companies */}
//                 <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 px-0 md:px-4">
//                     <div className="flex justify-between items-center mb-4">
//                         <h3 className="font-bold text-red-500">List of Companies</h3>
//                         <input
//                             type="checkbox"
//                             className="ml-2"
//                             checked={selectAllCompanies}
//                             onChange={handleSelectAllCompanies}
//                         />
//                         <label className="ml-2">Select All</label>
//                     </div>
//                     <ul className="space-y-2 text-sm md:text-base bg-gray-100 p-4 rounded-md">
//                         {companies.map((company) => (
//                             <li key={company._id} className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedCategories.includes(company._id)}
//                                     onChange={() => handleCompanyCheckboxChange(company._id)}
//                                 />
//                                 <span>{company.companyName} - {company.natureOfCompany}</span>
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="mt-4 text-sm md:text-base">
//                         <label className="text-red-500 font-semibold">Mail to Only </label>
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
//                     <textarea className="w-full h-64 p-2 border border-gray-300 rounded-md" placeholder="Compose your email..."></textarea>
//                     <div className="flex justify-between mt-4">
//                         <button className="bg-red-500 text-white px-4 py-2 rounded-md">Send</button>
//                         <button className="bg-gray-200 px-4 py-2 rounded-md">Save as Draft</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Emailtomembers;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/Group 12.png';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { AiOutlineFontSize } from 'react-icons/ai';
import { BiBold, BiItalic } from 'react-icons/bi';
import { BsListUl, BsUpload } from 'react-icons/bs';
import { MdOutlineFormatListNumbered } from 'react-icons/md';

const Emailtomembers = () => {
    const [activeButton, setActiveButton] = useState('MCCI Membership');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectAllCategories, setSelectAllCategories] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectAllCompanies, setSelectAllCompanies] = useState(false);

    const navigate = useNavigate();
    const companyId = 1; // Replace with actual company ID or get it from props/context

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`https://formdata1.onrender.com/api/form/companies/${companyId}`);
                const fetchedCategories = response.data || [];
                const sortedCategories = fetchedCategories.sort((a, b) => a.natureOfCompany.localeCompare(b.natureOfCompany));
                setCategories(sortedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchCompanies = async () => {
            try {
                const response = await axios.get('https://formdata1.onrender.com/api/form/companies');
                const sortedCompanies = response.data.sort((a, b) => a.companyName.localeCompare(b.companyName));
                setCompanies(sortedCompanies);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCategories();
        fetchCompanies();
    }, [companyId]);

    const handleCategoryCheckboxChange = (categoryId) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleSelectAllCategories = () => {
        if (selectAllCategories) {
            setSelectedCategories([]); // Deselect all categories
        } else {
            setSelectedCategories(categories.map((category) => category._id)); // Select all categories
        }
        setSelectAllCategories(!selectAllCategories);
    };

    const handleCompanyCheckboxChange = (companyId) => {
        setSelectedCompanies((prev) =>
            prev.includes(companyId)
                ? prev.filter((id) => id !== companyId)
                : [...prev, companyId]
        );
    };

    const handleSelectAllCompanies = () => {
        if (selectAllCompanies) {
            setSelectedCompanies([]); // Deselect all companies
        } else {
            setSelectedCompanies(companies.map((company) => company._id)); // Select all companies
        }
        setSelectAllCompanies(!selectAllCompanies);
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

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex space-x-4 gap-10 ml-2">
                        {['MCCI Membership', 'Companies', 'Email to Members', 'Profile'].map((button) => (
                            <button
                                key={button}
                                className={`relative text-gray-500 pb-1 ${activeButton === button
                                    ? 'border-b-2 border-red-500 text-black'
                                    : ''
                                    }`}
                                onClick={() => handleNavigation(button)}
                            >
                                {button}
                            </button>
                        ))}
                    </div>
                    <img src={logo} alt="Logo" className="w-24 md:w-44" />
                </div>
                <div className="flex justify-between mb-8">
                    <h2 className="text-xl font-bold ml-1">MCCI Email to Members</h2>
                    <Link to="/LoginRegister">
                        <h2 className="text-xl font-bold text-red-500 mr-2 cursor-pointer">MCCI Dashboard</h2>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-[320px_350px_auto] gap-4">
                {/* Company Categories */}
                <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 pr-0 md:pr-4">
                    <h3 className="font-bold text-red-500 mb-4">Company Categories</h3>
                    <ul className="space-y-2 text-sm md:text-base">
                        {categories.map((category) => (
                            <li key={category._id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category._id)}
                                    onChange={() => handleCategoryCheckboxChange(category._id)}
                                />
                                <span>{category.companyName} - {category.natureOfCompany}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="text-red-500 mt-4" onClick={handleSelectAllCategories}>
                        {selectAllCategories ? 'Deselect All' : 'Select All'}
                    </button>
                </div>

                {/* List of Companies */}
                <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 px-0 md:px-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-red-500">List of Companies</h3>
                        <input
                            type="checkbox"
                            className="ml-2"
                            checked={selectAllCompanies}
                            onChange={handleSelectAllCompanies}
                        />
                        <label className="ml-2">Select All</label>
                    </div>
                    <ul className="space-y-2 text-sm md:text-base bg-gray-100 p-4 rounded-md">
                        {companies.map((company) => (
                            <li key={company._id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCompanies.includes(company._id)}
                                    onChange={() => handleCompanyCheckboxChange(company._id)}
                                />
                                <span>{company.companyName} - {company.natureOfCompany}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 text-sm md:text-base">
                        <label className="text-red-500 font-semibold">Mail to Only </label>
                        <input type="text" className="border-b mb-4 w-full outline-none" />
                    </div>
                    <select className="border border-gray-300 rounded-md p-1 w-full md:w-[320px]">
                        <option>CEO</option>
                        <option>Manager</option>
                        <option>Staff</option>
                    </select>
                    <div className="mt-4 text-sm md:text-base text-red-500 font-semibold">
                        Total No of Mail: <span>{companies.length}</span>
                    </div>
                </div>

                {/* Email Composer */}
                <div className="px-4">
                    <div className="flex space-x-4 mb-4">
                        <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Create a New Mail</button>
                        <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Final Preview</button>
                    </div>
                    <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-md mb-4">
                        <HiOutlinePlusCircle className="text-2xl text-red-500" />
                        <AiOutlineFontSize className="text-xl" />
                        <BiBold className="text-xl" />
                        <BiItalic className="text-xl" />
                        <BsListUl className="text-xl" />
                        <MdOutlineFormatListNumbered className="text-xl" />
                        <BsUpload className="text-xl" />
                    </div>
                    <textarea
                        rows="10"
                        className="w-full border border-gray-300 rounded-md p-2 mb-4 resize-none"
                        placeholder="Compose your email here..."
                    />
                    <div className="flex justify-end space-x-4">
                        <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Save Draft</button>
                        <button className="bg-red-500 text-white text-sm md:text-base px-4 py-2 rounded-md">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Emailtomembers;
