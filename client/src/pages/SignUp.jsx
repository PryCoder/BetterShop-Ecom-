import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Icons for input fields

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }

    setLoading(true);
    setErrorMessage(null); // Reset error message before API call

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return setErrorMessage(data.message || 'An error occurred. Please try again.');
      }

      // Successful signup
      navigate('/sign-in');
    } catch (error) {
      setErrorMessage('Failed to sign up. Please try again.'); // Generic error message
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-pink-500 py-16 px-5 md:px-20">
      <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-16 w-full max-w-md transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">Sign Up for Exclusive Access</h2>
        <p className="text-lg text-center mb-8 text-gray-600 animate__animated animate__fadeIn animate__delay-1s">
          Join our exclusive eCommerce platform and start shopping today!
        </p>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <Label value="Your username" className="font-semibold text-gray-700 text-lg" />
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <FaUser className="text-gray-400 mx-3 transition-all ease-in-out duration-300 transform hover:scale-110" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                className="border-none focus:ring-0 focus:outline-none w-full p-4 text-lg placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <Label value="Your email" className="font-semibold text-gray-700 text-lg" />
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <FaEnvelope className="text-gray-400 mx-3 transition-all ease-in-out duration-300 transform hover:scale-110" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
                className="border-none focus:ring-0 focus:outline-none w-full p-4 text-lg placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <Label value="Your password" className="font-semibold text-gray-700 text-lg" />
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <FaLock className="text-gray-400 mx-3 transition-all ease-in-out duration-300 transform hover:scale-110" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="border-none focus:ring-0 focus:outline-none w-full p-4 text-lg placeholder-gray-400"
              />
            </div>
          </div>

          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg text-lg w-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 ease-in-out transform active:scale-95"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              'Create Account'
            )}
          </Button>

          <div className="mt-8">
            <OAuth />
          </div>

          <div className="flex gap-2 text-lg mt-6 justify-center">
            <span className="text-gray-700">Already have an account?</span>
            <Link to="/sign-in" className="text-blue-500 font-bold hover:underline transform transition-all duration-300 hover:scale-110">
              Sign In
            </Link>
          </div>

          {errorMessage && (
            <Alert className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg animate__animated animate__bounceIn">
              {errorMessage}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
