// Types for the application
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: 'Automatik' | 'Manuell';
  fuelType: 'Benzin' | 'Diesel' | 'Elektro' | 'Hybrid';
  location: string;
  description: string;
  image: string;
  seller: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface CreateCarData {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: 'Automatik' | 'Manuell';
  fuelType: 'Benzin' | 'Diesel' | 'Elektro' | 'Hybrid';
  location: string;
  description: string;
  image: string;
}

// Mock data
const mockCars: Car[] = [
  {
    id: '1',
    make: 'BMW',
    model: 'M3',
    year: 2021,
    price: 75000,
    mileage: 15000,
    transmission: 'Automatik',
    fuelType: 'Benzin',
    location: 'Zürich',
    description: 'Sportlicher BMW M3 in ausgezeichnetem Zustand. Vollausstattung mit allen Extras.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    seller: 'Auto Zürich AG'
  },
  {
    id: '2',
    make: 'Audi',
    model: 'A4',
    year: 2020,
    price: 45000,
    mileage: 25000,
    transmission: 'Manuell',
    fuelType: 'Diesel',
    location: 'Basel',
    description: 'Zuverlässiger Audi A4 mit niedrigem Verbrauch. Ideal für Geschäftsreisen.',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
    seller: 'BaselCars'
  },
  {
    id: '3',
    make: 'Mercedes',
    model: 'C-Klasse',
    year: 2022,
    price: 55000,
    mileage: 8000,
    transmission: 'Automatik',
    fuelType: 'Hybrid',
    location: 'Bern',
    description: 'Moderne Mercedes C-Klasse mit Hybrid-Antrieb. Sparsam und komfortabel.',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    seller: 'Bern Motors'
  },
  {
    id: '4',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 60000,
    mileage: 5000,
    transmission: 'Automatik',
    fuelType: 'Elektro',
    location: 'Genf',
    description: 'Brandneuer Tesla Model 3 mit Autopilot. Umweltfreundlich und technologisch fortschrittlich.',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
    seller: 'Tesla Genf'
  },
  {
    id: '5',
    make: 'Volkswagen',
    model: 'Golf',
    year: 2019,
    price: 25000,
    mileage: 35000,
    transmission: 'Manuell',
    fuelType: 'Benzin',
    location: 'Luzern',
    description: 'Klassischer VW Golf in gutem Zustand. Perfekt für den Stadtverkehr.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80',
    seller: 'Luzern Auto'
  },
  {
    id: '6',
    make: 'Porsche',
    model: '911',
    year: 2022,
    price: 120000,
    mileage: 2000,
    transmission: 'Automatik',
    fuelType: 'Benzin',
    location: 'St. Gallen',
    description: 'Traumhafter Porsche 911 mit minimaler Laufleistung. Ein echtes Sammlerstück.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    seller: 'Premium Cars St. Gallen'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    email: 'test@auto.ch',
    name: 'Hans Müller',
    password: 'password123'
  }
];

// User cars mapping (which cars belong to which user)
const userCars: Record<string, string[]> = {
  '1': ['1', '3'] // User 1 owns cars 1 and 3
};

// Current user state
let currentUser: User | null = null;

// API functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Car operations
  async getCars(): Promise<Car[]> {
    await delay(500);
    return mockCars;
  },

  async getCarById(id: string): Promise<Car | null> {
    await delay(300);
    return mockCars.find(car => car.id === id) || null;
  },

  async searchCars(filters: { make?: string; model?: string; maxPrice?: number }): Promise<Car[]> {
    await delay(400);
    return mockCars.filter(car => {
      if (filters.make && car.make !== filters.make) return false;
      if (filters.model && car.model !== filters.model) return false;
      if (filters.maxPrice && car.price > filters.maxPrice) return false;
      return true;
    });
  },

  async createCar(carData: CreateCarData): Promise<Car> {
    await delay(600);
    const newCar: Car = {
      ...carData,
      id: Date.now().toString(),
      seller: currentUser?.name || 'Anonymous'
    };
    mockCars.push(newCar);
    
    // Add to user's cars if logged in
    if (currentUser) {
      if (!userCars[currentUser.id]) {
        userCars[currentUser.id] = [];
      }
      userCars[currentUser.id].push(newCar.id);
    }
    
    return newCar;
  },

  // User operations
  async login(email: string, password: string): Promise<User | null> {
    await delay(500);
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      currentUser = user;
      return user;
    }
    return null;
  },

  async register(email: string, password: string, name: string): Promise<User> {
    await delay(600);
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      name
    };
    mockUsers.push(newUser);
    currentUser = newUser;
    return newUser;
  },

  async logout(): Promise<void> {
    await delay(200);
    currentUser = null;
  },

  getCurrentUser(): User | null {
    return currentUser;
  },

  async getUserCars(userId: string): Promise<Car[]> {
    await delay(300);
    const carIds = userCars[userId] || [];
    return mockCars.filter(car => carIds.includes(car.id));
  },

  // Utility functions
  getCarMakes(): string[] {
    return Array.from(new Set(mockCars.map(car => car.make))).sort();
  },

  getModelsByMake(make: string): string[] {
    return Array.from(new Set(mockCars.filter(car => car.make === make).map(car => car.model))).sort();
  },

  formatPrice(price: number): string {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }
};