import React, { useState, useEffect } from 'react';
import type { Car } from '../services/api';
import { api } from '../services/api';
import { CarCard } from '../components/CarCard';
import { SearchForm } from '../components/SearchForm';

interface ListingsPageProps {
  onNavigate: (path: string) => void;
  initialFilters?: { make?: string; model?: string; maxPrice?: number };
}

export const ListingsPage: React.FC<ListingsPageProps> = ({ onNavigate, initialFilters }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState(initialFilters || {});

  useEffect(() => {
    loadCars(currentFilters);
  }, []);

  const loadCars = async (filters: { make?: string; model?: string; maxPrice?: number }) => {
    setLoading(true);
    try {
      let result: Car[];
      if (Object.keys(filters).length === 0) {
        result = await api.getCars();
      } else {
        result = await api.searchCars(filters);
      }
      setCars(result);
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters: { make?: string; model?: string; maxPrice?: number }) => {
    setCurrentFilters(filters);
    loadCars(filters);
  };

  const handleCarClick = (carId: string) => {
    onNavigate(`/listing/${carId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-auto-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Fahrzeuge werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="mb-8">
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fahrzeuge zum Verkauf
          </h1>
          <p className="text-gray-600">
            {cars.length} {cars.length === 1 ? 'Fahrzeug gefunden' : 'Fahrzeuge gefunden'}
            {Object.keys(currentFilters).length > 0 && ' (gefiltert)'}
          </p>
        </div>

        {/* Results */}
        {cars.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚗</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Keine Fahrzeuge gefunden
            </h2>
            <p className="text-gray-600 mb-6">
              Versuchen Sie es mit anderen Suchkriterien oder schauen Sie später wieder vorbei.
            </p>
            <button
              onClick={() => handleSearch({})}
              className="bg-auto-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Alle Fahrzeuge anzeigen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onClick={() => handleCarClick(car.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};