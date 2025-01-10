import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="max-w-7xl mx-auto bg-white">
    <div className="bg-teal-600 w-auto shadow-md rounded-lg">
      <nav className="w-full max-w-4xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          BlogApp
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white text-lg hover:text-teal-200">
            Home
          </Link>
          <Link to="/posts" className="text-white text-lg hover:text-teal-200">
            Posts
          </Link>
          {isAuthenticated ? (
            <Link
              to="/admin"
              className="bg-white text-teal-600 text-lg font-semibold py-2 px-4 rounded-full hover:bg-teal-500 hover:text-white transition"
            >
              Admin
            </Link>
          ) : (
            <Link to="/login" className="text-white text-lg hover:text-teal-200">
              Login
            </Link>
          )}
        </div>
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-teal-700 p-4">
          <Link to="/" className="text-white text-lg block py-2">
            Home
          </Link>
          <Link to="/posts" className="text-white text-lg block py-2">
            Posts
          </Link>
          {isAuthenticated ? (
            <Link
              to="/admin"
              className="bg-white text-teal-600 text-lg font-semibold py-2 px-4 rounded-full block text-center mt-2 hover:bg-teal-500 hover:text-white transition"
            >
              Admin
            </Link>
          ) : (
            <Link to="/login" className="text-white text-lg block py-2">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
    </div>
  );
}
