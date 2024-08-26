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
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectAllCompanies, setSelectAllCompanies] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://formdata1.onrender.com/api/form/companies');
                const allCompanies = response.data;

                // Extract unique categories
                const uniqueCategories = [...new Set(allCompanies.map(company => company.natureOfCompany))];
                const sortedCategories = uniqueCategories.sort((a, b) => a.localeCompare(b));
                setCategories(sortedCategories.map((category, index) => ({ _id: index, natureOfCompany: category })));

                // Sort companies
                const sortedCompanies = allCompanies.sort((a, b) => a.companyName.localeCompare(b.companyName));
                setCompanies(sortedCompanies);
                setFilteredCompanies(sortedCompanies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterCompanies();
    }, [selectedCategories, companies]);

    const filterCompanies = () => {
        if (selectedCategories.length === 0) {
            setFilteredCompanies(companies);
        } else {
            const filtered = companies.filter(company => 
                selectedCategories.includes(categories.find(cat => cat.natureOfCompany === company.natureOfCompany)?._id)
            );
            setFilteredCompanies(filtered);
        }
    };

    const handleCategoryCheckboxChange = (categoryId) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleSelectAllCategories = () => {
        if (selectAllCategories) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(categories.map((category) => category._id));
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
            setSelectedCompanies([]);
        } else {
            setSelectedCompanies(filteredCompanies.map((company) => company._id));
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
            {/* Header section */}
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
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-red-500">Company Categories</h3>
                        <input
                            type="checkbox"
                            className="ml-2"
                            checked={selectAllCategories}
                            onChange={handleSelectAllCategories}
                        />
                        <label className="ml-2">Select All</label>
                    </div>
                    <ul className="space-y-2 text-sm md:text-base p-4">
                        {categories.map((category) => (
                            <li key={category._id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category._id)}
                                    onChange={() => handleCategoryCheckboxChange(category._id)}
                                />
                                <span className={selectedCategories.includes(category._id) ? 'text-red-500' : ''}>
                                    {category.natureOfCompany}
                                </span>
                            </li>
                        ))}
                    </ul>
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
                        {filteredCompanies.map((company) => (
                            <li key={company._id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCompanies.includes(company._id)}
                                    onChange={() => handleCompanyCheckboxChange(company._id)}
                                />
                                <span>{company.companyName} </span>
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
                        Total No of Mail: <span>{filteredCompanies.length}</span>
                    </div>
                </div>

                {/* Email Composer */}
                <div className="px-4">
                    <div className="flex space-x-4 mb-4">
                        <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Final Preview</button>
                    </div>
                    <div className="border border-gray-300"></div>
                    <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-md mb-4">
                        {/* Insert Button */}
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
                            <HiOutlinePlusCircle className="text-lg" />
                            <span className='text-sm'>Insert</span>
                            <span className="text-sm">&#x25BC;</span> {/* Dropdown arrow */}
                        </button>
                        <p>|</p>
                        {/* Font Size */}
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
                            <AiOutlineFontSize className="text-lg" />
                            <span className='text-sm'>Type</span>
                            <span className="text-sm">&#x25BC;</span> {/* Dropdown arrow */}
                        </button>
                        <p>|</p>
                        {/* Text Formatting */}
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
                            <BiBold className="text-lg" />
                    
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
                            <BiItalic className="text-lg" />
                           
                        </button>
                        <p>|</p>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
                            <BsListUl className="text-lg" />
                            
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
                            <MdOutlineFormatListNumbered className="text-lg" />
                        
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
                            <BsUpload className="text-lg" />
                            <span>Upload files</span>
                        </button>
                    </div>
                    <div className=" ">
                        <textarea
                            className="w-full h-[300px] p-2 border border-gray-300 rounded-md resize-none"
                            placeholder="Write your email content here..."
                        />
                    </div>
                    <div className="mt-4 flex justify-end space-x-4">
                        <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Save as Draft</button>
                        <button className="bg-red-500 text-white text-sm md:text-base px-4 py-2 rounded-md">Send Mail</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Emailtomembers;




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
//     const [selectedCompanies, setSelectedCompanies] = useState([]);
//     const [selectAllCompanies, setSelectAllCompanies] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/form/companies');
//                 const allCompanies = response.data;

//                 // Extract unique categories
//                 const uniqueCategories = [...new Set(allCompanies.map(company => company.natureOfCompany))];
//                 const sortedCategories = uniqueCategories.sort((a, b) => a.localeCompare(b));
//                 setCategories(sortedCategories.map((category, index) => ({ _id: index, natureOfCompany: category })));

//                 // Sort companies
//                 const sortedCompanies = allCompanies.sort((a, b) => a.companyName.localeCompare(b.companyName));
//                 setCompanies(sortedCompanies);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleCategoryCheckboxChange = (categoryId) => {
//         setSelectedCategories((prev) =>
//             prev.includes(categoryId)
//                 ? prev.filter((id) => id !== categoryId)
//                 : [...prev, categoryId]
//         );
//     };

//     const handleSelectAllCategories = () => {
//         if (selectAllCategories) {
//             setSelectedCategories([]);
//         } else {
//             setSelectedCategories(categories.map((category) => category._id));
//         }
//         setSelectAllCategories(!selectAllCategories);
//     };

//     const handleCompanyCheckboxChange = (companyId) => {
//         setSelectedCompanies((prev) =>
//             prev.includes(companyId)
//                 ? prev.filter((id) => id !== companyId)
//                 : [...prev, companyId]
//         );
//     };

//     const handleSelectAllCompanies = () => {
//         if (selectAllCompanies) {
//             setSelectedCompanies([]);
//         } else {
//             setSelectedCompanies(companies.map((company) => company._id));
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
//             {/* Header section */}
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
//                     <div className="flex justify-between items-center mb-4">
//                         <h3 className="font-bold text-red-500">Company Categories</h3>
//                         <input
//                             type="checkbox"
//                             className="ml-2"
//                             checked={selectAllCategories}
//                             onChange={handleSelectAllCategories}
//                         />
//                         <label className="ml-2">Select All</label>
//                     </div>
//                     <ul className="space-y-2 text-sm md:text-base p-4">
//                         {categories.map((category) => (
//                             <li key={category._id} className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedCategories.includes(category._id)}
//                                     onChange={() => handleCategoryCheckboxChange(category._id)}
//                                 />
//                                 <span className={selectedCategories.includes(category._id) ? 'text-red-500' : ''}>
//                                     {category.natureOfCompany}
//                                 </span>
//                             </li>
//                         ))}
//                     </ul>
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
//                                     checked={selectedCompanies.includes(company._id)}
//                                     onChange={() => handleCompanyCheckboxChange(company._id)}
//                                 />
//                                 <span>{company.companyName} </span>
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
                        
//                         <button className="bg-gray-200 text-sm md:text-base px-4 py-2 rounded-md">Final Preview</button>
//                     </div>
//                     <div className="border border-gray-300"></div>
//                     <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-md mb-4">
//                         {/* Insert Button */}
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <HiOutlinePlusCircle className="text-lg" />
//                             <span className='text-sm'>Insert</span>
//                             <span className="text-sm">&#x25BC;</span> {/* Dropdown arrow */}
//                         </button>
//                         <p>|</p>
//                         {/* Font Size */}
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <AiOutlineFontSize className="text-lg" />
//                             <span className='text-sm'>Type</span>
//                             <span className="text-sm">&#x25BC;</span> {/* Dropdown arrow */}
//                         </button>
//                         <p>|</p>
//                         {/* Text Formatting */}
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <BiBold className="text-lg" />
                    
//                         </button>
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <BiItalic className="text-lg" />
                           
//                         </button>
//                         <p>|</p>
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <BsListUl className="text-lg" />
                            
//                         </button>
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <MdOutlineFormatListNumbered className="text-lg" />
                        
//                         </button>
//                         <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
//                             <BsUpload className="text-lg" />
//                             <span>Upload files</span>
//                         </button>
//                     </div>
//                     <div className=" ">
//                         <textarea
//                             className="w-full h-[300px] p-2 border border-gray-300 rounded-md resize-none"
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