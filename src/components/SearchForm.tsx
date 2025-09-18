import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface SearchFormProps {
  onSearch: (filters: { make?: string; model?: string; maxPrice?: number }) => void;
  className?: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, className = '' }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const makes = api.getCarMakes();

  useEffect(() => {
    if (make) {
      setAvailableModels(api.getModelsByMake(make));
      setModel(''); // Reset model when make changes
    } else {
      setAvailableModels([]);
      setModel('');
    }
  }, [make]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters: { make?: string; model?: string; maxPrice?: number } = {};
    
    if (make) filters.make = make;
    if (model) filters.model = model;
    if (maxPrice) filters.maxPrice = parseInt(maxPrice);
    
    onSearch(filters);
  };

  const handleReset = () => {
    setMake('');
    setModel('');
    setMaxPrice('');
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Make Selection */}
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
            Marke
          </label>
          <select
            id="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
          >
            <option value="">Alle Marken</option>
            {makes.map((makeOption) => (
              <option key={makeOption} value={makeOption}>
                {makeOption}
              </option>
            ))}
          </select>
        </div>

        {/* Model Selection */}
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
            Modell
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!make}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">Alle Modelle</option>
            {availableModels.map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelOption}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Max. Preis (CHF)
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="z.B. 50000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end space-x-2">
          <button
            type="submit"
            className="flex-1 bg-auto-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Suchen
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};