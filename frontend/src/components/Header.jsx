import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-primary-600' : 'text-white'}`}>TaskMaster</Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-full transition duration-300 ${
                  isScrolled
                    ? 'text-primary-600 hover:bg-primary-100'
                    : 'text-white hover:bg-white hover:text-primary-600'
                }`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className={`px-4 py-2 rounded-full transition duration-300 ${
                  isScrolled
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-white text-primary-600 hover:bg-primary-100'
                }`}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

