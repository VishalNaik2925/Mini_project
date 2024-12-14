import React, { useState } from 'react';
import axios from 'axios';

const StudentLogin = () => {
  // State to handle login form input values
  const [loginForm, setLoginForm] = useState({ usn: '', password: '' });

  // State to handle registration form input values
  const [registerForm, setRegisterForm] = useState({
    name: '',
    usn: '',
    year: '',
    sem: '',
    email: '',
    cgpa: '',
    phone: '',
    branch: '',
    password: '',
  });

  // State to handle profile photo upload
  const [profilePhoto, setProfilePhoto] = useState(null);

  // State to handle error messages
  const [errorMessage, setErrorMessage] = useState('');

  // State to toggle between login and registration forms
  const [isRegistering, setIsRegistering] = useState(false);

  // Handle input changes for login form
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // Handle input changes for registration form
  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  // Handle profile photo file input
  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post('http://localhost:5000/api/student/login', loginForm, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Save the user session and navigate to the student dashboard
      sessionStorage.setItem('usn', response.data.student.usn);
      window.location.href = '/student-dashboard';
    } catch (error) {
      // Handle errors and display a relevant error message
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // Handle registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Create a FormData object to handle multipart data
      const formData = new FormData();
      Object.keys(registerForm).forEach((key) => {
        formData.append(key, registerForm[key]); // Append each form field to FormData
      });
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto); // Add the profile photo to FormData
      }

      const response = await axios.post('http://localhost:5000/api/student/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Specify multipart content type
        },
      });

      // Save the user session and navigate to the student dashboard
      sessionStorage.setItem('usn', response.data.student.usn);
      window.location.href = '/student-dashboard';
    } catch (error) {
      // Handle errors and display a relevant error message
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        {/* Dynamic heading based on the current form */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isRegistering ? 'Student Register' : 'Student Login'}
        </h2>

        {/* Display error message if exists */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        {isRegistering ? (
          // Registration Form
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* Registration fields */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={registerForm.name}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="usn" className="block text-sm font-medium text-gray-700">USN:</label>
              <input
                type="text"
                id="usn"
                name="usn"
                value={registerForm.usn}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year:</label>
              <input
                type="number"
                id="year"
                name="year"
                value={registerForm.year}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="sem" className="block text-sm font-medium text-gray-700">Semester:</label>
              <input
                type="number"
                id="sem"
                name="sem"
                value={registerForm.sem}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700">CGPA:</label>
              <input
                type="number"
                step="0.01"
                id="cgpa"
                name="cgpa"
                value={registerForm.cgpa}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={registerForm.phone}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch:</label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={registerForm.branch}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="profilePhoto"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Photo:
              </label>
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                onChange={handleProfilePhotoChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Register
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="text-blue-500 hover:underline"
              >
                Login here
              </button>
            </p>
          </form>
        ) : (
          // Login Form
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="usn" className="block text-sm font-medium text-gray-700">
                USN:
              </label>
              <input
                type="text"
                id="usn"
                name="usn"
                value={loginForm.usn}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="text-blue-500 hover:underline"
              >
                Register here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentLogin;
