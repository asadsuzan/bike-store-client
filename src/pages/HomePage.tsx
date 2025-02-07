import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Footer from "../components/Shared/Footer";
import Testimonial from "../components/Shared/Testimonial";

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
   <Testimonial/>

      {/* Footer */}
  <Footer/>
    </div>
  );
};

export default HomePage;