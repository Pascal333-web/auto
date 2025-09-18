import React from 'react';
import type { Car } from '../services/api';
import { api } from '../services/api';

interface CarCardProps {
  car: Car;
  onClick: () => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={car.image} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover transition-transform duration-200 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-auto-blue text-white px-2 py-1 rounded text-sm font-semibold">
          {api.formatPrice(car.price)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {car.make} {car.model}
        </h3>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <span className="w-4 h-4 mr-2">📅</span>
            {car.year}
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 mr-2">🛣️</span>
            {car.mileage.toLocaleString('de-CH')} km
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 mr-2">⚙️</span>
            {car.transmission}
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 mr-2">⛽</span>
            {car.fuelType}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-4 h-4 mr-1">📍</span>
            {car.location}
          </div>
          <div className="text-sm text-gray-500">
            {car.seller}
          </div>
        </div>
      </div>
    </div>
  );
};