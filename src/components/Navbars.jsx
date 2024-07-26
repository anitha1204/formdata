import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo1.png';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import ResponsiveMenu from './ResponsiveMenu'; // Corrected import

const Navbars = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white text-secondary shadow-md z-10">
        {/* Top bar */}
      
        {/* Main navbar */}
        <div className="container mx-auto py-3 sm:py-0 px-4 lg:px-0">
          <div className="flex justify-between items-center">
            {/* Logo section */}
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={logo} alt="Logo" className="h-16 sm:h-20 sm:ml-10 lg:ml-20" />
            </Link>
            
            <div className="flex items-center space-x-4">
             
             {/* Mobile Hamburger Menu */}
              <div className="md:hidden">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className="cursor-pointer"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer"
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Responsive menu */}
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  );
};

export default Navbars;
