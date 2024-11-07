import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import { FaShoppingCart, FaTags, FaUserAlt } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 py-24 px-4">
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center text-center text-white mb-16 space-y-8">
        <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl mb-6 drop-shadow-lg">
          Welcome to BetterShop
        </h1>
        <p className="text-2xl md:text-3xl max-w-2xl mb-8 animate__animated animate__fadeIn animate__delay-1s">
          Shop smarter, live better. Explore the best quality products with fast and reliable delivery.
        </p>
        <div className="flex justify-center gap-8">
          {/* Sign Up and Sign In Buttons */}
          <Link to="/sign-up">
            <Button className="bg-gradient-to-r  from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xl py-4 px-10 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-110 shadow-xl hover:shadow-2xl">
              Sign Up
            </Button>
          </Link>
          <Link to="/sign-in">
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800   text-white text-xl py-4 px-10 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-110 shadow-xl hover:shadow-2xl">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Advertisement Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Offer Card 1 */}
        <Card className="border-4 border-indigo-500 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out group">
          <div className="flex justify-center mb-4">
            <FaShoppingCart className="text-indigo-600 text-6xl group-hover:text-indigo-800 transition-all duration-300" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Exclusive Deals</h3>
          <p className="text-gray-600 mb-4">
            Discover top-rated products at unbeatable prices. Don't miss out on our special offers!
          </p>
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg">
            Shop Now
          </Button>
        </Card>

        {/* Offer Card 2 */}
        <Card className="border-4 border-pink-500 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out group">
          <div className="flex justify-center mb-4">
            <FaTags className="text-pink-600 text-6xl group-hover:text-pink-800 transition-all duration-300" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Flash Sales</h3>
          <p className="text-gray-600 mb-4">
            Hurry! Flash sales are on! Get limited-time discounts on your favorite items.
          </p>
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg">
            View Offers
          </Button>
        </Card>

        {/* Offer Card 3 */}
        <Card className="border-4 border-teal-500 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out group">
          <div className="flex justify-center mb-4">
            <FaUserAlt className="text-teal-600 text-6xl group-hover:text-teal-800 transition-all duration-300" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Exclusive Member Perks</h3>
          <p className="text-gray-600 mb-4">
            Become a member and enjoy exclusive perks such as early access to sales, discounts, and more.
          </p>
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg">
            Join Now
          </Button>
        </Card>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-12 mt-20 text-white text-center">
        <div className="flex justify-center gap-10 mb-6">
          <a href="mailto:support@bettershop.com" className="hover:text-gray-400">
            Contact Us
          </a>
          <a href="/about" className="hover:text-gray-400">
            About Us
          </a>
          <a href="/privacy-policy" className="hover:text-gray-400">
            Privacy Policy
          </a>
        </div>
        <div className="flex justify-center gap-6 mb-6">
          {/* Social Media Icons */}
          <a href="https://facebook.com" className="text-white hover:text-gray-400">
            <i className="fab fa-facebook-square text-3xl transition-all duration-300"></i>
          </a>
          <a href="https://twitter.com" className="text-white hover:text-gray-400">
            <i className="fab fa-twitter-square text-3xl transition-all duration-300"></i>
          </a>
          <a href="https://instagram.com" className="text-white hover:text-gray-400">
            <i className="fab fa-instagram-square text-3xl transition-all duration-300"></i>
          </a>
        </div>
        <p className="text-sm mb-4">© 2024 BetterShop. All rights reserved.</p>
        <p className="text-sm">
          For inquiries: <a href="mailto:support@bettershop.com" className="underline">support@bettershop.com</a>
        </p>
      </footer>
    </div>
  );
}
