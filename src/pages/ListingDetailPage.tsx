import React, { useState, useEffect } from 'react';
import type { Car } from '../services/api';
import { api } from '../services/api';

interface ListingDetailPageProps {
  carId: string;
  onNavigate: (path: string) => void;
}

export const ListingDetailPage: React.FC<ListingDetailPageProps> = ({ carId, onNavigate }) => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadCar();
  }, [carId]);

  const loadCar = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await api.getCarById(carId);
      if (result) {
        setCar(result);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error loading car:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = () => {
    if (car) {
      alert(`Kontakt zu ${car.seller} wird hergestellt. In einer echten Anwendung würde hier ein Kontaktformular oder eine Telefonnummer angezeigt.`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-auto-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Fahrzeug wird geladen...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Fahrzeug nicht gefunden
          </h1>
          <p className="text-gray-600 mb-6">
            Das gesuchte Fahrzeug existiert nicht oder wurde bereits entfernt.
          </p>
          <button
            onClick={() => onNavigate('/listings')}
            className="bg-auto-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('/listings')}
          className="flex items-center text-auto-blue hover:text-blue-700 transition-colors mb-6"
        >
          <span className="mr-2">←</span>
          Zurück zur Übersicht
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:flex">
            {/* Image */}
            <div className="lg:w-1/2">
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-64 lg:h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="lg:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {car.make} {car.model}
                </h1>
                <div className="text-3xl font-bold text-auto-blue mb-4">
                  {api.formatPrice(car.price)}
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Baujahr</div>
                  <div className="font-semibold">{car.year}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Kilometerstand</div>
                  <div className="font-semibold">{car.mileage.toLocaleString('de-CH')} km</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Getriebe</div>
                  <div className="font-semibold">{car.transmission}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Kraftstoff</div>
                  <div className="font-semibold">{car.fuelType}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Standort</div>
                  <div className="font-semibold">{car.location}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Verkäufer</div>
                  <div className="font-semibold">{car.seller}</div>
                </div>
              </div>

              {/* Contact Button */}
              <button
                onClick={handleContact}
                className="w-full bg-auto-blue text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Verkäufer kontaktieren
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="p-8 border-t">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Beschreibung
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {car.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};