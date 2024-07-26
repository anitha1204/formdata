import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const navbarLinks = [
   
    
     {
        name: "Profile",
        link:"/profile", 
     },
     {
        name: "Connect ",
        link:"/connect", 
     },
     {
      name: "Settings",
      link:"/settings", 
   },
   
    

] 

const ResponsiveMenu = ({showMenu, setShowMenu}) => {
  return (
    <div  
     className={`${
     showMenu ? "left-0" : "-left-[100%]"
     } fixed bottom-0 top-0 z-20 flex h-screen w-[75%]
      flex-col justify-between bg-white dark:bg-gray-900 
      dark:text-white px-8 pb-6 pt-16 text-black 
      transition-all duration-200 md:hidden rounded-r-xl 
      shadow-md`}
    >
      <div className='Navbar__card'>
        {/* top section */}
        <div>
         <div className='flex items-center justify-start gap-4'>
            <FaUserCircle size={50}
             className='text-red-500'/>
            <div className='text-gray-500'>
                <h1>Hello User</h1>
                <h1 className='text-sm text-slate-500'>Premiun User</h1>
            </div>
         </div>
        </div>
        {/* Navlinks section */}
        <div className='text-black mt-12'>
            <ul className='space-y-4 text-xl'>
                {
                  navbarLinks.map(({name, link})=>(
                    <li>
                        <Link to={link}
                         onClick={()=>setShowMenu(false)}
                         className='mb-5 inline-block w-full rounded-md p-2  hover:text-white'
                        >
                        {name}</Link>
                        
                    </li>
                    
                  )) 
                   
                }
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-100 mb-10 mr-2 self-center">Logout</button>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default ResponsiveMenu