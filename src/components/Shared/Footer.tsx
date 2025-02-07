
import { Link } from 'react-router'

const Footer = () => {
  return (
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
            <li><Link to="/dashboard" className="text-gray-400 hover:text-green-500 transition-all duration-300">Account</Link></li>
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
  )
}

export default Footer