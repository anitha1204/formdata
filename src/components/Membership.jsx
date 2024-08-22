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

    const handleSubmit = async () => {
        if (!formData.companyName || !formData.email) {
            toast.warn('Please fill in all required fields.');
            return;
        }

        try {
            if (editingItem) {
                console.log('Editing item ID:', editingItem._id); // Check if the ID is correct
                // Update existing entry
                await axios.put(`https://formdata1.onrender.com/api/form/companies/${editingItem._id}`, formData);
                setData(data.map(item => item._id === editingItem._id ? { ...item, ...formData } : item));
            } else {
                // Create new entry
                const response = await axios.post('https://formdata1.onrender.com/api/form/companies', formData);
                setData([...data, response.data]); // Update table with new data

            }
            setShowModal(false); // Close modal
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
            }); // Reset form data
            toast.success('New entry created successfully!');
            setEditingItem(null); // Clear the editing item
        } catch (error) {
            console.error('There was an error creating the new entry!', error);
            if (error.response) {
                if (error.response.status === 404) {
                    toast.error('The item you are trying to update does not exist.');
                } else {
                    toast.error(`Error: ${error.response.data.message || 'There was an error creating the new entry. Please try again.'}`);
                }
            } else {
                toast.error('Network error. Please check your connection and try again.');
            }
        }
    };


    const handleDelete = (id) => {
        axios.delete(`https://formdata1.onrender.com/api/form/companies/${id}`)
            .then(() => {
                setData(data.filter(item => item._id !== id));
                toast.info('Entry deleted successfully.', {

                });
            })
            .catch(error => {
                console.error("There was an error deleting the entry!", error);
                toast.error('There was an error deleting the entry. Please try again.', {

                });
            });
    };
    return (
        <div className="min-h-screen p-8 bg-white">
            <div className="">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex space-x-4 gap-10 ml-2">
                        {['MCCI Membership', 'Companies', 'Email to Members', 'Profile'].map((button) => (
                            <button
                                key={button}
                                className={`relative text-gray-500 pb-1 ${activeButton === button
                                    ? 'text-black border-b-2 border-red-500'
                                    : ''
                                    }`}
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
                    <div className="rounded-lg shadow-lg w-[90%] p-6 bg-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-red-600">Fill the Form Details</h2>
                            <IoMdClose
                                className="text-gray-600 text-2xl cursor-pointer"
                                onClick={() => setShowModal(false)}
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="grid grid-row-5 gap-4">
                                <div className="flex flex-col">
                                    <label className="mb-2">Name of the company</label>
                                    <input type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2">Address</label>
                                    <input type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="border rounded-xl p-8 outline-none" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2">Address of registered Office</label>
                                    <input type="text"
                                        name="registeredOfficeAddress"
                                        value={formData.registeredOfficeAddress}
                                        onChange={handleChange}
                                        className="border rounded-xl p-6 outline-none" />
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
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-row-6 gap-4">
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">Telephone / Landline Number</label>
                                    <input
                                        type="text"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
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
                                </div>
                            </div>
                            <div className="grid grid-row-6 gap-4">
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">Number of Employees</label>
                                    <input
                                        type="text"
                                        name="numberOfEmployees"
                                        value={formData.numberOfEmployees}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
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
                                </div>
                                <div className="col-span-1 flex flex-col">
                                    <label className="mb-2">Nature of the company</label>
                                    <input
                                        type="text"
                                        name="natureOfCompany"
                                        value={formData.natureOfCompany}
                                        onChange={handleChange}
                                        className="border rounded-xl p-2 outline-none"
                                    />
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