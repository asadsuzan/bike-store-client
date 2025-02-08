import { Link, useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import Footer from "../components/Shared/Footer";
import Testimonial from "../components/Shared/Testimonial";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../redux/features/products/productsApi";

import { pdCategoryItems } from "../constants/product";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

import CategoryCardSkeleton from './../components/skeleton/CategoryCardSkeleton';
import { generateArray } from "../utils";
import { IProduct } from "../types";

const HomePage = () => {
  const navigate = useNavigate()
  const { isLoading, data, isFetching } = useGetProductsQuery(
    {
      page: 1,
      limit: 4,
     
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );
const featuredBikes = data?.data || []

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
      {
        isFetching || isLoading ? generateArray(4).map((_,idx)=> <ProductCardSkeleton key={idx}/>) :    featuredBikes.map((bike:IProduct, idx:number) => (
   
          <ProductCard key={idx} model={bike?.name} imgSrc={bike.image as string} description={bike.description} price={bike?.price} onDetailsClick={()=>navigate(`/product/${bike?._id}`)}/>
        ))
      }
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Explore Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
         {
          isLoading || isFetching ? generateArray(4).map((_,idx)=> <CategoryCardSkeleton key={idx}/>)  :       pdCategoryItems?.map((category, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={category?.img} alt={category?.label} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category?.label}</h3>
                <Link
                  to={`/shop?category=${category.label}`}                    className="inline-flex items-center text-green-600 hover:text-green-700 transition-all duration-300"
                >
                  Shop Now <ArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))
         }
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