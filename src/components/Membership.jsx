// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import logo from '../assets/Group 12.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { IoMdClose } from "react-icons/io";
// import { FiEdit } from 'react-icons/fi';
// import { MdDelete } from 'react-icons/md';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Membership = () => {
//     const [activeButton, setActiveButton] = useState('MCCI Membership');
//     const [showModal, setShowModal] = useState(false);
//     const [editingItem, setEditingItem] = useState(null);

//     const handleEdit = (item) => {
//         setEditingItem(item);
//         setFormData({
//             companyName: item.companyName || '',
//             address: item.address || '',
//             registeredOfficeAddress: item.registeredOfficeAddress || '',
//             chiefExecutiveName: item.chiefExecutiveName || '',
//             designation: item.designation || '',
//             yearOfEstablishment: item.yearOfEstablishment || '',
//             telephone: item.telephone || '',
//             email: item.email || '',
//             mobile: item.mobile || '',
//             website: item.website || '',
//             businessActivity: item.businessActivity || '',
//             paidUpCapital: item.paidUpCapital || '',
//             numberOfEmployees: item.numberOfEmployees || '',
//             annualTurnover: item.annualTurnover || '',
//             gstNo: item.gstNo || '',
//             natureOfCompany: item.natureOfCompany || '',
//             keyContactPerson: item.keyContactPerson || '',
//             keyContactMobile: item.keyContactMobile || '',
//             secondaryContactPerson: item.secondaryContactPerson || '',
//             secondaryContactMobile: item.secondaryContactMobile || '',
//         });
//         setShowModal(true); // Open the modal or form for editing
//     };

//     const [formData, setFormData] = useState({
//         companyName: '',
//         address: '',
//         registeredOfficeAddress: '',
//         chiefExecutiveName: '',
//         designation: '',
//         yearOfEstablishment: '',
//         telephone: '',
//         email: '',
//         mobile: '',
//         website: '',
//         businessActivity: '',
//         paidUpCapital: '',
//         numberOfEmployees: '',
//         annualTurnover: '',
//         gstNo: '',
//         natureOfCompany: '',
//         keyContactPerson: '',
//         keyContactMobile: '',
//         secondaryContactPerson: '',
//         secondaryContactMobile: '',
//     });
//     const [data, setData] = useState([]);
//     const navigate = useNavigate();

//     const handleNavigation = (button) => {
//         setActiveButton(button);
//         navigate(`/${button.replace(/\s+/g, '').toLowerCase()}`);
//     };

//     useEffect(() => {
//         axios.get('https://formdata1.onrender.com/api/form/companies')
//             .then(response => {
//                 setData(response.data);
//             })
//             .catch(error => {
//                 console.error("There was an error fetching the companies data!", error);
//             });
//     }, []);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async () => {
//         if (!formData.companyName || !formData.email) {
//             toast.warn('Please fill in all required fields.');
//             return;
//         }

//         try {
//             if (editingItem) {
//                 console.log('Editing item ID:', editingItem._id); // Check if the ID is correct
//                 // Update existing entry
//                 await axios.put(`https://formdata1.onrender.com/api/form/companies/${editingItem._id}`, formData);
//                 setData(data.map(item => item._id === editingItem._id ? { ...item, ...formData } : item));
//             } else {
//                 // Create new entry
//                 const response = await axios.post('https://formdata1.onrender.com/api/form/companies', formData);
//                 setData([...data, response.data]); // Update table with new data

//             }
//             setShowModal(false); // Close modal
//             setFormData({
//                 companyName: '',
//                 address: '',
//                 registeredOfficeAddress: '',
//                 chiefExecutiveName: '',
//                 designation: '',
//                 yearOfEstablishment: '',
//                 telephone: '',
//                 email: '',
//                 mobile: '',
//                 website: '',
//                 businessActivity: '',
//                 paidUpCapital: '',
//                 numberOfEmployees: '',
//                 annualTurnover: '',
//                 gstNo: '',
//                 natureOfCompany: '',
//                 keyContactPerson: '',
//                 keyContactMobile: '',
//                 secondaryContactPerson: '',
//                 secondaryContactMobile: '',
//             }); // Reset form data
//             toast.success('New entry created successfully!');
//             setEditingItem(null); // Clear the editing item
//         } catch (error) {
//             console.error('There was an error creating the new entry!', error);
//             if (error.response) {
//                 if (error.response.status === 404) {
//                     toast.error('The item you are trying to update does not exist.');
//                 } else {
//                     toast.error(`Error: ${error.response.data.message || 'There was an error creating the new entry. Please try again.'}`);
//                 }
//             } else {
//                 toast.error('Network error. Please check your connection and try again.');
//             }
//         }
//     };


//     const handleDelete = (id) => {
//         axios.delete(`https://formdata1.onrender.com/api/form/companies/${id}`)
//             .then(() => {
//                 setData(data.filter(item => item._id !== id));
//                 toast.info('Entry deleted successfully.', {

//                 });
//             })
//             .catch(error => {
//                 console.error("There was an error deleting the entry!", error);
//                 toast.error('There was an error deleting the entry. Please try again.', {

//                 });
//             });
//     };
//     return (
//         <div className="min-h-screen p-8 bg-white">
//             <div className="">
//                 <div className="flex items-center justify-between mb-8">
//                     <div className="flex space-x-4 gap-10 ml-2">
//                         {['MCCI Membership', 'Companies', 'Email to Members', 'Profile'].map((button) => (
//                             <button
//                                 key={button}
//                                 className={`relative text-gray-500 pb-1 ${activeButton === button
//                                     ? 'text-black border-b-2 border-red-500'
//                                     : ''
//                                     }`}
//                                 onClick={() => handleNavigation(button)}
//                             >
//                                 {button}
//                             </button>
//                         ))}
//                         <button
//                             className="bg-green-500 text-white py-1 px-4 rounded-full hover:bg-green-600"
//                             onClick={() => setShowModal(true)}
//                         >
//                             Add New User
//                         </button>
//                     </div>
//                     <img src={logo} alt="Logo" className="w-24 md:w-44" />
//                 </div>
//                 <div className="flex justify-between mb-8">
//                     <h2 className="text-xl font-bold ml-2">MCCI Membership</h2>
//                     <Link to="/LoginRegister">
//                         <h2 className="text-xl font-bold text-red-500 mr-2 cursor-pointer">MCCI Dashboard</h2>
//                     </Link>
//                 </div>
//                 <div className="overflow-x-auto rounded-xl">
//                     <table className="min-w-full bg-white border">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="py-3 px-4 border-2 text-left whitespace-nowrap">Company Name</th>
//                                 <th className="py-3 px-6 border-2 text-left whitespace-nowrap">Member Name</th>
//                                 <th className="py-3 px-6 border-2 text-left whitespace-nowrap">Mail Address</th>
//                                 <th className="py-3 px-6 border-2 text-left whitespace-nowrap">Website</th>
//                                 <th className="py-3 px-6 border-2 text-left whitespace-nowrap">Type of Industry</th>
//                                 <th className="py-3 px-6 border-2"></th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data
//                                 .filter(item => item.companyName && item.keyContactPerson && item.email && item.website && item.natureOfCompany)
//                                 .map((item) => (
//                                     <tr key={item._id} className="hover:bg-gray-100">
//                                         <td className="py-3 px-4 border-b text-left whitespace-nowrap">{item.companyName}</td>
//                                         <td className="py-3 px-6 border-b text-left whitespace-nowrap">{item.keyContactPerson}</td>
//                                         <td className="py-3 px-6 border-b text-left whitespace-nowrap">{item.email}</td>
//                                         <td className="py-3 px-6 border-b text-left whitespace-nowrap">{item.website}</td>
//                                         <td className="py-3 px-6 border-b text-left whitespace-nowrap">{item.natureOfCompany}</td>

//                                         <td className="py-3 border-b text-red-500 cursor-pointer hover:underline whitespace-nowrap flex items-center gap-4">
//                                             <span className='lg:ml-4'>Create Access</span>
//                                             <FiEdit
//                                                 className="text-gray-600 cursor-pointer hover:text-red-600"
//                                                 onClick={() => handleEdit(item)}
//                                             />
//                                             <MdDelete
//                                                 className="text-gray-600 cursor-pointer hover:text-red-600"
//                                                 onClick={() => handleDelete(item._id)}
//                                             />
//                                         </td>

//                                     </tr>
//                                 ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                     <div className="rounded-lg shadow-lg w-[90%] p-6 bg-gray-200">
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-xl font-bold text-red-600">Fill the Form Details</h2>
//                             <IoMdClose
//                                 className="text-gray-600 text-2xl cursor-pointer"
//                                 onClick={() => setShowModal(false)}
//                             />
//                         </div>
//                         <div className="grid grid-cols-3 gap-6">
//                             <div className="grid grid-row-5 gap-4">
//                                 <div className="flex flex-col">
//                                     <label className="mb-2">Name of the company</label>
//                                     <input
//                                         type="text"
//                                         name="companyName"
//                                         value={formData.companyName}
//                                         onChange={handleChange}
//                                     />
//                                     {errors.companyName && <p className="error">{errors.companyName}</p>}
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <label className="mb-2">Address</label>
//                                     <input
//                                         type="text"
//                                         name="address"
//                                         value={formData.address}
//                                         onChange={handleChange}
//                                     />
//                                     {errors.address && <p className="error">{errors.address}</p>}
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <label className="mb-2">Address of registered Office</label>
//                                     <input type="text"
//                                         name="registeredOfficeAddress"
//                                         value={formData.registeredOfficeAddress}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-6 outline-none" />
//                                         {errors.registeredOfficeAddress && <p className="error">{errors.registeredOfficeAddress}</p>}
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <label className="mb-2">Name of the chief executive</label>
//                                     <input
//                                         type="text"
//                                         name="chiefExecutiveName"
//                                         value={formData.chiefExecutiveName}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-2 outline-none"
//                                     />
//                                     {errors.chiefExecutiveName && <p className="error">{errors.chiefExecutiveName}</p>}
//                                 </div>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
//                                     <div className="col-span-1 flex flex-col">
//                                         <label className="mb-2">Designation</label>
//                                         <input
//                                             type="text"
//                                             name="designation"
//                                             value={formData.designation}
//                                             onChange={handleChange}
//                                             className="border rounded-xl p-2 outline-none"
//                                         />
//                                         {errors. designation && <p className="error">{errors.designation}</p>}
//                                     </div>
//                                     <div className="col-span-1 flex flex-col">
//                                         <label className="mb-2">Year of Establishment</label>
//                                         <input
//                                             type="text"
//                                             name="yearOfEstablishment"
//                                             value={formData.yearOfEstablishment}
//                                             onChange={handleChange}
//                                             className="border rounded-xl p-2 outline-none"
//                                         />
//                                         {errors.yearOfEstablishment && <p className="error">{errors.yearOfEstablishment}</p>}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="grid grid-row-6 gap-4">
//                                 <div className="col-span-1 flex flex-col">
//                                     <label className="mb-2">Telephone / Landline Number</label>
//                                     <input
//                                         type="text"
//                                         name="telephone"
//                                         value={formData.telephone}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-2 outline-none"
//                                     />
//                                     {errors.telephone && <p className="error">{errors.telephone}</p>}
//                                 </div>
//                                 <div className="col-span-1 flex flex-col">
//                                     <label className="mb-2">Email Address</label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-2 outline-none"
//                                     />
//                                     {errors.email && <p className="error">{errors.email}</p>}
//                                 </div>
//                                 <div className="col-span-1 flex flex-col">
//                                     <label className="mb-2">Mobile Number</label>
//                                     <input
//                                         type="text"
//                                         name="mobile"
//                                         value={formData.mobile}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-2 outline-none"
//                                     />
//                                     {errors.mobile && <p className="error">{errors.mobile}</p>}
//                                 </div>
//                                 <div className="col-span-1 flex flex-col mb-[-2]">
//                                     <label className="mb-2">Website</label>
//                                     <input
//                                         type="text"
//                                         name="website"
//                                         value={formData.website}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-2 outline-none"
//                                     />
//                                     {errors.website && <p className="error">{errors.website}</p>}
//                                 </div>
//                                 <div className="col-span-1 flex flex-col">
//                                     <label className="mb-2">Business / Major Line of Activity</label>
//                                     <input
//                                         type="text"
//                                         name="businessActivity"
//                                         value={formData.businessActivity}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-2 outline-none"
//                                     />
//                                     {errors.businessActivity && <p className="error">{errors.businessActivity}</p>}
//                                 </div>
//                                 <div className="col-span-1 flex flex-col">
//                                     <label className="mb-2">Paid up Capital</label>
//                                     <input
//                                         type="text"
//                                         name="paidUpCapital"
//                                         value={formData.paidUpCapital}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-2 outline-none"
//                                     />
//                                     {errors.paidUpCapital && <p className="error">{errors.paidUpCapital}</p>}
//                                 </div>
//                             </div>
//                             <div className="grid grid-row-6 gap-4">
//                                 <div className="col-span-1 flex flex-col">
//                                     <label className="mb-2">Number of Employees</label>
//                                     <input
//                                         type="text"
//                                         name="numberOfEmployees"
//                                         value={formData.numberOfEmployees}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-2 outline-none"
//                                     />
//                                     {errors.numberOfEmployees && <p className="error">{errors.numberOfEmployees}</p>}
//                                 </div>
//                                 <div className="col-span-1 flex flex-col">
//                                     <label className="mb-2">Annual Turnover</label>
//                                     <input
//                                         type="text"
//                                         name="annualTurnover"
//                                         value={formData.annualTurnover}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-2 outline-none"
//                                     />
//                                     {errors.annualTurnover && <p className="error">{errors.annualTurnover}</p>}
//                                 </div>
//                                 <div className="col-span-1 flex flex-col">
//                                     <label className="mb-2">GST No.</label>
//                                     <input
//                                         type="text"
//                                         name="gstNo"
//                                         value={formData.gstNo}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-2 outline-none"
//                                     />
//                                     {errors.gstNo && <p className="error">{errors.gstNo}</p>}
//                                 </div>
//                                 <div className="col-span-1 flex flex-col">
//                                     <label className="mb-2">Nature of the company</label>
//                                     <input
//                                         type="text"
//                                         name="natureOfCompany"
//                                         value={formData.natureOfCompany}
//                                         onChange={handleChange}
//                                         className="border rounded-xl p-2 outline-none"
//                                     />
//                                     {errors.natureOfCompany && <p className="error">{errors.natureOfCompany}</p>}
//                                 </div>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
//                                     <div className="col-span-1 flex flex-col">
//                                         <label className="mb-2">Key contact person</label>
//                                         <input
//                                             type="text"
//                                             name="keyContactPerson"
//                                             value={formData.keyContactPerson}
//                                             onChange={handleChange}
//                                             className="border rounded-xl p-2 outline-none"
//                                         />
//                                         {errors.keyContactPerson && <p className="error">{errors.keyContactPerson}</p>}
//                                     </div>
//                                     <div className="col-span-1 flex flex-col">
//                                         <label className="mb-2">Mobile Number</label>
//                                         <input
//                                             type="text"
//                                             name="keyContactMobile"
//                                             value={formData.keyContactMobile}
//                                             onChange={handleChange}
//                                             className="border rounded-xl p-2 outline-none"
//                                         />
//                                         {errors.keyContactMobile && <p className="error">{errors.keyContactMobile}</p>}
//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
//                                     <div className="col-span-1 flex flex-col">
//                                         <label className="mb-2">Secondary contact person</label>
//                                         <input
//                                             type="text"
//                                             name="secondaryContactPerson"
//                                             value={formData.secondaryContactPerson}
//                                             onChange={handleChange}
//                                             className="border rounded-xl p-2 outline-none"
//                                         />
//                                         {errors.secondaryContactPerson && <p className="error">{errors.secondaryContactPerson}</p>}
//                                     </div>
//                                     <div className="col-span-1 flex flex-col">
//                                         <label className="mb-2">Mobile Number</label>
//                                         <input
//                                             type="text"
//                                             name="secondaryContactMobile"
//                                             value={formData.secondaryContactMobile}
//                                             onChange={handleChange}
//                                             className="border rounded-xl p-2 outline-none"
//                                         />
//                                         {errors.secondaryContactMobile&& <p className="error">{errors.secondaryContactMobile}</p>}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="text-center mt-4">
//                             <button
//                                 className="bg-red-600 text-white py-2 px-24 rounded-xl hover:bg-red-500"
//                                 onClick={handleSubmit}
//                             >
//                                 Create
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <ToastContainer />
//         </div>
//     );
// };

// export default Membership;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/Group 12.png';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Membership = () => {
    const [activeButton, setActiveButton] = useState('MCCI Membership');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        companyName: '',
        address: '',
        registeredOfficeAddress: '',
        chiefExecutiveName: '',
        designation: '',
        yearOfEstablishment: '',
        telephone: '',
        email: '',
        mobile: '',
        website: '',
        businessActivity: '',
        paidUpCapital: '',
        numberOfEmployees: '',
        annualTurnover: '',
        gstNo: '',
        natureOfCompany: '',
        keyContactPerson: '',
        keyContactMobile: '',
        secondaryContactPerson: '',
        secondaryContactMobile: '',
    });
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleNavigation = (button) => {
        setActiveButton(button);
        navigate(`/${button.replace(/\s+/g, '').toLowerCase()}`);
    };

    useEffect(() => {
        axios.get('https://formdata1.onrender.com/api/form/companies')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the companies data!", error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        const isAlpha = (str) => /^[a-zA-Z\s]+$/.test(str);
        const isNumeric = (str) => /^[0-9]+$/.test(str);
        const isEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
        const isGST = (str) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(str);
        const isURL = (str) => /^https?:\/\/.+/.test(str);

        // Company Name
        if (!formData.companyName) newErrors.companyName = 'Company Name is required';
        else if (formData.companyName.length > 100) newErrors.companyName = 'Company Name must be less than 100 characters';

        // Address
        if (!formData.address) newErrors.address = 'Address is required';
        else if (formData.address.length > 100) newErrors.address = 'Address must be less than 100 characters';

        // Registered Office Address
        if (!formData.registeredOfficeAddress) newErrors.registeredOfficeAddress = 'Registered Office Address is required';
        else if (formData.registeredOfficeAddress.length > 100) newErrors.registeredOfficeAddress = 'Registered Office Address must be less than 100 characters';

        if (!formData.designation) newErrors.designation = ' designation is required';


        // Year of Establishment
        if (!formData.yearOfEstablishment) newErrors.yearOfEstablishment = 'Year is required';
        else if (!isNumeric(formData.yearOfEstablishment)) newErrors.yearOfEstablishment = 'Year of Establishment must be a number';
        else if (formData.yearOfEstablishment < 1800 || formData.yearOfEstablishment > new Date().getFullYear()) {
            newErrors.yearOfEstablishment = 'Year of Establishment must be between 1800 and the current year';
        }

        // Telephone
        if (!formData.telephone) newErrors.telephone = 'Telephone is required';
        else if (!isNumeric(formData.telephone)) newErrors.telephone = 'Telephone must be a number';
        else if (formData.telephone.length < 10 || formData.telephone.length > 12) {
            newErrors.telephone = 'Telephone must be between 10 and 12 digits';
        }

        // Email
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!isEmail(formData.email)) newErrors.email = 'Email address is invalid';

        // Mobile
        if (!formData.mobile) newErrors.mobile = 'Mobile is required';
        else if (!isNumeric(formData.mobile)) newErrors.mobile = 'Mobile number must be a number';
        else if (formData.mobile.length !== 10) newErrors.mobile = 'Mobile number must be 10 digits';

        // Website
        if (!formData.website) newErrors.website = 'Website is required';
        else if (!isURL(formData.website)) newErrors.website = 'Website must start with "http://" or "https://"';

        // Business Activity
        if (!formData.businessActivity) newErrors.businessActivity = 'Business Activity is required';

        // Paid-Up Capital
        if (!formData.paidUpCapital) newErrors.paidUpCapital = 'Paid-Up Capital is required';
        else if (!isNumeric(formData.paidUpCapital)) newErrors.paidUpCapital = 'Paid-Up Capital must be a number';
        else if (formData.paidUpCapital < 0) newErrors.paidUpCapital = 'Paid-Up Capital cannot be negative';

        // Number of Employees
        if (!formData.numberOfEmployees) newErrors.numberOfEmployees = 'Number of Employees is required';
        else if (!isNumeric(formData.numberOfEmployees)) newErrors.numberOfEmployees = 'Number of Employees must be a number';
        else if (formData.numberOfEmployees < 1) newErrors.numberOfEmployees = 'Number of Employees must be at least 1';

        // Annual Turnover
        if (!formData.annualTurnover) newErrors.annualTurnover = 'Annual Turnover is required';
        else if (!isNumeric(formData.annualTurnover)) newErrors.annualTurnover = 'Annual Turnover must be a number';
        else if (formData.annualTurnover < 0) newErrors.annualTurnover = 'Annual Turnover cannot be negative';

        // GST Number
        if (!formData.gstNo) newErrors.gstNo = 'GST Number is required';
        else if (!isGST(formData.gstNo)) newErrors.gstNo = 'GST Number is invalid';

        // Nature of Company
        if (!formData.natureOfCompany) newErrors.natureOfCompany = 'Nature of Company is required';
        else if (!isAlpha(formData.natureOfCompany)) newErrors.natureOfCompany = 'Nature of Company must contain letters only';

        // Key Contact Person
        if (!formData.keyContactPerson) newErrors.keyContactPerson = 'Key Contact Person is required';
        else if (!isAlpha(formData.keyContactPerson)) newErrors.keyContactPerson = 'Key Contact Person must contain letters only';

        // Key Contact Mobile
        if (!formData.keyContactMobile) newErrors.keyContactMobile = 'Key Contact Mobile is required';
        else if (!isNumeric(formData.keyContactMobile)) newErrors.keyContactMobile = 'Mobile number must be a number';
        else if (formData.keyContactMobile.length !== 10) newErrors.keyContactMobile = 'Mobile number must be 10 digits';

        // Secondary Contact Person
        if (!formData.secondaryContactPerson) newErrors.secondaryContactPerson = 'Secondary Contact Person is required';
        else if (!isAlpha(formData.secondaryContactPerson)) newErrors.secondaryContactPerson = 'Secondary Contact Person must contain letters only';

        // Secondary Contact Mobile
        if (!formData.secondaryContactMobile) newErrors.secondaryContactMobile = 'Secondary Contact Mobile is required';
        else if (!isNumeric(formData.secondaryContactMobile)) newErrors.secondaryContactMobile = 'Mobile number must be a number';
        else if (formData.secondaryContactMobile.length !== 10) newErrors.secondaryContactMobile = 'Mobile number must be 10 digits';

        return newErrors;
    };



    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (editingItem) {
                await axios.put(`https://formdata1.onrender.com/api/form/companies/${editingItem._id}`, formData);
                setData(data.map(item => item._id === editingItem._id ? { ...item, ...formData } : item));
            } else {
                const response = await axios.post('https://formdata1.onrender.com/api/form/companies', formData);
                setData([...data, response.data]);
            }
            setShowModal(false);
            setFormData({
                companyName: '',
                address: '',
                registeredOfficeAddress: '',
                chiefExecutiveName: '',
                designation: '',
                yearOfEstablishment: '',
                telephone: '',
                email: '',
                mobile: '',
                website: '',
                businessActivity: '',
                paidUpCapital: '',
                numberOfEmployees: '',
                annualTurnover: '',
                gstNo: '',
                natureOfCompany: '',
                keyContactPerson: '',
                keyContactMobile: '',
                secondaryContactPerson: '',
                secondaryContactMobile: '',
            });
            toast.success('Entry saved successfully!');
            setEditingItem(null);
        } catch (error) {
            console.error('Error saving the entry:', error);
            toast.error('There was an error saving the entry. Please try again.');
        }
    };

    const handleDelete = (id) => {
        axios.delete(`https://formdata1.onrender.com/api/form/companies/${id}`)
            .then(() => {
                setData(data.filter(item => item._id !== id));
                toast.info('Entry deleted successfully.');
            })
            .catch(error => {
                console.error("There was an error deleting the entry!", error);
                toast.error('There was an error deleting the entry. Please try again.');
            });
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            companyName: item.companyName || '',
            address: item.address || '',
            registeredOfficeAddress: item.registeredOfficeAddress || '',
            chiefExecutiveName: item.chiefExecutiveName || '',
            designation: item.designation || '',
            yearOfEstablishment: item.yearOfEstablishment || '',
            telephone: item.telephone || '',
            email: item.email || '',
            mobile: item.mobile || '',
            website: item.website || '',
            businessActivity: item.businessActivity || '',
            paidUpCapital: item.paidUpCapital || '',
            numberOfEmployees: item.numberOfEmployees || '',
            annualTurnover: item.annualTurnover || '',
            gstNo: item.gstNo || '',
            natureOfCompany: item.natureOfCompany || '',
            keyContactPerson: item.keyContactPerson || '',
            keyContactMobile: item.keyContactMobile || '',
            secondaryContactPerson: item.secondaryContactPerson || '',
            secondaryContactMobile: item.secondaryContactMobile || '',
        });
        setShowModal(true); // Open the modal or form for editing
    };

    return (
        <div className="min-h-screen p-8 bg-white">
            <div className="">
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
                        <button
                            className="bg-green-500 text-white py-1 px-4 rounded-full hover:bg-green-600"
                            onClick={() => setShowModal(true)}
                        >
                            Add New User
                        </button>
                    </div>
                    <img src={logo} alt="Logo" className="w-24 md:w-44" />
                </div>
                <div className="flex justify-between mb-8">
                    <h2 className="text-xl font-bold ml-2">MCCI Membership</h2>
                    <Link to="/LoginRegister">
                        <h2 className="text-xl font-bold text-red-500 mr-2 cursor-pointer">MCCI Dashboard</h2>
                    </Link>
                </div>
                <div className="overflow-x-auto rounded-xl">
                    <table className="min-w-full bg-white border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 border-2 text-left whitespace-nowrap">Company Name</th>
                                <th className="py-3 px-6 border-2 text-left whitespace-nowrap">Member Name</th>
                                <th className="py-3 px-6 border-2 text-left whitespace-nowrap">Mail Address</th>
                                <th className="py-3 px-6 border-2 text-left whitespace-nowrap">Website</th>
                                <th className="py-3 px-6 border-2 text-left whitespace-nowrap">Type of Industry</th>
                                <th className="py-3 px-6 border-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data
                                .filter(item => item.companyName && item.keyContactPerson && item.email && item.website && item.natureOfCompany)
                                .map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-100">
                                        <td className="py-3 px-4 border-b text-left whitespace-nowrap">{item.companyName}</td>
                                        <td className="py-3 px-6 border-b text-left whitespace-nowrap">{item.keyContactPerson}</td>
                                        <td className="py-3 px-6 border-b text-left whitespace-nowrap">{item.email}</td>
                                        <td className="py-3 px-6 border-b text-left whitespace-nowrap">{item.website}</td>
                                        <td className="py-3 px-6 border-b text-left whitespace-nowrap">{item.natureOfCompany}</td>
                                        <td className="py-3 border-b text-red-500 cursor-pointer hover:underline whitespace-nowrap flex items-center gap-4">
                                            <span className='lg:ml-4'>Create Access</span>
                                            <FiEdit
                                                className="text-gray-600 cursor-pointer hover:text-red-600"
                                                onClick={() => handleEdit(item)}
                                            />
                                            <MdDelete
                                                className="text-gray-600 cursor-pointer hover:text-red-600"
                                                onClick={() => handleDelete(item._id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="rounded-lg shadow-lg w-[95%] p-6 bg-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold text-red-600">Fill the Form Details</h2>
                            <IoMdClose
                                className="text-gray-600 text-2xl cursor-pointer"
                                onClick={() => setShowModal(false)}
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="grid grid-row-5 ">
                                <div className="flex flex-col">
                                    <label className="mb-2">Name of the company</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none" />

                                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                                </div>
                                <div className="flex flex-col ">
                                    <label className="">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="border rounded-xl p-6 outline-none"
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2">Address of registered Office</label>
                                    <input type="text"
                                        name="registeredOfficeAddress"
                                        value={formData.registeredOfficeAddress}
                                        onChange={handleChange}
                                        className="border rounded-xl p-6 outline-none" />
                                    {errors.registeredOfficeAddress && <p className="text-red-500 text-sm mt-1">{errors.registeredOfficeAddress}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2">Name of the chief executive</label>
                                    <input
                                        type="text"
                                        name="chiefExecutiveName"
                                        value={formData.chiefExecutiveName}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
                                    {errors.chiefExecutiveName && <p className="text-red-500 text-sm mt-1">{errors.chiefExecutiveName}</p>}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
                                    <div className="col-span-1 flex flex-col">
                                        <label className="mb-2">Designation</label>
                                        <input
                                            type="text"
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            className="border rounded-xl p-2 outline-none"
                                        />
                                        {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
                                    </div>
                                    <div className="col-span-1 flex flex-col">
                                        <label className="mb-2">Year of Establishment</label>
                                        <input
                                            type="text"
                                            name="yearOfEstablishment"
                                            value={formData.yearOfEstablishment}
                                            onChange={handleChange}
                                            className="border rounded-xl p-2 outline-none"
                                        />
                                        {errors.yearOfEstablishment && <p className="text-red-500 text-sm mt-1">{errors.yearOfEstablishment}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-row-6 ">
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">Telephone / Landline Number</label>
                                    <input
                                        type="text"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
                                    {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
                                </div>
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
                                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                                </div>
                                <div className="col-span-1 flex flex-col mb-[-2]">
                                    <label className="mb-2">Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
                                    {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
                                </div>
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">Business / Major Line of Activity</label>
                                    <input
                                        type="text"
                                        name="businessActivity"
                                        value={formData.businessActivity}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
                                    {errors.businessActivity && <p className="text-red-500 text-sm mt-1">{errors.businessActivity}</p>}
                                </div>
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">Paid up Capital</label>
                                    <input
                                        type="text"
                                        name="paidUpCapital"
                                        value={formData.paidUpCapital}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
                                    {errors.paidUpCapital && <p className="text-red-500 text-sm mt-1">{errors.paidUpCapital}</p>}
                                </div>
                            </div>
                            <div className="grid grid-row-6 gap-1">
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">Number of Employees</label>
                                    <input
                                        type="text"
                                        name="numberOfEmployees"
                                        value={formData.numberOfEmployees}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
                                    {errors.numberOfEmployees && <p className="text-red-500 text-sm mt-1">{errors.numberOfEmployees}</p>}
                                </div>
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">Annual Turnover</label>
                                    <input
                                        type="text"
                                        name="annualTurnover"
                                        value={formData.annualTurnover}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
                                    {errors.annualTurnover && <p className="text-red-500 text-sm mt-1">{errors.annualTurnover}</p>}
                                </div>
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">GST No.</label>
                                    <input
                                        type="text"
                                        name="gstNo"
                                        value={formData.gstNo}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
                                    {errors.gstNo && <p className="text-red-500 text-sm mt-1">{errors.gstNo}</p>}
                                </div>
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">Nature of the company</label>
                                    <select
                                        name="natureOfCompany"
                                        value={formData.natureOfCompany}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none mb-2 "
                                    >
                                        <option value="" class="text-gray-400 ">Select Company</option>
                                        <option value="IT">IT</option>
                                        <option value="ITES">ITES</option>
                                        <option value="Manufacturing">Manufacturing</option>
                                        <option value="Logistics">Logistics</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Pharmaceuticals">Pharmaceuticals</option>
                                        <option value="BFSL">BFSL</option>
                                        <option value="Legal">Legal</option>
                                        <option value="Accounting">Accounting</option>
                                        <option value="AdvertisingMarketingCommunication">Advertising, Marketing & Communication</option>
                                        <option value="Agriculture">Agriculture</option>
                                        <option value="Education">Education</option>
                                        <option value="InfrastructureRealEstate">Infrastructure & Real Estate</option>
                                        <option value="Hospitality">Hospitality</option>
                                        <option value="TravelTourism">Travel and Tourism</option>
                                        <option value="ShippingPorts">Shipping and Ports</option>
                                        <option value="Textiles">Textiles</option>
                                    </select>


                                    {errors.natureOfCompany && <p className="text-red-500 text-sm mt-1">{errors.natureOfCompany}</p>}

                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
                                    <div className="col-span-1 flex flex-col">
                                        <label className="mb-2">Key contact person</label>
                                        <input
                                            type="text"
                                            name="keyContactPerson"
                                            value={formData.keyContactPerson}
                                            onChange={handleChange}
                                            className="border rounded-xl p-2 outline-none"
                                        />
                                        {errors.keyContactPerson && <p className="text-red-500 text-sm mt-1">{errors.keyContactPerson}</p>}
                                    </div>
                                    <div className="col-span-1 flex flex-col">
                                        <label className="mb-2">Mobile Number</label>
                                        <input
                                            type="text"
                                            name="keyContactMobile"
                                            value={formData.keyContactMobile}
                                            onChange={handleChange}
                                            className="border rounded-xl p-2 outline-none"
                                        />
                                        {errors.keyContactMobile && <p className="text-red-500 text-sm mt-1">{errors.keyContactMobile}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
                                    <div className="col-span-1 flex flex-col">
                                        <label className="mb-2">Secondary contact person</label>
                                        <input
                                            type="text"
                                            name="secondaryContactPerson"
                                            value={formData.secondaryContactPerson}
                                            onChange={handleChange}
                                            className="border rounded-xl p-2 outline-none"
                                        />
                                        {errors.secondaryContactPerson && <p className="text-red-500 text-sm mt-1">{errors.secondaryContactPerson}</p>}
                                    </div>
                                    <div className="col-span-1 flex flex-col">
                                        <label className="mb-2">Mobile Number</label>
                                        <input
                                            type="text"
                                            name="secondaryContactMobile"
                                            value={formData.secondaryContactMobile}
                                            onChange={handleChange}
                                            className="border rounded-xl p-2 outline-none"
                                        />
                                        {errors.secondaryContactMobile && <p className="text-red-500 text-sm mt-1">{errors.secondaryContactMobile}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <button
                                className="bg-red-600 text-white py-2 px-24 rounded-xl hover:bg-red-500"
                                onClick={handleSubmit}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Membership;



