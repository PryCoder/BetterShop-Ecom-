import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/info');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-indigo-600 to-pink-500 py-16 px-5 md:px-20 dark:bg-gradient-to-r dark:from-indigo-900 dark:to-pink-800">
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 md:p-16 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        {/* Header Section */}
        <h2 className="text-4xl  font-extrabold text-center text-black mb-6">
          Welcome Back! 👋
        </h2>

        {/* Intro Text */}
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
          Sign in to continue your journey and stay connected with your community.
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <Label value="Your email" className="font-semibold text-gray-700 text-lg dark:text-gray-200" />
            <TextInput
              type="email"
              id="email"
              placeholder="name@company.com"
              onChange={handleChange}
              className="w-full p-4 text-lg placeholder-gray-400 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none transition duration-300 ease-in-out"
            />
          </div>

          {/* Password */}
          <div>
            <Label value="Your password" className="font-semibold text-gray-700 text-lg dark:text-gray-200" />
            <TextInput
              type="password"
              id="password"
              placeholder="*******"
              onChange={handleChange}
              className="w-full p-4 text-lg placeholder-gray-400 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none transition duration-300 ease-in-out"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg text-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 ease-in-out transform active:scale-95"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          {/* OAuth Section */}
          <div className="mt-8">
            <OAuth />
          </div>

          {/* Sign Up Link */}
          <div className="flex justify-center gap-2 text-lg mt-6">
            <span className="text-gray-700 dark:text-gray-300">Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500 font-bold hover:underline transform transition-all duration-300 hover:scale-110">
              Sign Up
            </Link>
          </div>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <Alert className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg animate__animated animate__bounceIn">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
