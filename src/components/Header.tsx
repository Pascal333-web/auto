import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPath }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onNavigate('/');
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('/')}
          >
            <div className="w-8 h-8 bg-auto-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">auto.ch</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('/')}
              className={`text-gray-700 hover:text-auto-blue transition-colors ${
                isActive('/') ? 'text-auto-blue font-semibold' : ''
              }`}
            >
              Startseite
            </button>
            <button
              onClick={() => onNavigate('/listings')}
              className={`text-gray-700 hover:text-auto-blue transition-colors ${
                isActive('/listings') ? 'text-auto-blue font-semibold' : ''
              }`}
            >
              Alle Fahrzeuge
            </button>
            {user && (
              <button
                onClick={() => onNavigate('/create-listing')}
                className={`text-gray-700 hover:text-auto-blue transition-colors ${
                  isActive('/create-listing') ? 'text-auto-blue font-semibold' : ''
                }`}
              >
                Inserieren
              </button>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('/dashboard')}
                  className={`text-gray-700 hover:text-auto-blue transition-colors ${
                    isActive('/dashboard') ? 'text-auto-blue font-semibold' : ''
                  }`}
                >
                  Dashboard
                </button>
                <span className="text-gray-600">Hallo, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-auto-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Abmelden
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('/login')}
                  className={`text-gray-700 hover:text-auto-blue transition-colors ${
                    isActive('/login') ? 'text-auto-blue font-semibold' : ''
                  }`}
                >
                  Anmelden
                </button>
                <button
                  onClick={() => onNavigate('/register')}
                  className="bg-auto-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Registrieren
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};