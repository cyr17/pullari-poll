import React from 'react';
import { useLocation } from 'react-router-dom';

const NavbarComponent = () => {
  const location = useLocation();

  return (
    <nav className="border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-wrap items-center justify-between mx-auto p-5">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* Add your logo or brand name here */}
        </a>
        <ul className="flex space-x-4 font-medium">
          <li>
            <a
              href="/"
              className={`block py-2 px-3 rounded ${location.pathname === '/' ? 'text-white bg-blue-700 dark:bg-blue-600' : 'text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/voting"
              className={`block py-2 px-3 rounded ${location.pathname === '/voting' ? 'text-white bg-blue-700 dark:bg-blue-600' : 'text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
              aria-current={location.pathname === '/voting' ? 'page' : undefined}
            >
              Voting
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className={`block py-2 px-3 rounded ${location.pathname === '/contact' ? 'text-white bg-blue-700 dark:bg-blue-600' : 'text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
              aria-current={location.pathname === '/contact' ? 'page' : undefined}
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="/about"
              className={`block py-2 px-3 rounded ${location.pathname === '/about' ? 'text-white bg-blue-700 dark:bg-blue-600' : 'text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
              aria-current={location.pathname === '/about' ? 'page' : undefined}
            >
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;