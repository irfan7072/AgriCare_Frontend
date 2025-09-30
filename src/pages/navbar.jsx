import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-6 bg-opacity-60 bg-gray-900">
      <div className="flex items-center">
        <img src="path/to/logo.png" alt="Agrishare Logo" className="h-12 w-12 mr-3" />
        <span className="text-2xl font-bold">Agrishare</span>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:text-blue-400">Home</Link>
        </li>
        <li>
          <Link to="/contactus" className="hover:text-blue-400">Contact Us</Link>
        </li>
        <li>
          <Link to="/signup" className="hover:text-blue-400">Sign Up</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-blue-400">Login</Link>
        </li>
        <li>
          <Link to="/ourmodel" className="hover:text-blue-400">Our Model</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
