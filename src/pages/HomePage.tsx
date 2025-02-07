import React from "react";
import { Link } from "react-router";
import { ArrowRight, Star } from "lucide-react";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bike-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Ride the Future</h1>
          <p className="text-xl mb-8">Explore our premium collection of bikes designed for every terrain.</p>
          <Link
            to="/shop"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
          >
            Shop Now <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Featured Bikes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={`/bike-${idx + 1}.jpg`} alt={`Bike ${idx + 1}`} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Bike Model {idx + 1}</h3>
                <p className="text-gray-600 mb-4">Perfect for urban commuting and off-road adventures.</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-bold text-lg">$1,999</span>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Explore Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {["Mountain Bikes", "Road Bikes", "Hybrid Bikes", "Electric Bikes"].map((category, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img src={`/category-${idx + 1}.jpg`} alt={category} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category}</h3>
                  <Link
                    to="/shop"
                    className="inline-flex items-center text-green-600 hover:text-green-700 transition-all duration-300"
                  >
                    Shop Now <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-bold">U{idx + 1}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">User {idx + 1}</h3>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"The bikes are amazing! Great quality and perfect for my daily commute."</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BikeBD</h3>
              <p className="text-gray-400">Your one-stop shop for premium bikes.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-green-500 transition-all duration-300">Home</Link></li>
                <li><Link to="/shop" className="text-gray-400 hover:text-green-500 transition-all duration-300">Shop</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-green-500 transition-all duration-300">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-green-500 transition-all duration-300">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-all duration-300">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-all duration-300">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-all duration-300">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;