import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { ListingDetailPage } from './pages/ListingDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateListingPage } from './pages/CreateListingPage';

// Simple router state interface
interface RouterState {
  path: string;
  state?: any;
}

function App() {
  const [currentRoute, setCurrentRoute] = useState<RouterState>({ path: '/' });

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute({ path: window.location.pathname });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation function
  const navigate = (path: string, state?: any) => {
    setCurrentRoute({ path, state });
    window.history.pushState(null, '', path);
  };

  // Route rendering function
  const renderCurrentPage = () => {
    const { path, state } = currentRoute;

    // Extract path parameters for dynamic routes
    const listingMatch = path.match(/^\/listing\/(.+)$/);

    if (path === '/') {
      return <HomePage onNavigate={navigate} />;
    } else if (path === '/listings') {
      return <ListingsPage onNavigate={navigate} initialFilters={state?.filters} />;
    } else if (listingMatch) {
      const carId = listingMatch[1];
      return <ListingDetailPage carId={carId} onNavigate={navigate} />;
    } else if (path === '/login') {
      return <LoginPage onNavigate={navigate} />;
    } else if (path === '/register') {
      return <RegisterPage onNavigate={navigate} />;
    } else if (path === '/dashboard') {
      return <DashboardPage onNavigate={navigate} />;
    } else if (path === '/create-listing') {
      return <CreateListingPage onNavigate={navigate} />;
    } else {
      // 404 page
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🚗</div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Seite nicht gefunden
            </h1>
            <p className="text-gray-600 mb-6">
              Die gesuchte Seite existiert nicht oder wurde verschoben.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-auto-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Zur Startseite
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={navigate} currentPath={currentRoute.path} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
