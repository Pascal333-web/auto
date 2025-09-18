import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { Car } from '../services/api';
import { api } from '../services/api';
import { CarCard } from '../components/CarCard';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserCars();
    }
  }, [user]);

  const loadUserCars = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const cars = await api.getUserCars(user.id);
      setUserCars(cars);
    } catch (error) {
      console.error('Error loading user cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onNavigate('/');
  };

  const handleCarClick = (carId: string) => {
    onNavigate(`/listing/${carId}`);
  };

  if (!user) {
    onNavigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Willkommen, {user.name}!
              </h1>
              <p className="text-gray-600">
                Verwalten Sie Ihre Fahrzeuginserate und entdecken Sie neue Möglichkeiten.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <button
                onClick={() => onNavigate('/create-listing')}
                className="bg-auto-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Neues Inserat
              </button>
              <button
                onClick={handleLogout}
                className="bg-auto-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Abmelden
              </button>
            </div>
          </div>
        </div>

        {/* User's Cars Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Meine Inserate
          </h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-auto-blue mx-auto mb-4"></div>
              <p className="text-gray-600">Inserate werden geladen...</p>
            </div>
          ) : userCars.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Noch keine Inserate vorhanden
              </h3>
              <p className="text-gray-600 mb-6">
                Erstellen Sie Ihr erstes Fahrzeuginserat und erreichen Sie tausende von potenziellen Käufern.
              </p>
              <button
                onClick={() => onNavigate('/create-listing')}
                className="bg-auto-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Erstes Inserat erstellen
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onClick={() => handleCarClick(car.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-auto-blue mb-2">
              {userCars.length}
            </div>
            <div className="text-gray-600">
              {userCars.length === 1 ? 'Aktives Inserat' : 'Aktive Inserate'}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {userCars.reduce((sum, car) => sum + car.price, 0) > 0 
                ? api.formatPrice(userCars.reduce((sum, car) => sum + car.price, 0))
                : 'CHF 0'
              }
            </div>
            <div className="text-gray-600">Gesamtwert</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              ∞
            </div>
            <div className="text-gray-600">Reichweite</div>
          </div>
        </div>
      </div>
    </div>
  );
};