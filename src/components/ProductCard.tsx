import React from 'react';

interface ProductCardProps {
  imgSrc: string;
  model: string;
  description: string;
  price: number
  onDetailsClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ imgSrc, model, description, price, onDetailsClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={imgSrc} alt={model} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{model}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-green-600 font-bold text-lg">${price.toFixed(2)}</span>
          <button
            onClick={onDetailsClick}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
