import React from 'react';
import { SearchForm } from '../components/SearchForm';

interface HomePageProps {
  onNavigate: (path: string, state?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleSearch = (filters: { make?: string; model?: string; maxPrice?: number }) => {
    onNavigate('/listings', { filters });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80')`
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Ihr Traumauto.
            <br />
            <span className="text-auto-blue">Nur einen Klick entfernt.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Entdecken Sie die grösste Auswahl an Fahrzeugen in der Schweiz
          </p>
          
          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Warum auto.ch wählen?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wir machen den Autokauf und -verkauf so einfach wie möglich
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-auto-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Grosse Auswahl
              </h3>
              <p className="text-gray-600">
                Tausende von Fahrzeugen aus der ganzen Schweiz an einem Ort
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-auto-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Einfache Suche
              </h3>
              <p className="text-gray-600">
                Finden Sie schnell das perfekte Auto mit unseren intelligenten Filtern
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-auto-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Faire Preise
              </h3>
              <p className="text-gray-600">
                Transparente Preisgestaltung ohne versteckte Kosten
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-auto-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit, Ihr Auto zu verkaufen?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Erreichen Sie tausende von potenziellen Käufern in der ganzen Schweiz
          </p>
          <button 
            onClick={() => onNavigate('/register')}
            className="bg-white text-auto-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            Jetzt inserieren
          </button>
        </div>
      </div>
    </div>
  );
};