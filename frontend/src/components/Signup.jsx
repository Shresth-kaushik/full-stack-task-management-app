import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { AlertCircle } from 'lucide-react';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    mobile: ''
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field-specific error when user starts typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setFieldErrors({});
      
      const response = await axios.post('https://full-stack-task-management-app.onrender.com/api/auth/signup', formData);
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      if (error.response) {
        if (error.response.data.field) {
          setFieldErrors({
            [error.response.data.field]: error.response.data.error
          });
        } else if (error.response.data.errors) {
          // Handle multiple validation errors
          const errors = {};
          error.response.data.errors.forEach(err => {
            errors[err.field] = err.error;
          });
          setFieldErrors(errors);
        } else {
          setError(error.response.data.error || 'Signup failed. Please try again.');
        }
      } else {
        setError('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                    fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                    fieldErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                    fieldErrors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {fieldErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                    fieldErrors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {fieldErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.lastName}</p>
                )}
              </div>
              <div>
                <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                    fieldErrors.mobile ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {fieldErrors.mobile && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.mobile}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-500 transition duration-300"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;

