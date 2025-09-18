import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { CreateCarData } from '../services/api';
import { api } from '../services/api';

interface CreateListingPageProps {
  onNavigate: (path: string) => void;
}

export const CreateListingPage: React.FC<CreateListingPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateCarData>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    transmission: 'Manuell',
    fuelType: 'Benzin',
    location: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' || name === 'mileage' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      onNavigate('/login');
      return;
    }

    setLoading(true);
    try {
      const newCar = await api.createCar(formData);
      alert('Ihr Inserat wurde erfolgreich erstellt!');
      onNavigate(`/listing/${newCar.id}`);
    } catch (error) {
      alert('Fehler beim Erstellen des Inserats. Versuchen Sie es erneut.');
      console.error('Error creating listing:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    onNavigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => onNavigate('/dashboard')}
              className="flex items-center text-auto-blue hover:text-blue-700 transition-colors mb-4"
            >
              <span className="mr-2">←</span>
              Zurück zum Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Neues Fahrzeuginserat erstellen
            </h1>
            <p className="text-gray-600">
              Füllen Sie alle Felder aus, um Ihr Fahrzeug zu inserieren.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
                  Marke *
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  required
                  value={formData.make}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
                  placeholder="z.B. BMW, Audi, Mercedes"
                />
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Modell *
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  required
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
                  placeholder="z.B. A4, Golf, C-Klasse"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Baujahr *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Preis (CHF) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
                  placeholder="50000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-2">
                  Kilometerstand *
                </label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  required
                  min="0"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
                  placeholder="50000"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Standort *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
                  placeholder="Zürich, Basel, Bern..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-2">
                  Getriebe *
                </label>
                <select
                  id="transmission"
                  name="transmission"
                  required
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
                >
                  <option value="Manuell">Manuell</option>
                  <option value="Automatik">Automatik</option>
                </select>
              </div>

              <div>
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-2">
                  Kraftstoff *
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  required
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
                >
                  <option value="Benzin">Benzin</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Elektro">Elektro</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Bild-URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
                placeholder="https://example.com/car-image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Lassen Sie das Feld leer für ein Standard-Bild
              </p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auto-blue focus:border-transparent"
                placeholder="Beschreiben Sie Ihr Fahrzeug ausführlich..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => onNavigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-auto-blue text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Inserat wird erstellt...' : 'Inserat erstellen'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};